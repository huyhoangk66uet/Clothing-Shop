import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const User = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String},
    createAt: { type: Date, default: Date.now}
  });
// users la ten bang trong db, phai de so nhieu neu ko co no se tu tao bang moi trong db
export default mongoose.model('users', User);  

