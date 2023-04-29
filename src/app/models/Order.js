import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId; 

const Order = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'users'},
    product_list: [{
                product_id: {type: Schema.Types.ObjectId, ref: 'products'},
                product_size: {type: String},
                product_qty: {type: Number}
              }],
    payment_method: {type: String},
    shipping_method: {type: String},
    user_name: {type: String},
    address: {type: String},
    phone_number: {type: Number},
    total_money: {type: Number},
    order_date: {type: Date},
    ship_date: {type: Date}
  });
// users la ten bang trong db, phai de so nhieu neu ko co no se tu tao bang moi trong db
export default mongoose.model('orders', Order); 