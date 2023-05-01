import jwt from "jsonwebtoken"
import Profile from "../models/UserProfile.js"
import Image from "../../public/js/imageProcess.js"
import mongoose from "mongoose";
import { response } from "express";

class ProfileController {
    info(req, res, next) {
        const token = req.cookies.token;
        const result = jwt.verify(token, 'mk');
        // console.log(token);
        // console.log(result);
        Profile.findById(result._id)
            .then(profile => {
                if (profile) {
                    const fullname = profile.name;
                    const username = profile.username;
                    const email = profile.email;
                    const password = profile.password;
                    // console.log(profile.avatar);
                    // console.log(profile.avatar.equals(Buffer.from('', 'hex')));
                    Image.bufferToImage(profile.avatar)
                        .then((avatar) => {
                            const avatarUrl = Image.createUrl(avatar);
                            const phone_number = profile.phone_number;
                            const gender = profile.gender;
                            const birthday = profile.birthday;
                            res.render('profile', { fullname, username, email, password, avatarUrl, phone_number, gender, birthday });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                else {
                    console.log('User profile not found');
                    res.render('profile', {});
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    redirectPath(req, res, next) {
        res.redirect('/profile/info')
    }

    saveInfo(req, res, next) {
        const token = req.cookies.token;
        const result = jwt.verify(token, 'mk');
        const fullname = req.body.fullname;
        const birthday = req.body.birthday;
        const gender = req.body.gender;
        const avatar = Image.base64ToBuffer(req.body.avatar);
        Profile.findByIdAndUpdate(result._id, { name: fullname, birthday: birthday, gender: gender, avatar: avatar })
            .then(() => res.json({ message: 'Cập nhật thông tin thành công' }));

    }
}

export default new ProfileController;