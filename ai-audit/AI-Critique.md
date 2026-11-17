# AI Critique

Codex tạo callback kiểm HTTP của FR-09 bằng cách lấy riêng hai phương thức từ response. Cả 12 case đầu dừng trước assertion nghiệp vụ vì mất đối tượng nhận lời gọi. Gọi phương thức trực tiếp trên response khôi phục phép kiểm. Lượt chạy kế tiếp có tám pass và bốn fail nghiệp vụ. Lỗi phát sinh do AI nhận diện đúng tên API qua mã tĩnh nhưng chưa kiểm cách gọi lúc thực thi.

AI còn bỏ sót một dạng pass sai. Bản đầu kiểm phản hồi áp mã và nội dung tiết kiệm, bỏ qua dòng tổng cuối. Khi cố ý cho SUT thử hiển thị tổng trước giảm, case fixed vẫn pass. Bản sửa kiểm dòng tổng theo giá trị JSON tính từ SRS. Ở FR-17, kiểm cả form không hợp lệ từng khiến một ô bắt buộc khác che lấp lỗi tại ô giá trị giảm. Bản sửa kiểm đúng control và tập bản ghi trước, sau khi gửi. Hai ví dụ cho thấy tên case và lượng assertion chưa chứng minh oracle bám sát yêu cầu.

Nguyên tắc rút ra là đối chiếu expected với SRS, đọc assertion theo đúng hành vi người dùng và cố ý tạo một sai lệch nhỏ để xem test có nhận ra. Khi test fail, phải xác định nó đã qua thao tác và đến assert hay còn mắc ở setup. Báo cáo cuối truy được mỗi kết luận tới JSON, ảnh và lần chạy.
