import UseFetch from "../UseFetch";

const Notifications = () => {

    const userID = JSON.parse(localStorage.getItem('user')).id;
    const {data:user,error} = UseFetch('http://localhost:8000/users/'+userID);

    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString();
    }

    return (  
        <div className="notifications">
            {user && 
             <>
             {user.notifications.map((notification, index) => (
                 <div className="notification-card" key={index}>
                    <p>{getFormattedDate(notification.dateOfConfirmation)}</p>
                    <div className="row">
                        <div className="col-md-4">
                            <p>An employee has {notification.status} you order of:</p>
                        </div>
                        <div className="col-md-4">
                        {notification.packages.map((pack)=>(
                                <div className="package-name" key={pack.name}>
                                    <h4>{pack.quantity} {pack.name}</h4>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-4">
                            <p>Thank you for you purchase!</p>
                        </div>
                    </div>     
                 </div>
             ))}  
            </>}
            { error && <div className="errorMessage">{ error }</div> }
        </div>
    );
}
 
export default Notifications;