const mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var Shop = new Schema({
  item: {
    type: String,
    unique: true,
    required: true
  },
  quantity: {
    type: Number,
    unique: true,
    required: true
  },
  priority: {
    type: Number,
    min: 1,
    max: 3,
    unique: true,
    required: true
  }
});

// Compile model from schema
module.exports = mongoose.model('Item', Shop);