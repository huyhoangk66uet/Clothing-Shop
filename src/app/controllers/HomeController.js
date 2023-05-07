import jwt from 'jsonwebtoken';
import Product from '../models/Product.js';
import User from '../models/User.js';

class HomeController {

    // [GET] /home
    show(req, res, next) {

        var check_out_auth = false
        try {
            var token = req.cookies.token;
            var ketqua = jwt.verify(token, 'mk');
        } catch {

        }
        if (!ketqua) {
            check_out_auth = true
        }

        var outstandingProducts;
        Product.find({ isDelete: false, isOutstanding: true })
            .then(outstandingProducts => {
                outstandingProducts = outstandingProducts.map(product => product.toObject())
                Product.find({ isDelete: false })
                    .sort({ _id: -1 })
                    .limit(10)
                    .then(newProducts => {
                        newProducts = newProducts.map(product => product.toObject())
                        var check_admin = false
                        if (!check_out_auth) {
                            User.findById(ketqua._id)
                                .then(user => {
                                    if (user.role === "admin") {
                                        check_admin = true
                                    }
                                    res.render('./home', { check_out_auth, check_admin, newProducts, outstandingProducts })
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        } else {
                            res.render('./home', { check_out_auth, check_admin, newProducts, outstandingProducts })
                        }
                        
                    })
                    .catch(err => {
                        res.status(400).json({ error: err })
                    })
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
    }


    logout(req, res, next) {
        console.log(req.session.user_name)
        res.clearCookie('token');
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                //res.render('./home')
                res.redirect('/')
            }
        })
    }


}

// exports cai gi thi khi require se nhan duoc cai do
export default new HomeController;
