import express from 'express';
const router = express.Router();

import adminController from '../app/controllers/AdminController.js'

router.delete('/product/:id' , adminController.deleteProduct);
router.get('/product', adminController.showProduct)

router.get('/product-add', adminController.showProduct_add)

router.get('/product-edit', adminController.showProduct_edit)

router.delete('/customer/:id' , adminController.deleteCustomer);
router.get('/customer', adminController.showCustomer)

router.delete('/order/:id' , adminController.deleteOrder);
router.get('/order', adminController.showOrder)

router.get('/profile', adminController.showProfile)

router.get('/size', adminController.showSize)
router.get('/size-add', adminController.showSize_add)

router.get('/category', adminController.showCategory)
router.get('/category-add', adminController.showCategory_add)

router.get('/color', adminController.showColor)
router.get('/color-add', adminController.showColor_add)

router.get('/introduce', adminController.showIntroduce)

router.get('/', adminController.show)





export default router;