const userModel=require("../Modles/userModel")
const taskModel =require("../Modles/taskModel")

const loginCheck=async(req,res)=>{
    const {email,password}=req.body
try{
    const user=await userModel.findOne({email:email})
    if(!user){
        res.status(400).send({msg:"Invalid Email Id!"})
    }
    if(user.password!=password){
        res.status(400).send({msg:"Invalid Password"})
    }
    res.status(200).send({msg:"Login Successfull",user})
}
catch(err){
    console.log(err)
}

}
const resetPsw=async(req,res)=>{
const { email, newPassword } = req.body;
  try {
    const user = await userModel.findOneAndUpdate(
      { email },
      { password: newPassword }, // no bcrypt here as you said
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
const Task=async(req,res)=>{
const {id}=req.query
console.log(id)
try{
    const task= await taskModel.find({userid:id})
    console.log(task)
    res.status(200).send(task)
}
catch(err){
    console.log(err)
}
}
const taskAddOn=async(req,res)=>{
  const { taskId,timeTaken,userid,status}=req.body.task
  console.log(taskId)
try{
const task=await taskModel.findById(taskId)
task.timeTaken=timeTaken
task.status=status
await task.save()
res.status(200).send({msg:"Task Submitted by User",task})
}catch(err){
  console.log(err)
}

}

module.exports={
    loginCheck,Task,taskAddOn,resetPsw
}