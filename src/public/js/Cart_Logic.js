var product__final_prices_list = $('.product__final-prices')
    product__final_prices_list = Array.from(product__final_prices_list)
    product__final_prices_list.forEach(product__final_prices => {
        product__final_prices.textContent = 
                parseFloat(product__final_prices.parentElement.parentElement.getElementsByClassName('product__real_prices')[0].textContent) * 
                parseFloat(product__final_prices.parentElement.parentElement.getElementsByClassName('qty-input')[0].value) + ' ₫'
    })


var qty_decreases = document.getElementsByClassName('qty-decrease');
    qty_decreases = Array.from(qty_decreases)
    qty_decreases.forEach(qty_decrease => {
        qty_decrease.onclick = function(event) {
            var qty_input = event.currentTarget.parentElement.getElementsByClassName('qty-input')[0]
            var tmp = 0;
            var q_ty_mess = event.currentTarget.parentElement.parentElement.getElementsByClassName('q-ty_mess')[0]
            if(qty_input.value > 1) {
                q_ty_mess.classList.add('hide')
                qty_input.value = parseFloat(qty_input.value) - 1;
                var item_product = event.currentTarget.parentElement.parentElement.parentElement.parentElement
                tmp = item_product.getElementsByClassName('product__final-prices')[0].textContent
                item_product.getElementsByClassName('product__final-prices')[0].textContent = 
                parseFloat(item_product.getElementsByClassName('product__real_prices')[0].textContent) * 
                parseFloat(item_product.getElementsByClassName('qty-input')[0].value) + ' ₫'
            }
            if(event.currentTarget.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('input_checkbox')[0].checked) {
                prices__value_tmp.textContent = parseFloat(prices__value_tmp.textContent) - parseFloat(tmp)
                 + parseFloat(item_product.getElementsByClassName('product__final-prices')[0].textContent)
            }
            document.getElementById('prices__value--final').textContent = prices__value_tmp.textContent
        }
    });

    var qty_increases = document.getElementsByClassName('qty-increase');
    qty_increases = Array.from(qty_increases)
    qty_increases.forEach(qty_increase => {
        qty_increase.onclick = function(event) {
            var qty_input = event.currentTarget.parentElement.getElementsByClassName('qty-input')[0]
            var item_product = event.currentTarget.parentElement.parentElement.parentElement.parentElement
            var isChecked = event.currentTarget.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('input_checkbox')[0].checked
            //////////////////////
            var q_ty_mess = event.currentTarget.parentElement.parentElement.getElementsByClassName('q-ty_mess')[0]
            
            var product_id = event.currentTarget.parentElement.parentElement.getAttribute('product_id')
            console.log(event.currentTarget.parentElement.parentElement)
            var size = event.currentTarget.parentElement.parentElement.getAttribute("size")
            $.ajax({
                url: '/cart',
                type: 'PUT',
                data: {product_id: product_id,
                       size: size, 
                       q_ty_product: parseFloat(qty_input.value)}
            })
            .done(data => {
                if(data.check_remaining) {
                    var tmp = 0;
                    qty_input.value = parseFloat(qty_input.value) + 1;
                    //var item_product = event.currentTarget.parentElement.parentElement.parentElement.parentElement
                    tmp = item_product.getElementsByClassName('product__final-prices')[0].textContent
                    item_product.getElementsByClassName('product__final-prices')[0].textContent = 
                    parseFloat(item_product.getElementsByClassName('product__real_prices')[0].textContent) * 
                    parseFloat(item_product.getElementsByClassName('qty-input')[0].value) + ' ₫'
                    if(isChecked) {
                        prices__value_tmp.textContent = parseFloat(prices__value_tmp.textContent) - parseFloat(tmp)
                         + parseFloat(item_product.getElementsByClassName('product__final-prices')[0].textContent)
                    }
                    document.getElementById('prices__value--final').textContent = prices__value_tmp.textContent
                    q_ty_mess.classList.add('hide')
                } else {
                    qty_input.value = data.quanti_;
                    q_ty_mess.textContent = 'Chỉ còn ' + data.quanti_ + ' sản phẩm'
                    q_ty_mess.classList.remove('hide')
                }
            })
            .fail(err => {
                console.log(err)
            })
        }
    });

    var input_checkboxs = document.getElementsByClassName('input_checkbox')
    input_checkboxs = Array.from(input_checkboxs)
    var total_product_value = document.getElementById('total_product_value')
    var prices__value_tmp = document.getElementById('prices__value_tmp')
    var quantity_checked = 0
    input_checkboxs.forEach(input_checkbox => {
        input_checkbox.onchange = function(event) {
            var product__final_prices =  event.target.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('product__final-prices')[0]
            if(event.target.checked) {
                quantity_checked++
                total_product_value.textContent = parseFloat(total_product_value.textContent) + 1;
                prices__value_tmp.textContent = parseFloat(prices__value_tmp.textContent) + parseFloat(product__final_prices.textContent)
            } else {
                quantity_checked--
                total_product_value.textContent = parseFloat(total_product_value.textContent) - 1
                prices__value_tmp.textContent = parseFloat(prices__value_tmp.textContent) - parseFloat(product__final_prices.textContent)
                select_all_product.checked = false;
            }   
            document.getElementById('prices__value--final').textContent = prices__value_tmp.textContent
            if(quantity_checked === input_checkboxs.length) {
            select_all_product.checked = true;
            }
            renderSubmitBtn()
        }    
    })


    var select_all_product = document.getElementById('select_all_product')  
    select_all_product.onchange = function(event) {
        //console.log(select_all_product.checked)
        var isChecked_select_all_product = select_all_product.checked
        if(isChecked_select_all_product) {
            quantity_checked = input_checkboxs.length
            prices__value_tmp.textContent = 0
            input_checkboxs.forEach(input_checkbox => {
                input_checkbox.checked = true
                var product__final_prices =  input_checkbox.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('product__final-prices')[0]
                prices__value_tmp.textContent = parseFloat(prices__value_tmp.textContent) + parseFloat(product__final_prices.textContent)  
                document.getElementById('prices__value--final').textContent = prices__value_tmp.textContent
                })
            total_product_value.textContent = quantity_checked
        } else {
            quantity_checked = 0
            input_checkboxs.forEach(input_checkbox => {
                input_checkbox.checked = false
                var product__final_prices =  input_checkbox.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('product__final-prices')[0]
                prices__value_tmp.textContent = parseFloat(prices__value_tmp.textContent) - parseFloat(product__final_prices.textContent)  
                document.getElementById('prices__value--final').textContent = prices__value_tmp.textContent
            })
            total_product_value.textContent = quantity_checked
        }
        renderSubmitBtn()    
    }
    //console.log(document.getElementsByTagName('input[name="check_product"]:checked'))    
    function renderSubmitBtn() {
        var checkedCount = document.querySelectorAll('input[name="check_product"]:checked').length
        if(checkedCount > 0) {
            document.getElementById('button_cart').classList.remove('blur_button');
        } else {
            document.getElementById('button_cart').classList.add('blur_button');
        }
    }