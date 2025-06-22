 import { RiShieldUserFill } from "react-icons/ri";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState(false);
  const [resetShow, setResetShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleResetClose = () => setResetShow(false);
  const handleResetShow = () => setResetShow(true);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [newPass, setNewPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = "http://localhost:8000/user/userLogin"
    try {
      const response = await axios.post(api, { email, password });
      console.log(response)
      localStorage.setItem("username", response.data.user.name)
      localStorage.setItem("userid", response.data.user._id)
      navigate("userDashboard")
    } catch (err) {
      console.log(err);
    }
  }

  const handleResetSubmit = async (e) => {
    e.preventDefault()
    if (newPass !== confirmPass) {
      alert("Passwords do not match!")
      return
    }

    try {
      const response = await axios.post("http://localhost:8000/user/resetPassword", {
        email,
        newPassword: newPass
      })
      console.log(response.data)
      alert("Password reset successfully")
      setResetShow(false)
    } catch (err) {
      console.error(err)
      alert("Error resetting password")
    }
  }

  return (
    <>
      <div className="header">
        <h3>Task Management System</h3> 
        <RiShieldUserFill id="usrIcn" onClick={handleShow} />

        {/* User Login Modal */}
        <Modal show={show} onHide={handleClose} dialogClassName="glasModl">
          <Modal.Header closeButton>
            <Modal.Title>User Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Email</Form.Label>
                <Form.Control type="email" as="input" value={email} onChange={(e) => { setEmail(e.target.value) }} className="neon-input" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Password :</Form.Label>
                <Form.Control as="input" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="neon-input" />
              </Form.Group>

              <button type="button" onClick={handleResetShow}>
                Reset Password
              </button>

              <button className="neon-login-btn" type="submit" onClick={handleSubmit}>
                LOGIN
              </button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Reset Password Modal */}
        <Modal show={resetShow} onHide={handleResetClose} dialogClassName="glasModl">
          <Modal.Header closeButton>
            <Modal.Title>Reset Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleResetSubmit}>
              <Form.Group className="mb-3" controlId="resetEmail">
                <Form.Label>Enter Your Email</Form.Label>
                <Form.Control type="email" as="input" value={email} onChange={(e) => setEmail(e.target.value)} className="neon-input" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" as="input" value={newPass} onChange={(e) => setNewPass(e.target.value)} className="neon-input" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" as="input" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="neon-input" />
              </Form.Group>

              <button className="neon-login-btn" type="submit">
                Reset Now
              </button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default Header