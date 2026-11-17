---
name: web-automation-testing
description: Design data-driven web end-to-end tests from requirements, implement or maintain browser suites, debug weak assertions and flaky tests, and verify cross-browser reports or reproducible bug evidence.
---

# Tự động hóa kiểm thử web

Xác định yêu cầu, hành vi cần kiểm, phiên bản ứng dụng, môi trường thử và phạm vi thực thi. Tìm cấu hình, test hiện có và lệnh chạy trong repo. Dùng bộ công cụ hiện có nếu phù hợp, ví dụ Playwright, Cypress hoặc Selenium. Khi repo chưa có runner, chọn Playwright Test theo nhu cầu về trình duyệt, fixture và báo cáo.

## Quy trình

1. **Thiết kế case.** Đọc [thiết kế và fixture](references/design-and-fixtures.md). Mỗi case có ID, nguồn expected, dữ liệu và kết quả quan sát được. Ghi lý do cho các điều kiện nằm ngoài phạm vi Web.
2. **Viết hoặc sửa test.** Dùng mẫu của runner hiện có và xác minh thao tác qua UI. Đọc [Playwright](references/playwright-workflow.md) khi khảo sát DOM bằng CLI hoặc viết spec Playwright. Mỗi case chạy độc lập và có đường dọn dữ liệu do nó tạo.
3. **Chạy.** Chạy một ca để kiểm fixture, locator và assertion rồi mở rộng theo ma trận của dự án. Đọc [thực thi và bằng chứng](references/execution-and-evidence.md) để kiểm danh sách case, dự án trình duyệt, lần thử lại và tệp báo cáo.
4. **Review và phân loại.** Đọc [review và báo lỗi](references/review-and-issues.md). Truy mỗi failure tới bước và điều kiện thực thi. Kiểm các case có thể pass với assertion yếu. Khi báo lỗi, dùng [mẫu hồ sơ](assets/bug-report.md) để nối expected, actual, cách tái hiện và ảnh thật.

Khi chỉ thiết kế hoặc review, dùng nguồn và artifact được cung cấp. Khi được giao chạy, ghi nhận kết quả thực tế, phiên bản, thời điểm và nơi lưu bằng chứng. Chọn các đầu ra phù hợp với phạm vi người dùng giao.

Xem [ví dụ FR-09 của EShop](references/worked-example-fr09.md) khi cần một ca hoàn chỉnh từ yêu cầu đến report và issue. Dùng [kịch bản đánh giá](evals/evals.json) để kiểm skill trên các dự án khác.
