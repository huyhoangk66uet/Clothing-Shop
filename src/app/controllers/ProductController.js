// dua bang csdl sang controller de su ly
import Product from '../models/Product.js'; // tra ve bang users
import Product_Image from '../models/Product_Image.js';


class ProductController {
    
    // [GET] / product by id
    show(req, res, next) {

        Product.findOne({_id: req.params.id})
            // .populate('product_images')
            // .exec()
            .then(product => {    
                product = product.toObject();
                res.render('./product', {product})
            })
            .catch(err => {
                res.send('Khong tim thay san pham')
            })
               


        //res.send('chim' + req.params.id)    
    }
}

// exports cai gi thi khi require se nhan duoc cai do
export default new ProductController;
