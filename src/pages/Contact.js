const Contact = () => {
    return (  
        <div className="contact">
            <h3>Our contact information</h3> 
            <div className="row">
                    <p>Address: Mali Kalemegdan 8 11000 Belgrade</p> 
                    <p>Phone number: 011 2624526</p> 
                    <p>e-mail: pandicazoovrt@gmail.com</p> 
            </div>
            <div className="map">
                <p>Here is a map of our Zoo</p>
                <img src="img/map.png" height="250px" alt='map of the zoo'/>
            </div>
        </div>
    );
}
 
export default Contact;