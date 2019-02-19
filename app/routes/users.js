var express = require('express');
var router = express.Router();
var user=require('../controller/user')

/* GET users listing. */
router.get('/',user.index);
router.get('/user_info_get',user.getUserInfo);


module.exports = router;
