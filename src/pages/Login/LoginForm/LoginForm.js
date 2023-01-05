import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import useFirebase from '../../../hooks/useFirebase';

const LoginForm = () => {
    const { loginUser, error, isLoading } = useFirebase();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const location = useLocation();
    const history = useHistory();



    const handleEmailChange = e => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    const handleUserLogin = e => {
        loginUser(email, password, location, history);
        e.preventDefault();
    }
    return (
        <div>
            <h3 className="my-4 login-title text-center">Please, Login here</h3>
            {
                isLoading && <Spinner animation="border" variant="danger" />
            }
            <form onSubmit={handleUserLogin} className="login-form">
                <input onBlur={handleEmailChange} type="email" name="" id="" placeholder="Email" />
                <input onBlur={handlePasswordChange} type="password" name="" id="" placeholder="Password" />
                <p ><small className="text-start text-danger" style={{ cursor: 'pointer' }}>Forgot password</small></p>
                {
                    error && <div className="alert alert-danger my-0" role="alert">
                        {error}
                    </div>
                }
                <button type="submit" className="regular-btn">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;