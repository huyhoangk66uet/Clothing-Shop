import express from 'express';
const router = express.Router();

import profileController from '../app/controllers/ProfileController.js'


router.put('/change-phone', profileController.changePhone)
router.put('/change-email', profileController.changeEmail)
router.put('/change-password', profileController.changePassword)
router.put('/save-info', profileController.saveInfo)
router.get('/password', profileController.loadPassword)
router.get('/info', profileController.loadInfo)
router.get('/:page', profileController.redirectPath)
router.get('/', profileController.redirectPath)




export default router;