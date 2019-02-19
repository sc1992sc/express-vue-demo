var redisUtil=require('../utils/redisUtil');
var redisConfig=require('../config/const/redis')
const SESSION_LOGIN=redisConfig.sessionPrefix;
const DEAD_LINE = redisConfig.sessionMaxAge; // 60 * 30 单位秒

module.exports=function(_username,newSessionId){

    var username=SESSION_LOGIN+_username;

    redisUtil.get(username,function(err,preSessionID){

        redisUtil.set(username,newSessionId,function(err,reply){
            redisUtil.expire(username, DEAD_LINE, (err, reply) => {
                // ...
            })
        })
        if(err)
            return
        
        if(preSessionID==null)
            return

        redisUtil.del(preSessionID, function(err, reply) {
            // console.log('---31----', err, reply);
        })
    })
}