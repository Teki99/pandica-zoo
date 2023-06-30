import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const promoCodes = [{name:'zoo10',discount:0.9},{name:'zoo20',discount:0.8}];
    const [promoCode,setPromoCode] = useState('');
    const [promoCodeDiscount, setPromoCodeDiscount] = useState(null); 
    const [totalPrice,setTotalPrice]= useState(null);
    const [reRender,setReRender] = useState(0);
    const [error,setError] = useState(null);

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

    useEffect(()=>{
        let sum=0;
        user.packages.forEach(pack => {
            sum = sum + pack.price*pack.quantity;
        });
        if(promoCodeDiscount)
            sum = sum * promoCodeDiscount;
        setTotalPrice(sum);
    })

    async function UpdateData(user) {
        await fetch(`http://localhost:8000/users/${user.id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
    }

    const Inc = (pack) =>{
        user.packages.forEach(elem => {
            if(elem.packageID === pack.packageID)
            {
                pack.quantity = pack.quantity + 1;
                setReRender(reRender+1);
                UpdateData(user);
                localStorage.setItem('user',JSON.stringify(user));
            }
        });
    }
    const Dec = (pack) =>{
        user.packages.forEach(elem => {
            if(elem.packageID === pack.packageID)
            {
                pack.quantity = pack.quantity - 1;
                setReRender(reRender-1);
                UpdateData(user);
                localStorage.setItem('user',JSON.stringify(user));
            }
        });
    }

    const HandlePromo = (e) =>{
        e.preventDefault();
        setError('Sorry this is not a valid promo code.');
        setPromoCodeDiscount(null);
        promoCodes.forEach(elem => {
            if(elem.name === promoCode)
            {
                setError(null);
                setTotalPrice(totalPrice*elem.discount);
                setPromoCodeDiscount(elem.discount);
            }
        });
    }

    const Buy = () =>{
        if(user.packages.length === 0)
        {
            setError('Your cart is empty!');
        }
        else
        {
            setModalIsOpen(true);
            const packages = [];
            user.packages.forEach(pack => {
                packages.push({name:pack.name,quantity:pack.quantity});
            });
            user.notifications.push({packages:packages,price:totalPrice,status:"waiting",dateOfConfirmation:""});
            user.packages = [];
            UpdateData(user);
            localStorage.setItem('user',JSON.stringify(user));
        }
       

    }

    return (  
        <div className="cart">
            {user &&
            <>
                {user.packages.map((pack) => (
                    <div className="cart-card" key={pack.packageID}>
                        <div className="row">
                            <div className="col-md-4">
                                <h5>{pack.name}</h5>
                            </div>
                            <div className="col-md-5">
                                <h2>{pack.price} RSD</h2>
                            </div>
                            <div className="col-md-1">
                                <p className='plus-minut' onClick={()=>Inc(pack)}>+</p>
                            </div>
                            <div className="col-md-1">
                                <p className="quantity">{pack.quantity}</p>
                            </div>
                            <div className="col-md-1">
                                <p className='plus-minut' onClick={()=>Dec(pack)}>-</p>
                            </div>    
                        </div>      
                    </div>
                ))} 
                <div className="promo-code">
                    <div className="row">
                        <div className="col-md-4">
                            <h4>Promo code:</h4>
                        </div>
                        <div className="col-md-8">
                        <form onSubmit = {HandlePromo}>
                            <div className="row">
                                <div className="col-md-9">
                                    <input 
                                        type="text"
                                        required
                                        value = {promoCode}
                                        placeholder= "Enter promo code"
                                        onChange = {(e) => setPromoCode(e.target.value)}
                                        disabled={promoCodeDiscount}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <button disabled={promoCodeDiscount} style={promoCodeDiscount?{cursor:'context-menu'}:{cursor:'pointer'}}>OK</button>
                                </div>
                            </div> 
                        </form>
                        </div>
                    </div>
                </div>
                    { error && <div className="errorMessage">{ error }</div> }
                
                <div className="total">
                    <div className="row">
                        <div className="col-md-5">
                            
                        </div>
                        <div className="col-md-5">
                            <h2>Total : {totalPrice} RSD</h2>
                        </div>
                        <div className="col-md-2">
                            <button onClick={()=>Buy()}>Buy</button>
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
                            height: '40%',
                            textAlign: 'center',
                            margin: 'auto'
                        }
                    }
                }>
                    <div className="row">
                        <h3>Thank you for your purchase!</h3>
                    </div>
                    <div className="row">
                        <h3>Please wait for an employee to confirm your order.</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <button style={modalButtonStyle} onClick={()=>{navigate('/notifications')}}>Go to notifications</button>
                        </div>
                        <div className="col-md-2">
                            <h4>or</h4>
                        </div>
                        <div className="col-md-5">
                            <button style={modalButtonStyle} onClick={()=>{navigate('/')}}>Go to home</button>
                        </div> 
                    </div>
                    
                    
            </Modal>
        </div>
    );
}
 
export default Cart;