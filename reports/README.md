# Báo cáo chạy Playwright

Mỗi lượt chạy chính thức sinh `reports/<batch>/<feature>/<browser>/html/index.html` và `results.json`. `batch` là thời điểm bắt đầu đợt chạy theo UTC. Trước khi công khai, kiểm nội dung report, ảnh và attachment. Trace có thông tin xác thực chỉ dùng cho debug cục bộ. Giữ cấu trúc HTML và các tệp đính kèm đã kiểm khi sao chép bản công khai vào GitHub hoặc ZIP.

## Kết quả nháp do Codex chạy

SUT cục bộ ở `85af3ba875c88283615e22cb108f13e2fccaf0e9`. Ma trận nháp bắt đầu ngày 17/11/2026 lúc 11:21:14 UTC+7. FR-17 chạy lại sau khi bổ sung ảnh bản ghi không hợp lệ, bắt đầu lúc 11:29:09 UTC+7. Các báo cáo nháp ghi người chạy là Codex.

| Feature | Số case | Chromium pass/fail | Firefox pass/fail | WebKit pass/fail | Batch, commit script |
| --- | ---: | ---: | ---: | ---: | --- |
| FR-04 | 14 | 9/5 | 9/5 | 9/5 | `2026-11-17T04-21-14.649Z`, `5abf9f1` |
| FR-09 | 13 | 9/4 | 9/4 | 9/4 | `2026-11-17T04-21-14.649Z`, `5abf9f1` |
| FR-17 | 15 | 10/5 | 10/5 | 10/5 | `2026-11-17T04-29-09.476Z`, `d4be818` |
| Tổng | 42 | 28/14 | 28/14 | 28/14 | 126 lượt kiểm, 84 pass, 42 fail |

Mở HTML nháp theo mẫu `test-results/draft-reports/<batch>/<feature>/<browser>/html/index.html`. Số fail ở đây là lượt kiểm, đối chiếu từng nhóm lỗi và ảnh trong [bug report](../bugs/bug-reports.md).

Dùng [hướng dẫn kiểm ma trận](../.agents/skills/eshop-web-automation/references/execution-and-evidence.md) để so ID, số lượng và verdict giữa JSON với HTML, rồi kiểm title và thời gian ISO. Có lệnh riêng để tìm chỉ dấu thông tin xác thực trong attachment.

## Lượt chạy chính thức của sinh viên

| Đợt chạy chính thức | SUT commit | Ngày chạy | Người chạy |
| --- | --- | --- | --- |
| | | | |

| Feature | Chromium | Firefox | WebKit |
| --- | --- | --- | --- |
| FR-04 | | | |
| FR-09 | | | |
| FR-17 | | | |
