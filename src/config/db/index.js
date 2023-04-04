import mongoose from 'mongoose';

async function connect() {
    mongoose.connect('mongodb://127.0.0.1:27017/web_shop_dev')
    .then(() => console.log('Database connect successfully!!!'))
    .catch((err) => console.log('Database connect failure'));
}

export default {connect};
