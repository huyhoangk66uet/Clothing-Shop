// dua bang csdl sang controller de su ly
import jwt from 'jsonwebtoken';
import Product from '../models/Product.js'; // tra ve bang users
import Cart from '../models/Cart.js';
import { query } from 'express';
//import { data } from 'jquery';
//import Product_Image from '../models/Product_Image.js';


class ProductController {
    
    // [GET] / product by id
    show(req, res, next) {

        Product.findOne({_id: req.params.id})
            // .populate('product_images')
            // .exec()
            .then(product => {    
                product = product.toObject();
                //console.log(product);
                res.render('./product', {product})
            })
            .catch(err => {
                res.send('Khong tim thay san pham')
            })
               


        //res.send('chim' + req.params.id)    
    }

    addToCart(req, res, next) {
        var token = req.cookies.token;
        var ketqua = jwt.verify(token,'mk');
        Cart.findOne({
            user_id: ketqua._id,
            products: req.body._id
        }).then(cart => {
            if(!cart){
                Cart.updateOne(
                    {user_id: ketqua._id},
                    {$push: {products: req.body._id}}
                ).then(data => {
                    console.log('ok' + data)
                    res.json({
                        message: 'Da Them Vao Gio Hang'
                    })
                }).catch(err => {
                    console.log('err' + err)
                })
            } else {
                res.json({
                    message: 'San Pham Da Ton Tai Trong Gio Hang'
                })
            }
        })        
    }

    test(req, res, next) {
        console.log(req.query)
        res.json({cc: req.query.q})
    }
}

// exports cai gi thi khi require se nhan duoc cai do
export default new ProductController;
