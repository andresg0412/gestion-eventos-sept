import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { check } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


const PrivateRouteComponent = ({ element, ...rest }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const stateAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(true);
        setLoading(false);
    }, [stateAuthenticated]);

    if(loading){
        return <p>Loading...</p>
    }

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRouteComponent;