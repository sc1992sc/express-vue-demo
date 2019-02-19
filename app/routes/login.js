var express = require('express');
var router = express.Router();

var login=require('../controller/login')

/* GET home page. */
router.get('/', login.index);
router.post('/sigin', login.sigin);
router.post('/logout', login.logout);

module.exports = router;
