import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [oldPassword,setOldPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(oldPassword !== user.password)
            setError('Worng old password!');
        else //good old password
        {
            user.password = newPassword;
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };
    
            async function UpdateData() {
                const response = await fetch(`http://localhost:8000/users/${user.id}`,requestOptions);
                if(!response.ok)
                    setError('Error fetching the data!');
                else
                {
                    const data = await response.json();
                    if(data.length === 0)
                    {
                        setError('No user with username'+user.id);
                    }
                    else
                    {
                        setError(null);
                        localStorage.setItem('user',JSON.stringify(data));
                        console.log( JSON.parse(localStorage.getItem('user'))); 
                        navigate('/login'); //this is the login page and will authomaticaly logout the user (remove from localstorage)
                    } 
                }
            }
            UpdateData();
        } 
    }

    return (  
        <div className="change-profile">
            <div className="container-fluid">
            <h3>My profile</h3> 
                <div className="row">
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-10">
                        <form onSubmit = {handleSubmit}>
                            <div className="row">
                                <div className="col-md-3">
                                    <label>Old password</label>
                                </div>
                                <div className="col-md-9">
                                    <input 
                                        type="text"
                                        required
                                        value = {oldPassword}
                                        placeholder= ""
                                        onChange = {(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-md-3">
                                    <label>New password</label>
                                </div>
                                <div className="col-md-9">
                                    <input 
                                        type="text"
                                        required
                                        value = {newPassword}
                                        placeholder= ""
                                        onChange = {(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button>Save changes</button>
                            { error && <div className="errorMessage">{ error }</div> }    
                        </form>
                    </div>    
                    <div className="col-md-1">

                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ChangePassword;