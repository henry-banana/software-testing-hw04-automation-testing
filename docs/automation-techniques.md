# Kỹ thuật automation áp dụng cho HW04

## Chọn case và xác định expected

Chọn luồng Web có dữ liệu lặp, biên nghiệp vụ và kết quả quan sát được. Gắn từng case với yêu cầu trong SRS và ID case HW02 nếu tái sử dụng. Nếu SRS không cho đủ căn cứ để kết luận đúng sai, ghi câu hỏi hoặc quan sát trong hồ sơ feature. Ghi lý do cho các case chưa tự động hóa. [SRS EShop](https://github.com/ttbhanh/eshop-sut/blob/85af3ba875c88283615e22cb108f13e2fccaf0e9/README.md)

## Cấu trúc một test data-driven

- **Arrange**. Nạp dòng JSON theo mã case. Dựng phiên đăng nhập và các dữ liệu cần thiết trước thao tác.
- **Act**. Thực hiện hành vi đang được kiểm qua giao diện. Có thể dùng API để tạo fixture hoặc đọc lại hậu điều kiện.
- **Assert**. So sánh actual với expected đã xác định từ yêu cầu. Đặt các expected thay đổi theo case trong JSON. Ví dụ, điền số tiền giảm và thành tiền của FR-09 từ công thức SRS trước khi chạy. Đọc số tiền trên UI để lấy actual.

Mỗi case có tên chứa mã ổn định để tìm trong HTML report. Dùng helper hoặc Page Object khi nhiều case lặp lại thao tác hoặc locator. Giữ assertion về nghiệp vụ ở nơi đọc được khi review spec. [Playwright Parameterize tests](https://playwright.dev/docs/test-parameterize), [Page Object Model](https://playwright.dev/docs/pom)

## Selector và mẫu assertion

Ưu tiên `getByRole` hoặc `getByLabel` khi phần tử có tên phù hợp. Dùng locator khác có căn cứ khi markup không cung cấp role hoặc label dùng được. Chờ tín hiệu UI hoặc response liên quan tới thao tác, rồi dùng assertion có auto-retry. Ví dụ có thể chờ giá trị mới xuất hiện với `toHaveValue` sau khi tải lại hồ sơ. [Playwright Best Practices](https://playwright.dev/docs/best-practices), [Playwright Assertions](https://playwright.dev/docs/test-assertions)

| Feature | Ví dụ kiểm tra cần xem xét khi thiết kế |
| --- | --- |
| FR-04 | `toHaveValue` sau reload, `toBeVisible` cho phản hồi có căn cứ, `toHaveURL` cho luồng yêu cầu đăng nhập |
| FR-09 | `toHaveText` cho khoản giảm và thành tiền, `toBeVisible` cho lỗi, `toHaveCount` để kiểm tra phần giảm giá không xuất hiện khi mã bị từ chối |
| FR-17 | `toContainText` cho giá trị trong dòng đúng mã, `toHaveCount` để kiểm tra mã duy nhất hoặc đã bị xóa, assertion giá trị trường hoặc quyền truy cập theo case |

Các ví dụ trên là gợi ý chọn assertion khi viết test. Chốt expected và xác minh locator trên baseline trước khi dùng. Một test FR-09 báo pass khi chỉ thấy chữ thành công vẫn cần kiểm số tiền. Một test FR-17 báo pass sau khi đóng hộp thoại xóa vẫn cần đọc lại danh sách theo mã.

## Review đầu ra AI

1. Đối chiếu expected với SRS. Kiểm các case dùng cùng điều kiện và xem có biên nào bị bỏ sót.
2. Xác minh trường, selector, thao tác và trạng thái trên SUT. Xem test có thể pass vì giá trị đã có từ fixture hay vì assertion đặt sai phần tử.
3. Chạy thử bản nháp. Với mỗi lỗi hoặc pass đáng ngờ, ghi test ID, căn cứ, nguyên nhân và thay đổi. Sau khi sửa, chạy lại cùng case với fixture tương đương. Giữ expected theo SRS khi xác nhận lỗi SUT.

Các ý về chọn case, Arrange Act Assert, dữ liệu ngoài, locator và chống flaky được đối chiếu với ghi chú bài giảng của nphoang và tài liệu Playwright. Có thể tra lại slide môn học theo danh mục nguồn của bạn ấy. [Techniques from slides](https://github.com/nphoang-itus/hw04-automation-testing/blob/main/docs/techniques-from-slides.md), [Ví dụ review lần chạy đầu](https://github.com/nphoang-itus/hw04-automation-testing/blob/main/docs/fr02-p7-first-run.md)
