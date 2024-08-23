const mongoose = require("mongoose");

const menuschema =  mongoose.Schema({
    name: {
       type: String,
       required: true
    },
    spicelevel: {
        type: String,
        enum:['low','medium','high'],
        required: true
     },
    ratings: {
        type: Number,
        required: true
     },
    prize: {
        type: Number,
        required: true
     }
})

module.exports = mongoose.model("menu" , menuschema)