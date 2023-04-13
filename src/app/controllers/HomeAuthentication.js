import Product from '../models/Product.js'; // tra ve bang users

class HomeAuthenticationController {
    
    // [GET] /home
    home(req, res, next) {
        Product.find({}) 
            .then(products => {
                products = products.map(product => product.toObject())
                res.render('./homeAuthentication', {products})
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
        //res.render('./homeAuthentication')    
    }

    logout(req, res, next) {
        console.log(req.session.user_name)
        res.clearCookie('token');
        req.session.destroy((err) => {
            if(err) {
                console.log(err);
            } else {
                //res.render('./home')
                res.redirect('/')
            }
        })
    }
}

// exports cai gi thi khi require se nhan duoc cai do
export default new HomeAuthenticationController;