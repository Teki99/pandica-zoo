import { Navigate, Outlet } from "react-router-dom";

const VisitorLayout = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user && user.type === 'visitor') ? <Outlet/> : <Navigate to="/login"/>
}
 
export default VisitorLayout;