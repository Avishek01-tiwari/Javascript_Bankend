const express = require("express");
const router= express.Router();

const person=require('./../models/person.js');

router.post('/', async (req, res)=> {
    try {
            const data = req.body;
            const newperson = new person(data);
            const response = await newperson.save();
            console.log("data saved");
            res.status(200).json(response);            
    } 
    catch (error) {
        console.log("error");
        res.status(500).json({error: 'invalid'}); 
    }
})

router.get('/', async(req,res)=>{
    try {
        const data= await person.find({});
        console.log("data fetched");
        res.status(200).json(data);
    } catch (error) {
        console.log("error");
        res.status(500).json({error: 'invalid'}); 
    }
})

router.get('/:workas', async(req,res)=>{
    
    try {
        const workas= req.params.workas;
        if(workas=='chef' || workas=='manager'||workas=='waitor'){
            const response= await person.find({work:workas});
            console.log("data fetched");
            res.status(200).json(response);
    }
        else{
            res.status(404).json({error: 'data not available'}); 
        }
    } catch (error) {
        console.log("error");
        res.status(500).json({error: 'invalid'}); 
    }
})

router.delete('/:naam', async (req,res)=> {
    try {
        const naam= req.params.naam; 
        const deletedPerson = await person.findOneAndDelete({ name: naam });
        if (deletedPerson) {
            console.log(`Deleted person: ${deletedPerson}`);
        } else {
            console.log(`No person found with name ${naam}.`);
        }
    } catch (error) {
        console.error("Error deleting person:", error);
    }
})

router.put('/:id', async (req,res)=> {
    try {
        const id= req.params.id; 
        const updateperson= req.body;//update data for the person
        const response = await person.findByIdAndUpdate(id,updateperson,{
            new: true,
            runValidators: true,
        });
        if (!response) {
           return res.status(404).json({error: "please not found"});
        } 
            console.log('data update');
            res.status(200).json(response);
    } catch (error) {
        console.error(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})
module.exports=router;