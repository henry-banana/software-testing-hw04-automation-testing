# Checklist thực hiện HW04

## 1. Chuẩn bị

- [x] Đọc đề HW04 và đối chiếu phạm vi với báo cáo HW02.
- [x] Kiểm tra repo cá nhân đang public và xác định repo nhận issue.
- [x] Tạo khung Playwright, dữ liệu, báo cáo, audit, bug, video và Agent Skill.
- [ ] Kiểm tra deadline và hướng dẫn nộp trên Moodle. Đọc phần bài giảng automation liên quan.
- [ ] Đối chiếu phân công trong nhóm để xác nhận không trùng ba feature HW02. Thực hiện review chéo theo chính sách môn học.
- [ ] Chốt cấu hình SUT và SHA thực tế. Bản SUT cục bộ hiện là `85af3ba875c88283615e22cb108f13e2fccaf0e9`, cùng baseline đã ghi trong HW02. Lưu phiên bản Node, Playwright và trình duyệt.
- [ ] Cài ba browser Playwright và chạy thử kết nối với backend, Web, Web Admin. Chuẩn bị tài khoản thường, admin và cơ chế khôi phục dữ liệu thử theo [kế hoạch fixture và chạy test](docs/test-workflow.md).
- [ ] Mở log audit. Ghi cả tương tác dùng AI để đọc đề, lên kế hoạch và dựng khung.

## 2. Task 1. Tạo và sửa script

| Pool | Feature | Số case tối thiểu | File ghi thiết kế |
| --- | --- | ---: | --- |
| A | FR-04 Hồ sơ cá nhân trên Web | 12 | [FR-04](docs/features/fr04.md) |
| B | FR-09 Áp dụng mã giảm giá ở Checkout | 12 | [FR-09](docs/features/fr09.md) |
| C | FR-17 Thêm, xem và xóa mã giảm giá trên Admin | 12 | [FR-17](docs/features/fr17.md) |

- [ ] Đọc SRS và case HW02. Chọn hoặc bổ sung ít nhất 12 case Web cho mỗi feature. Ghi ID, yêu cầu, nguồn case cũ nếu có, điều kiện đầu vào, expected và hậu điều kiện. Dùng ca dương, âm và biên phù hợp với mỗi feature.
- [ ] Chia phiên AI thành các bước phân tích yêu cầu, xác định dữ liệu, thiết kế assertions, sinh script và phân tích lượt chạy nháp. Lưu ngày giờ, tên công cụ, prompt và đầu ra cho từng tương tác.
- [ ] Điền JSON riêng theo feature. Mỗi case có ID ổn định để truy từ log, HTML và issue về thiết kế. Dữ liệu tài khoản thử và bí mật chạy cục bộ lấy từ môi trường hoặc fixture.
- [ ] Tạo script Playwright đi qua giao diện Web. Dùng tối thiểu ba mẫu assertion trong mỗi feature để dễ đối chiếu rubric. Ví dụ kiểm thông báo, giá trị hiển thị và hậu điều kiện sau khi tải lại hoặc xác nhận. Dùng API hỗ trợ tạo dữ liệu hoặc kiểm chứng hậu điều kiện khi phù hợp.
- [ ] Lưu lượt chạy nháp theo feature. Sinh viên review diff, expected, selector, dữ liệu biên, hậu điều kiện và các case pass có assertion yếu theo [hướng dẫn kỹ thuật](docs/automation-techniques.md). Ghi vấn đề, lý do AI bỏ sót, phần đã sửa và kết quả chạy lại. Ghi các case chưa tự động hóa, giới hạn và cách đã thử.
- [ ] Giữ ít nhất 8 commit có thay đổi file test script thực chất. Ví dụ 3 commit bộ case đầu theo feature, 3 commit sửa qua review, và 2 commit tăng coverage hoặc sửa fixture thể hiện trong script. Xuất lịch sử sau khi script đã hoàn tất.

## 3. Chạy chính thức và báo lỗi

- [ ] Sinh viên chạy đủ 3 feature trên Chromium, Firefox và WebKit. Với đúng 12 case mỗi feature, dự kiến 108 lượt thực thi case trong 9 cặp feature và browser.
- [ ] Mở và kiểm đủ 9 HTML report thật. Mỗi báo cáo hiển thị đúng `Run by: 23120262`, thời gian ISO, browser và feature. Lưu đủ tệp đính kèm và điền link báo cáo trong `reports/README.md`.
- [ ] Phân loại các kết quả fail theo nguyên nhân. Xác nhận lỗi SUT bằng expected có nguồn, actual, lần tái hiện và ảnh. Ghi riêng sự cố fixture, môi trường, script, flaky và case chưa chạy.
- [ ] Tìm trùng ở [Issues của tkob-team/eshop-sut](https://github.com/tkob-team/eshop-sut/issues) với mã FR có và không có dấu gạch nối, từ khóa và case HW02 hoặc HW03. Đăng lỗi mới đã xác minh kèm ảnh theo [mẫu issue](bugs/issue-template.md). Với lỗi trùng, ghi link issue cũ và gắn bằng chứng HW04 vào issue tương ứng khi cần.
- [ ] Cập nhật bug report Markdown, link issue, ảnh hiển thị trên GitHub và bảng bằng chứng. Tính số bug duy nhất và số pass/fail từ báo cáo chính thức.

## 4. Task 2 và Agent Skill

- [ ] Chọn một script để demo end to end. Ghi video YouTube Unlisted ít nhất 5 phút, tự thuyết minh bằng tiếng Việt, hiện mặt hoặc chạy cả `whoami` và `hostname`.
- [ ] Trong demo, chạy đa trình duyệt, mở HTML report thật và trình bày ít nhất một bản sửa của sinh viên đối với script do AI sinh.
- [ ] Nếu làm phần Agent Skill 10 điểm, hoàn thiện skill dùng lại cho một feature mới, gồm quy trình thiết kế, dữ liệu, assertions, review, chạy đa trình duyệt, bug và audit. Quay cách dùng skill end to end cho một feature hoàn chỉnh và ghi link.

## 5. Báo cáo, tự chấm và nộp

- [ ] Hoàn thành báo cáo chính, kết quả chạy, human review, thiếu sót của AI, case chưa tự động hóa và bug report.
- [ ] Hoàn thành AI Audit Report làm phụ lục, gồm khai báo AI và đầy đủ tên công cụ, ngày giờ, prompt và đầu ra. Viết AI Critique 200 đến 300 từ.
- [ ] Điền README với điểm từng tiêu chí 25, 25, 25, 15, 10 và tổng. Điền số feature, case tự động hóa, thực thi, pass, fail, browser runs, bug và link video.
- [ ] Xuất PDF từ bản Markdown cuối cho báo cáo chính, AI Audit Report và AI Critique. Kiểm bản PDF và ảnh issue. Xuất `git-commit-log.txt` và xác nhận đủ 8 commit test script.
- [ ] Đưa script, dữ liệu và bộ HTML chính thức lên repo GitHub public. Kiểm link repo, issue, video và file tải xuống.
- [ ] Đóng gói `23120262_HW04_AI_Automation_<điểm ba chữ số>.zip`. Kiểm README, báo cáo chính MD và PDF, AI Audit MD và PDF, AI Critique MD và PDF, HTML và tệp đi kèm, Git log, link repo, link video, bug report và ảnh nếu có, skill và link minh họa nếu làm.
- [ ] Kiểm thời hạn, dung lượng và cách nộp theo Moodle. Chính sách chung ghi tối đa 20 file, mỗi file tối đa 20 MB. Mở thử ZIP và kiểm kết quả tải lên Moodle.
- [ ] Chuẩn bị giải thích thiết kế, một bản sửa AI, một assertion và bằng chứng nếu được gọi vấn đáp 5 đến 7 phút.
