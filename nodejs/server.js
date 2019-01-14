const express = require('express');
const logger = require('morgan');
const news = require('./routes/news');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
const app = express();

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/news', news);

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(express.json());

app.listen(3000, function(){
    console.log('Server on port 3000 started');
});