import express from 'express';
import account from './account';
import memo from './memo';
import message from './message';
import reply from './reply';

const router = express.Router();

router.use('/account', account);
router.use('/memo', memo);
router.use('/message', message);
router.use('/reply', reply);

export default router;
