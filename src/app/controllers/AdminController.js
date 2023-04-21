import Product from '../models/Product.js'; // tra ve bang users
import User from '../models/User.js';
import Order from '../models/Order.js';



class AdminController {
    show(req, res, next) {
        res.render('./admin/home')
    }
    ////////////////////////////////
    showProduct(req, res, next) {
        Product.find({}) 
                .then(products => {
                    products = products.map(product => product.toObject())
                    //console.log(products[0].image_[0])
                    res.render('./admin/product', {products})
                })
                .catch(err => {
                    res.status(400).json({ error: err })
                })
    }
    deleteProduct(req, res, next) {
        var product_id = req.params.id;
        Product.deleteOne({_id: product_id})
        .then(() => res.json({
            message: true
        }))
        .catch(err => res.json({
            message: false
        }))
    }
    ////////////////////////////////////////////
    showProduct_add(req, res, next) {
        res.render('./admin/product-add')
    }

    add_product(req, res, next) {
        var newProduct = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            main_image: req.body.main_image,
            remaining_products: [req.body.S_quantity, 
                                 req.body.M_quantity,
                                 req.body.L_quantity,
                                 req.body.XL_quantity,
                                 req.body.XXL_quantity],
            image_: [req.body.image_1,
                     req.body.image_2,
                     req.body.image_3],
            key_search: req.body.key_search
        }
        Product.create(newProduct)
        .then(newProduct => {
            res.json({
                message: true
            })
        })
        .catch(err => {
            res.json({
                message: false
            })
        })
        
    }
    ////////////////////////////////////
    showProduct_update(req, res, next) {
        var product_id = req.params.id
        Product.findOne({_id: product_id})
        .then(product => {
            if(product){
                product = product.toObject();
                res.render('./admin/product-update', {product})
            }else{
                res.send('Khong tim thay san pham')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    update_product(req, res, next) {
        var product_id = req.params.id
        var updateProduct = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            main_image: req.body.main_image,
            remaining_products: [req.body.S_quantity, 
                                 req.body.M_quantity,
                                 req.body.L_quantity,
                                 req.body.XL_quantity,
                                 req.body.XXL_quantity],
            image_: [req.body.image_1,
                     req.body.image_2,
                     req.body.image_3],
            key_search: req.body.key_search
        }
        Product.updateOne({_id: product_id}, updateProduct)
        .then(product => {
            res.json({
                message: true
            })
        })
        .catch(err => {
            console.log(err)
        })
        
    }
    ////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////
    showCustomer(req, res, next) {
        User.find({}) 
                .then(users => {
                    users = users.map(user => user.toObject())
                    //console.log(products[0].image_[0])
                    res.render('./admin/customer', {users})
                })
                .catch(err => {
                    res.status(400).json({ error: err })
                })
    }
    deleteCustomer(req, res, next) {
        var user_id = req.params.id;
        User.deleteOne({_id: user_id})
        .then(() => res.json({
            message: true
        }))
        .catch(err => res.json({
            message: false
        }))
    }
    //////////////////////////////////////
    //////////////////////////////////////////
    showOrder(req, res, next) {
        Order.find({}) 
                .then(orders => {
                    orders = orders.map(order => order.toObject())
                    //console.log(products[0].image_[0])
                    res.render('./admin/order', {orders})
                })
                .catch(err => {
                    res.status(400).json({ error: err })
                })
        
    }
    deleteOrder(req, res, next) {
        var order_id = req.params.id;
        Order.deleteOne({_id: order_id})
        .then(() => res.json({
            message: true
        }))
        .catch(err => res.json({
            message: false
        }))
    }

    ////////////////////////////////////////////////
    showProfile(req, res, next) {
        res.render('./admin/profile-edit')
    }
    ///////////////////////////////////////////
}

export default new AdminController;