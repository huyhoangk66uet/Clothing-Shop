import Users from '../models/User.js'; // tra ve bang users
import Carts from '../models/Cart.js';

class RegisterController {
    // [GET] /:slug
    chim(req, res) {
        Users.find({})
            .then(user => {
                res.json({ user })
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    }

    // get
    get_register(req, res) {
        res.render('./register')
    }

    //post
    post_register(req, res) {
        const data_user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number,
            address: req.body.address,
            role: 'user'
        }
        Users.findOne({
            email: data_user.email,
        })
        .then(data => {
            if(data) {
                // tao that bai
                res.json({
                    isCreate: false
                })
            } else {
                Users.create(data_user)
                .then(newUser => {
                    Carts.create({
                        user_id: newUser._id,
                        products: []
                    })
                })
                res.json({
                    isCreate: true
                })
            }
        })
        // .then(data => res.render('./login'))
        .catch(err => res.status(500).send('Loi ben server'))
    }


}

// exports cai gi thi khi require se nhan duoc cai do
export default new RegisterController;