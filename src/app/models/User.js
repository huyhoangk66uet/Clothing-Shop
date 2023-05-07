import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const User = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String},
    phone_number: {type: Number},
    user_name: {type: String},
    role: {type: String},
    avatar: {type: Buffer, default: Buffer.from('', 'hex')},
    gender: {type: String, default: 'Other'},
    birthday: {type: Date, default: Date.now()}
  });
  
// users la ten bang trong db, phai de so nhieu neu ko co no se tu tao bang moi trong db
export default mongoose.model('users', User);  

