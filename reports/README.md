# Báo cáo Playwright

**Run by: 23120262**. Batch `2026-11-17T06-10-22.403Z` ngày 17/11/2026. Baseline EShop `85af3ba875c88283615e22cb108f13e2fccaf0e9`, commit suite `d16d2b4`.

Windows, Node.js 24.16.0, Playwright Test 1.65.1, Chromium 159.0.8154.6, Firefox 159.0 và WebKit 27.2. Ba dịch vụ EShop chạy cục bộ trên các cổng 3000, 5173 và 5174.

| Feature | Case | Chromium pass/fail | Firefox pass/fail | WebKit pass/fail |
| --- | ---: | --- | --- | --- |
| FR-04 | 14 | 9/5. [HTML](2026-11-17T06-10-22.403Z/fr04/chromium/html/index.html), [JSON](2026-11-17T06-10-22.403Z/fr04/chromium/results.json) | 9/5. [HTML](2026-11-17T06-10-22.403Z/fr04/firefox/html/index.html), [JSON](2026-11-17T06-10-22.403Z/fr04/firefox/results.json) | 9/5. [HTML](2026-11-17T06-10-22.403Z/fr04/webkit/html/index.html), [JSON](2026-11-17T06-10-22.403Z/fr04/webkit/results.json) |
| FR-09 | 13 | 9/4. [HTML](2026-11-17T06-10-22.403Z/fr09/chromium/html/index.html), [JSON](2026-11-17T06-10-22.403Z/fr09/chromium/results.json) | 9/4. [HTML](2026-11-17T06-10-22.403Z/fr09/firefox/html/index.html), [JSON](2026-11-17T06-10-22.403Z/fr09/firefox/results.json) | 9/4. [HTML](2026-11-17T06-10-22.403Z/fr09/webkit/html/index.html), [JSON](2026-11-17T06-10-22.403Z/fr09/webkit/results.json) |
| FR-17 | 15 | 10/5. [HTML](2026-11-17T06-10-22.403Z/fr17/chromium/html/index.html), [JSON](2026-11-17T06-10-22.403Z/fr17/chromium/results.json) | 10/5. [HTML](2026-11-17T06-10-22.403Z/fr17/firefox/html/index.html), [JSON](2026-11-17T06-10-22.403Z/fr17/firefox/results.json) | 10/5. [HTML](2026-11-17T06-10-22.403Z/fr17/webkit/html/index.html), [JSON](2026-11-17T06-10-22.403Z/fr17/webkit/results.json) |

Tổng 42 case và 126 lượt thực thi. Có 84 pass, 42 fail, 0 skip, 0 flaky và 0 lỗi thiết lập hoặc gián đoạn. Ba trình duyệt có cùng 14 case fail. Xem expected, actual, bước tái hiện và ảnh trong [hồ sơ lỗi](../bugs/bug-reports.md).

## Thời điểm thực thi từng lượt

| Feature | Browser | ISO timestamp UTC từ Playwright JSON |
| --- | --- | --- |
| FR-04 | chromium | `2026-11-17T06:10:23.079Z` |
| FR-04 | firefox | `2026-11-17T06:11:01.965Z` |
| FR-04 | webkit | `2026-11-17T06:12:17.962Z` |
| FR-09 | chromium | `2026-11-17T06:12:56.260Z` |
| FR-09 | firefox | `2026-11-17T06:13:38.465Z` |
| FR-09 | webkit | `2026-11-17T06:14:48.930Z` |
| FR-17 | chromium | `2026-11-17T06:15:16.103Z` |
| FR-17 | firefox | `2026-11-17T06:15:31.510Z` |
| FR-17 | webkit | `2026-11-17T06:16:21.243Z` |

## Mở báo cáo

Mở `html/index.html` từ bản clone hoặc ZIP đã giải nén. Giữ nguyên thư mục `html/data/` để mở ảnh, phản hồi và ngữ cảnh lỗi. `results.json` là kết quả máy đọc, với đường dẫn ảnh và tệp kèm tương đối từ thư mục của lượt chạy.

Playwright tạo báo cáo từ kết quả chạy trực tiếp. Runner đặt nhãn MSSV, thời gian ISO, browser và feature ở tiêu đề HTML. Trace tắt trong lượt công khai. Chi tiết bước FR17-13 trong ba HTML đã che mật khẩu thử. Báo cáo giữ nguyên verdict, thời gian và ảnh của lượt chạy. Sau lượt chạy, SQLite thử còn 0 lượt dùng coupon, 0 coupon có prefix HW04 và 0 tài khoản có prefix HW04.

[Hướng dẫn kiểm ma trận](../.agents/skills/web-automation-testing/references/execution-and-evidence.md)
