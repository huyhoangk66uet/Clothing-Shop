import express from 'express';
const router = express.Router();

import profileController from '../app/controllers/ProfileController.js'


router.put('/save-info', profileController.saveInfo)
router.get('/info', profileController.info)
router.get('/:page', profileController.redirectPath)
router.get('/', profileController.redirectPath)




export default router;