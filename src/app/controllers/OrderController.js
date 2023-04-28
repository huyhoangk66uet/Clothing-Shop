import Order from '../models/Order.js';

class OrderController {
    show(req, res, next) {
        res.render('./order')
    }
}

export default new OrderController;