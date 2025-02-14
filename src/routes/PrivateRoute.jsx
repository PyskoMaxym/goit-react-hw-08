import { useSelector } from "react-redux";
import {Navigate, redirect} from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/selectors";
const PrivateRoute = ({ children, redirectTo = "/login"}) =>{
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return isLoggedIn ? children : <Navigate to={redirectTo} />;

}

export default PrivateRoute;