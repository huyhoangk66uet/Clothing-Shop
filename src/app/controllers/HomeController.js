// dua bang csdl sang controller de su ly
import Product from '../models/Product.js'; // tra ve bang users
//import jwt from 'jsonwebtoken';

class HomeController {
    
    // [GET] /home
    home(req, res, next) {

        if(req.query.classify && req.query.category){
            var category = req.query.category
            var classify = req.query.classify
            Product.find({
                category: category,
                classify: classify
            }) 
            .then(products => {
                products = products.map(product => product.toObject())
                res.render('./home', {products})
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
        } else if(req.query.category){
            var category = req.query.category
            Product.find({category: category}) 
            .then(products => {
                products = products.map(product => product.toObject())
                res.render('./home', {products})
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
        } else {
            Product.find({}) 
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
export default new HomeController;
