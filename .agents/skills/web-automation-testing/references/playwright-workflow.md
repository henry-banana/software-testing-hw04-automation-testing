# Khảo sát và viết Playwright Web E2E

## Quyết định CLI hay test runner

- Dùng `playwright-cli` khi cần xem DOM, tìm locator, xác nhận một luồng và đọc console hoặc network của phiên thử. Kiểm lệnh và quyền truy cập trước khi mở browser. Tách session và làm mới snapshot sau thay đổi DOM. Đóng đúng session khi xong. [Microsoft Playwright CLI trên Skills.sh](https://www.skills.sh/microsoft/playwright-cli/playwright-cli), [OpenAI Playwright trên Skills.sh](https://www.skills.sh/openai/skills/playwright)
- Dùng `@playwright/test` khi cần spec chạy lại được, fixtures, assertions, ma trận browser hoặc HTML report. Dùng phiên bản và package manager của repo. Dùng profile mới hoặc context mới cho account thử. [Playwright browsers](https://playwright.dev/docs/browsers)

```powershell
Get-Command playwright-cli.cmd -ErrorAction SilentlyContinue
playwright-cli.cmd -s=web-check open $env:APP_BASE_URL
playwright-cli.cmd -s=web-check snapshot
playwright-cli.cmd -s=web-check close
```

Đặt `APP_BASE_URL` theo môi trường thử trong cấu hình dự án trước khi mở browser.

## Viết case theo quan sát

1. Arrange với case từ JSON hoặc CSV. Mở route và xác nhận precondition có liên quan, ví dụ thành viên đang có quyền xem trước khi kiểm cập nhật quyền.
2. Act qua UI. Dùng role, label, placeholder hoặc test ID theo cấu trúc thực. Khi form thiếu label liên kết, giới hạn locator theo form hoặc field container. Dùng helper hay Page Object khi nhiều case chia sẻ thao tác và giúp spec dễ review.
3. Assert bằng tín hiệu nghiệp vụ. Kiểm UI và hậu điều kiện nếu có ghi dữ liệu. Khi sửa quyền thành viên, kiểm quyền mới và xác nhận nó còn sau tải lại. Với form phủ định, kiểm chính field đích hoặc response phù hợp, rồi xác nhận hậu điều kiện.
4. Khi hành vi có request thật, đăng ký chờ response trước click. Gọi phương thức trên chính đối tượng response để giữ ngữ cảnh. Chờ trạng thái UI hoặc event có ý nghĩa.
5. Gắn ID dữ liệu vào tiêu đề test để truy ngược khi review. Giữ expected theo SRS khi gặp sai lệch lặp lại được của SUT.

```ts
const [response] = await Promise.all([
  page.waitForResponse((reply) =>
    new URL(reply.url()).pathname === memberResourcePath &&
    reply.request().method() === 'PATCH'),
  saveButton.click(),
]);
expect(response.ok()).toBe(true);
await expect(memberRole).toHaveText(expectedRole);
```

Ví dụ minh họa đồng bộ và oracle. Dữ liệu kỳ vọng đến từ dòng case. Nếu thông báo lỗi có thể hiển thị inline hoặc dạng popup, chờ tín hiệu được SRS chấp nhận và xác nhận dữ liệu sau reload. Nếu DOM báo form invalid, kiểm field đang được kiểm để xác nhận đúng lý do chặn.

Tham khảo cách tách bước viết, debug và review theo hoạt động. [Currents trên Skills.sh](https://www.skills.sh/currents-dev/playwright-best-practices-skill/playwright-best-practices), [TestDino QA trên Skills.sh](https://www.skills.sh/testdino-hq/playwright-skill/playwright-qa), [Playwright Best Practices](https://playwright.dev/docs/best-practices), [Playwright Assertions](https://playwright.dev/docs/test-assertions)
