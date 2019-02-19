/**
 * Created by sc on 08/08/18.
 */
const configuration = require('../config/index');
var redis = require('redis');


var options={
    host: configuration.redis_session.host,
    port: configuration.redis_session.port,
    db: configuration.redis_session.db,
    // password: configuration.redis_session.password,
}


function getClient(){
    let redisClient=redis.createClient(options)

    redisClient.on('error', function (err) {
        console.log(err)
    });

    return redisClient;
}

function _get(key,callback){
    var client=getClient();

    client.get(key,function(err,res){
        client.quit();
        if(err){
            console.log(err)
            return callback(err)
        }
        return callback(null,res)
    })
}

function _set(key,value,callback){
    var client=getClient();

    client.set(key,value,function(err,res){
        client.quit();
        if(err){
            console.log(err)
            return callback(err)
        }
        return callback(null,res)
    })
}

function _del(key, callback) {
    let client = getClient();
    client.del(key, function(err, reply) {
        client.quit();
        if (err) {
            return callback(err);
        }
        return callback(null, reply);
    });
}

function _expire(key, deadline, callback) {
    let client = getClient();
    let success = false;
    client.expire(key, deadline, function(err, reply) {
        client.quit();
        if (err) {
            return callback(err);
        }
        return callback(null, reply);
    });
}

module.exports = {
    get: _get,
    set: _set,
    del: _del,
    expire: _expire
}