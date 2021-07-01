import express from 'express';
import account from './account';
import getPostingData from './getPostingData';
import help from './help';

const router = express.Router();
router.use('/account', account);
router.use('/getPostingData', getPostingData);
router.use('/help', help);

export default router;
