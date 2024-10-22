import { ReactNode } from "react";
import cookies from "../Cookies/cookies";
import { Navigate } from "react-router-dom";

interface Iprops {	
   children : ReactNode  
}	
function Protect({children}:Iprops) {
    const  jwt = cookies.get("jwt")
    if(jwt) {
        return children;
    }else{
        return <Navigate to={"/Login"}/>
    }
}

export default Protect;