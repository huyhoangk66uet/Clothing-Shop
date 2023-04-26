// dua bang csdl sang controller de su ly
import jwt from 'jsonwebtoken';
import Product from '../models/Product.js'; // tra ve bang users


class HomeSearchController {
    
    // [GET] /home
    show(req, res, next) {

        var check_out_auth = false
        try{var token = req.cookies.token;
            var ketqua = jwt.verify(token,'mk');
        } catch {

        }
        if(!ketqua) {
            check_out_auth = true
        }
        var page = parseInt(req.query.page) || 1;
        var perPage = 12;
        var start = (page - 1) * perPage;
        var end = page * perPage;
        if(req.query.category){
            var key_search = req.query.category
            var category_ = 'category=' + key_search
            Product.find({key_search: new RegExp(key_search, "i"), isDelete: false}) 
            .skip(start)
            .limit(perPage)
            .then(products => {
                products = products.map(product => product.toObject())
                res.render('./homeSearch', {products, page, category_, check_out_auth})
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
        } else if (req.query.search) {
            var key_search = req.query.search
            var category_ = 'search=' + key_search
            Product.find({key_search: new RegExp(key_search, "i"), isDelete: false}) 
            .skip(start)
            .limit(perPage)
            .then(products => {
                products = products.map(product => product.toObject())
                res.render('./homeSearch', {products, page, category_, check_out_auth})
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
        } else {
            Product.find({isDelete: false}) 
                .skip(start)
                .limit(perPage)
                .then(products => {
                    products = products.map(product => product.toObject())
                    //console.log(products[0].image_[0])
                    res.render('./homeSearch', {products, page, check_out_auth})
                })
                .catch(err => {
                    res.status(400).json({ error: err })
                })
        }
        //res.render('./home')    
    }

    // logout(req, res, next) {
    //     console.log(req.session.user_name)
    //     res.clearCookie('token');
    //     req.session.destroy((err) => {
    //         if(err) {
    //             console.log(err);
    //         } else {
    //             //res.render('./home')
    //             res.redirect('/')
    //         }
    //     })
    // }

    home(req, res, next) {

        var page = parseInt(req.query.page) || 1;
        var perPage = 12;
        var start = (page - 1) * perPage;
        var end = page * perPage;
        if(req.query.category){
            var category = req.query.category
            Product.find({category: new RegExp(category, "i")}) 
            .skip(start)
            .limit(perPage)
            .then(products => {
                products = products.map(product => product.toObject())
                res.render('./home', {products})
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
        } else if (req.query.search) {
            var category = req.query.search
            Product.find({category: new RegExp(category, "i")}) 
            .skip(start)
            .limit(perPage)
            .then(products => {
                products = products.map(product => product.toObject())
                res.render('./home', {products})
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
        } else {
            Product.find({}) 
                .skip(start)
                .limit(perPage)
                .then(products => {
                    products = products.map(product => product.toObject())
                    //console.log(products[0].image_[0])
                    res.render('./home', {products})
                })
                .catch(err => {
                    res.status(400).json({ error: err })
                })
        }
        //res.render('./home')    
    }
}

// exports cai gi thi khi require se nhan duoc cai do
export default new HomeSearchController;
