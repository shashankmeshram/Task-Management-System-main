import { useState, useEffect } from "react";
import BackendUrl from "../Config/BackendUrl";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const AssignTask = () => {
  const [mydata, setMydata] = useState([]);
  const [input, setInput] = useState({});
  const [show, setShow] = useState(false);
  const [userid, setUserid] = useState("");

  const handleClose = () => setShow(false);

  const handleShow = (uid) => {
    setUserid(uid);
    setShow(true);
  };

  const loadData = async () => {
    let api = `${BackendUrl}showUserData`;
    try {
      const response = await axios.get(api);
      console.log(response.data);
      setMydata(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
    console.log(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${BackendUrl}assignTask`;
    try {
      const response = await axios.post(api, { ...input, userid });
      console.log(response.data);
      setShow(false); // close modal after successful assignment
    } catch (err) {
      console.log(err);
    }
  };

  const containerStyle = {
    padding: "20px",
    background: "#f5f5f5",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
    color: "#222",
  };

  const cardStyle = {
    borderRadius: "20px",
    background: "#fff",
    padding: "20px",
    boxShadow: "inset 4px 4px 8px #e0eaff, inset -4px -4px 8px #b3cfff",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#0066ff",
    textShadow: "0 0 5px rgba(0,102,255,0.2)",
  };

  const modalBodyStyle = {
    background: "#e6f0ff",
    color: "#222",
  };

  return (
    <>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Assign Task To User</h2>
        <div style={cardStyle}>
          <Table variant="light" striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Work</th>
              </tr>
            </thead>
            <tbody>
              {mydata.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.designation}</td>
                  <td>
                    <button
                      onClick={() => handleShow(user._id)}
                      className="neon-login-btn"
                    >
                      Assign Task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className="custom-modal-header">
            <Modal.Title style={headingStyle}>Assign Task:</Modal.Title>
          </Modal.Header>
          <Modal.Body style={modalBodyStyle}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Enter Task Title:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={handleInput}
                  className="neon-input"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Enter Description:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  onChange={handleInput}
                  className="neon-input"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Completion Days:</Form.Label>
                <Form.Control
                  type="text"
                  name="complDay"
                  onChange={handleInput}
                  className="neon-input"
                  required
                />
              </Form.Group>
              <Button variant="success" type="submit" className="neon-login-btn">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AssignTask;
