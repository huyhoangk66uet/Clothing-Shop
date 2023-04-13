import express from 'express';
const router = express.Router();

import paymentController from '../app/controllers/PaymentController.js'


// router.get('/:slug', homeController.chim);
//router.get('/', paymentController.show );
router.post('/success', paymentController.success)
router.post('/', paymentController.show)




export default router;