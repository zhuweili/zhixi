var express = require('express');
var app = express();
var useragent = require('express-useragent');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.connect('mongodb://zhixi:zhixi2018@ds221258.mlab.com:21258/zhixi');

var indexRouter = require('./routes/index');
var restRouter = require('./routes/rest');

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));
app.use(useragent.express());





app.use('/', indexRouter);
app.use('/api/v1', restRouter);



app.listen(3000);