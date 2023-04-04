import express from 'express';
const router = express.Router();

import homeAuthenticationController from '../app/controllers/HomeAuthentication.js'


// router.get('/:slug', homeController.chim);
router.get('/logout', homeAuthenticationController.logout);
router.get('/', homeAuthenticationController.home);
router.post('/', homeAuthenticationController.home);


export default router;