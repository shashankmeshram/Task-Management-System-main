import { Link, Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"
const Dashboard = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate("/")
  }
  // Dark Neumorphic + Neon Styles (Blue/White Theme)
  const navDashStyle = {
    background: "#fff",
    color: "#222",
    padding: "20px",
    boxShadow: "inset 3px 3px 6px #e0e0e0, inset -3px -3px 6px #bdbdbd"
  };

  const arrngStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };
  const logoutBtnStyle = {
    background: "#fff",
    color: "#2979ff",
    border: "1px solid #2979ff",
    padding: "10px 20px",
    borderRadius: "12px",
    boxShadow: "0 0 5px rgba(41,121,255,.3), 0 0 10px rgba(41,121,255,.2), 0 0 15px rgba(41,121,255,.1), 0 2px 0 #eee",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease"
  };

  const sectionStyle = {
    display: "flex",
    height: "calc(100vh - 80px)",
    background: "#f5f5f5",
    color: "#222"
  };
  const leftStyle = {
    width: "250px",
    background: "#fafafa",
    padding: "20px",
    boxShadow: "inset 4px 4px 8px #e0e0e0, inset -4px -4px 8px #bdbdbd"
  };

  const rightStyle = {
    flex: 1,
    padding: "20px",
    background: "#f5f5f5",
    overflowY: "auto"
  };
  const ulStyle = {
    listStyle: "none",
    padding: 0
  };

  const liStyle = {
    padding: "12px 20px",
    margin: "12px 0",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "4px 4px 8px #e0e0e0, -4px -4px 8px #bdbdbd",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "#2979ff"
  };
  const linkStyle = {
    textDecoration: "none",
    color: "#2979ff",
    display: "block",
    fontWeight: "bold",
    transition: "color 0.3s"
  };


  return (
    <>
 <div className="navDash" style={navDashStyle}>
  
          <div className="arrng" style={arrngStyle}>
            <h5>Welcome : Admin , {localStorage.getItem("adminUsr")}</h5>
            <button onClick={logout}className="neon-login-btn logout">Logout</button>
          </div>

          </div>
          {/* <div className="myCards">
            <div className="first"></div>
            <div className="sec"></div>
            <div className="third"></div>
          </div> */}
      <section id='divideDash' style={sectionStyle}>
        <div id='left' style={leftStyle}>
          <ul style={ulStyle}> 
            <li style={liStyle}>Overview</li>
            <li style={liStyle}><Link to="createUser" className="myLink">Create User</Link></li>
            <li style={liStyle}><Link to="assignTask" className="myLink">Assign Task</Link></li>
            <li style={liStyle}><Link className="myLink" to="allTasks">Projects</Link></li>
            <li style={liStyle}>Services</li>
            <li style={liStyle}>Logout</li>

          </ul>
        </div>
        <div id='right' style={rightStyle}>
            <Outlet />
        </div>
      
      </section>
    </>
  )
}
export default Dashboard;