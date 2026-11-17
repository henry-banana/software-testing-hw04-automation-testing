import cases from '../../data/fr09.json';
import { expect, setBrowserSession, test, type Coupon } from '../support/eshop';

test.use({ locale: 'en-US' });

const vnd = (value: number) => `${value.toLocaleString('en-US')} ₫`;

for (const row of cases) {
  test(`${row.id} ${row.title}`, async ({ page, sut }, testInfo) => {
    const code = sut.couponCode();
    const account = row.guest ? null : await sut.account();
    if (account) await setBrowserSession(page, 'token', account.token);

    if (row.coupon) {
      const data = row.coupon;
      const { id } = await sut.coupon({
        code,
        type: data.type as Coupon['type'],
        discount_value: data.amount,
        min_order_amount: data.min,
        max_uses_per_user: data.uses,
        expired_at: data.expired ? '2000-01-01' : '2099-12-31',
      });
      const usageAccount = row.otherUser ? await sut.account() : account;
      for (let count = 0; count < (row.used ?? 0); count++) {
        if (!usageAccount) throw new Error('Coupon usage needs an account fixture');
        await sut.recordUsage(usageAccount, id);
      }
    }

    await page.goto('/');
    if (account) await expect(page.locator('a[href="/profile"]')).toBeVisible();
    const heading = page.getByRole('heading', { name: row.product, exact: true });
    const productCard = page.locator('div').filter({ has: heading })
      .filter({ has: page.getByRole('button', { name: 'Thêm vào giỏ', exact: true }) }).last();
    await productCard.getByRole('button', { name: 'Thêm vào giỏ', exact: true }).click();
    if (row.guest) {
      // Enter the real checkout route without using Cart's login gate or losing the in-memory cart.
      await page.evaluate(() => {
        history.pushState(null, '', '/checkout');
        dispatchEvent(new PopStateEvent('popstate'));
      });
    } else {
      await page.getByRole('link', { name: 'Giỏ hàng', exact: true }).click();
      await page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
    }
    await expect(page).toHaveURL(/\/checkout$/);
    await expect(page.getByRole('spinbutton')).toHaveValue(String(row.total));

    await page.getByPlaceholder('Nhập mã giảm giá...').fill(code);
    const [reply] = await Promise.all([
      page.waitForResponse(({ url, request }) =>
        new URL(url()).pathname === '/api/apply-coupon' && request().method() === 'POST'),
      page.getByRole('button', { name: 'Áp dụng', exact: true }).click(),
    ]);
    const details = await reply.text();
    await testInfo.attach('coupon-response', {
      body: `HTTP ${reply.status()}\n${details}`, contentType: 'text/plain',
    });

    const savings = page.getByText('Tiết kiệm:', { exact: false });
    const final = page.getByText('Thành tiền:', { exact: false });
    if (row.expected) {
      expect.soft(reply.ok()).toBe(true);
      await expect.soft(savings).toHaveText(`Tiết kiệm: ${vnd(row.expected.discount)}`);
      await expect.soft(final).toHaveText(`Thành tiền: ${vnd(row.expected.final)}`);
    } else {
      expect.soft(reply.ok()).toBe(false);
      if (row.error) await expect.soft(page.getByText(row.error, { exact: false })).toBeVisible();
      await expect.soft(savings).toHaveCount(0);
      await expect.soft(page.getByText('Tổng thanh toán:', { exact: false }))
        .toHaveText(`Tổng thanh toán: ${vnd(row.total)}`);
    }
  });
}
