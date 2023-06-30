import { useEffect, useState } from "react";

//creating a custom hook -> we need a function which name starts with use...
const UseFetch = (url) => {
    const [data, setData] = useState(null); 
    const [error, setError] = useState(null); 

    useEffect(()=>{
        const abortController = new AbortController();

        fetch(url, {signal: abortController.signal})  //to connect the abort controller with the fetch
        .then(res => {
            if(!res.ok){  
                throw Error('could not fetch the data for that resource');  //throwing an error that will be catched in the .catch below!
            }
            return res.json(); //this is also asynch so it returns a promise
        })
        .then(data => {
            setData(data);
            setError(null); //to reset the error as we don't have it here
        })
        .catch(err =>{
            //we are still updating the state -> the useEffect still update -> stil error
            if(err.name === 'AbortError') {//then we don't want to update the state if the error is from the abort
                console.log("fetch aborted");
            }else{ //if the other errors we want to update the states
                setError(err.message);
            }
            //console.log(err.message);  //to simulate this we need to cancel the JSON Server on port 8000
        }) //catches any kind of network error adn fires a function

        //the cleanup function is the abort method from the abort controller
        return () => abortController.abort(); //it aborts the fetch which with it is associated
    },[url]); //we need the url as a dependency as we want it to rerender everytime the url changes (is called with different url!)

    return {data, error} //we want to returne there useStates so we can use them from the place we call this custom hook
}

export default UseFetch;