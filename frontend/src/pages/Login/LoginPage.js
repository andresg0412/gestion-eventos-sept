import React, { useState } from 'react';
import { login } from '../../services/authService';
import { useDispatch } from 'react-redux';
import LoginFormComponent from '../../components/LoginForm/LoginFormComponent';
import { loginSuccess } from '../../redux/actions/authActios';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login({ email, password });
            dispatch(loginSuccess(response));
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <LoginFormComponent
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
        />
    );
};

export default LoginPage;