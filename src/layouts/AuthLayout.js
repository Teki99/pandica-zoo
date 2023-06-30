import { Navigate, Outlet } from "react-router-dom";
import Footer from "../pages/Footer";
import Header from "../pages/Header";

const AuthLayout = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? <>  <Header/> <div className="content"> <Outlet/> </div><Footer/> </> : <Navigate to='/login'/> 
}
 
export default AuthLayout;