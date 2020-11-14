var Hanlde = function () {
    this.TongLuong = function (chucVu, luongCb) {
        var tongLuong = '';
        var type = parseInt(chucVu);

        switch (type) {
            case 1:
                tongLuong = luongCb * 3;
                break;
            case 2:
                tongLuong = luongCb * 2;
                break;
            case 3:
                tongLuong = luongCb * 1;
                break;
        }

        return tongLuong;
    }
    this.XepLoai = function (gioLam) {
        var xepLoai = '';

        if (gioLam > 120) {
            xepLoai = 'Nhân Viên Xuất Sắc';
        }
        else if (gioLam > 100) {
            xepLoai = 'Nhân Viên Giỏi';
        } else if (gioLam > 80) {
            xepLoai = 'Nhân Viên Khá';
        } else if (gioLam >= 50) {
            xepLoai = 'Nhân Viên Trung Bình';
        }

        return xepLoai;
    }
    this.FormatChucVu = function (chucVu) {
        var cv = '';
        var type = parseInt(chucVu);

        switch (type) {
            case 1:
                cv = 'Giám Đốc';
                break;
            case 2:
                cv = 'Trưởng Phòng';
                break;
            case 3:
                cv = 'Nhân Viên';
                break;
        }

        return cv;
    }
}