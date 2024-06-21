const mongoose = require('mongoose')
const { age } = require('../notes')
const bcrypt = require('bcrypt');

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
//For bcrypt hasing
personSchema.pre('save',async function(next){
    const person= this;
    //Hash the password only if it is modified or its a new record
    if(!person.isModified('password')) return next();
    try{
        //Hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);
        //Overwrite the plain password with the hassed one
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

//Explaination in line 418 0f notes2.txt
personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //Use bcrypt to compare the provided passworcd with the hashes password.
        const isMatch= await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}



//Create persons model

const Person = mongoose.models.Person ||mongoose.model('Person', personSchema);
module.exports = Person;  //exporting the model to be used in other files.
