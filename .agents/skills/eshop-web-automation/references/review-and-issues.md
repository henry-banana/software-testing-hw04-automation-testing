# Review bản AI, phân loại lỗi và báo cáo

## Quyết định từ bằng chứng

| Dấu hiệu | Xử lý |
| --- | --- |
| Selector sai, TypeError hoặc Act chưa tới | Sửa script hoặc setup. Giữ dấu vết trước và sau sửa. |
| Dữ liệu chuẩn bị khác dự kiến hoặc dịch vụ không sẵn sàng | Kiểm precondition, xem lỗi fixture hay môi trường, chạy lại trong bản thử phù hợp. |
| Đi qua Act và observable trái yêu cầu | Lặp lại cùng điều kiện, xác minh bằng chứng, ghi lỗi SUT. |
| Pass vì kiểm sai tín hiệu hoặc có điều kiện khác che lỗi | Thêm assertion đúng ý định, thử làm lệch riêng kết quả cần kiểm trên bản tạm. |
| Expected thiếu căn cứ | Ghi điểm chưa rõ hoặc giả định được duyệt, cập nhật oracle theo nguồn. |

Kiểm cả pass và fail. Một test pass vẫn có thể chấp nhận tổng thanh toán sai, chặn submit vì ô khác hoặc bỏ qua hậu điều kiện. Một test fail có thể đang đòi popup cụ thể dù SRS chấp nhận lỗi inline. Khi cần chứng minh, thay đổi duy nhất tín hiệu đang bị bỏ sót trên bản tạm và so kết quả trước sau. Giữ chứng cứ thay đổi kiểm soát tách khỏi lỗi trên baseline.

## Viết hồ sơ lỗi

Dùng [mẫu](../assets/bug-report.md). Xác định một hành vi, điều kiện, bước, expected, actual, tác động quan sát được, ảnh, route, nguồn và case ID. Ghi phân tích source tại SHA cụ thể. Nếu chỉ có suy đoán, đánh dấu là giả thuyết.

- **Issue cùng hành vi.** Tìm theo SRS, bối cảnh và oracle. Liên kết issue hiện có và bổ sung bằng chứng mới khi được giao.
- **Issue liên quan.** Ghi biến thể khác nhau, ví dụ bỏ thuộc tính khỏi request và gửi chuỗi rỗng từ UI. Giữ các bước cụ thể để phân biệt.

Gộp các input có cùng hành vi và cùng hướng sửa trong một hồ sơ khi giúp dễ đọc. Lưu từng biến thể và ảnh. Tách lỗi script khỏi bug SUT. Chỉ ghi đã đăng, đã fix hay đã re-test khi quan sát thấy hành động và kết quả. Việc đăng hoặc cập nhật issue thực hiện theo phạm vi người dùng đã giao.

## Ghi quá trình AI và human review

Lưu công cụ, thời gian, prompt và đầu ra thực. Nối phiên AI với test ID, commit, diff hoặc report. Ghi lý do AI bỏ sót, thay đổi đã làm và kết quả chạy lại. Phân biệt review của agent và của sinh viên. Với HW04, giữ riêng AI Audit Report và AI Critique theo đề. Giữ nội dung gốc của AI-03, AI-04, AI-05 khi điền. Dùng thời gian, vai trò và chữ ký từ người thực hiện.
