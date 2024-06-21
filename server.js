/*
// Use of libraried also see from the documentations there are alot more 

var os = require('os')
var fs = require('fs')
// console.log(os)
var user = os.userInfo()
console.log(user.username)
fs.appendFile("greeting.txt", "Hii" + user.username + "!\n" , () => {
    console.log("It is a success")
})
*/
/*
//Export of data from another file

const notes = require("./notes")
var ageThere = notes.age
var result = notes.addNumber(ageThere, 10)
console.log(ageThere)
console.log(result)
*/
/*
//npm Lodash use.....read more in docmentation for other methods too 

var _ = require("lodash")
var items = [1,2,1,2,3,"oooo","pop",3]
console.log(_.uniq(items)) // remove duplicate

console.log(_.isString(0))
*/

//Express installation and usage...just copy it from the npm website
const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();  //To know that the mongodb server is in dotenv

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
const PORT = process.env.PORT || 3000

//Middleware Function //This is implemented after all of things done and hosted too
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`)
    next(); //Move on to the next phase
}
//Here as we included the logRequest we'll get the time and path when it is called
app.use(logRequest);
app.get('/', function (req, res) {
    res.send('This is Hotel Taj!! You are welcomed')
  })


//Import the router files
const personRoutes = require('./routes/personRoutes')
const menuItemsRoutes = require('./routes/menuItemsRoute')
//Use the routers
app.use('/person',personRoutes)
app.use('/menu',menuItemsRoutes)


//Arrow fn to know that server is live
app.listen(PORT , ()=>{
    console.log("Server is up and running on port 3000")
})