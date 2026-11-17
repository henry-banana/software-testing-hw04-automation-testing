---
name: eshop-web-automation
description: Design, implement, review, or verify data-driven Playwright Web E2E tests for EShop user and admin features. Use for requirement-to-case mapping, fixture isolation, multi-browser HTML reports, and reproducible bug evidence for HW04 or a new Web feature.
---

# Tự động hóa kiểm thử web EShop

Chọn bước theo đầu ra người dùng cần. Đọc đề và phiên bản SRS áp dụng, repo test, SHA SUT, feature, quyền sử dụng trình duyệt và phạm vi thay đổi dữ liệu. Nếu chỉ review, dùng artifact hiện có và chạy thử trên bản sao theo quyền đã cấp. Chạy suite bằng Playwright Test. Helper đọc report cần Python 3.10 trở lên.

## Quy trình theo yêu cầu

1. **Thiết kế.** Đọc [thiết kế và fixture](references/design-and-fixtures.md) để chuyển điều kiện SRS, ca cũ và biên thành case có expected và hậu điều kiện. Dùng [mẫu thiết kế](assets/feature-plan.md) nếu feature chưa có hồ sơ.
2. **Viết Web E2E.** Đọc [Playwright CLI và Test](references/playwright-workflow.md) khi cần khảo sát UI, viết spec hoặc sửa locator, oracle và fixture. Dùng dữ liệu ngoài theo ID. Thao tác đang được kiểm phải đi qua UI.
3. **Chạy và kiểm bằng chứng.** Đọc [ma trận và artifact](references/execution-and-evidence.md) để preflight, chạy phạm vi phù hợp, so JSON với HTML và xác minh ảnh. Dùng `scripts/verify_matrix.py` khi report theo cấu trúc runner của HW04.
4. **Review và báo lỗi.** Đọc [review, lỗi và AI audit](references/review-and-issues.md) khi phân loại fail, tìm pass giả, phản biện bản AI hoặc viết issue. Dùng [mẫu hồ sơ lỗi](assets/bug-report.md) cho một nhóm sai lệch.
5. **Bàn giao.** Ghi expected, actual, số case, mốc chạy, phiên bản và liên kết evidence. Liệt kê case chưa chạy hoặc chưa tự động hóa với lý do. Giữ expected theo SRS khi sửa các test đang phát hiện lỗi SUT.

## Các điểm phải giữ

- Lấy expected từ SRS hoặc nguồn yêu cầu được chấp nhận. Ghi nguồn hoặc giả định. Mã SUT và response dùng để kiểm actual.
- UUID, phiên trình duyệt riêng và DB thử giải quyết các lớp trạng thái khác nhau. Khi test thay đổi dữ liệu backend, xác minh rollback hoặc cleanup bằng đọc lại bản ghi.
- Phân biệt lỗi runtime của script, môi trường, fixture và sai lệch SUT. Quy lỗi theo bước đã thực thi và bằng chứng quan sát được.
- Dùng thời gian và người chạy thực. Giữ run do agent thực hiện ở chế độ nháp. Sinh viên tự review, tự chạy report chính thức và tự ghi nhận phần mình thay đổi.
- Kiểm nội dung ảnh và attachment trước khi công khai. Trace thường chứa request, state và thông tin xác thực. Giữ bản debug cục bộ và sinh artifact có phạm vi phù hợp cho repo public.

## Dùng ngay trong HW04

- Bắt đầu ở test repo gồm `data/`, `tests/`, `docs/features/` và `scripts/run-matrix.mjs`. SUT là repo liền kề. Bản gốc backend seed lại SQLite mỗi lần khởi động, vì vậy dùng bản thử có thể bỏ đi.
- Khi cần khảo sát UI, dùng Playwright CLI nếu đã có. Khi cần spec, assertions, ba browser và HTML report, dùng Playwright Test của repo. Dùng phiên cô lập theo quyền người dùng đã cấp.
- Đọc [ví dụ hoàn chỉnh FR-09](references/worked-example-fr09.md) để xem đường đi từ SRS qua JSON, browser, nguyên nhân lỗi và video demo. Dùng [kịch bản đánh giá skill](evals/evals.json) khi kiểm chất lượng hướng dẫn.
