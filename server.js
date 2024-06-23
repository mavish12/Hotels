//Express installation and usage...just copy it from the npm website
const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config(); //To know that the mongodb server is in dotenv
const passport = require("./auth"); //Passport.js middleware for authentication

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

//Middleware Function //This is implemented after all of things done and hosted too
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`
  );
  next(); //Move on to the next phase
};
//Here as we included the logRequest we'll get the time and path when it is called
app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session:false})
app.get("/", function (req, res) {
  res.send("This is Hotel Taj!! You are welcomed");
});

//Import the router files
const personRoutes = require("./routes/personRoutes");
const menuItemsRoutes = require("./routes/menuItemsRoute");
// const Person = require("./models/person");
//Use the routers
app.use("/person", personRoutes);
app.use("/menu", menuItemsRoutes);

//Arrow fn to know that server is live
app.listen(PORT, () => {
  console.log("Server is up and running on port 3000");
});
