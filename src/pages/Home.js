import Carousel from 'react-bootstrap/Carousel';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRightLong} from '@fortawesome/free-solid-svg-icons'

const Home = () => {
    return (  
        <div className="home">
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="img/carousel1.png"
                    alt="First slide"
                    height="50%"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="img/carousel2.png"
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="img/carousel3.jpg"
                    alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            <div className="container-fluid">
                <div className="info1">
                    <div className="row">
                        <div className="col-md-4">

                        </div>
                        <div className="col-md-3">
                            <h3>Welcome to Pandica Zoo!</h3> 
                        </div>
                        <div className="col-md-1">
                            <img src="img/lazy panda_thumbnail.png" height="90px" alt='lazy panda'/>
                        </div>
                        <div className="col-md-4">
                            
                        </div>
                    </div>
                </div>
                <div className="info2">
                    <div className="row">
                        <div className="col-md-4">
                            <p>We are open everyday</p>
                        </div>
                        <div className="col-md-4">
                            <p>from 9:00 to 18:00</p>
                        </div>
                        <div className="col-md-4">
                            <p>So come and visit us!</p>
                        </div>
                    </div>
                </div>
                <div className="info3">
                    <div className="row">
                        <div className="col-md-4">
                            <p id="p-with-border">Here is a map of our Zoo</p>
                        </div>
                        <div className="col-md-4">
                            <FontAwesomeIcon icon={faArrowRightLong} height="50px"/>
                        </div>
                        <div className="col-md-4">
                            <img src="img/map.png" height="250px" alt='map of the zoo'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Home;