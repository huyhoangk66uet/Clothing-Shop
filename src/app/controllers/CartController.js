// dua bang csdl sang controller de su ly
import jwt from 'jsonwebtoken';
import Product from '../models/Product.js'; // tra ve bang users
import Cart from '../models/Cart.js';
import User from '../models/User.js';



class CartController {

    // [GET] / 
    show(req, res, next) {
        var token = req.cookies.token;
        var ketqua = jwt.verify(token, 'mk');

        Cart.findOne({
            user_id: ketqua._id
        })
            .then(cart => {
                var products_id = cart.products.map(product => product.product_id)
                var size_list = cart.products.map(product => product.size)
                //var quantity_list = cart.products.map(product => product.quantity)
                var size_list_num = cart.products.map(product => {
                    if (product.size === 'S') return 0;
                    else if (product.size === 'M') return 1;
                    else if (product.size === 'L') return 2;
                    else if (product.size === 'XL') return 3;
                    else if (product.size === 'XXL') return 4;
                })

                const getProductList = (productIds) => {
                    const promises = productIds.map((productId) => {
                        console.log('+++++++++++++++++++++++++++')
                        console.log(productId)
                        return Product.findById(productId);
                    });
                    return Promise.all(promises);
                };

                getProductList(products_id)
                    .then((products) => {
                        //productList will contain all products matching the provided ids, in the same order
                        var check_remaining = products.map((product, index) => {
                            if (product.remaining_products[size_list_num[index]] > 0) {
                                return true;
                            } else {
                                return false;
                            }
                        })
                        var remaining_product_list = products.map((product, index) => {
                            return product.remaining_products[size_list_num[index]]
                        })
                        var quantity_list = cart.products.map((product, index) => {
                            if (product.quantity > remaining_product_list[index]) {
                                return remaining_product_list[index]
                            } else {
                                return product.quantity
                            }
                        })
                        products = products.map(product => product.toObject())
                        var check_admin = false
                        if (ketqua) {
                            User.findById(ketqua._id)
                                .then(user => {
                                    if (user.role === "admin") {
                                        check_admin = true
                                    }
                                    res.render('./cart', { products, check_remaining, size_list, remaining_product_list, quantity_list, check_admin })
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        } else {
                            res.render('./cart', { products, check_remaining, size_list, remaining_product_list, quantity_list, check_admin })
                        }
                        
                    })
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })

    }

    delete(req, res, next) {
        var product_id = req.params.id;
        var size = req.body.size;
        var token = req.cookies.token;
        var ketqua = jwt.verify(token, 'mk');
        Cart.updateOne(
            { user_id: ketqua._id },
            {
                $pull: {
                    products: {
                        product_id: product_id,
                        size: size
                    }
                }
            }
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
        var size = req.body.size
        if (size === 'S') { size = 0; }
        else if (size === 'M') { size = 1; }
        else if (size === 'L') { size = 2; }
        else if (size === 'XL') { size = 3; }
        else if (size === 'XXL') { size = 4; }
        var product_id = req.body.product_id
        Product.findOne({ _id: req.body.product_id })
            .then(data => {
                if (data) {
                    if (q_ty_product < data.remaining_products[size]) {
                        res.json({
                            check_remaining: true,
                            quanti_ : data.remaining_products[size]
                        })
                    } else {
                        res.json({
                            check_remaining: false,
                            quanti_ : data.remaining_products[size]
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











