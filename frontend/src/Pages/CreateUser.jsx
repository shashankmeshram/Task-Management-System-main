import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BackendUrl from '../Config/BackendUrl';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [designation, setDesignation] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        let api = `${BackendUrl}userCreation`;
        try {
            const response = await axios.post(api, { name: name, email: email, designation: designation })
            console.log(response)
     toast.success("User Registered!");
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <h6>Create New User</h6>

        <div className='formCover'>
             <Form className='myForm form2'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Name :</Form.Label>
        <Form.Control type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className='neon-input'/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Email :</Form.Label>
        <Form.Control type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} className='neon-input'/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Select Designation :</Form.Label>
       <Form.Select aria-label="Default select example" value={designation} onChange={(e)=>{setDesignation(e.target.value)}}  className="neumorphic-select">
        <option>Developer</option>
      <option>Devops Engineer</option>
      <option>Programmer</option>
                        
                        <option>Designer</option>
                        <option>DataBase Developer</option>
                        <option>Analyst</option>
                        <option>Coder</option>
    </Form.Select>
      </Form.Group>

      
      <button  type="submit" onClick={handleSubmit} className="neon-login-btn">
        Submit
      </button>
    </Form>
    </div>
 <ToastContainer autoClose={200}/>
        </>
    )
}
export default CreateUser