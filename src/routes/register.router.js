import express from 'express';
const router = express.Router();

import registerController from '../app/controllers/RegisterController.js'


// router.get('/:slug', homeController.chim);
// router.get('/user', homeController.home);
router.get('/', registerController.get_register);
router.post('/', registerController.post_register);


export default router;