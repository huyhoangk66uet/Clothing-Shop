import express from 'express';
const router = express.Router();

import profileController from '../app/controllers/ProfileController.js'



router.get('/phone', profileController.redirectPath)
router.get('/email', profileController.redirectPath)
router.get('/password', profileController.redirectPath)
router.get('/info', profileController.show)
router.get('/:page', profileController.redirectPath)
router.get('/', profileController.redirectPath)




export default router;