const express = require('express');
const user = require('./user');
const marker = require('./marker');

const router = express.Router();
router.use('/user', user);
router.use('/marker', marker);

module.exports = router;