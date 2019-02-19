/**
 * @author sc
 * @date 2018/08/08
 */

function _respones(res, body, status){
    if (status) {
        return res.status(status).json(body);
    }
    res.json(body);
}


function _getIP(req) {
    var result = req.get('x-forwarded-for');
    if (result) {
        var ips = req.get('x-forwarded-for').split(/ *, */);
        if (ips.length >= 1) {
            return ips[0];
        }
    }
    result = req.headers['proxy-client-ip'] || req.headers['wl-proxy-client-ip'];
    if (/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/.test(result)) {
        return result;
    }
    result = req.ip || req._remoteAddress ||
        (req.connection && req.connection.remoteAddress) || undefined;

    if (result && result.substr(0, 7) == '::ffff:') {
        result = result.substr(7)
    }
    return result;
}

module.exports={
    getIP:_getIP,
    respones:_respones
}
