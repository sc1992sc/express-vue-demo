/**
 * Created by felix on 3/5/15.
 */
'use strict';
try {
    var session = require('express-session');
    var connectRedis = require('connect-redis')(session);
} catch (e) {
    console.error('redis deps error: ', e);
    process.exit(1);
}

var configuration = require('../config');

module.exports = function() {
    console.log('start in redis')
    
    // Session Database
    var sessionOptions = {
        host: configuration.redis_session.host,
        port: configuration.redis_session.port,
        // pass: configuration.redis_session.password,
        db: configuration.redis_session.db,
    };

    var sessionStore = new connectRedis(sessionOptions);
    return {
        sessionStore: sessionStore
    }
}();
