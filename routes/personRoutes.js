const express = require('express')
const router = express.Router();
const Person = require('../models/person')


//POST route to add a person
//Here all the /person will be changed to only / and the import in the server.js will have /person 
router.post('/', async (req, res) => {
    try {
    const newPersonData = req.body;
    const newPerson = new Person(newPersonData);
    
    // Save the new person to the database using await
    const savedPerson = await newPerson.save();
    
    console. log('Saved person to database');
    res.status(201).json(savedPerson);
    } catch (error) {
    console.error('Error saving person:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
})
//GET method to get the person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('People data fetched');
        res.status(200).json(data)
        } catch (error) {
            console.error('Error fetching people:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    })
//GET method to get the perticular enum either its chef , manager or waiter
router.get('/:workType', async(req,res)=>{
        try{
            const workType = req.params.workType; //Extract the type from the URL Parameter
            if(workType =='chef' ||workType =='manager'|| workType =='waiter'){
                const response = await Person.find({work:workType})
                console.log("Response Fetched")
                res.status(200).json(response)
            }else{
                res.status(404).json({error: 'Invalid Worktype'})
            }
        }catch(error){
            console.log(error);
            res.status(500).json({error: 'Internal server error'})
    
        }
    })

router.put('/:id', async(req,res)=>{
    try{
    const personId = req.params.id;  //Extract the id from the URL parameter
    const updatedPersonData = req.body;  //Extract the updated data from the request body
    
    const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
    })
    if (!response) {                                            
        return res.status(404).json({ error: 'Person not found'})        
        }                                                                 
    console.log("Person's data updated")
    res.status(200).json(response)

    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.delete('/:id', async(req,res)=>{
    try{
    const personId = req.params.id;  //Extract the id from the URL parameter
    const response = await Person.findByIdAndDelete(personId)
    if (!response) {                                            
        return res.status(404).json({ error: 'Person not found'})        
        } 
    console.log("Person's data deleted")
    res.status(200).json({message : "Person removed successfully!"})
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
})
module.exports = router; 