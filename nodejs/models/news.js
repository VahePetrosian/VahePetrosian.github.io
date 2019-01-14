const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NewsSchema = new Schema({
 title: {
  type: String,
  trim: true,
  required: false
 },
 description: {
  type: String,
  trim: true,
  required: false
 }
});

module.exports = mongoose.model('News', NewsSchema);