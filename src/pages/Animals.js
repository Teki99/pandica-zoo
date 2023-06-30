import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";

const Animals = () => {
    const [animals,setAnimals] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage,setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const [currentPost, setCurrentPost] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchAnimals = async () =>{ 
            await fetch('http://localhost:8000/animals').then(res => {
                if(!res.ok){  
                    throw Error('could not fetch the data for that resource');  //throwing an error that will be catched in the .catch below!
                }
                return res.json(); //this is also asynch so it returns a promise
            }).then(data => {
                setAnimals(data);
                //get current posts
                const indexOfLastPost = currentPage * postsPerPage;
                const indexOfFirstPost = indexOfLastPost - postsPerPage;
                setCurrentPost(data.slice(indexOfFirstPost,indexOfLastPost));
            }).catch(err =>{
                setError(err.message);
            });
        }
        fetchAnimals();
    },[currentPage]);

    //Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (  
        <div className="animals">
            {animals && currentPost && 
                <ul className="list-animals">
                    {currentPost.map(animal=>(
                        <li key={animal.id} className="animal-card">
                            <p onClick={()=>{navigate('/animals/'+animal.id)}}>The {animal.name}</p>
                            <img src={"img/"+animal.image} height="290px" onClick={()=>{navigate('/animals/'+animal.id)}} alt={animal.name}/>
                        </li>
                    ))}
                </ul>
                
            }
            { error && <div className="errorMessage">{ error }</div> }
            {animals && 
                <div className="animal-pagination">
                    <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={animals.length}
                    paginate={paginate}
                    />
                </div>
            }
        </div>
    );
}
 
export default Animals;