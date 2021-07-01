import express from 'express';
import routeSample from './routeSample';

const router = express.Router();
router.use('/routeSample', routeSample);

export default router;
