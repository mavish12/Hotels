
const mongoose = require('mongoose')
//Define the mongodb connection URL
const mongoURL = 'mongodb://localhost:27017/hotels' //We can replace "mydatabase" with our database name like here "hotels"
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