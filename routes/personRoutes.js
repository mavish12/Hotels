const express = require("express");
const router = express.Router();
const Person = require("../models/person");
const { jwtAuthMiddleware, generateToken } = require("../jwt");

//POST route to add a person
//Here all the /person will be changed to only / and the import in the server.js will have /person
//the path is changed from "/" to 'signup' while integrating token.
router.post("/signup", async (req, res) => {
  try {
    const newPersonData = req.body;
    const newPerson = new Person(newPersonData);

    // Save the new person to the database using await
    const savedPerson = await newPerson.save();
    console.log("Saved person to database");

    const payload = {
      id: savedPerson.id,
      username: savedPerson.username,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is: ", token);
    //To send the token also we'll send the token too to res
    res.status(201).json({ savedPerson: savedPerson, token: token });
  } catch (error) {
    console.error("Error saving person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Login Route for tokens
router.post("/login", async (req, res) => {
  try {
    //Extract the username and password from the request body
    const { username, password } = req.body;
    //Find the user by username
    const user = await Person.findOne({ username: username });
    //If the user doesnot exists or password doesnot match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    //Generate token
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);
    //Return token as response
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Profile route to fetch just by token and id
router.get('/profile', jwtAuthMiddleware, async(req,res)=>{
    try{
        const userData = req.user
        console.log("User Data: ",userData)
        const userId = userData.id
        const user = await Person.findById(userId)
        res.status(200).json(user);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
})


//GET method to get the person
router.get("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("People data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching people:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//GET method to get the perticular enum either its chef , manager or waiter
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //Extract the type from the URL Parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("Response Fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Worktype" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //Extract the id from the URL parameter
    const updatedPersonData = req.body; //Extract the updated data from the request body

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Person's data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //Extract the id from the URL parameter
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Person's data deleted");
    res.status(200).json({ message: "Person removed successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
