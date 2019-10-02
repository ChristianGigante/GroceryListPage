const mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var Shop = new Schema({
  item: String,
  quantity: String,
  priority: String
});

// Compile model from schema
module.exports = mongoose.model('Item', Shop);