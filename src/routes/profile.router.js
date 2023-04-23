import express from 'express';
const router = express.Router();

import profileController from '../app/controllers/ProfileController.js'


router.get('/password', profileController.password)
router.get('/email', profileController.email)
router.get('/phone', profileController.phone)
router.get('/info', profileController.info)
router.get('/', profileController.show)




export default router;