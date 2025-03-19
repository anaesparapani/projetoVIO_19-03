import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) =>{
    const isAuthenticated = localStorage.getItem("authenticated");
    return isAuthenticated ? children : <Navigate to="/" />; // se o authenticated for true ele mostra children, se for false volta para login
}
export default ProtectedRoute;