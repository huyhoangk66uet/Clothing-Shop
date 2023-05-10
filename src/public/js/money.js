const money_list = document.querySelectorAll(".money")
    console.log(money_list);
    money_list.forEach(function (money) {
        const value = parseFloat(money.innerHTML.replace(/\./g, "").replace(",", ".")); // chuyển đổi giá trị thành số, xóa dấu phân cách thập phân cũng như dấu nghìn trong chuỗi
        if (isNaN(value)) return; // bỏ qua nếu giá trị không phải là số
        const formatted_money = "&nbsp;₫" + value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
            .replace('₫', '');// định dạng lại giá
        money.innerHTML = formatted_money; // cập nhật giá trị trong DOM
        console.log(money.innerHTML)
    })