import express from 'express';
const router = express.Router();

import cartController from '../app/controllers/CartController.js'


// router.get('/:slug', homeController.chim);
router.delete('/:id' , cartController.delete);
router.put('/', cartController.update);
router.get('/', cartController.show );
//router.post('/', cartController.postList_id)

//router.post('/')



export default router;