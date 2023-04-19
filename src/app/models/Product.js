import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const Product = new Schema({
    name: { type: String },
    price: {type: Number},
    category: {type: String},
    key_search: {type: String},
    description: {type: String},
    main_image: {type: String},
    image_: [{type: String}],
    //product_images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product_images' }],
    remaining_products: {type: Number},
  });
// users la ten bang trong db, phai de so nhieu neu ko co no se tu tao bang moi trong db
export default mongoose.model('products', Product);  