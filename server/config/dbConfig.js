const mongoose = require('mongoose');

// const dotenv = require("dotenv");
// dotenv.config();

mongoose.connect('mongodb+srv://namanhiran:QJdDfPvfMLQWCJLN@cluster0.srdr37i.mongodb.net/watchrev?retryWrites=true&w=majority', {useNewUrlParser: true});

const connection = mongoose.connection;

connection.on('connected'  , ()=>{
    console.log('Mongo DB Connection Successful');
})

connection.on('error'  , (err)=>{
    console.log('Mongo DB Connection Failed');
})

module.exports = connection;