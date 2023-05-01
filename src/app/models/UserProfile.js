import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserProfile = new Schema({
    name: { type: String, default: ''},
    email: { type: String , default: ''},
    password: { type: String},
    phone_number: {type: Number, default: 0},
    role: {type: String},
    username: {type: String, default: ''},
    avatar: {type: Buffer, default: Buffer.from('30', 'hex')},
    gender: {type: String, default: 'Other'},
    birthday: {type: Date, default: Date.now()}
});

export default mongoose.model('user-copies', UserProfile);
