const express = require('express');
const account = require('./account');
const posting = require('./posting');

const router = express.Router();
router.use('/account', account);
router.use('/posting', posting);

module.exports = router;
