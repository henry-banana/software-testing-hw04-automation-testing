import type { Page } from '@playwright/test';
import cases from '../../data/fr17.json';
import { acceptDialog, adminUrl, expect, setBrowserSession, test, type Coupon } from '../support/eshop';

test.use({ locale: 'en-US' });

const heading = 'Quản lý Mã Giảm Giá';
const vnd = (value: number) => `${value.toLocaleString('en-US')} ₫`;
type FormData = NonNullable<(typeof cases)[number]['form']>;

function couponData(code: string, values: FormData): Coupon {
  return {
    code,
    type: values.type as Coupon['type'],
    discount_value: Number(values.discount),
    min_order_amount: Number(values.min),
    expired_at: values.expiry,
    max_uses_per_user: Number(values.uses),
  };
}

function couponRow(page: Page, code: string) {
  return page.getByRole('row').filter({ has: page.getByRole('cell', { name: code, exact: true }) });
}

async function checkRow(page: Page, expected: Coupon) {
  const row = couponRow(page, expected.code);
  await expect(row).toHaveCount(1);
  const expectedValues = [
    expected.code,
    expected.type === 'percent' ? 'Phần trăm' : 'Cố định',
    expected.type === 'percent' ? `${expected.discount_value}%` : vnd(Number(expected.discount_value)),
    vnd(Number(expected.min_order_amount)),
    expected.expired_at,
    `${expected.max_uses_per_user} lần`,
    'Xóa',
  ];
  await expect(row.getByRole('cell')).toHaveText(expectedValues);
}

async function openCoupons(page: Page) {
  await page.goto(adminUrl);
  await page.getByText('Mã Giảm Giá', { exact: true }).click();
  await expect(page.getByRole('heading', { name: heading })).toBeVisible();
}

for (const row of cases) {
  test(`${row.id} ${row.title}`, async ({ page, sut }, testInfo) => {
    if (row.kind === 'regular') {
      const account = await sut.account();
      await page.goto(adminUrl);
      await page.getByPlaceholder('Email', { exact: true }).fill(account.email);
      await page.getByPlaceholder('Password', { exact: true }).fill(account.password);
      const message = await acceptDialog(page, () => page.getByRole('button', { name: 'Login' }).click());
      expect(message).toMatch(/không phải là admin/i);
      await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible();
      await expect(page.getByText('Mã Giảm Giá', { exact: true })).toHaveCount(0);
      return;
    }

    const formData = row.form!;
    const code = sut.couponCode();
    const coupon = couponData(code, formData);
    const admin = await sut.admin();
    if (row.kind === 'view' || row.kind === 'delete') await sut.coupon(coupon);
    if (row.kind === 'duplicate') await sut.coupon({ ...coupon, discount_value: 50000 });
    await setBrowserSession(page, 'adminToken', admin.token);
    await openCoupons(page);

    if (row.kind === 'view') {
      await checkRow(page, coupon);
      return;
    }
    if (row.kind === 'delete') {
      const target = couponRow(page, code);
      await expect(target).toBeVisible();
      const [reply] = await Promise.all([
        page.waitForResponse((response) =>
          response.request().method() === 'DELETE' && /\/api\/admin\/coupons\/\d+$/.test(response.url())),
        target.getByRole('button', { name: 'Xóa', exact: true }).click(),
      ]);
      expect(reply.ok()).toBe(true);
      await expect(target).toHaveCount(0);
      expect(await sut.coupons(code)).toHaveLength(0);
      return;
    }

    page.on('dialog', (dialog) => dialog.dismiss());
    const form = page.locator('form').filter({ has: page.getByRole('button', { name: 'Tạo mã' }) });
    const codeInput = form.getByPlaceholder('Mã coupon (VD: SAVE10)', { exact: true });
    await codeInput.fill(formData.blankCode ? '' : code);
    await form.getByRole('combobox').selectOption(formData.type);
    await form.getByPlaceholder(/Giá trị %|Số tiền/).fill(formData.discount);
    await form.getByPlaceholder('Đơn tối thiểu (₫)', { exact: true }).fill(formData.min);
    await form.getByPlaceholder('Ngày hết hạn', { exact: true }).fill(formData.expiry);
    await form.getByPlaceholder('Số lần dùng tối đa/người', { exact: true }).fill(formData.uses);

    const submit = form.getByRole('button', { name: 'Tạo mã', exact: true });
    const blocksLocally = await form.evaluate((element) => element.matches(':invalid'));
    if (blocksLocally) {
      await submit.click();
      expect(row.allowed, 'Native validation blocked a valid case').toBe(false);
      expect(await sut.coupons(code)).toHaveLength(0);
      return;
    }
    const [reply] = await Promise.all([
      page.waitForResponse((response) =>
        response.request().method() === 'POST' && new URL(response.url()).pathname === '/api/admin/coupons'),
      submit.click(),
    ]);
    await testInfo.attach('creation-response', {
      body: `HTTP ${reply.status()}\n${await reply.text()}`, contentType: 'text/plain',
    });
    const rows = await sut.coupons(code);
    expect.soft(reply.ok()).toBe(row.allowed);
    if (row.allowed) {
      expect(rows).toMatchObject([coupon]);
      await checkRow(page, coupon);
    } else if (row.kind === 'duplicate') {
      expect(rows).toMatchObject([{ ...coupon, discount_value: 50000 }]);
      await expect(couponRow(page, code)).toHaveCount(1);
    } else {
      expect(rows).toHaveLength(0);
    }
  });
}
