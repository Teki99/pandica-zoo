import { useNavigate} from "react-router-dom";

const Profile = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    return (  
        <div className="profile">
            <div className="container-fluid">
            <h3>My profile</h3> 
                <div className="row">
                    <div className="col-md-6">
                        <p>Firstname : {user.firstname}</p> 
                        <p>Lastname : {user.lastname}</p> 
                        <p>Address : {user.address}</p> 
                        <p>Contact : {user.contact}</p> 

                        <button onClick={()=>{navigate('/changeProfile')}}>Change personal information</button>
                    </div>    
                    <div className="col-md-6">
                        <p>Username : {user.username}</p>
                        <p>Password : ********</p>
                        <button onClick={()=>{
                            navigate('/changePassword');
                        }}>Change password</button>
                    </div>   
                </div>
            </div>
        </div>
    );
}
 
export default Profile;