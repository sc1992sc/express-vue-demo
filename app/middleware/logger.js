'use strict';
try {
    var path = require('path');
    var morgan = require('morgan');
    var fs = require('fs');
    var FileStreamRotator = require('file-stream-rotator');
} catch (e) {
    console.error('middleware deps error: ', e);
    process.exit(1);
}


module.exports=function(app){
    var logDirectory = path.join(__dirname, '..', '..', 'logs')
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    var accessLogStream = FileStreamRotator.getStream({
        date_format: 'YYYYMMDD',
        filename: path.join(logDirectory, 'access-%DATE%.log'),
        frequency: 'daily',
        verbose: false
    })

    app.use(morgan('combined', {
        stream: accessLogStream,
        skip: function(req, res) {
            var flag = res.body && (!!res.body.errorcode || res.body.code);
            return res.statusCode < 400 && !res.errorlog && !flag
        }
    }))
}