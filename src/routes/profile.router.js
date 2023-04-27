import express from 'express';
const router = express.Router();

import profileController from '../app/controllers/ProfileController.js'



router.get('/phone', profileController.phone)
router.get('/email', profileController.email)
router.get('/password', profileController.password)
router.get('/info', profileController.info)
router.get('/:page', profileController.redirectPath)
router.get('/', profileController.redirectPath)




export default router;