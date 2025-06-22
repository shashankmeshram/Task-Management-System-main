import axios from "axios";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import UserUrl from "../Config/UserUrl"
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/esm/Button";
import Modal from 'react-bootstrap/Modal';
const Task = () => {

  const [mydata, setMydata] = useState([])
  const [timeTaken, setTimeTaken] = useState("");

  const [show, setShow] = useState(false);
  const [selectedTask, setSelectedtask] = useState(null)
  const loadData = async () => {
    let api = `${UserUrl}task/?id=${localStorage.getItem("userid")}`
    try {
      const response = await axios.get(api)
      console.log(response.data)
      setMydata(response.data)
    }
    catch (err) {
      console.log(err)
    }

  }
  useEffect(() => {
    loadData()
  }, [])

  const submitTask = (task) => {
    setSelectedtask(task)
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
    setSelectedtask(null)
    setTimeTaken("")
  }
  const FinalSubmit = async() => {
  let api=$`{UserUrl}taskAddOn`
  const response=await axios.post(api,{  task: {
    taskId: selectedTask._id,
    timeTaken: timeTaken,
    userid: localStorage.getItem("userid"),
    status:"complete"
  }})

console.log(response.data)
setMydata(prev=>prev.map(task=>task._id=== selectedTask._id?{...task,status:"complete"}:task))
console.log(mydata)

  }
  const containerStyle = {
    padding: "20px",
    background: "#121212",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
    color: "#fff", // white text
  };

  const cardStyle = {
    borderRadius: "20px",
    background: "#1e1e1e",
    padding: "20px",
    boxShadow: "inset 4px 4px 8px #0a0a0a, inset -4px -4px 8px #2a2a2a",
    color: "#fff", // white text
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#3399ff", // blue heading
    textShadow: "0 0 5px rgba(51,153,255,0.4)",
  };

  const modalBodyStyle = {
    background: "#1e1e1e",
    color: "black", // white text
  };

 
  const ans = mydata.map((key) => {
    return (
      <>
        <tr key={key._id}>
          <td>{key.title}</td>
          <td>{key.description}</td>
          <td>{key.complDay}</td>
          <td>{key.status==="complete"?(<span style={{color: "#33ff33"}}>Complete</span>):(<span style={{color:"red"}}>{key.status}</span>)
            }</td>
          <td>
            {   
            key.status==="complete"?(<span style={{color:"#33ff33"}}>Submitted</span>):
   (<button onClick={() => { submitTask(key) }} className="neon-login-btn subTaskBtn">Submit Task</button>) 
              }
        
         
          </td>
        </tr>
      </>
    )
  })
  return (
        <>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Task List assign via Admin</h2>
        <div style={cardStyle}>
          <Table variant="light" striped bordered hover responsive>
            <thead>
              <tr>
                <th>Title#</th>
                <th>Description</th>
                <th>Compelition Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ans}
            </tbody>
          </Table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="custom-modal-header">
              <Modal.Title style={headingStyle}>Task Submittion</Modal.Title>
            </Modal.Header>
            <Modal.Body style={modalBodyStyle}>

              {selectedTask && (
                <>
                  <p><strong>Title:</strong> {selectedTask.title}</p>
                  <p><strong>Description:</strong> {selectedTask.description}</p>
                  <p><strong>Completion Day:</strong> {selectedTask.complDay}</p>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Time Taken :</Form.Label>
        <Form.Control type="number" value={timeTaken} onChange={(e)=>setTimeTaken(e.target.value)} className="neon-input"/>
      </Form.Group>

                </>

              )}

            </Modal.Body>
            <Modal.Footer>
              
              <button onClick={FinalSubmit} className="neon-login-btn">
                Submit Task
              </button>
            </Modal.Footer>
          </Modal>
        </div>
        </div>
      </>
      )
}
      export default Task;