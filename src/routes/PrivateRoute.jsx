import { useSelector } from "react-redux";
import {Navigate, redirect} from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { сhildren } from "react";

const PrivateRoute = ({ сhildren, redirectTo = "/login"}) =>{
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return isLoggedIn ? сhildren : <Navigate to={redirectTo} />;

}

export default PrivateRoute;