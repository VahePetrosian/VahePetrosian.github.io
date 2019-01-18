const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/news';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;