import { useEffect, useState } from "react";

const Requests = () => {
    
    const [users,setUsers] = useState(null);
    const [error,setError] = useState(false);
    const [requests,setRequests] = useState(null);
    const [reRender,setReRender] = useState(0);

    useEffect(()=>{
        const abortController = new AbortController();
        fetch('http://localhost:8000/users', {signal: abortController.signal})  //to connect the abort controller with the fetch
        .then(res => {
            if(!res.ok){  
                throw Error('could not fetch the data for that resource');  //throwing an error that will be catched in the .catch below!
            }
            return res.json(); //this is also asynch so it returns a promise
        })
        .then(data => {
            setUsers(data);
            const allRequests = [];
            let reqIndex = 1;

            data.forEach(user => {
                user.notifications.forEach((notification,index) =>{
                    if(notification.status === 'waiting')
                    {
                        allRequests.push({id:reqIndex,userID:user.id,username:user.username,notification:notification,notificationIndex:index});
                        reqIndex = reqIndex + 1;
                    }
                  
                })
            });
            if(allRequests.length !== 0 )
            {
                setRequests(allRequests);
                setError(null); //to reset the error as we don't have it here
            }
            else
            {
                setRequests(null);
                setError("Sorry no request for you at the moment!");
            }
        })
        .catch(err =>{
            if(err.name === 'AbortError') {//then we don't want to update the state if the error is from the abort
                console.log("fetch aborted");
            }else{ //if the other errors we want to update the state
                setError(err.message);
            }
        }) 
        //the cleanup function is the abort method from the abort controller
        return () => abortController.abort(); //it aborts the fetch which with it is associated
    },[reRender]);


    async function UpdateData(user) {
        await fetch(`http://localhost:8000/users/${user.id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
    }

    const confirmRequest = (request,status) => {
        request.notification.status = status;
        const user = users.find(user => user.id === request.userID);
        user.notifications[request.notificationIndex].status = status;
        user.notifications[request.notificationIndex].dateOfConfirmation = new Date();
        UpdateData(user);

        const allRequests = requests.filter((req) => req.id === request.id); 
        setRequests(allRequests);
        setReRender(reRender+1);
    }


    return (
        <div className="requests">
            {requests &&
            <>
                {requests.map((request) => (
                    <div className="request-card" key={request.id}>
                             <div className="row">
                            <div className="col-md-4">
                                <p>Request from visitor {request.username} for:</p>
                            </div>
                            <div className="col-md-4">
                               {request.notification.packages.map((pack)=>(
                                    <div className="package-name" key={pack.name}>
                                        <h4>{pack.quantity} {pack.name}</h4>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-2">

                            </div>
                            <div className="col-md-2">
                                <button onClick={()=>confirmRequest(request,"accepted")}>Accept</button>
                                <button onClick={()=>confirmRequest(request,"rejected")}>Reject</button>
                            </div>
                        </div>     
                    </div>
                ))}  
            </>}
            { error && <div className="errorMessage">{ error }</div> }
        </div>
    );
}
 
export default Requests;