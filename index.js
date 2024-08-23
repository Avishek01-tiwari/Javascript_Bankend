const express = require('express')
const fs = require('fs')
const url = require('node:url')

const app= express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const menu=require('./models/menu.js')
const db= require('./db')
require('dotenv').config()
//BLOCKING, SYNCHRONOUS WAY

const port=3000
const textin= fs.readFileSync('./myinfo.txt', 'utf-8')
//console.log(textin);
const myurl= new URL('https://www.instagram.com/soulart_sketching/?hl=en')
const notes=require('./note')
const { getCipherInfo } = require('crypto')
const router = require('./routers/personrouter.js')
const age=notes.age;
app.get('/',(req,res)=>{
    res.send(`${textin} \n Age= ${age}`)
    //res.send()
})
const textout=`this is my information \n ${textin}\n${(Date.now())}\n Thank You!`
fs.writeFileSync('./outtext.txt', textout)

app.get('/insta',(req,res)=>{
    res.send(myurl.href)
    
})

//Menu Section
app.post('/menu', async (req, res)=> {
    try {
            const data = req.body;
            const newmenu = new menu(data);
            const response = await newmenu.save();
            console.log("menu data saved");
            res.status(200).json(response);            
    } 
    catch (error) {
        console.log("error");
        res.status(500).json({error: 'invalid'}); 
    }
})

app.get('/menu', async(req,res)=>{
    try {
        const data= await menu.find({});
        console.log("menu data fetched");
        res.status(200).json(data);
    } catch (error) {
        console.log("error");
        res.status(500).json({error: 'invalid'}); 
    }
})
//Import personrouter
const personrouter = require('./routers/personrouter.js')
//Fetch person data
app.use('/person',personrouter);

app.listen(process.env.PORT,()=>
{
    console.log(`Get response at port: ${port}`);
})
//NON-BLOCKING, NON-SYNCHRONOUS WAY

fs.readFile('./read-this.txt', 'utf-8', (err,data1)=>{
    fs.readFile(`./${data1}.txt`, 'utf-8', (err,data2)=>{
        //console.log(data2);   
    })   
})// here it an example of non-sync code inside a non-sync code

console.log('this will print first');
