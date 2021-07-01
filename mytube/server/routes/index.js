import express from 'express';
import fileManagement from './fileManagement';
import account from './account';
import videoStreaming from './videoStreaming';
import search from './search';

const router = express.Router();
router.use('/file', fileManagement);
router.use('/account', account);
router.use('/videoStreaming', videoStreaming);
router.use('/search', search);

export default router;
