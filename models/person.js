// import { Schema, model } from 'mongoose';
const mongoose = require("mongoose");

const personschema =  mongoose.Schema({
    name: {
       type: String,
       required: true
    },
    age: {
        type: Number,
        required: true
     },
    work: {
        type: String,
        enum:['chef','waitor','manager'],
        required: true
     },
    mobile: {
        type: Number,
        required: true
     },
    email: {
        type: String,
        required: true,
        unique: true
     }
     
})

//create person model
// const person= model('person', personschema);
// export default person;
module.exports = mongoose.model("person" , personschema)