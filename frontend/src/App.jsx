import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Pages/Login"
import Layout from "./Layout"
import Dashboard from "./Pages/Dashboard"
import CreateUser from "./Pages/CreateUser"
import AssignTask from "./Pages/AssignTask"
import UserDashboard from "./Pages/UserDashboard"
import Task from "./Pages/Task"
import Projects from "./Pages/Projects"

const App = () => {
    return (
        <>
<BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="dashboard" element={<Dashboard />}>
                <Route path="createUser" element={<CreateUser />} />
                <Route path="assignTask" element={<AssignTask />} />
                <Route path="allTasks" element={<Projects />} />
            </Route>
            <Route path="userDashboard" element={<UserDashboard />}>
                <Route path="task" element={<Task />} />
            </Route>
        </Route>
    </Routes>
</BrowserRouter>
  </>
    )
}
export default App