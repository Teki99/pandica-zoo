import UseFetch from "../UseFetch";
import Modal from "react-modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Packages = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [errorMessage,setErrorMessage] = useState(null);
    const {data:packages,error} = UseFetch('http://localhost:8000/packages');

    const [modalIsOpet, setModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const modalButtonStyle = {
        height: 'min-content',
        padding: '13px 32px',
        borderRadius: '18px',
        color: 'white',
        backgroundColor: '#1d430d',
        cursor: 'pointer',
        margin: '10px auto',
        width: 'max-content',
    }

    async function UpdateData(user) {
        await fetch(`http://localhost:8000/users/${user.id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
    }

    const AddToCart = (pack) =>{
        if (user.packages.find(e => e.packageID === pack.id))
        {
            setErrorMessage('This item is already in your cart!');
        }
        else
        {
            setErrorMessage(null);
            setModalIsOpen(true);
            user.packages.push({packageID:pack.id,name:pack.name,price:pack.price,quantity:pack.quantity});
            localStorage.setItem('user',JSON.stringify(user));
            UpdateData(user);
        }
    }

    return (  
        <div className="packages">
            
            { errorMessage && <div className="errorMessage">{ errorMessage }</div> }
            {packages &&
            <>
            <div className="container-fluid">
            <div className="row">
                <div className="package">
                    {packages.filter((pack) => (pack.quantity === 1 && !pack.promo)).map((pack) => (
                            <div className="package-card" key={pack.id} style={pack.promo?{backgroundColor: '#68bd40'}:{backgroundColor: '#1d430d'}}>
                                    <h5>{pack.name}</h5>
                                    <h3>{(pack.price === 0)?"Free":pack.price} RSD</h3>
                                    <p>{pack.description}</p>
                                    <button onClick={() => AddToCart(pack)} style={pack.promo?{backgroundColor: '#1d430d', color: '#68bd40'}:{backgroundColor: '#68bd40', color: '#1d430d'}}>Add to cart</button>
                            </div>
                    ))}  
                </div>
            </div>
                
            <div className="row">
                <div className="package">
                    {packages.filter((pack) => (pack.quantity !== 1 && !pack.promo)).map((pack) => (
                            <div className="package-card" key={pack.id} style={pack.promo?{backgroundColor: '#68bd40'}:{backgroundColor: '#1d430d'}}>
                                    <h5>{pack.name}</h5>
                                    <h3>{(pack.price === 0)?"Free":pack.price} RSD</h3>
                                    <p>{pack.description}</p>
                                    <button onClick={() => AddToCart(pack)} style={pack.promo?{backgroundColor: '#1d430d', color: '#68bd40'}:{backgroundColor: '#68bd40', color: '#1d430d'}}>Add to cart</button>
                            </div>
                    ))}  
                </div>
            </div>

            <h3>Promo packages</h3>

            <div className="row">
                <div className="package">
                    {packages.filter((pack) => (pack.promo)).map((pack) => (
                            <div className="package-card" key={pack.id} style={pack.promo?{backgroundColor: '#68bd40'}:{backgroundColor: '#1d430d'}}>
                                    <h5>{pack.name}</h5>
                                    <h3>{(pack.price === 0)?"Free":pack.price} RSD</h3>
                                    <p>{pack.description}</p>
                                    <button onClick={() => AddToCart(pack)} style={pack.promo?{backgroundColor: '#1d430d', color: '#68bd40'}:{backgroundColor: '#68bd40', color: '#1d430d'}}>Add to cart</button>
                            </div>
                    ))}  
                </div>
            </div>
            </div>
            </>}
                       
            <Modal 
                isOpen={modalIsOpet}
                ariaHideApp={false}
                style={
                    {
                        overlay:{
                            backgroundColor:'rgba(29, 36, 26,0.8)'
                        },
                        content:{
                            backgroundColor:'#68bd40',
                            color:'white',
                            width: '40%',
                            height: '30%',
                            textAlign: 'center',
                            margin: 'auto'
                        }
                    }
                }>
                    <div className="row">
                        <h3>Item added to your</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <button style={modalButtonStyle} onClick={()=>{navigate('/cart')}}>Go to cart</button>
                        </div>
                        <div className="col-md-2">
                            <h4>or</h4>
                        </div>
                        <div className="col-md-5">
                            <button style={modalButtonStyle} onClick={()=>setModalIsOpen(false)}>Continue shopping</button>
                        </div> 
                    </div>
                    
                    
            </Modal>
            { error && <div className="errorMessage">{ error }</div> }
        </div>
    );
}
 
export default Packages;