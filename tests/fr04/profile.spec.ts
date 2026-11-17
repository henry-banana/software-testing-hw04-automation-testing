import profileData from '../../data/fr04.json';
import type { Dialog, Locator, Page } from '@playwright/test';
import { expect, setBrowserSession, test } from '../support/eshop';

const { baseline: original, cases } = profileData;

async function submitProfile(page: Page, form: Locator) {
  let dialogHandler: (dialog: Dialog) => Promise<void>;
  const dialogSignal = new Promise<{ kind: string; detail: string }>((resolve) => {
    dialogHandler = async (dialog) => {
      const detail = dialog.message();
      await dialog.accept();
      resolve({ kind: 'dialog', detail });
    };
    page.on('dialog', dialogHandler);
  });
  const httpSignal = page.waitForResponse((response) =>
    response.request().method() === 'PUT' && new URL(response.url()).pathname === '/api/users/me',
  { timeout: 5000 }).then((response) => ({ kind: 'http', detail: String(response.status()) }));
  const alert = form.getByRole('alert').first();
  const inlineSignal = alert.waitFor({ state: 'visible', timeout: 5000 })
    .then(async () => ({ kind: 'inline', detail: await alert.innerText() }));

  try {
    const [outcome] = await Promise.all([
      Promise.any([dialogSignal, httpSignal, inlineSignal]),
      form.getByRole('button', { name: 'Cập nhật', exact: true }).click(),
    ]);
    return outcome;
  } finally {
    page.off('dialog', dialogHandler!);
  }
}

for (const row of cases) {
  test(`${row.id} ${row.title}`, async ({ baseURL, browser, page, sut }, testInfo) => {
    if (row.kind === 'guest') {
      await page.goto('/profile');
      await expect(page).toHaveURL(new URL('/profile', baseURL).href);
      await expect(page.getByText('Vui lòng đăng nhập', { exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Cập nhật' })).toHaveCount(0);
      return;
    }

    if (row.kind === 'isolation' && row.first && row.second) {
      const accountA = await sut.account(row.first.name);
      const accountB = await sut.account(row.second.name);
      await sut.setProfile(accountA, row.first.name, row.first.phone, row.first.address);
      await sut.setProfile(accountB, row.second.name, row.second.phone, row.second.address);
      const contextB = await browser.newContext({ baseURL });
      try {
        const pageB = await contextB.newPage();
        await setBrowserSession(page, 'token', accountA.token);
        await setBrowserSession(pageB, 'token', accountB.token);
        await page.goto('/profile');
        await pageB.goto('/profile');
        await expect(page.getByPlaceholder('VD: 0912345678')).toHaveValue(row.first.phone);
        await expect(pageB.getByPlaceholder('VD: 0912345678')).toHaveValue(row.second.phone);
        await expect(page.getByPlaceholder('Nhập địa chỉ của bạn')).toHaveValue(row.first.address);
        await expect(pageB.getByPlaceholder('Nhập địa chỉ của bạn')).toHaveValue(row.second.address);
      } finally {
        await contextB.close();
      }
      return;
    }

    const account = await sut.account(original.name);
    await sut.setProfile(account, original.name, original.phone, original.address);
    await setBrowserSession(page, 'token', account.token);
    await page.goto('/profile');
    await expect(page.getByRole('heading', { name: 'Hồ sơ của bạn' })).toBeVisible();
    const form = page.locator('form').filter({ has: page.getByRole('button', { name: 'Cập nhật' }) });
    const phone = form.getByPlaceholder('VD: 0912345678');
    await expect(phone).toHaveValue(original.phone);

    if (row.kind === 'email') {
      const fields = form.getByRole('textbox');
      await expect(fields).toHaveCount(4);
      await expect(fields.first()).toHaveValue(account.email);
      await expect(fields.first()).toBeDisabled();
      return;
    }

    const name = form.locator('div').filter({ has: page.getByText('Họ Tên', { exact: true }) }).getByRole('textbox');
    const address = form.getByPlaceholder('Nhập địa chỉ của bạn');
    if (row.name !== undefined) await name.fill(row.name);
    if (row.address !== undefined) await address.fill(row.address);
    await phone.fill(row.phone!);
    const feedback = await submitProfile(page, form);
    await testInfo.attach('update-feedback', {
      body: JSON.stringify(feedback), contentType: 'application/json',
    });

    await page.reload();
    await expect(phone).toBeVisible();
    await Promise.all([
      expect.soft(phone).toHaveValue(row.accepted ? row.phone! : original.phone),
      expect.soft(name).toHaveValue(row.accepted ? row.name ?? original.name : original.name),
      expect.soft(address).toHaveValue(row.accepted ? row.address ?? original.address : original.address),
    ]);
    if (!row.accepted && feedback.kind !== 'http') expect(feedback.detail).not.toMatch(/thành công/i);
  });
}
