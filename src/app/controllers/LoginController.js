import Users from '../models/User.js'; // tra ve bang users
import jwt from 'jsonwebtoken';

class LoginController {
    // [GET] /:slug
    chim(req, res) {
        Users.find({})
            .then(user => {
                res.json({ user })
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
    }

    // get
    get_login(req, res) {
        res.render('./login')
    }

    //post
    post_login(req, res) {
        const data_user = {
            email: req.body.email,
            password: req.body.password
        }

        Users.findOne({
            $or:[{email: data_user.email},
                 {user_name: data_user.email}],
            password: data_user.password
        })
        .then(data => {
            if(data) {
                var token = jwt.sign({
                    _id: data._id
                },'mk')
                //console.log(data)
                req.session.user_name = data.name;
                req.session.isAuth = true;
                //console.log(req.session.user_name)
                res.json({
                    message:'Thanh cong',
                    token: token,
                    user_name: data.name
                })    
            } else {
                return res.send('Tai khoan khong ton tai')
            }
        })
        // .then(data => res.render('./home'))
        .catch(err => res.send('Loi ben sever'))
        
    }
    
}

// exports cai gi thi khi require se nhan duoc cai do
export default new LoginController;