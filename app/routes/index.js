var sessionManage=require('../utils/sessionManage')
var redisConfig=require('../config/const/redis')
var redisUtil=require('../utils/redisUtil')

var SINGLE_SESSION_PREFIX=redisConfig.singleLoginPrefix;
var DEAD_LINE=redisConfig.sessionMaxAge;

var login = require('./login');
var users = require('./users');

module.exports = function(app){
    //单点登录重置过期时间
    app.use(function (req, res, next) {
        if (req.session.username) {
            let key = SINGLE_SESSION_PREFIX + req.session.username;
            redisUtil.expire(key, DEAD_LINE, function (err, reply) {
                //error log
            });
        }
        next();
    });

    app.use('/', login);
    app.use('/users',sessionManage.checkSessionForPageRequest,users);
};
