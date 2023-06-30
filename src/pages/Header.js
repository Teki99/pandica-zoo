import { Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faBell,faCartShopping} from '@fortawesome/free-solid-svg-icons'
const Header = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  return (  
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/"><div className="logo"></div></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          { (user.type==='visitor') && 
            <>
              <li className="nav-item active">
                <Link to="/packages">Packages</Link>
              </li>
              <li className="nav-item active">
                  <Link to="/events">Events</Link>
              </li>
              <li className="nav-item active">
                <Link to="/animals">Animals</Link>
              </li>
              <li className="nav-item active">
                <Link to="/contact">Contact</Link>
              </li>
            </> 
          }
          { (user.type==='employee') && 
            <>
              <li className="nav-item active">
                <Link to="/animals">Animals</Link>
              </li>
              <li className="nav-item active">
                <Link to="/requests">Requests</Link>
              </li> 
              <li className="nav-item active">
                <Link to="/newAnimal">Add new animal</Link>
              </li> 
            </>
          }
          
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to="/profile"> <FontAwesomeIcon icon={faUser}/> </Link>
          </li>
          { (user.type==='visitor') && 
            <>
              <li className="nav-item active">
                <Link to="/notifications"> <FontAwesomeIcon icon={faBell}/> </Link>
              </li>
              <li className="nav-item active">
                <Link to="/cart"> <FontAwesomeIcon icon={faCartShopping}/> </Link>
              </li>
            </>
          }
          <li className="nav-item active">
            <Link to="/login" id="logout" onClick={ () => localStorage.clear()}>Logout</Link>
          </li>
        </ul>
      </div>
    </nav>    
  </header>
  );
}
  
 export default Header;