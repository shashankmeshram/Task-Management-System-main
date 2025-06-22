import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/esm/Table";
import BackendUrl from "../Config/BackendUrl";
import tick from "../Images/checklist.png";
import load from "../Images/time.png";
import { MdDeleteForever, MdEditDocument } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Projects = () => {
  const [taskList, setTaskList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;
  const [showEdit, setShowEdit] = useState(false);
  const [editTask, setEditTask] = useState({});

  // Fetch all tasks
  const loadData = async () => {
    try {
      const api = `${BackendUrl}allTasks`;
      const response = await axios.get(api);
      setTaskList(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tasks");
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (!isConfirmed) return;
    try {
      const api = `${BackendUrl}deleteTask/?id=${id}`;
      await axios.delete(api);
      toast.success("Task deleted successfully!");
      loadData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete task!");
    }
  };

  // Reassign a task (mark status as incomplete)
  const chngStatus = async (id) => {
    try {
      const api = `${BackendUrl}chngStatus/?id=${id}`;
      await axios.get(api);
      toast.success("Task reassigned!");
      loadData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task status");
    }
  };

  // Edit modal handlers
  const handleEditShow = (task) => {
    setEditTask(task);
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTask({ ...editTask, [name]: value });
  };

  const handleEditSubmit = async () => {
    try {
      const api = `${BackendUrl}updateTask`;
      await axios.put(api, editTask);
      toast.success("Task updated successfully");
      setShowEdit(false);
      loadData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task");
    }
  };

  // Load data once on mount
  useEffect(() => {
    loadData();
  }, []);

  // Filter by search
  const filteredTasks = taskList.filter((task) => {
    const s = searchText.toLowerCase();
    return (
      task.title?.toLowerCase().includes(s) ||
      task.status?.toLowerCase().includes(s) ||
      task.name?.toLowerCase().includes(s) ||
      task.email?.toLowerCase().includes(s)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="containerStyle" style={{ background: "#f8faff", minHeight: "100vh", padding: "30px 0" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#1976d2",
          textShadow: "0 0 5px rgba(25,118,210,0.15)",
          fontWeight: 700,
          letterSpacing: "1px",
        }}
      >
        Projects Allotted:
      </h2>

      <div className="cardStyle" style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 16px rgba(25,118,210,0.08)",
        padding: "32px 24px",
        maxWidth: "1100px",
        margin: "0 auto"
      }}>
        {/* Search Box */}
        <div className="searchBox" style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "24px",
          background: "#e3f2fd",
          borderRadius: "8px",
          padding: "6px 14px"
        }}>
          <input
            type="text"
            placeholder="Search by task, status, name, email"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              flex: 1,
              fontSize: "16px",
              color: "#1976d2"
            }}
          />
          <span className="searchIcon" style={{ color: "#1976d2", fontSize: "18px" }}><FaSearch /></span>
        </div>

        {/* Task Table */}
        <Table
          striped
          bordered
          hover
          responsive
          style={{
            background: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 1px 8px rgba(25,118,210,0.07)"
          }}
        >
          <thead style={{ background: "#1976d2" }}>
            <tr>
              <th style={{ color: "#fff" }}>Task</th>
              <th style={{ color: "#fff" }}>Status</th>
              <th style={{ color: "#fff" }}>Deadline</th>
              <th style={{ color: "#fff" }}>User Name</th>
              <th style={{ color: "#fff" }}>User Email</th>
              <th style={{ color: "#fff" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr key={task._id} style={{ background: "#f4faff" }}>
                <td style={{ color: "#1976d2", fontWeight: 500 }}>{task.title}</td>
                <td>
                  <div className="icnImg" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {task.status === "complete" ? (
                      <>
                        <img src={tick} alt="Complete" style={{ width: "22px" }} />
                        <span style={{ color: "#388e3c", fontWeight: 600 }}>Complete</span>
                      </>
                    ) : (
                      <>
                        <img src={load} alt="Pending" style={{ width: "22px" }} />
                        <span style={{ color: "#d32f2f", fontWeight: 600 }}>{task.status || "incomplete"}</span>
                      </>
                    )}
                  </div>
                </td>
                <td style={{ color: "#1976d2" }}>{task.complDay}</td>
                <td style={{ color: "#1976d2" }}>{task.name}</td>
                <td style={{ color: "#1976d2" }}>{task.email}</td>
                <td>
                  <div className="icn" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {task.status === "complete" ? (
                      <button
                        onClick={() => chngStatus(task._id)}
                        className="neon-login-btn reassignBtn"
                        style={{
                          background: "#1976d2",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          padding: "4px 12px",
                          fontWeight: 500,
                          fontSize: "14px",
                          cursor: "pointer",
                          boxShadow: "0 1px 4px rgba(25,118,210,0.13)"
                        }}
                      >
                        Reassign
                      </button>
                    ) : (
                      <span style={{ color: "#0288d1", fontWeight: 500 }}>In Progress</span>
                    )}
                    <MdEditDocument
                      style={{
                        color: "#1976d2",
                        fontSize: "23px",
                        cursor: "pointer"
                      }}
                      onClick={() => handleEditShow(task)}
                    />
                    <MdDeleteForever
                      style={{
                        color: "#d32f2f",
                        fontSize: "27px",
                        cursor: "pointer"
                      }}
                      onClick={() => deleteTask(task._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <div className="paginationControls" style={{ marginTop: "18px", textAlign: "center" }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? "activePageBtn" : ""}
              style={{
                background: currentPage === i + 1 ? "#1976d2" : "#e3f2fd",
                color: currentPage === i + 1 ? "#fff" : "#1976d2",
                border: "none",
                borderRadius: "5px",
                margin: "0 4px",
                padding: "6px 14px",
                fontWeight: 500,
                fontSize: "15px",
                cursor: "pointer",
                boxShadow: currentPage === i + 1 ? "0 1px 6px rgba(25,118,210,0.18)" : "none"
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Edit Task Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton style={{ background: "#1976d2", color: "#fff" }}>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#f8faff" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#1976d2" }}>Task Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                required
                value={editTask.title || ""}
                onChange={handleEditChange}
                style={{ borderColor: "#1976d2" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#1976d2" }}>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                required
                value={editTask.description || ""}
                onChange={handleEditChange}
                style={{ borderColor: "#1976d2" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#1976d2" }}>Completion Days</Form.Label>
              <Form.Control
                type="text"
                name="complDay"
                required
                value={editTask.complDay || ""}
                onChange={handleEditChange}
                style={{ borderColor: "#1976d2" }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ background: "#e3f2fd" }}>
          <Button variant="secondary" onClick={() => setShowEdit(false)} style={{ background: "#fff", color: "#1976d2", border: "1px solid #1976d2" }}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit} style={{ background: "#1976d2", border: "none" }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Messages */}
      <ToastContainer />
    </div>
  );
};

export default Projects;
