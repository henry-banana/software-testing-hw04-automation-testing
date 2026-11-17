# CSC13003 HW04 Automation Testing

Bài cá nhân của MSSV 23120262. Phạm vi kế thừa HW02 gồm FR-04 Hồ sơ cá nhân, FR-09 Áp dụng mã giảm giá và FR-17 Quản lý mã giảm giá.

Bắt đầu ở [checklist công việc](TASKS.md). Xem [báo cáo chính](23120262_Report.md) và [liên kết demo](Video_Links.md).

## Cấu trúc

| Đường dẫn | Nội dung |
| --- | --- |
| [Kỹ thuật automation](docs/automation-techniques.md) | Chọn case, data-driven, selector, assertion và review AI |
| [Chuẩn bị fixture và chạy test](docs/test-workflow.md) | Fixture, chạy từng feature, chạy ma trận và phân loại kết quả |
| `docs/features/` | Yêu cầu, test case và review theo từng feature |
| `data/`, `tests/` | Dữ liệu JSON và script Playwright tương ứng |
| `scripts/run-matrix.mjs` | Lệnh chạy theo feature và trình duyệt |
| `reports/` | HTML, kết quả JSON và bảng liên kết các lượt chạy |
| [Hồ sơ lỗi theo FR](bugs/bug-reports.md) | Tám hồ sơ phân tích, biến thể, ảnh Playwright và issue HW04, kèm [mẫu issue](bugs/issue-template.md) |
| `ai-audit/` | Khai báo, audit và critique |
| [Agent Skill Web Automation Testing](.agents/skills/web-automation-testing/SKILL.md) | Thiết kế, Playwright, kiểm ma trận, mẫu báo cáo. [Ví dụ FR-09 trong HW04](docs/worked-example-fr09.md) |
| `git-commit-log.txt` | Lịch sử commit xuất trước khi nộp |

## Cài và chạy

Dùng Node.js 24. SQLite dùng mô-đun node:sqlite để dọn đúng dữ liệu thử của FR-09. Repo SUT nằm cạnh repo bài làm tại `../eshop-sut`. Xem `../eshop-sut/setup_guide.md` để cài và mở backend ở cổng 3000, Web ở 5173, Web Admin ở 5174. Dùng dữ liệu thử trên bản SUT cục bộ. Khi viết fixture, tạo tài khoản và dữ liệu có thể khôi phục cho từng lượt chạy.

Ví dụ cho PowerShell, chạy từ repo HW04.

```powershell
npm.cmd ci
npx.cmd playwright install chromium firefox webkit
npm.cmd run test:list
$env:HW04_STUDENT_ID = '23120262'
$env:HW04_TEST_DB = (Resolve-Path '../eshop-sut/backend/database.sqlite').Path
npm.cmd test -- fr04 chromium
npm.cmd test -- fr09
npm.cmd test
```

Lệnh test không thêm đối số chạy đủ 9 cặp. Lệnh có một đối số chạy một feature trên cả ba browser. Dùng `all` ở vị trí feature để chạy tất cả feature trên một browser. Chạy nháp bằng `npm.cmd test -- --draft fr09 chromium` hoặc `npm.cmd test -- --draft`. Báo cáo nháp lưu dưới `test-results/draft-reports/`.

Backend tự seed lại SQLite khi khởi động. Dùng một bản sao SUT có cơ sở dữ liệu thử cho các lượt chạy. Với npm 12, nếu `npm ci` báo đã chặn script cài đặt của sqlite3, chạy `npm.cmd install-scripts approve sqlite3` rồi `npm.cmd rebuild sqlite3` trong backend của bản thử. Đặt HW04_TEST_DB thành đường dẫn tuyệt đối đến file SQLite của đúng tiến trình backend bản thử. Runner đối chiếu dữ liệu fixture giữa API và file trước khi dọn. Phiên mặc định đọc tài khoản admin demo do seed tạo. Có thể cấu hình tài khoản thử bằng `ESHOP_ADMIN_EMAIL` và `ESHOP_ADMIN_PASSWORD`.

Web mặc định ở `http://localhost:5173` và có thể đổi bằng `ESHOP_WEB_URL`. FR-17 dùng Web Admin ở `http://localhost:5174`. Xem [ma trận báo cáo](reports/README.md) để mở báo cáo chính thức.

## Tóm tắt kết quả

**Run by: 23120262**. Ngày 17/11/2026, Playwright chạy 3 feature trên Chromium, Firefox và WebKit. Mỗi cặp feature và browser có một HTML report riêng với thời gian ISO. [HTML, JSON và đối chiếu từng browser](reports/README.md)

| Feature | Case tự động hóa | Lượt thực thi | Pass | Fail | Lượt browser | Issue HW04 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| FR-04 | 14 | 42 | 27 | 15 | 3 | 2 |
| FR-09 | 13 | 39 | 27 | 12 | 3 | 3 |
| FR-17 | 15 | 45 | 30 | 15 | 3 | 3 |
| Tổng | 42 | 126 | 84 | 42 | 9 | 8 |

14 case fail tái hiện trên cả ba browser. Tám hồ sơ lỗi có ảnh đính kèm và đường dẫn về report gốc. [Hồ sơ lỗi](bugs/bug-reports.md), [ảnh trang GitHub Issues](evidence/github-issues/README.md)

[Tải ZIP của repo công khai](https://github.com/henry-banana/software-testing-hw04-automation-testing/archive/refs/heads/main.zip)

## Tự đánh giá

| Tiêu chí | Điểm tối đa | Điểm tự chấm hiện tại | Căn cứ |
| --- | ---: | ---: | --- |
| Task 1 Feature A | 25 | 25 | 14 case, 3 báo cáo HTML, 2 issue |
| Task 1 Feature B | 25 | 25 | 13 case, 3 báo cáo HTML, 3 issue |
| Task 1 Feature C | 25 | 25 | 15 case, 3 báo cáo HTML, 3 issue |
| Task 2 Demo video | 15 | 0 | Link video chưa có |
| Agent Skill | 10 | 0 | Skill, ví dụ và công cụ kiểm đã có. Link video minh họa chưa có |
| Tổng | 100 | 75 | Tự chấm phần hồ sơ kỹ thuật hiện có |

[Dàn ý và liên kết video](Video_Links.md)
