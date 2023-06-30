import { useState } from "react";
import { useNavigate} from "react-router-dom";
const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (username === '' || password === '')
            return;

        async function fetchData() {
            const response = await fetch(`http://localhost:8000/users?username=${username}&&password=${password}`);
            if(!response.ok)
                setError('Error fetching the data!');
            else
            {
                const data = await response.json();
                if(data.length === 0)
                {
                    setError('Wrong username or password!');
                }
                else
                {
                    setError(null);
                    localStorage.setItem('user',JSON.stringify(data[0]));
                    console.log( JSON.parse(localStorage.getItem('user'))); 
                    navigate('/');
                }
                
            }
          }
          fetchData();
    }

    return (  
        <div className="login">
            <div className="login-card">
                <div className="logo"></div>
                <div className="row">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-6">
                    <h2>Please login</h2>
                    <form onSubmit = {handleSubmit}>
                        
                        <input 
                            type="text"
                            required
                            value = {username}
                            placeholder= "Username"
                            onChange = {(e) => setUsername(e.target.value)}
                        />
                        <input 
                            type="password"
                            required
                            value = {password}
                            placeholder= "Password"
                            onChange = {(e) => setPassword(e.target.value)}
                        />
                        <button>Login</button>
                        { error && <div className="errorMessage">{ error }</div> }
                        
                    </form>
                    </div>
                    <div className="col-md-3">
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Login;