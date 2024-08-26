import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./components/Auth/AuthContext";


const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};

export default ProtectedRoute;
