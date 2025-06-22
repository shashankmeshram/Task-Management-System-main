const mongoose=require("mongoose")

const adminSchema=new mongoose.Schema({
    name:String,
    adminId:String,
    adminPsw:String
})

module.exports= mongoose.model("admin",adminSchema)