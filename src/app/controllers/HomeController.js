// dua bang csdl sang controller de su ly
import Product from '../models/Product.js'; // tra ve bang users
//import jwt from 'jsonwebtoken';

class HomeController {
    
    // [GET] /home
    home(req, res, next) {

        Product.find({}) 
            .then(products => {
                products = products.map(product => product.toObject())
                res.render('./home', {products})
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })


        //res.render('./home')    
    }
}

// exports cai gi thi khi require se nhan duoc cai do
export default new HomeController;
