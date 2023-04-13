// dua bang csdl sang controller de su ly
import Product from '../models/Product.js'; // tra ve bang users
import Order from '../models/Order.js';
import jwt from 'jsonwebtoken';



class PaymentController {
    
    show(req, res, next) {
        var product_list = JSON.parse(req.body.product_id_list)
        var product_id_list = product_list.map(function(product) {
            return product.product_id
        })
        var product_quantity_list = product_list.map(function(product) {
            return product.quantity
        })
        Product.find({_id: {$in: product_id_list}})
        .then(product_list => {
            product_list = product_list.map(product => product.toObject())
            res.render('./payment', {product_list, product_quantity_list })
        })    
    }

    success(req, res, next) {
        var token = req.cookies.token;
        var ketqua = jwt.verify(token,'mk');

        var payment_info = req.body.payment_info 
        //console.log(payment_info)
        var product_list_id = payment_info.product_list.map(product => {
            return product.product_id
        })
        var product_list_quantity = payment_info.product_list.map(product => {
            return product.product_qty
        })
        
        for(let i=0; i<product_list_id.length; i++) {
            const _id = product_list_id[i];
            const product_qty = product_list_quantity[i]
            Product.findOne({_id: _id}) 
            .then(product => {
                if(product) {
                    var remaining_product = product.remaining_products
                    Product.updateOne({_id: _id}, {$set: {remaining_products: (remaining_product - product_qty)}})
                    .then(() => {
                        console.log('update ok')
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
        //res.render('./paymentSuccess')
        var address = payment_info.Dia_chi + '/' + payment_info.Huyen + '/' + payment_info.Tinh 
        var order_data = {
                user_id: ketqua._id,
                product_list: payment_info.product_list,
                payment_method: payment_info.payment_method,
                shipping_method: payment_info.shipping_method,
                user_name: payment_info.user_name,
                phone_number: payment_info.sdt,
                address: address,
                total_money: payment_info.Tong_tien,
                order_date: payment_info.order_date
            }
        Order.create(order_data)
        .then(newOrder => {
            console.log('Tao don hang thanh cong')
            if(newOrder) {
                res.json({
                    isSuccess : true
                })
            } else {
                res.json({
                    isSuccess : false
                })
            }
            
        }) 
        .catch(err => {
            console.log(err)
        })
    
    }
}

// exports cai gi thi khi require se nhan duoc cai do
export default new PaymentController;