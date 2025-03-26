import { Navigate } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";

const ProtectedRoute = ({children}) =>{
    const isAuthenticated = localStorage.getItem("authenticated");
    return (isAuthenticated ? <DefaultLayout>{children}</DefaultLayout> : <Navigate to="/" />); // se o authenticated for true ele mostra children, se for false volta para login
};
export default ProtectedRoute;