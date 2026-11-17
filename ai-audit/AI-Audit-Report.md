# AI Audit Report

## Khai báo AI

> I use AI tools for the following tasks,

OpenAI Codex hỗ trợ đọc đề, khảo sát browser CLI, dựng khung, viết dữ liệu và script, chạy lệnh kiểm thử, phân tích kết quả, xây Agent Skill và soạn tài liệu. Trong đợt chạy cuối, Codex vận hành lệnh Playwright trên máy cục bộ theo yêu cầu của sinh viên 23120262. Playwright Test tạo báo cáo và ảnh từ kết quả thực thi. Runner đặt nhãn **Run by: 23120262** và thời gian ISO. Sinh viên xác nhận đã đọc phần review và chọn các thay đổi khi yêu cầu chốt hồ sơ.

## Nhật ký tương tác

OpenAI Codex là công cụ AI trong cả sáu lượt. Mốc UTC dưới đây là thời điểm bắt đầu từng lượt. [Nhật ký lời nhắc và đầu ra](AI-LOG.md)

### Lượt 01. Rà cấu trúc repo và bổ sung tài liệu

`2026-11-17T04:00:12.000Z`

- Sinh viên đã dời và xóa một số file, rồi yêu cầu rà lại cấu trúc, bổ sung mẫu issue và tham khảo tài liệu của teammate.
- Codex bổ sung mẫu issue, hướng dẫn kỹ thuật automation cho FR-04, FR-09 và FR-17, cùng quy trình chuẩn bị fixture và chạy lại sau review. [Mẫu issue](../bugs/issue-template.md), [kỹ thuật automation](../docs/automation-techniques.md), [quy trình chạy test](../docs/test-workflow.md)

### Lượt 02. Chọn công cụ, viết và chạy thử Task 1

`2026-11-17T04:08:46.000Z`

- Sinh viên yêu cầu commit phần init, nghiên cứu các browser CLI và thực hiện Task 1. Sinh viên cho phép dùng Playwright headless trên EShop cục bộ.
- Codex commit phần init ở `55e2789`, chọn `playwright-cli` để khảo sát UI và Playwright Test để chạy spec. Ba feature dùng dữ liệu JSON và có spec trong các commit `911fc6a`, `35db767` và `a5ec585`. [FR-04](../docs/features/fr04.md), [FR-09](../docs/features/fr09.md), [FR-17](../docs/features/fr17.md)
- Lượt nháp đầu lúc 11:17:55 UTC+7 có 12 case FR-09 dừng trước assertion do callback mất đối tượng nhận lời gọi. Commit `c714e08` lúc 11:19:50 UTC+7 sửa cách gọi `url()` và `request()` trên response. Lượt chạy lại Chromium với 12 case ban đầu có 8 pass và 4 fail nghiệp vụ.
- Sau các commit mở rộng `5ac6efa`, `36e1015`, `244d006` và `5abf9f1`, bộ test nháp có 42 case. Chín báo cáo nháp ghi 126 lượt thực thi, gồm 84 pass và 42 fail. [Git log](../git-commit-log.txt)

### Lượt 03. Review Task 1

`2026-11-17T04:32:45.000Z`

- Sinh viên yêu cầu review chi tiết spec, báo cáo, ảnh, Git log và biểu mẫu AI.
- Codex tái hiện ba điểm yếu trong test. FR09-01 bỏ sót tổng thanh toán cuối trang. FR17-07 có thể pass khi trường khác chặn gửi form. FR04-05 có thể timeout khi lỗi hiển thị ngay trên form thay cho hộp thoại. [AI Critique](AI-Critique.md)
- Review kiểm lại 9 cặp HTML và JSON, đối chiếu 14 ảnh, đồng thời phát hiện dữ liệu xác thực trong trace nháp và 34 bản ghi lượt dùng coupon mồ côi trong SQLite thử.

### Lượt 04. Bổ sung Agent Skill và hồ sơ lỗi

`2026-11-17T04:42:48.000Z`

- Sinh viên yêu cầu tham khảo skills.sh để hoàn thiện Agent Skill và viết hồ sơ lỗi chi tiết theo feature.
- Codex bổ sung hướng dẫn, mẫu điền, kịch bản đánh giá, script kiểm ma trận và tám hồ sơ lỗi bao quát 14 biến thể. Bộ xác minh có 7 test pass tại thời điểm đó. [Agent Skill](../.agents/skills/web-automation-testing/SKILL.md), [danh mục hồ sơ lỗi](../bugs/bug-reports.md)

### Lượt 05. Commit tài liệu và đối chiếu issue

`2026-11-17T06:00:34.000Z`

- Sinh viên yêu cầu commit phần vừa làm và kiểm tra tình trạng GitHub Issues cùng các việc còn lại ngoài quay demo.
- Codex tạo commit cục bộ `baae7de` gồm Agent Skill, tám hồ sơ lỗi và 14 ảnh nháp. Tại thời điểm kiểm tra, 15 issue cũ dùng để đối chiếu vẫn mở. Việc đăng issue riêng cho HW04 diễn ra ở lượt 06. [Git log](../git-commit-log.txt)

### Lượt 06. Chốt đợt chạy và đăng issue HW04

`2026-11-17T06:07:15.000Z`

- Sinh viên xác nhận đã đọc phần review, yêu cầu chốt hồ sơ với issue mới, ảnh từ Playwright và nhãn MSSV `23120262`. Sinh viên dành phần xuất PDF cho sau khi đọc bản cuối.
- Codex sửa assertion, fixture và cấu hình báo cáo trong commit `d16d2b4`, rồi vận hành Playwright Test trên máy cục bộ. Đợt chạy `2026-11-17T06:10:22.403Z` có 126 lượt thực thi trên Chromium, Firefox và WebKit, gồm 84 pass và 42 fail nghiệp vụ. Commit `46b7336` công khai 9 báo cáo HTML và 14 ảnh đính kèm từ các case Chromium. [Ma trận báo cáo](../reports/README.md)
- Tám issue HW04 mới mang số #290 đến #297. Codex dùng Playwright mở lại cả tám trang và kiểm tra 14 ảnh hiển thị. [Bằng chứng issue](../evidence/github-issues/README.md)
- Dữ liệu chạy dùng tài khoản, địa chỉ và coupon tổng hợp. Báo cáo công khai tắt trace. Commit `d1bf04e` che mật khẩu fixture trong chi tiết bước FR17-13 của ba báo cáo. Codex chạy lại case này trên ba trình duyệt để kiểm tra reporter tự che giá trị. Số liệu, thời gian và ảnh của đợt chạy được giữ nguyên. SQLite thử còn 0 bản ghi fixture HW04 sau khi dọn. [Ma trận báo cáo](../reports/README.md)

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
