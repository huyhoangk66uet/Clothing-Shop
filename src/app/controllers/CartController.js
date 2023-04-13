// dua bang csdl sang controller de su ly
import jwt from 'jsonwebtoken';
import Product from '../models/Product.js'; // tra ve bang users
import Cart from '../models/Cart.js'
//import { data } from 'jquery';
//import Product_Image from '../models/Product_Image.js';


class CartController {
    
    // [GET] / 
    show(req, res, next) {
        var token = req.cookies.token;
        var ketqua = jwt.verify(token,'mk');
        Cart.findOne({
            user_id: ketqua._id
        })
        .populate('products')
        .exec()
        .then(cart => {
            var products = cart.products.map(product => product.toObject())
            var check_remaining = cart.products.map(product => {
                if(product.remaining_products > 0) {
                    return true;
                } else {
                    return false;
                }
            })
            res.render('./cart', {products, check_remaining}) 
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
           
    }

    delete(req, res, next) {
        var product_id = req.params.id;
        var token = req.cookies.token;
        var ketqua = jwt.verify(token,'mk');
        Cart.updateOne(
            {user_id: ketqua._id},
            {$pull: {
                products: product_id
            }}
        )
        .then(() => res.json({
            message: true
        }))
        .catch(err => res.json({
            message: false
        }))
        
    }

    update(req, res, next) {
        var q_ty_product = req.body.q_ty_product
        var product_id = req.body.product_id
        Product.findOne({_id: req.body.product_id})
        .then(data => {
            if(data) {
                if(q_ty_product < data.remaining_products) {
                    res.json({
                        check_remaining: true
                    })
                } else {
                    res.json({
                        check_remaining: false
                    })
                }
            } else {
                console.log('Khong tim thay san pham')
            }
        })
        .catch(err => {
            console.log(err)
        })
        
    }

}

// exports cai gi thi khi require se nhan duoc cai do
export default new CartController;