# Thiết kế case và fixture

## Chọn điều kiện cần kiểm

1. Ghi scope Web khách hàng hoặc Web Admin, nguồn SRS và điều kiện cần quan sát. Khi kế thừa HW02 hoặc HW03, ghi ID cũ đã tìm thấy. Khi mở rộng, ghi nguồn thiết kế và điểm khác.
2. Xác định miền hợp lệ, điều kiện loại, trạng thái ban đầu và hậu điều kiện. Giữ các điều kiện khác hợp lệ khi thay đổi một biên. Dùng bảng quyết định cho điều kiện kết hợp và thêm ca giao nhau khi có ý nghĩa.
3. Kiểm khả năng đi qua UI. Ví dụ payload sửa role chỉ có qua API cần được ghi là case API hoặc giới hạn Web. Nếu UI gửi chuỗi rỗng, ghi đúng biến thể và phân biệt với thuộc tính bị bỏ khỏi request.
4. Với HW04, chọn ít nhất 12 case mỗi feature theo phạm vi đề. Mỗi dòng JSON hoặc CSV chứa ID, trạng thái và dữ liệu có ý nghĩa với case, cùng expected biến đổi theo dòng. Chọn ba mẫu assertion trở lên có thể phân biệt các kết quả thật.

## Chọn fixture theo trạng thái

| Trạng thái | Cách chuẩn bị | Cách xác nhận |
| --- | --- | --- |
| Hồ sơ và vai trò | Dùng account thử riêng, đặt giá trị ban đầu có thể phân biệt với giá trị mới | Quan sát đúng người dùng và giá trị cũ trước thao tác |
| Giỏ hàng và coupon | Đặt tổng trước giảm, loại mã, ngày hết hạn và lượt dùng theo dữ liệu case | Xác nhận tổng trước khi áp mã, dùng mã riêng hoặc mã seed đã đối chiếu |
| Admin coupon | Chuẩn bị phiên đúng vai trò và bản ghi cần xem, xóa hoặc kiểm trùng | Định vị dòng theo mã, kiểm trường đích và dùng bản ghi đối chứng khi cần |
| Thời gian | Dùng mốc chắc chắn đã hết hạn hoặc còn hạn. Nếu cần đúng thời điểm, điều khiển đồng hồ của thành phần thực sự tính hạn | Ghi múi giờ và mốc backend để xác nhận biên đã chọn |

API dùng để Arrange, đọc lại hậu điều kiện và dọn test data. Dùng UI cho hành vi đang kiểm. Giữ mỗi case tự đủ khi chạy riêng hoặc đổi trình duyệt. Browser context cô lập session client. Cơ sở dữ liệu thử vẫn cần cleanup riêng, gồm bảng phụ như `coupon_usage`. Khi một API không thể dọn an toàn, dùng DB riêng có thể hoàn nguyên và xác minh trước và sau run. [Playwright fixtures](https://playwright.dev/docs/test-fixtures), [Playwright parameterization](https://playwright.dev/docs/test-parameterize)

## Đầu ra tối thiểu

Hồ sơ feature nêu SRS, thiết kế, biên được chọn, case chưa tự động hóa, route UI, dữ liệu, assertions, cleanup và cách truy từ case qua report. Bản thiết kế chưa chạy ghi expected và trạng thái chưa chạy.
