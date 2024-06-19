const express = require('express')
const router = express.Router();
const MenuItem = require('../models/MenuItem')

router.post('/', async(req,res)=>{
    try{
        const newMenuItemData = req.body;
        const newMenuItem = new MenuItem(newMenuItemData);
        const savedMenuItem = await newMenuItem.save();
        console.log('Saved menu item to database');
        res.status(201).json(savedMenuItem);
        }catch(error){
            console.error('Error saving menu item:', error);
            res.status(500).json({ error: 'Internal server error' });
            }
})

router.get('/',async(req,res)=>{
    try{
        const menuData = await MenuItem.find();
        console.log('Menu data fetched');
        res.status(200).json(menuData)
    }catch(error){
        console.error('Error fetching menu:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router

