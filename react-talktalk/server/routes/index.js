import express from 'express';
import account from './account';
import chat from './chat';

const router = express.Router();
router.use('/account', account);
router.use('/chat', chat);

export default router;
