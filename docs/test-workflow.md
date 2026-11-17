# Chuẩn bị fixture và chạy test

## Dữ liệu cần chuẩn bị

| Feature | Trạng thái ban đầu | Cô lập và dọn dữ liệu |
| --- | --- | --- |
| FR-04 | Tài khoản thử có hồ sơ ban đầu đã biết. Với case từ chối, lưu giá trị cũ để đối chiếu sau reload. | Dùng tài khoản riêng hoặc khôi phục hồ sơ sau mỗi case thay đổi dữ liệu. |
| FR-09 | Tạo giỏ có tổng biết trước, coupon có hạn và điều kiện rõ, user có mức sử dụng đúng với case. | Dựng lại giỏ khi đổi browser context. Dùng mã hoặc tài khoản riêng cho case đụng tới lượt dùng. |
| FR-17 | Chuẩn bị phiên admin và user thường khi kiểm quyền. Fixture cho case mã trùng hoặc xóa phải có đúng bản ghi trước thao tác. | Phân biệt phiên Web và Admin. Dọn bản ghi thử theo mã do case tạo. Case tạo mã mới nên dùng mã riêng để lượt trước không làm sai kết quả. |

Trình duyệt mới hoặc browser context mới cô lập dữ liệu phía trình duyệt. Hồ sơ, coupon và lượt sử dụng đã ghi ở backend cần fixture và cleanup riêng. Hai frontend trên baseline dùng phiên lưu theo origin. Giữ thông tin đăng nhập và file `storageState` ở môi trường cục bộ. [Playwright Authentication](https://playwright.dev/docs/auth), [SRS EShop](https://github.com/ttbhanh/eshop-sut/blob/85af3ba875c88283615e22cb108f13e2fccaf0e9/README.md)

## Quy trình chạy và xác minh

1. Kiểm backend, Web và Admin đã mở theo [README](../README.md#cài-và-chạy). Ghi SHA của SUT. Xác minh tạo được phiên phù hợp và đọc lại được dữ liệu fixture.
2. Chạy một feature trên Chromium sau khi có spec đầu tiên. Lưu lệnh, commit, case, report và nhận định từ lần chạy nháp vào hồ sơ feature. Xem những case fail và những case pass dù kiểm tra yếu.
3. Sửa script theo review. Chạy lại case đã sửa với dữ liệu tương đương và ghi kết quả ngay cạnh nhận định ban đầu. Gắn ID của tương tác tương ứng trong [AI Audit](../ai-audit/AI-Audit-Report.md).
4. Chạy đủ ma trận khi ba feature đã review. Điền link của đợt chính thức vào [bảng report](../reports/README.md). Dùng bảng đó khi tổng hợp README và báo cáo.

## Phân loại kết quả để quyết định xử lý

| Trường hợp | Cách ghi |
| --- | --- |
| Lỗi SUT đã xác nhận | Ghi yêu cầu bị vi phạm, cách tái hiện, actual, ảnh và report theo [mẫu issue](../bugs/issue-template.md). |
| Sai do script hoặc fixture | Ghi nguyên nhân, sửa và chạy lại. Ví dụ sai selector, fixture đã bị lượt trước thay đổi hoặc test chưa thực hiện đúng thao tác. |
| Bị chặn bởi môi trường hoặc kết quả không ổn định | Ghi điều kiện, browser, dấu hiệu quan sát được và lần thử lại. |
| Pass với assertion yếu | Củng cố assertion, ví dụ kiểm hậu điều kiện sau reload, rồi chạy lại và ghi khác biệt. |

Cách lưu lượt chạy đầu và lần sửa được tham khảo từ hai hồ sơ của nphoang. Dùng bảng review có sẵn trong từng feature để ghi lại quá trình của bài này. [Lần chạy nháp](https://github.com/nphoang-itus/hw04-automation-testing/blob/main/docs/fr02-p7-first-run.md), [Lần sửa](https://github.com/nphoang-itus/hw04-automation-testing/blob/main/docs/fr02-p6-iteration.md)
