var singleLogin=require('../middleware/singleLogin')
var sessionIntercept=require('../middleware/sessionIntercept')
var commonUtil=require('../utils/commonUtil')
var webResponseCode=require('../config/responseCode')
var redisConfig=require('../config/const/redis');
const SESSION_PERFIX=redisConfig.sessionPrefix


var index=(req,res)=>{
    if(req.session.username){
        res.redirect('/users')
    }else{
        res.render('app.ejs');
    }
}

var sigin=(req,res)=>{
    global.G.logger.info('登录操作')
    var {username,code}=req.body;

    var newSessionID=SESSION_PERFIX+req.sessionID;

    req.session.username=username;

    singleLogin(username,newSessionID)

    if (!sessionIntercept.initSessionIntercept(req)) {
        req.session.destroy(function () {});
        G.logger.error('checkAuthFromRedis: undefined headers user-agent');
        return commonUtil.response(res, webResponseCode.common.illegalParam, 403);
    }

    req.session.save((err) => {
        if (err) {
            req.session.destroy(function () {});
            G.logger.error('req.session.save: save session failed');
        }
        res.status(200).json({
            code:0,
            data:{},
            mes:'登录成功'
        })
    });
}

var logout=(req,res)=>{
    if (req.session.username) {
        delete req.session.username;
    }
    req.session.destroy();

    return res.status(200).json({
        code:'000000'
    });
}


module.exports={
    index:index,
    sigin:sigin,
    logout:logout
}