import express from 'express';
const router = express.Router();

import loginController from '../app/controllers/LoginController.js'


// router.get('/:slug', homeController.chim);
// router.get('/user', homeController.home);
router.get('/', loginController.get_login);
router.post('/', loginController.post_login);


export default router;