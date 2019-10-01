export default function () {
    //Import the mongoose module
    const mongoose = require('mongoose');

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
}