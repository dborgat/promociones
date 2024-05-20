import React from "react";
import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("auth_token");

    return isAuthenticated ? children : <Navigate to="/error" />;
};

export default ProtectedRoute;
