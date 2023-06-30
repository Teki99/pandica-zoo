import { useState } from "react";
import { useParams } from "react-router-dom";
import UseFetch from "../UseFetch";

const AnimalDetails = () => {

    const {id} = useParams(); 
    const {data : animal, error} = UseFetch('http://localhost:8000/animals/' + id);
    const user = JSON.parse(localStorage.getItem('user'));
    const [comment,setComment] = useState("");
    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString();
    }

    async function UpdateData(animal) {
        await fetch(`http://localhost:8000/animals/${animal.id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(animal)
        });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        animal.comments.unshift({username:user.username,comment:comment,date:new Date()});
        UpdateData(animal);
        setComment("");
    }


    return ( 
        <div className="animal-details">
            {animal &&
            <>
            <div className="animal-description">
                <div className="row">
                    <div className="col-md-9">
                        <h3>The {animal.name}</h3>
                        <p>{animal.description}</p>
                    </div>
                    <div className="col-md-3">
                    <img src={require('/public/img/'+animal.image)} height="290px" alt={animal.name}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-7">
                    <div className="comments">
                        <h4>Comments</h4>
                        {animal.comments.map((comment,index) => (
                            <div className="comment" key={index}>
                                <div className="row">
                                    <h6>{comment.username}</h6>
                                    <p>{getFormattedDate(comment.date)}</p>
                                </div>
                                <div className="row">
                                    <h5>{comment.comment}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-5">
                <div className="add-comment">
                    <form onSubmit = {handleSubmit}>
                        
                        <textarea 
                            value = {comment}
                            placeholder= "Add comment..."
                            onChange = {(e) => setComment(e.target.value)}
                        />
                    
                        <button>Add comment</button>
                        { error && <div className="errorMessage">{ error }</div> }
                        
                    </form>
                </div>
                </div>
                
            </div>
            </>
            }
        </div>
    );
}
 
export default AnimalDetails;