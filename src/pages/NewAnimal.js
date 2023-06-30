import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewAnimal = () => {

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [image,setImage] = useState("");
    const [previewImage,setPreviewImage] = useState(undefined);
    const [error,setError] = useState(null);
    const navigate = useNavigate();

    const selectFile = (event) => {
        setImage(event.target.files[0].name);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
      };


    async function postData(animal) {
        await fetch(`http://localhost:8000/animals`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(animal)
        });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const newAnimal = {name:name,description:description,image:image,comments:[]}
        postData(newAnimal);
        navigate('/animals');
    }

    return (
        <div className="new-animal">
                    <form onSubmit = {handleSubmit}>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="animal-form">
                                    <h2>New animal</h2>
                                    <div className="row">
                                        <p>Animal</p>
                                        <input 
                                            type="text"
                                            required
                                            value = {name}
                                            placeholder= "Name"
                                            onChange = {(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="row">
                                        <p>Description</p>
                                        <textarea 
                                        value = {description}
                                        placeholder= "Add description..."
                                        onChange = {(e) => setDescription(e.target.value)}
                                    />
                                    </div>
                                    <div className="row">
                                        <button>Add animal</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="image-upload">
                                        <input 
                                            type="file"
                                            required
                                            placeholder= "Name"
                                            onChange={selectFile}
                                        />
                                </div>
                                {previewImage && (
                                    <div>
                                    <img className="preview" src={previewImage} height="250px" alt="" />
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        
                        { error && <div className="errorMessage">{ error }</div> }
                        
                    </form>
        </div>
    );
}
 
export default NewAnimal;