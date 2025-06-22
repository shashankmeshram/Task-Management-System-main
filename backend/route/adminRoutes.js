const express = require("express");
const route = express.Router();
const adminController=require("../Controllers/adminController")
route.post("/loginchk",adminController.adminLogin)
route.post("/userCreation",adminController.createUser)
route.get("/showUserData",adminController.showUserData)
route.post("/assignTask",adminController.assignTask)
route.get("/allTasks",adminController.taskShow)
route.get("/chngStatus",adminController.chngStatus)
route.delete("/deleteTask",adminController.deleteTask)
module.exports=route;