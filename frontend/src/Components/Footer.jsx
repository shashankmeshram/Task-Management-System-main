const Footer=()=>{
    return(
        <>
        <footer style={{ background: "#1976d2", color: "#fff", textAlign: "center", padding: "1rem 0", position: "fixed", width: "100%", bottom: 0 }}>
            <p style={{ color: "#fff" }}>&copy; {new Date().getFullYear()} <span style={{ color: "#fff", fontWeight: "bold" }}>Task Management System</span>. All rights reserved.</p>
        </footer>
        </>
    )
}
export default Footer;