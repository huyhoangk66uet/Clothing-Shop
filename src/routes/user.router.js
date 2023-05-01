import express from 'express';
const router = express.Router();

import userController from '../app/controllers/UserController.js'


router.get('/', userController.show)




export default router;