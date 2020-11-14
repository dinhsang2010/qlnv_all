function Validation() {
    this.CheckEmpty = function (value, name, selector) {
        if (value.trim() === '') {
            document.getElementById(selector).innerHTML = name + ' ' + ' không được bỏ trống !';
            return false;
        }
        document.getElementById(selector).innerHTML = '';
        return true;
    }
    this.CheckChar = function (value, name, selector) {
        var regex = /^[a-z A-Z]+$/;
        if (!regex.test(value)) {
            document.getElementById(selector).innerHTML = name + ' ' + 'tất cả phải là ký tự !';
            return false;
        }
        document.getElementById(selector).innerHTML = '';
        return true;
    }
    this.CheckNumber = function (value, name, selector) {
        var regex = /^[0-9]+$/;
        if (!regex.test(value)) {
            document.getElementById(selector).innerHTML = name + ' ' + 'tất cả phải là số !';
            return false;
        }
        document.getElementById(selector).innerHTML = '';
        return true;
    }
    this.CheckCharLength = function (value, name, selectorError, minValue, maxValue) {
        ;
        if (value.trim().length < minValue || value.trim().length > maxValue) {
            document.getElementById(selectorError).innerHTML = name + ' từ ' + minValue + ' đến ' + maxValue + ' !';
            return false;
        }
        document.getElementById(selectorError).innerHTML = '';
        return true;
    }
    this.CheckValueLength = function (value, name, selectorError, minValue, maxValue) {
        if (Number(value) < minValue || Number(value) > maxValue) {
            document.getElementById(selectorError).innerHTML = name + ' từ ' + minValue + ' đến ' + maxValue + ' !';
            return false;
        }
        document.getElementById(selectorError).innerHTML = '';
        return true;
    }
}