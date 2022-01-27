const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const wishes = require('./routes/wishes');
const prophecies = require('./routes/prophecies');
const path = require('path');

//Set environment variables
dotenv.config();

//Connect to mongdb cloud
mongoose.connect(process.env.MongoDbUrl)
    .then(() => console.log('Connected to MongoDb'))
    .catch((err) => console.error('Could not connect to MongoDb', err));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//route for sending and receiving wishes
app.use('/api/wishes/', wishes);
//route for receiving prophecies
app.use('/api/prophecies/', prophecies);

//Listen on port
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Listening on port ' + port);
});