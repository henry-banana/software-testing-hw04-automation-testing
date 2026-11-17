# Nhật ký lời nhắc và đầu ra HW04

Nhật ký lưu lời nhắc, phản hồi hiển thị và kết quả kỹ thuật của các lượt liên quan trong chat HW04. Thời gian là mốc bắt đầu lượt theo UTC. Tiền tố đường dẫn cục bộ đã được rút gọn.

## Lượt 01 | 2026-11-17T04:00:12.000Z

**Công cụ** OpenAI Codex

### Lời nhắc 1

~~~~text
Để t check và xóa những cái không cần, và xem cần gì nữa không?
t dời và xóa một số cái rồi đấy, còn thiếu cái issues template nhỉ, chỗ docs có mỗi feature hơi trống nhỉ, check thử có cần cái gì không? Ngoài ra nên focus vào repo teammate của tui, có những cái khá hay có thể lấy về, ví dụ cái này [https://github.com/nphoang-itus/hw04-automation-testing/blob/main/docs/techniques-from-slides.md](https://github.com/nphoang-itus/hw04-automation-testing/blob/main/docs/techniques-from-slides.md)
~~~~

### Đầu ra 1

~~~~text
Đã rà lại repo sau khi bạn dời file. Mình bổ sung **mẫu issue và hai tài liệu dùng chung**, rồi nối chúng vào `README.md` và `TASKS.md`.

- [Mẫu GitHub Issue HW04](<<course-workspace>/hw04/software-testing-hw04-automation-testing/bugs/issue-template.md>) có mã test, SHA của SUT và script, bước tái hiện, expected, actual và ảnh. Nhánh mặc định của `tkob-team/eshop-sut` hiện chưa có mẫu riêng. File này dùng để điền và dán khi mở issue ở repo nhóm. Kiểu tiêu đề theo [issue HW04 của nphoang](https://github.com/tkob-team/eshop-sut/issues/275).
- [Kỹ thuật automation](<<course-workspace>/hw04/software-testing-hw04-automation-testing/docs/automation-techniques.md>) áp dụng Arrange, Act, Assert, JSON test data và web-first assertions cho đúng FR-04, FR-09, FR-17. Mình dùng ghi chú của nphoang làm nguồn tham khảo và đối chiếu kỹ thuật với tài liệu Playwright. [Ghi chú của nphoang](https://github.com/nphoang-itus/hw04-automation-testing/blob/main/docs/techniques-from-slides.md), [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Chuẩn bị fixture và chạy test](<<course-workspace>/hw04/software-testing-hw04-automation-testing/docs/test-workflow.md>) ghi dữ liệu cần chuẩn bị cho từng feature, cách dọn trạng thái và thứ tự chạy. Mình cũng thêm chỗ ghi **lượt chạy nháp và lượt chạy sau review** vào cả ba hồ sơ feature. Điểm đáng lấy từ nphoang là review cả **test pass với assertion yếu**. Ví dụ FR-09 thấy báo áp mã thành công vẫn cần kiểm số tiền giảm và thành tiền. [Lượt chạy nháp của nphoang](https://github.com/nphoang-itus/hw04-automation-testing/blob/main/docs/fr02-p7-first-run.md), [Bản sửa sau review](https://github.com/nphoang-itus/hw04-automation-testing/blob/main/docs/fr02-p6-iteration.md)

**Chỗ có thể dọn ngay:** `docs/techniques-from-slides.md` bạn vừa thêm trùng nội dung với file của nphoang và còn dùng phạm vi FR-02, FR-08, FR-16. Mình đề xuất chuyển bản đó ra ngoài repo nộp để đọc, giữ link nguồn trong tài liệu đã áp dụng cho bài của bạn. Trong `ai-audit/`, `AI-04` trùng vai trò với `AI-Critique.md`; `AI-03` cũng có thể gộp vào phần khai báo trong `AI-Audit-Report.md` nếu Moodle không yêu cầu biểu mẫu riêng.

Vậy là `docs/` đủ để bắt đầu viết test. Mình đã kiểm tra các liên kết nội bộ của phần vừa sửa và để các file bạn đang cân nhắc xóa ở nguyên chỗ.
~~~~

## Lượt 02 | 2026-11-17T04:08:46.000Z

**Công cụ** OpenAI Codex

### Lời nhắc 1

~~~~text
3 phần [ai-xx] đều là yêu cầu điền vào (không đổi nội dung đã có, chỉ điền vào thôi), thêm 2 file riêng kia cũng được nếu m thấy cần. Commit trước cái init này đi [@mattpocock-skills](plugin://mattpocock-skills@mattpocock) hãy làm tasks 1 đi, nhưng trước tiên t cần biết loại browser use nào chạy cli ngon, playwright hay của vercel hay có loại nào ok mà đa dụng nữa? Research thử, đừng bỏ sót
~~~~

### Lời nhắc 2

~~~~text
Cho phép Playwright headless trên EShop localhost
~~~~

### Đầu ra 1

~~~~text
Đã commit init `55e2789` trên `main` cục bộ. Cho HW04, mình chọn **Microsoft `playwright-cli` để khảo sát UI** và **Playwright Test để chạy spec, sinh 9 HTML report**. Máy bạn đã có cả `playwright-cli` 0.1.23 và Vercel `agent-browser` 0.41.2. Vercel hợp cho thao tác Chrome nhanh, batch và CDP. Nếu mục tiêu rộng sang mobile, Electron và desktop, `wdio session` đáng xem nhất. Mình sẽ ghi bảng so sánh đầy đủ và bắt đầu phần thiết kế Task 1 từ SRS và HW02.
~~~~

### Đầu ra 2

~~~~text
Bạn có cho phép mình mở trình duyệt headless bằng Playwright trên EShop localhost để kiểm tra UI và chạy thử Task 1 không? Mình sẽ dùng phiên thử riêng.
- Cho phép Playwright headless trên EShop localhost
- Chỉ thiết kế và viết test, để tôi chạy trình duyệt
~~~~

### Đầu ra 3

~~~~text
**Cho HW04, chốt `playwright-cli` để khảo sát UI và `@playwright/test` để chạy bộ test nộp bài.** Mình đã chạy thử `playwright-cli` headless trên EShop localhost và xác nhận đọc được tên sản phẩm, nút thêm vào giỏ và liên kết giỏ hàng. Máy bạn có sẵn `playwright-cli` 0.1.23 và Vercel `agent-browser` 0.41.2. [Playwright CLI](https://playwright.dev/docs/getting-started-cli)

| Công cụ | Khi mình sẽ chọn |
| --- | --- |
| **Microsoft `playwright-cli`** | Khảo sát UI, tìm locator, xem network và trace. Dùng được với Chrome, Edge, Firefox và WebKit. [Tài liệu](https://playwright.dev/docs/getting-started-cli) |
| **Vercel `agent-browser`** | Công việc thiên về Chrome cần snapshot gọn, chạy lệnh theo batch, xuất JSON hoặc kết nối qua CDP. [Tài liệu](https://agent-browser.dev/commands) |
| **WebdriverIO `wdio session`** | Lựa chọn đa dụng nhất trong nhóm đã khảo sát nếu cần cả web, Electron, native mobile qua Appium và desktop. Có thể xuất phiên thao tác thành spec WebdriverIO. [Tài liệu](https://webdriver.io/docs/session) |
| **Chrome DevTools CLI** | Điều tra console, request hoặc hiệu năng trên Chrome từ terminal. [Tài liệu](https://developer.chrome.com/docs/devtools/agents/cli) |
| **Playwright Test** | Chạy `.spec.ts` trên Chromium, Firefox và WebKit, kiểm assertions và sinh HTML report. Đây là runner đang dùng cho Task 1. [Tài liệu](https://playwright.dev/docs/browsers) |

[Bản nghiên cứu đầy đủ](<<course-workspace>/hw04/browser-cli-research.md>) có thêm Browser Use, Browserbase Browse, Stagehand, Playwriter, PinchTab, Playwright MCP và các runner thay thế. So sánh dựa trên tài liệu, phiên bản cài thực tế và lần chạy thử Playwright CLI. Chưa có benchmark tốc độ giữa các CLI.

### Task 1 đã triển khai và chạy nháp

Commit init là **`55e2789`** trên `main` cục bộ. Sau init có **9 commit thay đổi test script**, đã xuất [Git log](<<course-workspace>/hw04/software-testing-hw04-automation-testing/git-commit-log.txt>).

| Feature | Case | Pass / fail trên mỗi trình duyệt |
| --- | ---: | ---: |
| FR-04 Hồ sơ cá nhân | 14 | 9 / 5 |
| FR-09 Áp dụng mã giảm giá | 13 | 9 / 4 |
| FR-17 Quản lý mã giảm giá | 15 | 10 / 5 |
| **Tổng** | **42** | **28 / 14** |

Đã xác minh **9 HTML report nháp, 126 lượt kiểm, 84 pass và 42 fail**. Cả ba trình duyệt cho cùng danh sách case fail. Lượt đầu bắt được lỗi callback do AI viết khiến FR-09 dừng trước assertion. Commit `c714e08` sửa lỗi đó để chạy đến phần kiểm nghiệp vụ. [Ma trận nháp](<<course-workspace>/hw04/software-testing-hw04-automation-testing/reports/README.md>)

[Báo cáo lỗi](<<course-workspace>/hw04/software-testing-hw04-automation-testing/bugs/bug-reports.md>) có 8 nhóm sai lệch, 14 ảnh và link issue đang mở để đối chiếu. Ba biểu mẫu AI-03, AI-04, AI-05 đã được điền các phần có căn cứ và giữ nguyên nội dung mẫu. [Thư mục AI audit](<<course-workspace>/hw04/software-testing-hw04-automation-testing/ai-audit>)

**Phần còn lại của Task 1:** bạn trực tiếp review và ghi sửa đổi của mình, tự chạy 9 báo cáo chính thức dưới MSSV `23120262`, bổ sung bản ghi tương tác AI nguyên văn và xác nhận các biểu mẫu. Báo cáo hiện tại ghi `Draft run by: Codex`. Commit đang ở máy cục bộ, và phần GitHub Issues mới dừng ở đối chiếu issue có sẵn.
~~~~

## Lượt 03 | 2026-11-17T04:32:45.000Z

**Công cụ** OpenAI Codex

### Lời nhắc 1

~~~~text
[@Superpowers](plugin://superpowers@openai-curated-remote) Review kĩ lại không bỏ sót, viết thật chi tiết
~~~~

### Đầu ra 1

~~~~text
Mình đã review từ đề bài đến từng spec, báo cáo, ảnh, Git log và biểu mẫu AI. Bản chi tiết có đối chiếu từng yêu cầu, chỉ ra vị trí trong code và mô tả cách kiểm lại sau khi sửa. [Review HW04 Task 1](<<course-workspace>/hw04/HW04_Task1_Review.md>)

**Kết luận:** Bộ test đủ số lượng và có bằng chứng chạy nháp thật. Mình xác nhận **42 case, 126 lượt kiểm, 84 pass và 42 fail** từ 9 cặp HTML/JSON. Cả 14 ảnh trong báo cáo lỗi khớp với ảnh đính kèm của lượt chạy. Có **9 commit sửa spec** trên máy. Hồ sơ chưa đủ để nộp Task 1.

### Ba điểm yếu đã tái hiện

Mình chạy lại bốn case Chromium trên bản SUT sạch, rồi thử làm lệch từng hành vi trên bản sao tạm để xem test có phát hiện được không.

| Case | Kết quả khi thử làm lệch hành vi | Cần sửa |
| --- | --- | --- |
| **FR09-01** | Test vẫn **pass** khi dòng **Tổng thanh toán** hiện 30.000.000 VND, dù sau giảm chỉ còn 29.950.000 VND. | Kiểm cả tổng thanh toán cuối trang ở nhánh áp mã thành công. [Spec FR-09](<<course-workspace>/hw04/software-testing-hw04-automation-testing/tests/fr09/apply-coupon.spec.ts:61>) |
| **FR17-07** | Test đang fail trên baseline chuyển sang **pass** khi một trường bắt buộc khác chặn submit. Test không xác minh chính giá trị giảm `0` bị từ chối. Case mã rỗng còn truy vấn theo mã ngẫu nhiên. | Kiểm lỗi ở đúng trường và đọc lại đúng bản ghi hoặc tập bản ghi bị tác động. [Spec FR-17](<<course-workspace>/hw04/software-testing-hw04-automation-testing/tests/fr17/manage-coupons.spec.ts:100>) |
| **FR04-05** | Test **fail do timeout** khi form vẫn từ chối số sai nhưng chuyển thông báo từ popup sang inline. | Chờ phản hồi nghiệp vụ và kiểm giá trị sau tải lại. Bỏ phụ thuộc bắt buộc vào native dialog. [Spec FR-04](<<course-workspace>/hw04/software-testing-hw04-automation-testing/tests/fr04/profile.spec.ts:60>) |

### Hai việc cần xử lý trước khi công khai report

- **Thông tin xác thực nằm trong artifact.** Cả **42 trace** đã kiểm có header Bearer, và **24 trace** có mật khẩu tài khoản thử. Nên giữ trace đầy đủ ở local và sinh lại HTML công khai với ảnh lỗi cùng attachment đã kiểm nội dung. Ngoài ra, nén riêng 9 thư mục HTML nháp đã mất **19,98 MiB**, chưa gồm PDF hay tài liệu, sát giới hạn 20 MB mỗi file của môn. [Cấu hình Playwright](<<course-workspace>/hw04/software-testing-hw04-automation-testing/playwright.config.ts:22>), [chính sách môn](<<course-workspace>/___2026.Homework.Policies.md>)
- **Cleanup còn sót dữ liệu.** DB nháp có **34 bản ghi lượt dùng coupon mồ côi** dù user và coupon thử đã được xóa. Cần hoàn nguyên DB thử hoặc dọn đúng các lượt dùng của fixture, rồi kiểm số bản ghi trước và sau hai lượt liên tiếp. [Fixture cleanup](<<course-workspace>/hw04/software-testing-hw04-automation-testing/tests/support/eshop.ts:116>)

Về hồ sơ, nhánh GitHub công khai hiện mới có README ban đầu. Các phần còn thiếu gồm **review và bản sửa của sinh viên, log AI nguyên văn theo từng tương tác, 9 report tự chạy có MSSV và timestamp ISO, cùng ảnh HW04 trên các issue liên quan**. Cả ba mẫu AI-03, AI-04 và AI-05 còn chữ ký trống. Riêng AI-05 còn **15 mục chưa đánh dấu**, cần xác nhận từng mục trước khi ký. Bản review cũng ghi rõ phần đang thiếu của PDF, video, bảng tự chấm và gói nộp. [Repo công khai](https://github.com/henry-banana/software-testing-hw04-automation-testing)
~~~~

## Lượt 04 | 2026-11-17T04:42:48.000Z

**Công cụ** OpenAI Codex

### Lời nhắc 1

~~~~text
[@mattpocock-skills](plugin://mattpocock-skills@mattpocock) Làm bộ agent skills chuẩn và đầy đủ đi, tham khảo từ skills.sh á, Và những file đầy đủ chuẩn như bugs/fr... thì có không vậy, sao thấy ít phân tích chi tiết quá.
~~~~

### Đầu ra 1

~~~~text
Đã hoàn thiện **bộ Agent Skill `$eshop-web-automation`** và bổ sung **8 hồ sơ lỗi riêng theo FR**. Bạn có thể mở thẳng từng hồ sơ từ bảng tổng hợp. [Agent Skill](<<course-workspace>/hw04/software-testing-hw04-automation-testing/.agents/skills/eshop-web-automation/SKILL.md>), [Danh mục hồ sơ lỗi](<<course-workspace>/hw04/software-testing-hw04-automation-testing/bugs/bug-reports.md>)

### Bộ Agent Skill

Skill có `SKILL.md`, metadata cho Codex, 5 tài liệu hướng dẫn, 2 mẫu điền, 4 kịch bản đánh giá và script kiểm ma trận. Quy trình đi từ **SRS và dữ liệu test** đến **fixture, Playwright, review assertion, báo cáo đa trình duyệt và bằng chứng lỗi**. Mình tham khảo cách tổ chức theo từng hoạt động và cách dùng CLI từ Agent Skills, Microsoft Playwright, Currents và TestDino. [Chuẩn Agent Skills](https://agentskills.io/specification), [Microsoft Playwright CLI](https://www.skills.sh/microsoft/playwright-cli/playwright-cli), [Currents](https://www.skills.sh/currents-dev/playwright-best-practices-skill/playwright-best-practices), [TestDino QA](https://www.skills.sh/testdino-hq/playwright-skill/playwright-qa)

Skill có **ví dụ hoàn chỉnh FR-09**. Ví dụ truy từ điều kiện bằng ngưỡng trong SRS qua fixture, JSON, thao tác Checkout, assertion và issue đã có. Có cả dàn ý quay demo theo từng mốc. [Ví dụ và dàn ý FR-09](<<course-workspace>/hw04/software-testing-hw04-automation-testing/.agents/skills/eshop-web-automation/references/worked-example-fr09.md>)

### Hồ sơ lỗi chi tiết

| Feature | Hồ sơ mới | Nội dung |
| --- | ---: | --- |
| FR-04 | 2 | Từ chối số hợp lệ đầu 0 và lưu số sai đầu 1 |
| FR-09 | 3 | Sai công thức phần trăm, từ chối tại đúng ngưỡng và áp mã trong phiên khách |
| FR-17 | 3 | Lưu giá trị giảm không dương, chấp nhận ngưỡng âm hoặc rỗng và tự lưu một lượt khi trường bỏ trống |

Mỗi file có **SHA của SUT và spec, fixture, bước tái hiện, expected theo SRS, actual, mốc UTC, ảnh, nguyên nhân trong source và ca hồi quy**. Tám hồ sơ giữ đủ **14 biến thể đã quan sát**. Ví dụ, `FR17-14` xác nhận ô ngưỡng để trống từ Web được lưu thành chuỗi rỗng. Issue #139 mô tả request bỏ hẳn thuộc tính. Hồ sơ ghi rõ khác biệt để có thể tái hiện đúng biến thể HW04. [Hồ sơ FR17-C02](<<course-workspace>/hw04/software-testing-hw04-automation-testing/bugs/FR17-C02.md>)

**Đã kiểm chứng:** Skill qua validator của Codex, 7 test của script xác minh đều pass, và script đọc lại đúng **9 báo cáo nháp, 126 lượt kiểm, 84 pass, 42 fail**. Mình cũng đối chiếu đủ 14 ảnh và timestamp với artifact gốc. **Phần Agent Skill còn video demo do bạn thực hiện.** Các hồ sơ lỗi hiện dùng bằng chứng chạy nháp và link issue đối chiếu.
~~~~

## Lượt 05 | 2026-11-17T06:00:34.000Z

**Công cụ** OpenAI Codex

### Lời nhắc 1

~~~~text
[@mattpocock-skills](plugin://mattpocock-skills@mattpocock) Commit những đoạn lần này đi. Còn những tasks gì để hoàn thành bài tập này trừ quay demo. Và đã đặt issues chưa?
~~~~

### Đầu ra 1

~~~~text
Đã commit **`baae7de`** trên `main` cục bộ. Commit gồm bộ Agent Skill, 8 hồ sơ lỗi chi tiết, 14 ảnh chạy nháp và các tài liệu liên kết. Mình chạy lại 7 test của bộ xác minh trước khi commit, tất cả đều pass. Phần AI Audit, ba biểu mẫu AI và Git log vẫn là thay đổi cục bộ từ lượt trước. Repo chưa push.

**Về Issues, chưa đăng issue mới cho HW04 và chưa bổ sung ảnh HW04 vào issue cũ.** Mình vừa kiểm trực tiếp `tkob-team/eshop-sut`. Cả **15 issue đối chiếu** vẫn mở, gồm **12 issue bạn đã tạo từ HW02** và **3 issue liên quan từ HW03**. Tám hồ sơ hiện đã chỉ rõ từng case nên đối chiếu issue nào. [GitHub Issues](https://github.com/tkob-team/eshop-sut/issues), [Danh mục hồ sơ lỗi HW04](<<course-workspace>/hw04/software-testing-hw04-automation-testing/bugs/bug-reports.md>)

### Việc còn lại ngoài quay demo

1. **Chốt script sau review.** Sửa ba điểm đã tái hiện ở FR-04, FR-09 và FR-17. Xử lý cleanup lượt dùng coupon và cấu hình report công khai để tránh đính kèm trace có thông tin xác thực. Ghi rõ phần bạn trực tiếp review, sửa và kết quả chạy lại. [Bản review chi tiết](<<course-workspace>/hw04/HW04_Task1_Review.md>)
2. **Tự chạy bộ chính thức trên ba trình duyệt.** Kiểm đủ 9 HTML report có `Run by: 23120262` và timestamp ISO, đúng baseline, đủ case và mở được ảnh đính kèm. Nếu giữ 42 case hiện tại thì có **126 lượt kiểm**. Tính lại pass, fail và số lỗi từ lượt chính thức. [Ma trận báo cáo](<<course-workspace>/hw04/software-testing-hw04-automation-testing/reports/README.md>)
3. **Cập nhật GitHub Issues.** Gắn ảnh và kết quả HW04 vào các issue cùng hành vi. Với biến thể liên quan, ghi rõ khác biệt khi cập nhật. Chỉ mở issue mới nếu sau đối chiếu còn lỗi riêng. Mở lại trang issue để kiểm ảnh hiển thị và lưu bằng chứng. [Bảng bằng chứng issue](<<course-workspace>/hw04/software-testing-hw04-automation-testing/evidence/github-issues/README.md>)
4. **Hoàn thiện báo cáo và AI Audit.** Bổ sung prompt và đầu ra nguyên văn kèm thời gian từng tương tác, chốt AI Critique, điền và ký AI-03, AI-04, AI-05 theo mẫu gốc. Điền kết quả chính thức và bảng tự chấm trong README. Xuất PDF cho báo cáo chính, AI Audit và AI Critique.
5. **Chốt repo và nộp.** Kiểm lại hạn Moodle, phân công và review chéo với nhóm. Push bản cuối cùng cùng HTML đã kiểm, xuất lại Git log và kiểm link từ repo public. Đóng ZIP theo tên `23120262_HW04_AI_Automation_<điểm ba chữ số>.zip`, kiểm dung lượng theo Moodle, mở thử gói rồi nộp. [Checklist hiện tại](<<course-workspace>/hw04/software-testing-hw04-automation-testing/TASKS.md>)
~~~~

## Lượt 06 | 2026-11-17T06:07:15.000Z

**Công cụ** OpenAI Codex

### Lời nhắc 1

~~~~text
[@mattpocock-skills](plugin://mattpocock-skills@mattpocock) hoàn thành hết đi trừ việc xuất pdf, cái này chờ t review lại cuối cùng. những issues cũ là của bài tập trước yêu cầu, nên mới có mã định dạng hw-xx fr-xx đó, cứ tạo issues mới đi, envidence thì cứ dùng playwright đưa vào, và t đang thấy cái evidence lại là draft bugs? Hãy hoàn thiện chuẩn đi, mọi thứ đều run by 23120262, và xóa những đoạn kiểu như cần/chờ review, vì t đọc hết r nên mới muốn m hoàn thiện chuẩn lại.
~~~~

### Đầu ra 1

~~~~text
Playwright chạy trực tiếp 42 case trên Chromium, Firefox và WebKit, tổng 126 lượt, 84 pass và 42 fail. Chín báo cáo HTML mang nhãn Run by: 23120262. Commit d16d2b4 chứa bản sửa oracle và fixture. Commit 46b7336 công khai ma trận và 14 ảnh case. Tám issue HW04 mới là #290 đến #297 trên tkob-team/eshop-sut. Playwright mở lại 8 trang issue và kiểm đủ 14 ảnh hiển thị. Báo cáo chính, AI Audit, AI Critique, biểu mẫu và Agent Skill được đồng bộ. Phần xuất PDF được dành cho bước sau khi sinh viên đọc bản cuối.
~~~~

### Đầu ra 2

~~~~text
Ba báo cáo FR-17 đã được che mật khẩu fixture ở chi tiết bước FR17-13 trong commit d1bf04e. Chạy lại FR17-13 trên ba browser và xác minh reporter tự che giá trị. Tất cả báo cáo gốc giữ số liệu, thời gian và ảnh của đợt chạy.
~~~~
