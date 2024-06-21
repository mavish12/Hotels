
const mongoose = require('mongoose')
require('dotenv').config();  //To know that the mongodb server is in dotenv 

//Define the mongodb connection URL
// const mongoURL = 'mongodb://localhost:27017/hotels' //We can replace "mydatabase" with our database name like here "hotels" this is local DB connection this is for initial
const mongoURL = process.env.MONGODB_URL_LOCAL  // This is after .env file 
// const mongoURL =process.env.MONGODB_URL   //This is onlinr Atlas DB connection
//Establish the Mongo DB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get the default connection 
//Mongoose maintains a default connection object representing the MongoDB connection.
const db= mongoose.connection;

//Define event listner for Database connection.
db.on('connected', ()=>{
    console.log('Connected to MongoDB server')
})
db.on('error', (err)=>{
    console.log('MongoDB connection error:', err)
})
db.on('disconnected', ()=>{
    console.log('MongoDB server disconnected')
})

//Export thr database connection
module.exports=db;