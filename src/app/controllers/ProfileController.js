import jwt from "jsonwebtoken"
//import Profile from "../models/UserProfile.js"
import User from "../models/User.js";
import Image from "../../public/js/imageProcess.js"
import mongoose from "mongoose";
import { response } from "express";

class ProfileController {
    loadInfo(req, res, next) {
        const token = req.cookies.token;
        const result = jwt.verify(token, 'mk');

        User.findById(result._id)
            .then(profile => {
                if (profile) {
                    const fullname = profile.name;
                    const username = profile.user_name;
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
                            var check_admin = false;
                            if (profile.role === "admin") {
                                check_admin = true
                            }
                            res.render('profile', { fullname, username, email, password, avatarUrl, phone_number, gender, birthday, bodyName: 'info', check_admin });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                else {
                    console.log('User profile not found');
                    res.render('profile', { bodyName: 'info' });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    loadPassword(req, res, next) {
        const token = req.cookies.token;
        const result = jwt.verify(token, 'mk');
        User.findById(result._id)
            .then(profile => {
                if (profile) {
                    const fullname = profile.name;
                    const username = profile.user_name;
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
                            res.render('profile', { fullname, username, email, password, avatarUrl, phone_number, gender, birthday, bodyName: 'password' });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                else {
                    console.log('User profile not found');
                    res.render('profile', { bodyName: 'password' });
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
        User.findByIdAndUpdate(result._id, { name: fullname, birthday: birthday, gender: gender, avatar: avatar })
            .then(() => res.json({ message: 'Cập nhật thông tin thành công' }));

    }

    changePassword(req, res, next) {
        const token = req.cookies.token;
        const result = jwt.verify(token, 'mk');
        const _id = result._id;
        const password = req.body.password;
        const newPassword = req.body.newPassword;
        User.findById(_id)
            .then((profile) => {
                if (profile) {
                    const realPassword = profile.password;
                    if (password == realPassword) {
                        User.findByIdAndUpdate(_id, { password: newPassword })
                            .then(() => res.json({ message: 'Success' }));
                    }
                    else {
                        res.json({ message: 'Mật khẩu không đúng' });
                    }
                }
                else {
                    res.json({ message: 'Không tìm thấy đối tượng' });
                }
            })
    }

    changeEmail(req, res, next) {
        const token = req.cookies.token;
        const result = jwt.verify(token, 'mk');
        const _id = result._id;
        const password = req.body.password;
        const email = req.body.email;
        User.findById(_id)
            .then((profile) => {
                if (profile) {
                    const realPassword = profile.password;
                    if (password == realPassword) {
                        const realEmail = profile.email;
                        if (realEmail != email.trim()) {
                            User.find({ email: email.trim() })
                                .then((findResult) => {
                                    if (findResult.length != 0) {
                                        res.json({ message: 'Email này đã được sử dụng', idErr: '2' });
                                    }
                                    else {
                                        User.findByIdAndUpdate(_id, { email: email.trim() })
                                            .then(() => res.json({ message: 'Success', idErr: '0' }));
                                    }
                                })
                        }
                        else {
                            res.json({ message: 'Email này trùng với email cũ của bạn', idErr: '2' });
                        }

                    }
                    else {
                        res.json({ message: 'Mật khẩu không đúng', idErr: '1' });
                    }
                }
                else {
                    res.json({ message: 'Không tìm thấy đối tượng', idErr: '2' });
                }
            })
    }

    changePhone(req, res, next) {
        const token = req.cookies.token;
        const result = jwt.verify(token, 'mk');
        const _id = result._id;
        const password = req.body.password;
        const phone_number = parseInt(req.body.phone_number);
        User.findById(_id)
            .then((profile) => {
                if (profile) {
                    const realPassword = profile.password;
                    const realPhone = profile.phone_number;
                    if (password == realPassword) {
                        if (realPhone != phone_number) {
                            User.findByIdAndUpdate(_id, { phone_number: phone_number })
                                .then(() => res.json({ message: 'Success' }));
                        }
                        else {
                            res.json({ message: 'Duplicate' });
                        }
                    }
                    else {
                        res.json({ message: 'Mật khẩu không đúng' });
                    }
                }
                else {
                    res.json({ message: 'Không tìm thấy đối tượng' });
                }
            })
    }
}

export default new ProfileController;