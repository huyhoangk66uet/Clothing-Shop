const validatorRules = {
    required: function (value) {
        return value ? undefined : 'Vui lòng nhập trường này';
    },
    email: function (value) {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(value) ? undefined : 'Email không hợp lệ';
    },
    password: function (value) {
        const regex = /^[a-zA-Z0-9]{6,20}$/;
        return regex.test(value)
            ? undefined
            : 'Độ dài mật khẩu phải từ 6-20 ký tự, và không có ký tự đặc biệt';
    },
    phoneNumber: function (value) {
        const regex = /^0\d{9}$/;
        return regex.test(value) ? undefined : 'Số điện thoại không hợp lệ';
    },
    dateOfBirth: function (value) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        const match = value.match(regex);
        if (!match) {
            return 'Ngày sinh không hợp lệ';
        }
        const parts = value.split('-');
        const day = parseInt(parts[2]);
        const month = parseInt(parts[1]);
        const year = parseInt(parts[0]);
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            return 'Ngày sinh không hợp lệ';
        }
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
            return 'Ngày sinh không hợp lệ';
        }
        const today = new Date();
        if (date > today) {
            return 'Ngày sinh không hợp lệ';
        }
        return undefined;
    },
    confirmationCode: function (value) {
        const regex = /^\d{6}$/;
        return regex.test(value) ? undefined : 'Mã xác nhận phải có 6 chữ số';
    },
    fullname: function (value) {
        const regex = /^[\p{L}\s]+$/u;
        const str = value.trim();
        // console.log('haha');
        // console.log(str);
        if (!str) {
            return 'Họ và tên không được để trống';
        }
        if (str.length > 30) {
            return 'Độ dài của tên không quá 30 ký tự';
        }
        return regex.test(value) ? undefined : 'Họ và tên không hợp lệ';
    },
};

function RenderError(formName, name, msg) {
    const formElement = document.querySelector(formName);
    // console.log(name);
    // console.log(msg);
    const err = formElement.querySelector('.notice-content.' + name);
    err.innerHTML = msg ? msg : '';
    if (!msg) {
        return false;
    }
    return true;
}

function ValidationElement(formName, input, msg) {
    var isError = false;
    switch (input.type) {

        case 'password': {
            const value = input.value;
            const name = input.name;
            msg = validatorRules.required(value);
            if (RenderError(formName, name, msg)) {
                isError = true;
                break;
            }
            msg = validatorRules.password(value);
            if (RenderError(formName, name, msg)) {
                isError = true;
            }
            break;
        }

        case 'email': {
            const value = input.value;
            const name = input.name;
            msg = validatorRules.required(value);
            if (RenderError(formName, name, msg)) {
                isError = true;
                break;
            }
            msg = validatorRules.email(value);
            if (RenderError(formName, name, msg)) {
                isError = true;
            }
            break;
        }

        case 'date': {
            const value = input.value;
            const name = input.name;
            // console.log(value);
            msg = validatorRules.dateOfBirth(value);
            if (RenderError(formName, name, msg)) {
                isError = true;
            }
            break;
        }

        case 'number': {
            const value = input.value;
            const name = input.name;
            msg = validatorRules.required(value);
            if (RenderError(formName, name, msg)) {
                isError = true;
                break;
            }
            msg = validatorRules.confirmationCode(value);
            if (RenderError(formName, name, msg)) {
                isError = true;
            }
            break;
        }

        case 'tel': {
            const value = input.value;
            const name = input.name;
            msg = validatorRules.required(value);
            if (RenderError(formName, name, msg)) {
                isError = true;
                break;
            }
            msg = validatorRules.phoneNumber(value);
            if (RenderError(formName, name, msg)) {
                isError = true;
            }
            break;
        }

        case 'text': {
            const value = input.value;
            const name = input.name;
            msg = validatorRules.required(value);
            if (RenderError(formName, name, msg)) {
                isError = true;
                break;
            }
            if (input.id == 'fullname') {
                msg = validatorRules.fullname(value);
            }
            if (RenderError(formName, name, msg)) {
                // console.log('heheh');
                isError = true;
            }
            break;
        }
    }

    return isError;
}

function ValidationForm(formName) {
    const formElement = document.querySelector(formName);
    var isError = false;
    if (formElement) {
        const inputs = formElement.querySelectorAll('input');
        for (const input of inputs) {
            if (input.readOnly) {
                continue ;
            }
            let msg;
            if (ValidationElement(formName, input, msg)) {
                isError = true;
            }
        }
    }
    return isError;
}