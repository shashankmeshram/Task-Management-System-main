const adminModel = require("../Modles/adminModel");
const userModel = require("../Modles/userModel");
const userPassword = require("../Middlewares/randomPsw");
const taskModel = require("../Modles/taskModel");
const nodemailer = require("nodemailer");

// ✅ ADMIN LOGIN
const adminLogin = async (req, res) => {
  const { adminId, adminPsw } = req.body;
  console.log("🔐 Login Attempt:", { adminId, adminPsw });

  try {
    const admin = await adminModel.findOne({ adminId: adminId.trim() });

    if (!admin) {
      console.log("❌ Admin not found:", adminId);
      return res.status(401).send({ msg: "Invalid Admin Id" });
    }

    console.log("✅ Found Admin:", admin.adminId);

    if (admin.adminPsw.trim() !== adminPsw.trim()) {
      console.log("❌ Password mismatch. Expected:", admin.adminPsw, "Provided:", adminPsw);
      return res.status(401).send({ msg: "Invalid Password" });
    }

    return res.status(200).send({
      admin: admin,
      msg: "Login Successfully!",
    });
  } catch (err) {
    console.error("🚨 Login error:", err);
    return res.status(500).send({ msg: "Server Error" });
  }
};

// ✅ CREATE USER
const createUser = async (req, res) => {
  const { name, email, designation } = req.body;
  const usrPass = userPassword();

  try {
    const user = await userModel.create({
      name,
      email,
      designation,
      password: usrPass,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shashankbadmosh1@gmail.com",
        pass: "rkmr vacu asmh pgrm",
      },
    });

    const mailOptions = {
      from: "shashankbadmosh1@gmail.com",
      to: email,
      subject: "Welcome to Task Manager",
      text: `Hello ${name},\n\nYour account has been created.\nYour temporary password is: ${usrPass}\n\nPlease login and change it.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("❌ Email Error:", error);
        return res.status(500).send({ msg: "Email sending failed" });
      } else {
        console.log("✅ Email sent: " + info.response);
        return res.status(201).send({ msg: "User created and email sent" });
      }
    });
  } catch (err) {
    console.log("❌ User creation error:", err);
    res.status(500).send({ msg: "User creation failed" });
  }
};

// ✅ GET ALL USERS
const showUserData = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (err) {
    console.log("❌ Show User Error:", err);
    res.status(500).send({ msg: "Error fetching users" });
  }
};

// ✅ ASSIGN TASK TO USER
const assignTask = async (req, res) => {
  const { title, description, complDay, userid, status } = req.body;

  try {
    await taskModel.create({
      title,
      description,
      complDay,
      userid,
      status: status || "Pending",
    });

    res.status(201).send({ msg: "User task successfully assigned" });
  } catch (err) {
    console.log("❌ Assign Task Error:", err);
    res.status(500).send({ msg: "Task assignment failed" });
  }
};

// ✅ DELETE TASK
const deleteTask = async (req, res) => {
  const taskId = req.query.id;

  try {
    const deletedTask = await taskModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(200).json({ msg: "Task deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Task Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ GET ALL TASKS WITH USER INFO
const taskShow = async (req, res) => {
  try {
    const allTasks = await taskModel.find().populate("userid", "name email");
    const shortenTask = allTasks.map((task) => {
      const { _id, title, status, complDay } = task;
      const { name, email } = task.userid;
      return { _id, title, status, complDay, name, email };
    });

    res.status(200).send(shortenTask);
  } catch (err) {
    console.log("❌ Task Show Error:", err);
    res.status(500).send({ msg: "Error fetching tasks" });
  }
};

// ✅ CHANGE TASK STATUS
const chngStatus = async (req, res) => {
  const { id } = req.query;

  try {
    await taskModel.findByIdAndUpdate(id, { status: "Pending" });
    res.status(200).send({ msg: "Status successfully updated" });
  } catch (error) {
    console.log("❌ Status Change Error:", error);
    res.status(500).send({ msg: "Status update failed" });
  }
};

module.exports = {
  adminLogin,
  createUser,
  showUserData,
  assignTask,
  deleteTask,
  taskShow,
  chngStatus,
};
