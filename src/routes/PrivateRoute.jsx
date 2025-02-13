import { useSelector } from "react-redux";
import {Navigate, redirect} from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { Children } from "react";

const PrivateRoute = ({ Children, redirectTo = "/login"}) =>{
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return isLoggedIn ? Children : <Navigate to={redirectTo} />;

}

export default PrivateRoute;