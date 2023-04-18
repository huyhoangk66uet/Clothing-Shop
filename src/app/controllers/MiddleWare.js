import jwt from 'jsonwebtoken';
import Users from '../models/User.js';

class MiddleWare {
    //check login
    checkAuthentication(req, res, next) {
        try {
            var token = req.cookies.token;
            var ketqua = jwt.verify(token,'mk');
        } catch (error) {
            return res.redirect('./login');
        }
        if(ketqua) {
            next();
        }
        // if (req.session.isAuth) {
        //     next();
        // } else {
        //     res.redirect('./login');
        // }
    }

    checkOutAuthentication(req, res, next) {
        try {
            var token = req.cookies.token;
            var ketqua = jwt.verify(token,'mk');
        } catch (error) {
            next();
        }
        if(ketqua) {
            res.redirect('./homePage');
        }
        // if (req.session.isAuth) {
        //     res.redirect('./homePage');
        // } else {
        //     next();
        // }
    }

    checkAdmin(req, res, next) {
        try {
            var token = req.cookies.token;
            var ketqua = jwt.verify(token,'mk');
            Users.findOne({_id: ketqua._id})
            .then(user => {
                if(user) {
                    var role = user.role
                    if(role === 'admin') {
                        next();
                    } else {
                        res.redirect('./homePage')
                    }
                } else {
                    res.redirect('./login')
                }
            })
            .catch(err => {
                console.log(err)
            })
        } catch (error) {
            return res.redirect('./login');
        }
    }
}

export default new MiddleWare;