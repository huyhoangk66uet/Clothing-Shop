// dua bang csdl sang controller de su ly
import jwt from 'jsonwebtoken';
import Product from '../models/Product.js'; // tra ve bang users
import Cart from '../models/Cart.js';
import User from '../models/User.js';
import { query } from 'express';
//import { data } from 'jquery';
//import Product_Image from '../models/Product_Image.js';


class ProductController {
    
    // [GET] / product by id
    show(req, res) {

        var check_out_auth = false
        try{var token = req.cookies.token;
            var ketqua = jwt.verify(token,'mk');
        } catch {

        }
        if(!ketqua) {
            check_out_auth = true
        }
        Product.findOne({_id: req.params.id})
            .then(product => {    
                product = product.toObject();
                var check_admin = false
                if (!check_out_auth) {
                    User.findById(ketqua._id)
                        .then(user => {
                            if (user.role === "admin") {
                                check_admin = true
                            }
                            res.render('./product', {product, check_out_auth, check_admin})
                        })
                        .catch(err => {
                            console.log(err);
                        })
                } else {
                    res.render('./product', {product, check_out_auth, check_admin})
                }
            })
            .catch(err => {
                res.send('Không tìm thấy sản phẩm')
            })
               


        //res.send('chim' + req.params.id)    
    }

    addToCart(req, res, next) {
        var token = req.cookies.token;
        var ketqua = jwt.verify(token,'mk');
        var product_ = {product_id: req.body._id,
                            size: req.body.size,
                            quantity: req.body.quantity}
        //console.log(product_size)
        Cart.find({
            user_id: ketqua._id,
            products: {
                $elemMatch: {
                    product_id: req.body._id,
                    size: req.body.size
                }
            }
        }).then(cart => {
            console.log(cart.length)
            if(!cart.length){
                Cart.updateOne(
                    {user_id: ketqua._id},
                    {$push: {products: product_}}
                ).then(data => {
                    res.json({
                        message: 'Đã thêm vào giỏ hàng'
                    })                    
                }).catch(err => {
                    console.log('err' + err)
                })
                
            } else {
                res.json({
                    message: 'Sản phẩm đã tồn tại trong giỏ hàng'
                })
            }
        })        
    }

    
    check_remainning(req, res, next) {
        var size = req.body.size
        if(size === 'S') {size = 0;}
        else if(size === 'M') {size = 1;}
        else if(size === 'L') {size = 2;}
        else if(size === 'XL') {size = 3;}
        else if(size === 'XXL') {size = 4;}
        Product.findOne({_id: req.params.id})
        .then(product => {
            res.json({
                remainning: product.remaining_products[size],
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

// exports cai gi thi khi require se nhan duoc cai do
export default new ProductController;
