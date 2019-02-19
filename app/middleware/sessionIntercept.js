/**
 * @author sc
 * @date 2018/08/08
 */
var commonUtil=require('../utils/commonUtil')
var webResponseCode=require('../config/responseCode')

/**
 * @description 只要登录成功，Session中一定存在IP和UserAgent，这在做了限制
 * @param app
 * @private
 */
function _sessionIntercept(app){
    app.use(function (req, res, next) {
        let _ip = commonUtil.getIP(req);
        let _userAgent = req.headers['user-agent'];
        if (req.session.IP && req.session.IP != _ip) {
            req.session.destroy(function () {});
            return commonUtil.response(res, webResponseCode.common.IPChanged, 403);
        }
        if (req.session.userAgent && req.session.userAgent != _userAgent) {
            req.session.destroy(function () {});
            return commonUtil.response(res, webResponseCode.common.userAgentChanged, 403);
        }
        next();
    })
}

function _initSessionIntercept(req) {
    if (!req.headers['user-agent']) {
        return false;
    }
    req.session.IP = commonUtil.getIP(req);
    req.session.userAgent = req.headers['user-agent'];
    return true;
}


module.exports={
    sessionIntercept:_sessionIntercept,
    initSessionIntercept:_initSessionIntercept
}