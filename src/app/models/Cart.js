import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const Cart = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'users'},
    products: [{product_id: {type: Schema.Types.ObjectId},
                size: {type: String},
                quantity: {type: Number}}],
                
  });
// users la ten bang trong db, phai de so nhieu neu ko co no se tu tao bang moi trong db
export default mongoose.model('carts', Cart);  