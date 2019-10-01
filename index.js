const port = 3000;
const express = require('express');
const app = express();
//Import the mongoose module
const mongoose = require('mongoose');
const path = require('path');

app.all('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});


//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/test';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//open connection
db.once('open', function () {
  // we're connected!
  console.log('connected!')
});

//Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  item: String,
  quantity: Int16Array,
  priority: String
});

// Compile model from schema
var SomeModel = mongoose.model('SomeModel', SomeModelSchema);

// Create an instance of model SomeModel
var awesome_instance = new SomeModel({ a_string: 'awesome' });

// Save the new model instance, passing a callback
awesome_instance.save(function (err) {
  if (err) return handleError(err);
  // saved!
  console.log('save!');
});


//OrElse
//   SomeModel.create({ name: 'also_awesome' }, function (err, awesome_instance) {
//     if (err) return handleError(err);
//     // saved!
//   });

app.listen(port, function () {
  console.log("Listening to " + port);
});