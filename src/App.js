import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Packages from './pages/Packages';
import Events from './pages/Events';
import Animals from './pages/Animals';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Cart from './pages/Cart';
import Requests from './pages/Requests';
import NewAnimal from './pages/NewAnimal';
import ChangePassword from './pages/ChangePassword';
import ChangeProfile from './pages/ChangeProfile';
import GuestLayout from './layouts/GuestLayout';
import AuthLayout from './layouts/AuthLayout';
import VisitorLayout from './layouts/VisitorLayout';
import EmployeeLayout from './layouts/EmpoyeeLayout';
import AnimalDetails from './pages/AnimalDetails';

function App() {
  return (
    <Router>
      <div className="App">
            <Routes>
              <Route element={<AuthLayout/>}>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/profile" element={ <Profile/>}/>
                <Route path='/changePassword' element={<ChangePassword/>}/>
                <Route path='/changeProfile' element={<ChangeProfile/>}/>
                <Route path="/animals" element={<Animals/>}/>
                <Route element={<VisitorLayout/>}>          
                  <Route path="/packages" element={<Packages/>}/>
                  <Route path="/events" element={ <Events/>}/>
                  <Route exact path='/animals/:id' element={<AnimalDetails/>}/>
                  <Route path="/contact" element={<Contact/>}/>
                  <Route path="/notifications" element={<Notifications/>}/>
                  <Route path="/cart" element={<Cart/>}/>
                </Route>   
                <Route element={<EmployeeLayout/>}>          
                  <Route path='/requests' element={<Requests/>}/>
                  <Route path='/newAnimal' element={<NewAnimal/>}/>
                </Route>  
              </Route>
              <Route element={<GuestLayout/>}>
                <Route exact path="/login" element={<Login/>}/>
              </Route>
              
             
            </Routes>                 
      </div>
    </Router>
  );
}

export default App;
