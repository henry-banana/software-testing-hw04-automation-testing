# Báo cáo lỗi HW04

Repo nhận issue là [tkob-team/eshop-sut](https://github.com/tkob-team/eshop-sut/issues).

## Kết quả chạy nháp do Codex thực hiện

Baseline SUT là `85af3ba875c88283615e22cb108f13e2fccaf0e9`. Bảng có tám hồ sơ mô tả 14 case fail được quan sát trên cả ba browser. Mỗi hồ sơ ghi dữ liệu, bước tái hiện, expected theo SRS, actual, mốc ISO của case Chromium, phân tích source, ảnh và hướng hồi quy. Hai nhóm FR-04 cùng đi qua một guard nhưng ghi hai hướng sai lệch. Số hồ sơ và số lượt fail không dùng thay số nguyên nhân duy nhất. [Ma trận](../reports/README.md)

| Nhóm | Case | Kết quả mong đợi và thực tế | Issue đối chiếu | Ảnh Chromium |
| --- | --- | --- | --- | --- |
| [HW04-A01](FR04-A01.md) | FR04-03, FR04-04, FR04-12 | FR-04 cho phép điện thoại đầu 0 có 10 hoặc 11 chữ số. Form từ chối cả hai độ dài. Khi sửa cùng tên và địa chỉ, cả ba giá trị vẫn cũ sau tải lại. | [#111](https://github.com/tkob-team/eshop-sut/issues/111), [#112](https://github.com/tkob-team/eshop-sut/issues/112), [#267](https://github.com/tkob-team/eshop-sut/issues/267) | [10 số](../evidence/draft-bugs/FR04-03.png), [11 số](../evidence/draft-bugs/FR04-04.png), [Hồ sơ](../evidence/draft-bugs/FR04-12.png) |
| [HW04-A02](FR04-A02.md) | FR04-08, FR04-14 | Điện thoại đầu 1 phải bị từ chối. Sau tải lại vẫn thấy `1912345678` và `191234567` trong hai case tương ứng. | [#113](https://github.com/tkob-team/eshop-sut/issues/113), [#266](https://github.com/tkob-team/eshop-sut/issues/266) | [10 số](../evidence/draft-bugs/FR04-08.png), [9 số](../evidence/draft-bugs/FR04-14.png) |
| [HW04-B01](FR09-B01.md) | FR09-02, FR09-03 | Với đơn 30.000.000 VND, mã 10% phải còn 27.000.000 VND và mã 100% phải còn 0 VND. UI hiển thị 300.000.000 VND và 3.000.000.000 VND tương ứng. | [#126](https://github.com/tkob-team/eshop-sut/issues/126), [#134](https://github.com/tkob-team/eshop-sut/issues/134) | [10 phần trăm](../evidence/draft-bugs/FR09-02.png), [100 phần trăm](../evidence/draft-bugs/FR09-03.png) |
| [HW04-B02](FR09-B02.md) | FR09-05 | Tổng 30.000.000 VND bằng ngưỡng tối thiểu của mã fixed nên phải được áp. Request trả HTTP 400 và UI báo chưa đủ giá trị tối thiểu. | [#124](https://github.com/tkob-team/eshop-sut/issues/124) | [Tổng bằng ngưỡng](../evidence/draft-bugs/FR09-05.png) |
| [HW04-B03](FR09-B03.md) | FR09-09 | Khách mở trực tiếp tuyến Checkout phải bị từ chối áp mã. Sau khi áp mã fixed, UI báo thành công và tổng giảm còn 29.950.000 VND. | [#128](https://github.com/tkob-team/eshop-sut/issues/128) | [Phiên khách](../evidence/draft-bugs/FR09-09.png) |
| [HW04-C01](FR17-C01.md) | FR17-07, FR17-08 | Giá trị giảm phải dương. Web Admin vẫn tạo bản ghi có giá trị giảm bằng 0 và âm 1. | [#144](https://github.com/tkob-team/eshop-sut/issues/144), [#145](https://github.com/tkob-team/eshop-sut/issues/145), [#215](https://github.com/tkob-team/eshop-sut/issues/215) | [Giảm 0](../evidence/draft-bugs/FR17-07.png), [Giảm âm](../evidence/draft-bugs/FR17-08.png) |
| [HW04-C02](FR17-C02.md) | FR17-09, FR17-14 | Ngưỡng đơn bắt buộc và phải từ 0 trở lên. Web Admin vẫn lưu ngưỡng âm 1 hoặc chuỗi rỗng. | [#146](https://github.com/tkob-team/eshop-sut/issues/146), [#139](https://github.com/tkob-team/eshop-sut/issues/139), [#215](https://github.com/tkob-team/eshop-sut/issues/215) | [Ngưỡng âm](../evidence/draft-bugs/FR17-09.png), [Ngưỡng rỗng](../evidence/draft-bugs/FR17-14.png) |
| [HW04-C03](FR17-C03.md) | FR17-15 | Giới hạn lượt dùng là trường bắt buộc. Khi để trống, Web Admin vẫn tạo mã và lưu 1 lượt. | [#141](https://github.com/tkob-team/eshop-sut/issues/141) | [Lượt dùng rỗng](../evidence/draft-bugs/FR17-15.png) |

Các issue trên đang mở khi đối chiếu ngày 17/11/2026. Trường hợp gửi chuỗi rỗng từ UI được ghi là biến thể Web của lỗi trường bắt buộc đã có issue. Sau khi sinh viên tự chạy, dùng [mẫu issue](issue-template.md) để bổ sung bằng chứng hoặc báo lỗi mới đã xác nhận.
