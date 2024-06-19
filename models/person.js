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
    }
})

//Create persons model

const Person = mongoose.model('Person', personSchema);
module.exports = Person;  //exporting the model to be used in other files.
