# Thực thi và bằng chứng

## Chạy theo cấu hình dự án

1. Lấy lệnh chạy, dự án trình duyệt, môi trường và fixture từ repo. Xác minh các dịch vụ phục vụ đúng phiên bản ứng dụng trước khi chạy.
2. Chạy một ca hoặc một luồng trên một project trước. Khi ca đã tới assertion, chạy các project nằm trong phạm vi. Playwright project có thể đại diện cho trình duyệt, thiết bị hoặc cấu hình riêng. [Playwright Projects](https://playwright.dev/docs/test-projects)
3. Với mỗi lượt, ghi lệnh, phiên bản ứng dụng và suite, môi trường, project và mốc thực thi. Phân loại pass, fail, skip, retry, flaky và gián đoạn theo reporter. Đọc lỗi từ test hoặc reporter để phân biệt assertion fail với setup fail.
4. Mở báo cáo và đối chiếu số liệu với dữ liệu máy đọc. Đếm case duy nhất theo ID, lượt thực thi theo case và project. Ghi riêng giới hạn, như tập ID khác nhau do project có filters riêng.

## Helper kiểm HTML và JSON của Playwright

`scripts/verify_matrix.py` dùng Python 3.10 trở lên. Dùng khi bộ báo cáo có một project trong mỗi thư mục `<batch>/<feature>/<project>/`, hai báo cáo `results.json` và `html/index.html`, và title theo mẫu `<run label> | <ISO UTC> | <FEATURE> | <project>`. ID case đứng đầu title test. Các project trong ma trận chạy cùng tập case, một lần mỗi case, kỳ vọng mặc định là pass. Nếu repo xuất báo cáo theo cấu trúc khác, dùng dữ liệu của reporter để đối chiếu theo bốn bước trên.

Ví dụ chạy từ thư mục skill và dùng dữ liệu của một repo có feature `INVITES`.

```sh
python scripts/verify_matrix.py --run-label "Run by: QA CI" --projects desktop-chrome mobile-webkit --batch /path/to/run --expect INVITES=6 --scan-attachments
```

Lặp `--expect FEATURE=COUNT` để kiểm nhiều feature. Dùng `--feature-batch FEATURE=PATH` nếu một feature có batch riêng. Các tùy chọn dựa trên MSSV và cấu hình cũ được minh họa trong [ví dụ HW04](worked-example-fr09.md).

## Bằng chứng có thể chia sẻ

- Lưu test ID, môi trường, expected, actual và ảnh gắn với đúng lần chạy. Dùng log hoặc phản hồi rút gọn để làm rõ điều ảnh chưa thể hiện.
- Kiểm cả ảnh, báo cáo, chi tiết step và tệp đính kèm trước khi chia sẻ. Giữ trace, session và dữ liệu nhạy cảm ở nơi có quyền truy cập phù hợp. `--scan-attachments` báo một số dấu hiệu thông tin xác thực trong HTML, JSON và tệp đính kèm. Tiếp tục kiểm nội dung mà máy khó xác nhận, như dữ liệu hiển thị trong ảnh.
- Ghi nhãn người chạy theo quy ước dự án và ghi công cụ thực thi trong báo cáo. Lưu thời gian thật từ runner.

[Playwright HTML Reporter](https://playwright.dev/docs/test-reporters#html-reporter), [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer)
