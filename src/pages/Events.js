import UseFetch from "../UseFetch.js";
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
const Events = () => {

    const {data:events,error} = UseFetch('http://localhost:8000/events');
    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString();
    }

    async function UpdateData(event) {
        await fetch(`http://localhost:8000/events/${event.id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        });
    }

    const [likes, setLikes] = useState([]);
    const handleLike = (event) =>{
        const index = likes.indexOf(event.id);
        if(index > -1) //then this is an unlike
        {
            event.numOfLikes = event.numOfLikes - 1;
            UpdateData(event);
            //remove from the array
            const newLikes = likes.filter((id) => id === index); 
            setLikes(newLikes);

        }
        else //then this is a like
        {
            event.numOfLikes = event.numOfLikes + 1;
            UpdateData(event);
            //add to the array
            setLikes(likes.concat(event.id));
        }
    }

    return (  
        <div className="events">
            {events &&
            <><div className="container-fluid">
                {events.map((event) => (
                    <div className="event-card" key={event.id}>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                                    <p>{getFormattedDate(event.date)}</p>
                                </div>
                                <div className="row">
                                    <h4>{event.name}</h4>
                                </div>
                                <div className="row">
                                    <p>{event.description}</p>
                                </div>
                                <div className="row">
                                    <FontAwesomeIcon id='like' icon={faThumbsUp} style={likes.includes(event.id)?{color:"#68bd40"}:{color: '#fff'}} onClick={() => handleLike(event)}/>
                                    <p id="num-of-likes">{event.numOfLikes}</p>
                                </div>
                                
                            </div>
                            <div className="col-md-4">
                                <img src={"img/"+event.image} height="250px" alt="event"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div></>}
        
            { error && <div className="errorMessage">{ error }</div> }
        </div>
    );
}
 
export default Events;