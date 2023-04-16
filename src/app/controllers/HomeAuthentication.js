import Product from '../models/Product.js'; // tra ve bang users

class HomeAuthenticationController {
    
    // [GET] /home
    show(req, res, next) {

        var page = parseInt(req.query.page) || 1;
        var perPage = 12;
        var start = (page - 1) * perPage;
        var end = page * perPage;
        if(req.query.category){
            var category = req.query.category
            var category_ = 'category=' + category
            Product.find({category: new RegExp(category, "i")}) 
            .skip(start)
            .limit(perPage)
            .then(products => {
                products = products.map(product => product.toObject())
                res.render('./homeAuthentication', {products, page, category_})
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
        } else if (req.query.search) {
            var category = req.query.search
            var category_ = 'search=' + category
            Product.find({category: new RegExp(category, "i")}) 
            .skip(start)
            .limit(perPage)
            .then(products => {
                products = products.map(product => product.toObject())
                res.render('./homeAuthentication', {products, page, category_})
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
                    res.render('./homeAuthentication', {products, page})
                })
                .catch(err => {
                    res.status(400).json({ error: err })
                })
        }
        //res.render('./home')    
    }

    home(req, res, next) {

        if(req.query.category){
            var category = req.query.category
            Product.find({category: new RegExp(category, "i")}) 
            .then(products => {
                products = products.map(product => product.toObject())
                res.render('./homeAuthentication', {products})
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
        } else if (req.query.search) {
            var category = req.query.search
            Product.find({category: new RegExp(category, "i")}) 
            .then(products => {
                products = products.map(product => product.toObject())
                res.render('./homeAuthentication', {products})
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
        } else {
            Product.find({}) 
                .then(products => {
                    products = products.map(product => product.toObject())
                    //console.log(products[0].image_[0])
                    res.render('./homeAuthentication', {products})
                })
                .catch(err => {
                    res.status(400).json({ error: err })
                })
        }
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