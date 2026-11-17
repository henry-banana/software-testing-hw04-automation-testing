# Chạy và kiểm bằng chứng

## Preflight và lựa chọn lượt chạy

Xác nhận SHA SUT và spec, nguồn dữ liệu, môi trường, phần mềm và cổng đang phục vụ đúng bản thử. Runner HW04 dùng backend 3000, Web 5173 và Admin 5174. Vite cần Node theo engine của gói. SQLite có thể cần rebuild nếu npm chặn install script. Backend seed lại DB khi khởi động. Đọc hướng dẫn repo trước khi chạy ở máy khác.

```powershell
npm.cmd run test:list
npm.cmd test -- --draft fr09 chromium
npm.cmd test -- --draft
```

Chạy một phạm vi hẹp để sửa lỗi script, rồi mở rộng ma trận sau review. Exit code 1 có thể là fail nghiệp vụ hoặc lỗi thực thi. Đọc lỗi từ JSON và kiểm bước Act, Assert đã tới đâu.

```powershell
# Sinh viên thực hiện sau khi chốt spec và cách xuất report công khai
$env:HW04_STUDENT_ID = '23120262'
npm.cmd test
```

## Kiểm cấu trúc ma trận

Chạy helper từ test repo. Mỗi `--expect FEATURE=N` chọn feature và khai báo số case mỗi browser. Dùng `--feature-batch FEATURE=PATH` nếu một feature lấy từ batch chạy lại. Ví dụ dưới kiểm ba feature từ hai lượt nháp HW04 đã chọn.

```powershell
$helper = '.agents/skills/eshop-web-automation/scripts/verify_matrix.py'
$batch = 'test-results/draft-reports/2026-11-17T04-21-14.649Z'
$fr17 = 'test-results/draft-reports/2026-11-17T04-29-09.476Z'
python $helper --mode draft --batch $batch --feature-batch "FR17=$fr17" --expect FR04=14 --expect FR09=13 --expect FR17=15
```

Helper đọc `results.json` và metadata nhúng trong `html/index.html` theo reporter của HW04. Mỗi cặp phải có đủ case, đúng browser, đúng nhãn và thời gian ISO. Helper kiểm cùng tập ID giữa ba browser, số pass và fail, trạng thái skip, interruption hoặc global errors. Helper dành cho cấu hình hiện tại chạy một lần mỗi case, kỳ vọng mặc định là pass. Fail đã tới assertion vẫn được đếm và cần phân loại thủ công.

Dùng `--mode official --student-id 23120262 --scan-attachments` với batch chính thức. `--scan-attachments` tìm một số chỉ dấu credential trong artifact văn bản và ZIP đính kèm. Nó ghi loại chỉ dấu và cặp report, giữ kín giá trị. Kết quả sạch theo mẫu máy vẫn cần review nội dung, đặc biệt ảnh và video. Việc title có MSSV xác nhận label trong file. Quyền và bằng chứng người chạy phải được ghi độc lập.

## Đưa bằng chứng vào báo cáo

- Ghi cặp feature và browser, SHA, thời gian ISO, người chạy, số case và nhóm kết quả. Phân biệt ID duy nhất và lượt kiểm.
- Giữ ảnh lỗi, trạng thái trước sau và response rút gọn khi làm rõ. Kiểm ảnh đúng case. Dùng JSON assertion hoặc trace cục bộ để bổ sung khi screenshot chỉ chụp được hậu điều kiện.
- Tạo bản công khai qua reporter với attachment có thể chia sẻ. Kiểm metadata và link ảnh sau khi xuất. Giữ trace có credential và state đăng nhập ở bản cục bộ.

[Playwright HTML Reporter](https://playwright.dev/docs/test-reporters#html-reporter), [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer)
