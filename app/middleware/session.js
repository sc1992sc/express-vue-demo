var redisStore = require('./redis').sessionStore;
var redisConfig=require('../config/const/redis')
redisStore.prefix = redisConfig.sessionPrefix;
var sessionMaxAge = 1000 * 60 * 60 * 24;

// Session
var sessionOptions = {
    store: redisStore,
    key: 'wsid.sid',
    resave: true,
    saveUninitialized: true,
    secret: 'PFlNVZR2_dIlPqrJApIKi6O8bPlZI58OvcEPDek',
    cookie: {
        maxAge: sessionMaxAge // 60 * 24 // 24 hours
    }
};

module.exports = sessionOptions;