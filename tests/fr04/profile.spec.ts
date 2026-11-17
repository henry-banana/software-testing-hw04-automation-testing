import cases from '../../data/fr04.json';
import { acceptDialog, expect, setBrowserSession, test } from '../support/eshop';

const original = {
  name: 'Hồ sơ HW04 ban đầu',
  phone: '0901234567',
  address: 'Địa chỉ thử ban đầu',
};

for (const row of cases) {
  test(`${row.id} ${row.title}`, async ({ baseURL, page, sut }, testInfo) => {
    if (row.kind === 'guest') {
      await page.goto('/profile');
      await expect(page).toHaveURL(new URL('/profile', baseURL).href);
      await expect(page.getByText('Vui lòng đăng nhập', { exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Cập nhật' })).toHaveCount(0);
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
    const message = await acceptDialog(page, () => form.getByRole('button', { name: 'Cập nhật' }).click());
    await testInfo.attach('update-dialog', { body: message, contentType: 'text/plain' });

    await page.reload();
    await expect(phone).toBeVisible();
    await expect.soft(phone).toHaveValue(row.accepted ? row.phone! : original.phone);
    await expect.soft(name).toHaveValue(row.accepted ? row.name ?? original.name : original.name);
    await expect.soft(address).toHaveValue(row.accepted ? row.address ?? original.address : original.address);
    if (row.accepted) {
      expect(message).toMatch(/thành công/i);
    } else {
      expect(message).not.toMatch(/thành công/i);
    }
  });
}
