import express from 'express';
const router = express.Router();

import homeController from '../app/controllers/HomeController.js'


router.get('/logout', homeController.logout);
router.get('/', homeController.show);



export default router;