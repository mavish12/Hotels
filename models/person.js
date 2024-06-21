const mongoose = require('mongoose')
const { age } = require('../notes')

//Define the persons schema
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
    },
    salary:{
        type:Number,
        required:true
    },
    //Because for authentication we'll require username and password 
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

//Create persons model

const Person = mongoose.models.Person ||mongoose.model('Person', personSchema);
module.exports = Person;  //exporting the model to be used in other files.
