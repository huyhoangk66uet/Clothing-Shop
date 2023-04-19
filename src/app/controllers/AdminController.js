import Product from '../models/Product.js'; // tra ve bang users
import User from '../models/User.js';
import Order from '../models/Order.js';


class AdminController {
    show(req, res, next) {
        res.render('./admin/home')
    }
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
    showProduct_add(req, res, next) {
        res.render('./admin/product-add')
    }
    showCategory(req, res, next) {
        res.render('./admin/category')
    }
    showCategory_add(req, res, next) {
        res.render('./admin/category-add')
    }
    showColor(req, res, next) {
        res.render('./admin/color')
    }
    showColor_add(req, res, next) {
        res.render('./admin/color-add')
    }
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
    showIntroduce(req, res, next) {
        res.render('./admin/introduce')
    }

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

    showProfile(req, res, next) {
        res.render('./admin/profile-edit')
    }
    showSize(req, res, next) {
        res.render('./admin/size')
    }
    showSize_add(req, res, next) {
        res.render('./admin/size-add')
    }
}

export default new AdminController;