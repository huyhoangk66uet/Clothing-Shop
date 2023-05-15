import Users from '../models/User.js'; // tra ve bang users
import Carts from '../models/Cart.js';
//import User from '../models/User.js';
//import { Promise } from 'mongoose';
//import { data } from 'jquery';

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
            user_name: req.body.user_name,
            role: 'user'
        }

        var ArrPromise = [
        Users.findOne({email: data_user.email}),
        Users.findOne({user_name: data_user.user_name})
        ]

        Promise.all(ArrPromise)
        .then(data => {
            if(data[0]) {
                res.json({
                    isCreate: false,
                    message: 'Email này đã được sử dụng'
                })
            } else if(data[1]){
                res.json({
                    isCreate: false,
                    message: 'User name này đã được sử dụng'
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
        .catch(err => res.status(500).send('Loi ben server'))
        
    }


}

// exports cai gi thi khi require se nhan duoc cai do
export default new RegisterController;