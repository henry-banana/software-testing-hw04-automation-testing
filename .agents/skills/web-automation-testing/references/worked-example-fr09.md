# Ví dụ hoàn chỉnh FR-09 và dàn ý demo

FR-09 yêu cầu mã tồn tại và đang hoạt động, còn hạn, tổng đủ ngưỡng, khách đã đăng nhập và chưa dùng hết lượt. Tổng cuối bằng tổng trước giảm trừ khoản giảm. Oracle về tiền lấy từ SRS và dữ liệu JSON. [SRS EShop](https://github.com/ttbhanh/eshop-sut/blob/85af3ba875c88283615e22cb108f13e2fccaf0e9/README.md#fr-09-m%C3%A3-gi%E1%BA%A3m-gi%C3%A1-coupon)

## Từ spec đến assertion

1. Chọn ca FR09-05. Đặt mã fixed giảm 50.000 VND, ngưỡng tối thiểu 30.000.000 VND, còn hạn, user chưa dùng. Giỏ có đúng một sản phẩm giá 30.000.000 VND.
2. Arrange bằng API và fixture. Act bằng thao tác nhập và bấm Áp dụng mã trên Web Checkout. Kiểm tổng trước giảm và đồng bộ với POST áp mã. Expected từ SRS là bằng ngưỡng vẫn hợp lệ, giảm 50.000 VND, thành tiền 29.950.000 VND.
3. Bản nháp FR-09 lần đầu có 12 TypeError vì tách method khỏi response. Commit `c714e08` giữ receiver. Chạy lại 12 case trên Chromium được 8 pass và 4 fail nghiệp vụ.
4. Lượt sau dùng 13 case trên mỗi browser. FR09-05 fail nhất quán, HTTP 400 và UI báo chưa đủ ngưỡng. Mã nguồn baseline dùng so sánh `>`. Đối chứng ở hai phía biên là FR09-04 và FR09-06.
5. Ghi hồ sơ lỗi, ảnh Playwright, issue HW04 và hành vi hồi quy mong đợi.

[Thiết kế FR-09](../../../../docs/features/fr09.md), [dữ liệu](../../../../data/fr09.json), [spec](../../../../tests/fr09/apply-coupon.spec.ts), [hồ sơ HW04-B02](../../../../bugs/FR09-B02.md), [issue HW04 #293](https://github.com/tkob-team/eshop-sut/issues/293)

## Chạy lại và kiểm báo cáo chính thức

```powershell
$env:HW04_STUDENT_ID = '23120262'
$env:HW04_TEST_DB = (Resolve-Path '../eshop-sut/backend/database.sqlite').Path
npm.cmd test -- fr09
$helper = '.agents/skills/web-automation-testing/scripts/verify_matrix.py'
python $helper --mode official --student-id 23120262 --expect FR09=13 --batch reports/2026-11-17T06-10-22.403Z --scan-attachments
```

Lệnh thứ nhất sinh một batch mới. Dùng đường dẫn batch mới để kiểm lần vừa chạy. Lệnh thứ hai trỏ vào artifact đã dùng trong bài. Kết quả được ghi nhận ở batch đó là 9 pass và 4 fail trên mỗi browser, tổng 39 lượt, 27 pass và 12 fail. Bốn TC fail là FR09-02, FR09-03, FR09-05 và FR09-09. [Bảng thực thi](../../../../reports/README.md)

## Gợi ý quay demo Agent Skill

| Mốc gợi ý | Phần trình bày | Bằng chứng |
| --- | --- | --- |
| 0:00 đến 0:45 | Giới thiệu FR-09 và gọi `$web-automation-testing` | Tên skill, người trình bày hoặc terminal |
| 0:45 đến 2:00 | Mở SRS, nêu điều kiện và chọn cụm ba giá trị quanh ngưỡng | Hồ sơ và một dòng JSON |
| 2:00 đến 3:20 | Review một điểm cụ thể, trình bày quyết định sửa của sinh viên | Diff và lý do gắn với đúng assertion |
| 3:20 đến 4:40 | Chạy feature trên ba browser, mở một HTML rồi kiểm đủ ba report | Kết quả, MSSV, ISO timestamp và browser |
| 4:40 trở đi | Truy một assertion fail thật sang ảnh và issue | Test ID, hồ sơ lỗi, issue và phạm vi |

Mốc thời lượng là gợi ý. Nếu dùng cùng video cho yêu cầu chính, đối chiếu đầy đủ thời lượng, tiếng Việt và bằng chứng tác giả theo đề. Khi demo review, nêu rõ thay đổi do chính sinh viên thực hiện và kết quả chạy lại.
