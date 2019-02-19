var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session  = require('express-session');
const sessionOptions = require('./middleware/session');
var logger = require('morgan');
var helmet = require('helmet');
var routes = require('./routes');
const webpack = require('webpack');

var app = express();

const config = require('../webpackConfig/webpack.prod.conf');
const compiler = webpack(config);

// 热更新
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  hot: true,
  inline: true,
  publicPath: '/build',
}));

app.use(require('webpack-hot-middleware')(compiler));

// view engine setup
app.set('views', path.join(__dirname, '../','views'));
app.set('view engine', 'ejs');



//日志配置
if (process.env.NODE_ENV !== 'prod') {
  app.use(logger('dev'));
} else {
  morgan('combined', {
      skip: function (req, res) {
          return res.statusCode < 400
      }
  })
}
require('./middleware/logger')(app);
//日志配置结束

app.use(session(sessionOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(helmet());
app.use(express.static(path.join(__dirname, '../dist','public')));

//session安全性防护
require('./middleware/sessionIntercept').sessionIntercept(app);

//路由
routes(app)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.ejs');
});



module.exports = app;
