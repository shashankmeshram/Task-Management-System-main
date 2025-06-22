import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const UserDashboard=()=>{
    const navigate = useNavigate()
    const logout=()=>{
        localStorage.clear()
        navigate("/")
    }
    // White & Blue Theme Styles
    const navDashStyle = {
      background: "#f5faff",
      color: "#1a237e",
      padding: "20px",
      boxShadow: "inset 3px 3px 6px #e3eafc, inset -3px -3px 6px #c5cae9"
    };

    const arrngStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    };

    const logoutBtnStyle = {
      background: "#e3f2fd",
      color: "#1565c0",
      border: "1px solid #1565c0",
      padding: "10px 20px",
      borderRadius: "12px",
      boxShadow: "0 0 5px rgba(21,101,192,.2), 0 0 10px rgba(21,101,192,.1), 0 0 15px rgba(21,101,192,.05), 0 2px 0 #90caf9",
      cursor: "pointer",
      fontWeight: "bold"
    };

    const sectionStyle = {
      display: "flex",
      height: "calc(100vh - 80px)",
      background: "#e3f2fd",
      color: "#1a237e"
    };

    const leftStyle = {
      width: "250px",
      background: "#e8eaf6",
      padding: "20px",
      boxShadow: "inset 4px 4px 8px #c5cae9, inset -4px -4px 8px #fff"
    };

    const rightStyle = {
      flex: 1,
      padding: "20px",
      background: "#f5faff",
      overflowY: "auto"
    };

    const ulStyle = {
      listStyle: "none",
      padding: 0
    };

    const liStyle = {
      padding: "12px 20px",
      margin: "12px 0",
      background: "#e3f2fd",
      borderRadius: "10px",
      boxShadow: "4px 4px 8px #c5cae9, -4px -4px 8px #fff",
      cursor: "pointer",
      transition: "all 0.3s ease",
      color: "#1565c0",
      fontWeight: "500"
    };

    const linkStyle = {
      textDecoration: "none",
      color: "#1a237e",
      display: "block"
    };

    return(
        <>
 <div className="navDash" style={navDashStyle}>
    <h6>User Dashboard</h6>
          <div className="arrng" style={arrngStyle}>
            <h5>Welcome : User , {localStorage.getItem("username")}</h5>
            <button onClick={logout} className='neon-login-btn logout'>LOGOUT!!!</button>
          </div>
          </div>
          <section id='divideDash' style={sectionStyle}>
        <div id='left' style={leftStyle}>
          <ul style={ulStyle}>
            <li  style={liStyle}>User Overview</li>
            <li  style={liStyle}><Link to="task" className="myLink">My Tasks</Link></li>
            <li style={liStyle}>Projects</li>
            <li style={liStyle}>Projects</li>
            <li style={liStyle}>Services</li>
            <li style={liStyle}>Logout</li>

          </ul>
        </div>
        <div id='right'>
            <Outlet />
        </div>
      
      </section>
        </>
    )
}
export default UserDashboard