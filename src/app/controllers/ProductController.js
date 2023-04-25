// dua bang csdl sang controller de su ly
import jwt from 'jsonwebtoken';
import Product from '../models/Product.js'; // tra ve bang users
import Cart from '../models/Cart.js';
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
            // .populate('product_images')
            // .exec()
            .then(product => {    
                product = product.toObject();
                //console.log(product);
                res.render('./product', {product, check_out_auth})
            })
            .catch(err => {
                res.send('Khong tim thay san pham')
            })
               


        //res.send('chim' + req.params.id)    
    }

    addToCart(req, res, next) {
        var token = req.cookies.token;
        var ketqua = jwt.verify(token,'mk');
        var product_size = {product_id: req.body._id,
                            size: req.body.size}
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
                    {$push: {products: product_size}}
                ).then(data => {
                    res.json({
                        message: 'Da them vao gio hang'
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
