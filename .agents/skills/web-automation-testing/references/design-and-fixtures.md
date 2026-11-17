# Thiết kế case và fixture

## Chọn điều kiện cần kiểm

1. Nêu vai trò, luồng Web, nguồn yêu cầu và hành vi quan sát được. Nối case đã có bằng ID. Ghi giả định nếu nguồn chưa xác định đủ expected.
2. Dùng phân lớp tương đương, giá trị biên, bảng quyết định hoặc chuyển trạng thái khi phù hợp. Khi kiểm một biên, giữ các dữ kiện còn lại ở giá trị hợp lệ. Thêm ca tổ hợp khi tương tác giữa điều kiện có thể làm đổi kết quả.
3. Dùng UI cho hành vi người dùng trong phạm vi. Ghi riêng ca cần truy cập trực tiếp API, như thuộc tính bị thiếu trong payload mà form luôn gửi.
4. Lưu ca biến thể bằng JSON, CSV hoặc nguồn dữ liệu repo đang dùng. Mỗi dòng chứa ID, điều kiện, input và expected riêng. Chọn assertion có thể bắt được hành vi sai, như trạng thái hiển thị, thay đổi dữ liệu sau tải lại hoặc giá trị tính toán.

## Cô lập trạng thái

| Trạng thái | Cách chuẩn bị | Cách xác nhận |
| --- | --- | --- |
| Phiên và quyền | Dùng tài khoản thử riêng theo từng vai trò. Tạo context trình duyệt phù hợp | Kiểm danh tính hoặc quyền trước thao tác |
| Bản ghi có sẵn | Tạo dữ liệu với khóa duy nhất và giá trị ban đầu nhận biết được | Đọc đúng bản ghi trước khi sửa, xóa hay kiểm trùng |
| Trạng thái qua nhiều miền | Xác định dịch vụ tạo, đọc và cập nhật dữ liệu | Kiểm điều kiện ở UI hoặc API có thẩm quyền cho dữ liệu đó |
| Thời gian | Chọn mốc ổn định. Khi kiểm biên chính xác, điều khiển đồng hồ của thành phần tính thời hạn | Ghi mốc và múi giờ chi phối expected |

API có thể dùng để chuẩn bị, đọc hậu điều kiện và dọn test data. Context trình duyệt cô lập phiên phía client. Các bản ghi phía server cần được tách theo case hoặc worker và dọn bằng khóa của fixture. Nếu cách dọn thông thường đụng tới dữ liệu khác, dùng môi trường thử có thể hoàn nguyên và kiểm trạng thái sau chạy. [Playwright fixtures](https://playwright.dev/docs/test-fixtures), [Playwright parameterization](https://playwright.dev/docs/test-parameterize)

Dùng [mẫu kế hoạch](../assets/feature-plan.md) để ghi điều kiện, dữ liệu, thao tác, expected, assertion và kết quả. Ghi trạng thái chưa chạy cho thiết kế chưa thực thi.
