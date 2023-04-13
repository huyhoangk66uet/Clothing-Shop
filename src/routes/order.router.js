import express from 'express';
const router = express.Router();

import orderController from '../app/controllers/OrderController.js'


router.get('/', orderController.show)




export default router;