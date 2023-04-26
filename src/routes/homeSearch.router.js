import express from 'express';
const router = express.Router();

import homeSearchController from '../app/controllers/HomeSearchController.js'


router.get('/', homeSearchController.show);
router.post('/', homeSearchController.home);


export default router;
