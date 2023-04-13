import mongoose from 'mongoose';

async function connect() {
    mongoose.connect('mongodb+srv://web_shop_dev:chimchim@cluster0.jqc7bod.mongodb.net/web_shop_dev')
    .then(() => console.log('Database connect successfully!!!'))
    .catch((err) => console.log('Database connect failure'));
}

export default {connect};
