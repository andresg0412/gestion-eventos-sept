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

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await check(dispatch);
                setLoading(false);
            } catch (error) {
                if (error.response &&error.response.status === 401) {
                    navigate('/login');
                }else{
                    console.log(error);
                }
            }finally{
                setLoading(false);
            }
        };
        checkAuth();
    }, [dispatch]);

    const isAuthenticated = useSelector((state) => !loading && state.auth.isAuthenticated);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRouteComponent;