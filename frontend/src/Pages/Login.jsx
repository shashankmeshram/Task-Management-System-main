import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { MdEmail } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { toast } from "react-toastify"; // Make sure to install and import
import "react-toastify/dist/ReactToastify.css";

import BackendUrl from "../Config/BackendUrl";

const Login = () => {
  const [adminId, setAdminid] = useState("");
  const [adminPsw, setAdminpsw] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminId || !adminPsw) {
      toast.warning("Please enter both Email and Password");
      return;
    }

    try {
      const api = `${BackendUrl}loginchk`;
      const response = await axios.post(api, {
        adminId: adminId,
        adminPsw: adminPsw,
      });

      toast.success("Login successful");
      localStorage.setItem("adminUsr", response.data.admin.name);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);

      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.msg);
      } else if (err.response && err.response.status === 500) {
        toast.error("Server Error. Please try again later.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <div className="formCover">
      <Form className="myForm" onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text className="inptxt">
            <MdEmail className="env" />
          </InputGroup.Text>
          <Form.Control
            type="email"
            value={adminId}
            onChange={(e) => setAdminid(e.target.value)}
            placeholder="Enter email"
            className="email"
          />
        </InputGroup>
        <Form.Text className="txt">
          We'll never share your email with anyone else.
        </Form.Text>

        <InputGroup className="mb-3">
          <InputGroup.Text className="inptxt2">
            <RiLock2Fill className="env" />
          </InputGroup.Text>
          <Form.Control
            type="password"
            value={adminPsw}
            onChange={(e) => setAdminpsw(e.target.value)}
            placeholder="Enter Password"
            className="psw"
          />
        </InputGroup>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Remember me"
            className="text-white chk"
          />
        </Form.Group>

        <Button className="login" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
