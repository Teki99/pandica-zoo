import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangeProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [firstname,setFirstname] = useState(user.firstname);
    const [lastname,setLastname] = useState(user.lastname);
    const [address,setAddress] = useState(user.address);
    const [contact,setContact] = useState(user.contact);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        user.firstname = firstname;
        user.lastname = lastname;
        user.address = address;
        user.contact = contact;

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
                    navigate('/profile');
                } 
            }
        }
        
        UpdateData();

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
                                    <label>Firstname</label>
                                </div>
                                <div className="col-md-9">
                                    <input 
                                        type="text"
                                        required
                                        value = {firstname}
                                        placeholder= {user.firstname}
                                        onChange = {(e) => setFirstname(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <label>Lastname</label>
                                </div>
                            
                                <div className="col-md-9">
                                    <input 
                                        type="text"
                                        required
                                        value = {lastname}
                                        placeholder= {user.lastname}
                                        onChange = {(e) => setLastname(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <label>Address</label>
                                </div>
                                <div className="col-md-9">
                                    <input 
                                        type="text"
                                        required
                                        value = {address}
                                        placeholder= {user.address}
                                        onChange = {(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <label>Contact</label>
                                </div>
                                <div className="col-md-9">
                                    <input 
                                        type="text"
                                        required
                                        value = {contact}
                                        placeholder= {user.contact}
                                        onChange = {(e) => setContact(e.target.value)}
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
 
export default ChangeProfile;