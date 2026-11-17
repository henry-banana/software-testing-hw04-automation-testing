import { randomUUID } from 'node:crypto';
import { test as base, expect, type APIRequestContext, type APIResponse, type Page } from '@playwright/test';

const api = 'http://localhost:3000';
export const adminUrl = 'http://localhost:5174';

type Session = { id: number; token: string };
type Account = Session & { email: string; password: string };
export type Coupon = {
  code: string;
  type: 'fixed' | 'percent';
  discount_value: string | number;
  min_order_amount: string | number;
  expired_at: string;
  max_uses_per_user: string | number;
};

function authorize(token: string) {
  return { Authorization: `Bearer ${token}` };
}

async function checkedJson<T>(response: APIResponse, task: string): Promise<T> {
  expect(response.ok(), `${task} returned HTTP ${response.status()}`).toBe(true);
  return response.json() as Promise<T>;
}

async function login(request: APIRequestContext, email: string, password: string): Promise<Session> {
  const result = await checkedJson<{ token: string; user: { id: number } }>(
    await request.post(`${api}/api/login`, { data: { email, password } }),
    'Login fixture',
  );
  return { id: result.user.id, token: result.token };
}

export async function setBrowserSession(page: Page, key: 'token' | 'adminToken', token: string) {
  await page.addInitScript(({ key, token }) => {
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      localStorage.setItem(key, token);
    }
  }, { key, token });
}

export async function acceptDialog(page: Page, action: () => Promise<void>) {
  const [message] = await Promise.all([
    page.waitForEvent('dialog', { timeout: 5_000 }).then(async (dialog) => {
      const message = dialog.message();
      await dialog.accept();
      return message;
    }),
    action(),
  ]);
  return message;
}

class EShopFixtures {
  private users: number[] = [];
  private couponCodes = new Set<string>();
  private adminSession?: Promise<Session>;

  constructor(private request: APIRequestContext) {}

  admin() {
    this.adminSession ??= login(
      this.request,
      process.env.ESHOP_ADMIN_EMAIL ?? 'admin@eshop.com',
      process.env.ESHOP_ADMIN_PASSWORD ?? 'Admin123!',
    );
    return this.adminSession;
  }

  async account(name = 'Hồ sơ HW04'): Promise<Account> {
    const email = `hw04-${randomUUID()}@example.invalid`;
    const password = `HW04-${randomUUID()}!Aa1`;
    const { id } = await checkedJson<{ id: number }>(await this.request.post(
      `${api}/api/register`, { data: { name, email, password } },
    ), 'Register fixture');
    this.users.push(id);
    return { ...await login(this.request, email, password), email, password };
  }

  async setProfile(account: Account, name: string, phone: string, shippingAddress: string) {
    await checkedJson(await this.request.put(`${api}/api/users/me`, {
      headers: authorize(account.token),
      data: { name, phone, shipping_address: shippingAddress },
    }), 'Seed profile');
  }

  couponCode() {
    const code = `HW04-${randomUUID().toUpperCase()}`;
    this.couponCodes.add(code);
    return code;
  }

  async coupon(data: Coupon) {
    const admin = await this.admin();
    return checkedJson<{ id: number }>(await this.request.post(`${api}/api/admin/coupons`, {
      headers: authorize(admin.token), data,
    }), 'Create coupon fixture');
  }

  async recordUsage(account: Account, couponId: number) {
    await checkedJson(await this.request.post(`${api}/api/coupon-usage`, {
      headers: authorize(account.token), data: { coupon_id: couponId },
    }), 'Seed coupon usage');
  }

  async coupons(code: string) {
    const admin = await this.admin();
    const rows = await checkedJson<(Coupon & { id: number })[]>(
      await this.request.get(`${api}/api/coupons`, { headers: authorize(admin.token) }),
      'Read persisted coupons',
    );
    return rows.filter((row) => row.code === code);
  }

  async cleanup() {
    if (!this.users.length && !this.couponCodes.size) return;
    const admin = await this.admin();
    const headers = authorize(admin.token);
    if (this.couponCodes.size) {
      const rows = await checkedJson<{ id: number; code: string }[]>(
        await this.request.get(`${api}/api/coupons`, { headers }), 'List coupons for cleanup',
      );
      for (const row of rows.filter(({ code }) => this.couponCodes.has(code))) {
        await checkedJson(await this.request.delete(`${api}/api/admin/coupons/${row.id}`, { headers }),
          'Delete coupon fixture');
      }
    }
    for (const id of this.users) {
      await checkedJson(await this.request.delete(`${api}/api/admin/users/${id}`, { headers }),
        'Delete account fixture');
    }
  }
}

export const test = base.extend<{ sut: EShopFixtures }>({
  sut: async ({ request }, use) => {
    const sut = new EShopFixtures(request);
    try {
      await use(sut);
    } finally {
      await sut.cleanup();
    }
  },
});

export { expect };
