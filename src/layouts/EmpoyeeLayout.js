import { Navigate, Outlet } from "react-router-dom";

const EmployeeLayout = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user && user.type === 'employee') ? <Outlet/> : <Navigate to="/login"/>
}
 
export default EmployeeLayout;