import express from 'express';
import getTimetableData from './getTimetableData';

const router = express.Router();
router.use('/getTimetableData', getTimetableData);

export default router;
