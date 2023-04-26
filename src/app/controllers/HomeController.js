import jwt from 'jsonwebtoken';
import Product from '../models/Product.js'; // tra ve bang users


class HomeController {
    
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

        res.render('./home', {check_out_auth})
           
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
export default new HomeController;
