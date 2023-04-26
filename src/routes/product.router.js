import express from 'express';
const router = express.Router();

import productController from '../app/controllers/ProductController.js'


// router.get('/:slug', homeController.chim);
router.post('/addtocart', productController.addToCart);
router.put('/:id',productController.check_remainning)
router.get('/:id', productController.show );




export default router;