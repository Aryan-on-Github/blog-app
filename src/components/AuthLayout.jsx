import { useState,useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({children,authentication=true}){ //authentication is a prop that is passed which tell our page where it is protected(true) and where not(false)
    // for example , authentication = true → This page requires login.
    
    const navigate = useNavigate();
    const [loader,setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status); //user login status 

    useEffect(()=>{

        if(authentication && authentication !== authStatus) //if user not logged in (authStatus !== true)
        {
            navigate("/login"); //direct them to login page
        }
        else if(!authentication && authentication !== authStatus) // if user logged in (authentication = false and authStatus !== false )
        {
            navigate("/"); 
        }

        setLoader(false);


    },[authentication,authStatus,navigate])
    
    return loader ? <h1>Loading....</h1> : <>{children}</>
}