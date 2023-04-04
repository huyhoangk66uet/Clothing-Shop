import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const Product = new Schema({
    name: { type: String },
    price: {type: Number},
    category: {type: String},
    description: {type: String},
    main_image: {type: String},
    image_1: {type: String},
    image_2: {type: String},
    image_3: {type: String},
    //product_images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product_Image' }],
    remaining_products: {type: Number},
    createAt: { type: Date, default: Date.now}
  });
// users la ten bang trong db, phai de so nhieu neu ko co no se tu tao bang moi trong db
export default mongoose.model('products', Product);  