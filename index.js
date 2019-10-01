const port = 3000;
const express = require('express');
const app = express();
//Import the mongoose module
const mongoDbConnect = require('./mongoDbConnect');
const path = require('path');

app.all('/', function(req,res){
    res.sendFile(path.join(__dirname, 'index.html'));
});


mongoDbConnect();

//Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  a_string: String,
  a_date: { type: Date, default: Date.now() }
});

// Compile model from schema
var SomeModel = mongoose.model('SomeModel', SomeModelSchema );

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