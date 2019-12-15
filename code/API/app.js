var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入json中间件
var bodyParser = require('body-parser');

var imageRouter = require('./routes/image');
var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginbackRouter = require('./routes/login_back');
var materialRouter = require('./routes/material');
var articleRouter = require('./routes/article');
var audRouter = require('./routes/aud');
var commentRouter = require('./routes/comment');
var likesRouter = require('./routes/likes');
var messageRouter = require('./routes/message');
var searchRouter = require('./routes/searc');
var usortRouter = require('./routes/usort');
var uploadRouter = require('./routes/image');
//未实现图片上传
var app = express();
app.all("*", function (req, res, next) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET");
    if(req.method == 'OPTIONS'){
	res.sendStatus(200);
    }else{
	next();
    }
})
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:false}));
//返回的对象是一个键值对,当extended为false时，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/images',imageRouter);//图片请求
app.use('/login', indexRouter);//登录
app.use('/register',registerRouter);//注册
app.use('/loginback',loginbackRouter);//后台登录
app.use('/material',materialRouter);//素材
app.use('/article',articleRouter);//作文练笔
app.use('/aud',audRouter);//素材增删改，作文增删改
app.use('/comment',commentRouter);//评论增删改
app.use('/likes',likesRouter);
app.use('/message',messageRouter);
app.use('/search',searchRouter);
app.use('/usort',usortRouter);//感兴趣标签
app.use('/upload',uploadRouter);//上传图片
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
