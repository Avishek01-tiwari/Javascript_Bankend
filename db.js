const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/mydb';

mongoose.connect(mongoURL,{
    useNewUrlParser :true,
    useUnifiedTopology : true
})

const db= mongoose.connection;

db.on('connected',()=>{
    console.log("db is connected");
    
})

db.on('error',(err)=>{
    console.log("db showing error", err);
   });
    
db.on('disconnected',()=>{
    console.log("db is disconnected");
    
})

// now export the db connection
module.exports=db;
