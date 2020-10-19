var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/customer');
var cateGroyRouter = require('./routes/cateGory');
var goodsRouter = require('./routes/goods');
var shoppingCarRouter = require('./routes/shoppingCar');
var orderRouter = require('./routes/order');
var bannerRouter = require('./routes/banner');
var homeRouter = require('./routes/home');

var app = express();
//改写
var http = require('http');
var server = http.createServer(app);
//跨域
app.all('*', function(req, res, next) {
 
    res.header("Access-Control-Allow-Origin", "*");//项目上线后改成页面的地址
     
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
     
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
     
    next();
     
    });
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//静态资源
app.use(express.static(path.join(__dirname, 'public')));
//post 请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/', indexRouter);
app.use('/customer', usersRouter);
app.use('/cateGory', cateGroyRouter);
app.use('/goods', goodsRouter);
app.use('/shoppingCar', shoppingCarRouter);
app.use('/order', orderRouter);
app.use('/banner', bannerRouter);
app.use('/home', homeRouter);

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


server.listen('3000');
