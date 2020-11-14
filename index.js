var validate = new Validation();
var h = new Hanlde();
var arrNhanVien = [];

document.querySelector('#btn-create').onclick = function () {
    var nhanVien = new NhanVien();
    nhanVien.MaNv = document.getElementById('iManv').value;
    nhanVien.TenNv = document.getElementById('iTennv').value;
    nhanVien.ChucVu = document.getElementById('iChucVu').value;
    nhanVien.LuongCB = document.getElementById('iLuong').value;
    nhanVien.GioLam = document.getElementById('iGiolam').value;

    var valid = validation(nhanVien);

    for (let i = 0; i < arrNhanVien.length; i++) {
        const element = arrNhanVien[i];
        if (nhanVien.MaNv === element.MaNv) {
            document.getElementById('wManv').innerHTML = 'Mã nhân viên đã tồn tại!';
            return valid = false
        }
    }

    if (!valid) {
        return;
    }

    arrNhanVien.push(nhanVien);

    setLocalStorage(arrNhanVien);
    getLocalStorage();
}
var setLocalStorage = (a) => {
    var json = JSON.stringify(a);
    localStorage.setItem('DS_NhanVien', json);
}

var getLocalStorage = () => {
    let aaa = localStorage.getItem('DS_NhanVien');
    if (aaa !== null) {
        arrNhanVien = JSON.parse(aaa);
        document.getElementById('tableNhanVien').innerHTML = renderNhanVien(arrNhanVien);
    }
}

var renderNhanVien = (arrNhanVien) => {
    var html = '';

    if (arrNhanVien === null)
        return html;

    arrNhanVien.map((item) => {

        let displayCV = h.FormatChucVu(item.ChucVu);
        let displayXL = h.XepLoai(item.GioLam);
        let displayTL = h.TongLuong(item.ChucVu, item.LuongCB);
        html += `<tr>
                    <td>${item.MaNv}</td>
                    <td>${item.TenNv}</td>
                    <td>${displayCV}</td>
                    <td>${item.LuongCB}</td>
                    <td>${displayTL}</td>
                    <td>${item.GioLam}</td>
                    <td>${displayXL}</td>
                    <td>
                        <div class="float-right">
                            <button class="btn btn-danger" onclick="delNhanVien('${item.MaNv}')">Xóa</button>      
                            <button class="btn btn-primary" onclick="editNhanVien('${item.MaNv}')"> chỉnh sửa </button> 
                        </div>
                    </td>
                 </tr>`
    })

    return html;
}

var editNhanVien = function (maNv) {
    document.getElementById('iManv').disabled = true;
    document.getElementById('btn-create').style.opacity = 0;
    document.getElementById('btn-save').style.opacity = 1;
    document.getElementById('btn-cancel').style.opacity = 1;

    arrNhanVien.forEach(i => {
        if (i.MaNv === maNv) {
            document.getElementById('iManv').value = i.MaNv;
            document.getElementById('iTennv').value = i.TenNv;
            document.getElementById('iLuong').value = i.LuongCB;
            document.getElementById('iGiolam').value = i.GioLam;
            document.getElementById('iChucVu').value = i.ChucVu;
        }
    });
}

var delNhanVien = function (maNV) {
    arrNhanVien.forEach(i => {
        if (i.MaNv === maNV)
            arrNhanVien.splice(i, 1);
    });

    setLocalStorage(arrNhanVien);
    getLocalStorage();
}

document.querySelector("#btn-save").onclick = function () {
    var nv = new NhanVien();
    nv.MaNv = document.getElementById('iManv').value;
    nv.TenNv = document.getElementById('iTennv').value;
    nv.ChucVu = document.getElementById('iChucVu').value;
    nv.LuongCB = document.getElementById('iLuong').value;
    nv.GioLam = document.getElementById('iGiolam').value;

    var valid = validation(nv);

    if (!valid) {
        return;
    }

    document.getElementById('btn-save').style.opacity = 0;
    document.getElementById('btn-cancel').style.opacity = 0;

    arrNhanVien.forEach(item => {
        if (nv.MaNv === item.MaNv) {
            item.TenNv = nv.TenNv;
            item.ChucVu = nv.ChucVu;
            item.LuongCB = nv.LuongCB;
            item.GioLam = nv.GioLam;

            setLocalStorage(arrNhanVien);
            getLocalStorage();
        }
    });

    document.getElementById('iManv').disabled = false;
    document.getElementById('iManv').value = '';
    document.getElementById('iTennv').value = '';
    document.getElementById('iLuong').value = '';
    document.getElementById('iGiolam').value = '';
    document.getElementById('iChucVu').value = '';
    document.getElementById('btn-create').style.opacity = 1;
}

document.querySelector("#btn-cancel").onclick = function () {
    document.getElementById('iManv').disabled = false;
    document.getElementById('iManv').value = '';
    document.getElementById('iTennv').value = '';
    document.getElementById('iLuong').value = '';
    document.getElementById('iGiolam').value = '';
    document.getElementById('iChucVu').value = '';
    document.getElementById('btn-save').style.opacity = 0;
    document.getElementById('btn-cancel').style.opacity = 0;
    document.getElementById('btn-create').style.opacity = 1;

    return;
}

var validation = function (nhanVien) {
    var valid = true;

    if (nhanVien === null)
        return valid = false;

    const MA_NV = 'Mã nhân viên';
    const TEN_NV = 'Tên nhân viên';
    const LUONG_CB = 'Lương cơ bản';
    const SO_GIO_LAM = 'Số giờ làm';



    valid &= validate.CheckEmpty(nhanVien.MaNv, MA_NV, 'wManv')
        & validate.CheckEmpty(nhanVien.TenNv, TEN_NV, 'wTennv')
        & validate.CheckEmpty(nhanVien.LuongCB, LUONG_CB, 'wLuong')
        & validate.CheckEmpty(nhanVien.GioLam, SO_GIO_LAM, 'wGiolam');

    if (valid) {
        valid &= validate.CheckChar(nhanVien.TenNv, TEN_NV, 'wTennv');

        valid &= validate.CheckNumber(nhanVien.LuongCB, LUONG_CB, 'wLuong')
            & validate.CheckNumber(nhanVien.GioLam, SO_GIO_LAM, 'wGiolam');
    }

    if (valid) {
        valid &= validate.CheckCharLength(nhanVien.MaNv, MA_NV, 'wManv', 4, 6);

        valid &= validate.CheckValueLength(nhanVien.LuongCB, LUONG_CB, 'wLuong', 1000000, 20000000)
            & validate.CheckValueLength(nhanVien.GioLam, SO_GIO_LAM, 'wGiolam', 50, 150);
    }

    return valid;
}
getLocalStorage();