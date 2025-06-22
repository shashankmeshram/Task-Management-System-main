const express= require("express")

const route=express.Router()

const userController=require("../Controllers/userController")

route.post("/userLogin",userController.loginCheck)
route.post("/resetPassword",userController.resetPsw)
route.get("/task",userController.Task)
route.post("/taskAddOn",userController.taskAddOn)

module.exports=route;