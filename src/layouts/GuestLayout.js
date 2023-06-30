import { Navigate, Outlet } from "react-router-dom";

const GuestLayout = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return !user ? <Outlet/> : <Navigate to='/'/> 
}
 
export default GuestLayout;