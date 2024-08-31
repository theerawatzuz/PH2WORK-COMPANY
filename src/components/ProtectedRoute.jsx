import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const isAuthenticated = checkAuthStatus();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;

function checkAuthStatus () {
    const token = localStorage.getItem('authToken'); 
    return !!token;
}