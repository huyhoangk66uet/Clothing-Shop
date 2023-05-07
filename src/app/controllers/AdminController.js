import Product from '../models/Product.js'; // tra ve bang users
import User from '../models/User.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import lodash from 'lodash';
import unidecode from 'unidecode';



async function someFunction() {
    const result = await someAsyncFunction();
    console.log(result);
}

class AdminController {
    async show(req, res, next) {
        try {


            // Lấy số lượng sản phẩm
            const productCount = await Product.countDocuments({ isDelete: false });
            // Lấy số lượng đơn hàng
            const orderCount = await Order.countDocuments();
            // Lấy số lượng khách hàng
            const userCount = await User.countDocuments();
            // Lấy số lượng đơn hàng đang giao
            const orderUnfinishedCount = await Order.countDocuments({ ship_date: { $gte: new Date() } });
            // lấy số lượng đơn hàng đã hoàn thành
            const orderCompletedCount = orderCount - orderUnfinishedCount;

            res.render('./admin/home', { productCount, orderCount, userCount, orderUnfinishedCount, orderCompletedCount })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    ////////////////////////////////
    showProduct(req, res, next) {
        Product.find({ isDelete: false })
            .then(products => {
                products = products.map(product => product.toObject())
                //console.log(products[0].image_[0])
                res.render('./admin/product', { products })
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
    }
    deleteProduct(req, res, next) {
        var product_id = req.params.id;
        var ArrPromise = [
            Product.updateOne({ _id: product_id },
                {
                    $set: {
                        remaining_products: [0, 0, 0, 0, 0],
                        isDelete: true
                    }
                }),
            Cart.updateMany(
                {
                    $pull: {
                        products: {
                            product_id: product_id,
                        }
                    }
                })
        ]
        Promise.all(ArrPromise)
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
        var name = lodash.toLower(req.body.name) 
        name = lodash.startCase(name)
        var key_search = req.body.name + " " + unidecode(name)
        var newProduct = {
            name: req.body.name,
            price: req.body.price,
            old_price: req.body.old_price,
            category: req.body.category,
            detail: req.body.detail,
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
            key_search: key_search,
            isDelete: false,
            isOutstanding: req.body.isOutstanding
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
        Product.findOne({ _id: product_id })
            .then(product => {
                if (product) {
                    product = product.toObject();
                    res.render('./admin/product-update', { product })
                } else {
                    res.send('Khong tim thay san pham')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    update_product(req, res, next) {
        var product_id = req.params.id
        var name = lodash.toLower(req.body.name) 
        name = lodash.startCase(name)
        var key_search = req.body.name + " " + unidecode(name)
        var updateProduct = {
            name: req.body.name,
            price: req.body.price,
            old_price: req.body.old_price,
            category: req.body.category,
            detail: req.body.detail,
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
            key_search: key_search,
            isDelete: false,
            isOutstanding: req.body.isOutstanding
        }
        Product.updateOne({ _id: product_id }, updateProduct)
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
                res.render('./admin/customer', { users })
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
    }
    deleteCustomer(req, res, next) {
        var user_id = req.params.id;
        var Array_promise = [
            User.deleteOne({ _id: user_id }),
            Cart.deleteOne({ user_id: user_id })]
        Promise.all(Array_promise)
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
                res.render('./admin/order', { orders })
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })

    }
    deleteOrder(req, res, next) {
        var order_id = req.params.id;
        Order.deleteOne({ _id: order_id })
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