const mongoose = require("mongoose");

const taskSchema=new mongoose.Schema({
    title:String,
    description:String,
    complDay:Number,
    userid:{type: mongoose.Types.ObjectId,ref:"user"},
    timeTaken:Number,
    status:String
})

module.exports=mongoose.model("task",taskSchema)