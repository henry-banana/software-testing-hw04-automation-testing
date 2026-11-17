# CSC13003 HW04 Automation Testing

Bài cá nhân của MSSV 23120262. Phạm vi kế thừa HW02 gồm FR-04 Hồ sơ cá nhân, FR-09 Áp dụng mã giảm giá và FR-17 Quản lý mã giảm giá.

Bắt đầu ở [checklist công việc](TASKS.md). Xem [báo cáo chính](23120262_Report.md) và [liên kết demo](Video_Links.md).

## Cấu trúc

| Đường dẫn | Nội dung |
| --- | --- |
| [Kỹ thuật automation](docs/automation-techniques.md) | Chọn case, data-driven, selector, assertion và review AI |
| [Chuẩn bị fixture và chạy test](docs/test-workflow.md) | Trạng thái từng feature, chạy nháp, chạy lại và phân loại kết quả |
| `docs/features/` | Yêu cầu, test case và review theo từng feature |
| `data/`, `tests/` | Dữ liệu JSON và script Playwright tương ứng |
| `scripts/run-matrix.mjs` | Lệnh chạy theo feature và trình duyệt |
| `reports/` | HTML, kết quả JSON và bảng liên kết các lượt chạy |
| `bugs/`, `evidence/github-issues/` | Bug report, [mẫu issue cho repo nhóm](bugs/issue-template.md), liên kết issue và ảnh |
| `ai-audit/` | Khai báo, audit và critique |
| `.agents/skills/eshop-web-automation/` | Khung Agent Skill |
| `git-commit-log.txt` | Lịch sử commit xuất trước khi nộp |

## Cài và chạy

Dùng Node.js từ phiên bản 20. Repo SUT nằm cạnh repo bài làm tại `../eshop-sut`. Xem `../eshop-sut/setup_guide.md` để cài và mở backend ở cổng 3000, Web ở 5173, Web Admin ở 5174. Dùng dữ liệu thử trên bản SUT cục bộ. Khi viết fixture, tạo tài khoản và dữ liệu có thể khôi phục cho từng lượt chạy.

Ví dụ cho PowerShell, chạy từ repo HW04.

```powershell
npm.cmd ci
npx.cmd playwright install chromium firefox webkit
npm.cmd run test:list
$env:HW04_STUDENT_ID = '23120262'
npm.cmd test -- fr04 chromium
npm.cmd test -- fr09
npm.cmd test
```

Các lệnh `npm.cmd test` dùng sau khi điền test case vào tệp `.spec.ts`. Hiện tại lệnh liệt kê cho biết chưa có test. Lệnh test không thêm đối số chạy đủ 9 cặp. Lệnh có một đối số chạy một feature trên cả ba browser. Dùng `all` ở vị trí feature để chạy tất cả feature trên một browser.

Web mặc định ở `http://localhost:5173` và có thể đổi bằng `ESHOP_WEB_URL`. Khi điền tests cho FR-17, dùng Web Admin ở `http://localhost:5174`. Xem [ma trận báo cáo](reports/README.md) để lưu báo cáo chính thức.

## Tóm tắt kết quả

| Feature | Test tự động hóa | Lượt thực thi | Pass | Fail | Browser runs | Bug xác nhận |
| --- | --- | --- | --- | --- | --- | --- |
| FR-04 | | | | | | |
| FR-09 | | | | | | |
| FR-17 | | | | | | |
| Tổng | | | | | | |

Số feature trong phạm vi là 3. Điền số test thực thi, pass và fail theo từng cặp test và trình duyệt. Ghi riêng số case skip hoặc blocked nếu có. Một lỗi tái hiện trên nhiều browser chỉ tính một bug. Điền link demo ở [Video_Links.md](Video_Links.md) và cập nhật bảng này trước khi nộp.

Link demo YouTube Unlisted

## Tự đánh giá

| Tiêu chí | Điểm tối đa | Điểm tự chấm | Căn cứ |
| --- | ---: | ---: | --- |
| Task 1 Feature A | 25 | | |
| Task 1 Feature B | 25 | | |
| Task 1 Feature C | 25 | | |
| Task 2 Demo video | 15 | | |
| Agent Skill | 10 | | |
| Tổng | 100 | | |
