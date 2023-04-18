import express from 'express';
const router = express.Router();

import adminController from '../app/controllers/AdminController.js'


router.get('/', adminController.show)




export default router;