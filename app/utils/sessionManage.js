/**
 * Created by chenchuanbin
 * sc
 * 18/08/08.
 */

 /**
 * 页面请求检查session, 如果没有session将重定向页面
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
var _checkSessionForPageRequest = function(req, res, next) {
    if (!req.session.username) {
        return res.redirect('/');
    }

    next();
}

module.exports={
    checkSessionForPageRequest:_checkSessionForPageRequest
}