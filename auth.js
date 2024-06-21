const passport = require("passport"); //Passport.js middleware for authentication
const LocalStrategy = require("passport-local").Strategy; //This stretegy is also known as Username and password stretegy
const Person = require('./models/person')

passport.use(
    new LocalStrategy(async (USERNAME, password, done) => {
      // Your authentication logic here
      try {
        // console.log("Recieved credentials:", USERNAME, password);
        const user = await Person.findOne({ username: USERNAME });
        if (!user) return done(null, false, { message: "Incorrect username." });
        const isPasswordMatch = user.password === password ? true : false;
        if (isPasswordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      } catch (error) {
        return done(error);
      }
    })
  );

  module.exports = passport
  