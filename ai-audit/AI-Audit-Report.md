# AI Audit Report

## Khai báo AI

> I use AI tools for the following tasks,

OpenAI Codex hỗ trợ đọc đề, khảo sát browser CLI, dựng khung, viết dữ liệu và script, chạy lệnh kiểm thử, phân tích kết quả, xây Agent Skill và soạn tài liệu. Trong đợt chạy cuối, Codex vận hành lệnh Playwright trên máy cục bộ theo yêu cầu của sinh viên 23120262. Playwright Test tạo báo cáo và ảnh từ kết quả thực thi. Runner đặt nhãn **Run by: 23120262** và thời gian ISO. Sinh viên xác nhận đã đọc phần review và chọn các thay đổi khi yêu cầu chốt hồ sơ.

## Nhật ký tương tác

[prompt_log.md](prompt_log.md) lưu lời nhắc, thời điểm UTC, tên công cụ và phản hồi hiển thị của các lượt liên quan trong cuộc trao đổi HW04. Đường dẫn máy cục bộ được rút gọn. Các kết quả chạy, diff và issue được dẫn ở từng mục. [Nhật ký đóng góp](AI-LOG.md)

### HW04-A01. Dựng và rà lại khung

- Công cụ AI là OpenAI Codex.
- Mốc ghi nhận là commit ngày 17/11/2026 lúc 11:09:36 UTC+7.
- Yêu cầu của sinh viên là đọc đề, kế thừa HW02, tham khảo HW03 và các repo đã nêu, dựng repo HW04 và thêm issue template. Sinh viên xác nhận cần điền cả ba mẫu AI có sẵn.
- Đầu ra kỹ thuật nằm trong commit `55e2789`. Các tài liệu và file mẫu nằm trong [README](../README.md) và [checklist](../TASKS.md).

### HW04-A02. Chọn công cụ và viết Task 1

- Công cụ AI là OpenAI Codex.
- Mốc chạy nháp đầu là 17/11/2026 lúc 11:17:55 UTC+7.
- Yêu cầu của sinh viên là commit phần init, thực hiện Task 1 và trước hết nghiên cứu browser CLI, gồm Playwright, công cụ của Vercel và lựa chọn đa dụng. Sinh viên cho phép dùng Playwright headless trên EShop cục bộ.
- Đầu ra kỹ thuật gồm nghiên cứu CLI trong thư mục HW04, [FR-04](../docs/features/fr04.md), [FR-09](../docs/features/fr09.md), [FR-17](../docs/features/fr17.md), JSON và các spec trong các commit `911fc6a`, `35db767`, `a5ec585`.

### HW04-A03. Chạy thử và hiệu chỉnh

- Công cụ AI là OpenAI Codex.
- Mốc sửa callback là 17/11/2026 lúc 11:19:50 UTC+7.
- Đầu ra của lượt nháp đầu ghi 12 lỗi script ở FR-09. Playwright cần gọi `url()` và `request()` trên đối tượng response. Commit `c714e08` sửa cách đăng ký điều kiện chờ response. Lượt chạy lại Chromium ghi 8 pass và 4 fail nghiệp vụ với 12 case ban đầu.
- Các commit mở rộng và chỉnh dữ liệu gồm `5ac6efa`, `36e1015`, `244d006`, `5abf9f1`. Xem [Git log](../git-commit-log.txt) và các hồ sơ feature để truy thay đổi.


### HW04-A04. Review và hoàn thiện

- Công cụ AI là OpenAI Codex. Các lượt review và hoàn thiện bắt đầu ngày 17/11/2026 lúc 04:32:45, 04:42:48, 06:00:34 và 06:07:15 UTC.
- Sinh viên yêu cầu review chi tiết, bổ sung skill, hoàn thiện các hồ sơ lỗi, tạo issue mới cho HW04, đưa ảnh Playwright vào issue và dùng nhãn MSSV. Sinh viên xác nhận đã đọc tài liệu.
- Review phát hiện ba điểm có thể pass sai ở tổng Checkout, form Admin và hậu điều kiện của mã rỗng. Nhánh FR-04 cũng quá phụ thuộc dialog. Commit d16d2b4 sửa oracle, fixture và cấu hình xuất report. Đợt 06:10:22.403 UTC có 126 lượt kiểm, 84 pass và 42 fail nghiệp vụ.
- Công cụ thực thi là Playwright Test, chạy tách theo feature và browser. Playwright HTML reporter sinh 9 báo cáo. 14 ảnh được lấy từ attachment của đúng case Chromium. Ảnh issue được chụp từ trang GitHub đã đăng.
- Dữ liệu chạy dùng tài khoản, địa chỉ và coupon tổng hợp. Report công khai tắt trace. Playwright ghi giá trị nhập mật khẩu thử trong chi tiết bước FR17-13. Bản công khai đã che ba giá trị sau khi tài khoản thử được dọn. Runner che mật khẩu fixture trong tiêu đề bước của các lượt sau. Tài liệu đối chiếu xác nhận 0 fixture HW04 còn lại trong SQLite thử sau chạy.

## Phân loại đóng góp

| Artifact | Công cụ hoặc người thực hiện | Kiểm chứng |
| --- | --- | --- |
| Dữ liệu JSON, spec, fixture, runner và helper | OpenAI Codex hỗ trợ thiết kế và viết code | Git log, 9 lượt Playwright và ca kiểm helper |
| Phân tích yêu cầu, báo cáo, hồ sơ lỗi và skill | OpenAI Codex soạn theo chỉ đạo của sinh viên | SRS, code baseline, phản hồi UI, JSON và GitHub Issues |
| Phản hồi review, lựa chọn issue riêng HW04 và tên skill | Sinh viên 23120262 | Lời nhắc trong nhật ký và thay đổi thư mục |
| Trạng thái chạy, thời điểm, ảnh ứng dụng và HTML report | Playwright thực thi trên SUT cục bộ. Nhãn báo cáo dùng MSSV 23120262 | Batch 2026-11-17T06-10-22.403Z |
| Video và chữ ký | Sinh viên | Video tự thuyết minh và chữ ký cá nhân |

[Báo cáo chính](../23120262_Report.md), [ma trận](../reports/README.md), [Git log](../git-commit-log.txt), [issue và ảnh](../evidence/github-issues/README.md), [AI Critique](AI-Critique.md)

## Biểu mẫu

- AI-03. [Khai báo sử dụng AI](%5BAI-03%5D%20-%20FIT%40HCMUS%20-%20AI%20Disclosure%20Form_Vn.md)
- AI-04. [Bài suy ngẫm](%5BAI-04%5D%20-%20FIT%40HCMUS%20-%20AI%20Reflective%20Statement_Vn.md)
- AI-05. [Bảng kiểm quyền riêng tư](%5BAI-05%5D%20-%20FIT%40HCMUS%20-%20AI%20Privacy%20Checklist_Vn.md)
