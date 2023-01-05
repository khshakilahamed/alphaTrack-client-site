import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
    const { registerUser, error, isLoading } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const location = useLocation();
    const history = useHistory();


    const handleNameChange = e => {
        setName(e.target.value);
        // e.target.value = "";
    }
    const handleEmailChange = e => {
        setEmail(e.target.value);
        // e.target.value = "";
    }
    const handlePasswordChange = e => {
        setPassword(e.target.value);
        // e.target.value = "";
    }

    const createNewUser = e => {
        registerUser(name, email, password, location, history);
        setName('');

        e.preventDefault();
    }

    return (
        <div>
            <h3 className="my-4 login-title text-center">Please, Register here</h3>
            {
                isLoading && <Spinner animation="border" variant="danger" />
            }
            <form onSubmit={createNewUser} className="login-form">
                <input onBlur={handleNameChange} type="text" name="" id="" placeholder="Name" />
                <input onBlur={handleEmailChange} type="email" name="" id="" placeholder="Email" />
                <input onBlur={handlePasswordChange} type="password" name="" id="" placeholder="Password" />
                {
                    error && <div className="alert alert-danger my-0" role="alert">
                        {error}
                    </div>
                }
                <button type="submit" className="regular-btn">Register</button>
            </form>
        </div>
    );
};

export default Register;