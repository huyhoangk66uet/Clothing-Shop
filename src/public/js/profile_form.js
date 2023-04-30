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
        const regex = /^(0|\+84)([1-9][0-9]{8})$/;
        return regex.test(value) ? undefined : 'Số điện thoại không hợp lệ';
    },
    dateOfBirth: function (value) {
        const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
        const match = value.match(regex);
        if (!match) {
            return 'Ngày sinh không hợp lệ';
        }
        const day = parseInt(match[1]);
        const month = parseInt(match[2]);
        const year = parseInt(match[3]);
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
        const regex = /^[^\d\W_]+$/u;
        const str = value.trim();
        if (!str) {
            return 'Họ và tên không được để trống';
        }
        if (str.length > 30) {
            return 'Độ dài của tên không quá 30 ký tự';
        }
        return regex.test(value) ? undefined : 'Họ và tên không hợp lệ';
    },
};

function RenderError(form, name, msg) {
    const err = form.querySelector(name);
    err.innerHTML = msg;
    if (!msg) {
        return true;
    }
    return false;
}

function ValidationForm(formName) {
    const formElement = document.querySelector(formName);
    const isError = false;
    if (formElement) {
        const inputs = formElement.querySelectorAll('input');
        for (const input of inputs) {
            let msg;
            switch (input.type) {
                
                case 'password': {
                    const value = input.value;
                    const name = input.name;
                    msg = validatorRules.required(value);
                    if (RenderError(formElement, name, msg)) {
                        isError = true;
                        break;
                    }
                    msg = validatorRules.password(value);
                    if (RenderError(formElement, name, msg)) {
                        isError = true;
                    }
                    break;
                }

                case 'email': {
                    const value = input.value;
                    const name = input.name;
                    msg = validatorRules.required(value);
                    if (RenderError(formElement, name, msg)) {
                        isError = true;
                        break;
                    }
                    msg = validatorRules.email(value);
                    if (RenderError(formElement, name, msg)) {
                        isError = true;
                    }
                    break;
                }

                case 'date': {
                    const value = input.value;
                    const name = input.name;
                    msg = validatorRules.dateOfBirth(value);
                    if (RenderError(formElement, name, msg)) {
                        isError = true;
                    }
                    break;
                }

                case 'number': {
                    const value = input.value;
                    const name = input.name;
                    msg = validatorRules.required(value);
                    if (RenderError(formElement, name, msg)) {
                        isError = true;
                        break;
                    }
                    msg = validatorRules.confirmationCode(value);
                    if (RenderError(formElement, name, msg)) {
                        isError = true;
                    }
                    break;
                }

                case 'tel': {
                    const value = input.value;
                    const name = input.name;
                    msg = validatorRules.required(value);
                    if (RenderError(formElement, name, msg)) {
                        isError = true;
                        break;
                    }
                    msg = validatorRules.phoneNumber(value);
                    if (RenderError(formElement, name, msg)) {
                        isError = true;
                    }
                    break;
                }

                case 'text': {
                    const value = input.value;
                    const name = input.name;
                    msg = validatorRules.required(value);
                    if (RenderError(formElement, name, msg)) {
                        isError = true;
                        break;
                    }
                    if (input.id == 'fullname')
                        msg = validatorRules.fullname(value);
                    if (RenderError(formElement, name, msg)) {
                        isError = true;
                    }
                    break;
                }
            }
        }
    }
    return isError;
}