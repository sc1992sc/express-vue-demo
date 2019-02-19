const path         = require('path');
const winston      = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const logDirectory = path.join(__dirname, '..', '..', 'logs');
const fs           = require('fs');
const moment       = require('moment');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

if(process.env.NODE_ENV !== 'prod') {
    winston.level = 'debug';
} else {
    winston.level = 'info';
}

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const winstonLog=winston.createLogger(
    {
        format: combine(
            label({ label: 'right meow!' }),
            timestamp(),
            myFormat
        ),
        transports:[
            new (winston.transports.File)(
                {
                    name: 'error-file',
					filename: path.join(logDirectory, moment().format('YYYY-MM-DD') + '--error.log'),
					level: 'error',
                }
            ),
            new (winston.transports.File)(
                {
                    name: 'debug-file',
					filename: path.join(logDirectory, moment().format('YYYY-MM-DD') + '--winston.log'),
					level: winston.level,
                }
            )
        ]
    }
)

global.G         = {
	logger: winstonLog
}