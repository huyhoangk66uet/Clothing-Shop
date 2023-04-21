import express from 'express';
const router = express.Router();

import adminController from '../app/controllers/AdminController.js'

router.delete('/product/:id' , adminController.deleteProduct);
router.get('/product', adminController.showProduct)

router.get('/product-add', adminController.showProduct_add);
router.post('/product-add', adminController.add_product)

router.get('/product-update/:id', adminController.showProduct_update);
router.post('/product-update/:id', adminController.update_product)

router.delete('/customer/:id' , adminController.deleteCustomer);
router.get('/customer', adminController.showCustomer)

router.delete('/order/:id' , adminController.deleteOrder);
router.get('/order', adminController.showOrder)

router.get('/profile', adminController.showProfile)

router.get('/', adminController.show)





export default router;