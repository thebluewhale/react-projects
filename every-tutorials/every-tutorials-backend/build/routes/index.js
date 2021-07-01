'use strict';

var express = require('express');
var account = require('./account');
var posting = require('./posting');

var router = express.Router();
router.use('/account', account);
router.use('/posting', posting);

module.exports = router;