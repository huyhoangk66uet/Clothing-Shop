import express from 'express';
const router = express.Router();

import homeController from '../app/controllers/HomeController.js'


// router.get('/:slug', homeController.chim);
// router.get('/user', homeController.home);
router.get('/logout', homeController.logout);
router.get('/', homeController.show);
router.post('/', homeController.home);


export default router;
