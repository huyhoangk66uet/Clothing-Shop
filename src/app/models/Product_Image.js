import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const Product_Image = new Schema({
    main_image2: {type: String},
    caption: { type: String},
    //productId: { type: String},
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    createAt: { type: Date, default: Date.now}
  });
// users la ten bang trong db, phai de so nhieu neu ko co no se tu tao bang moi trong db
export default mongoose.model('product_images', Product_Image);  