import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="d-flex justify-content-center align-items-center my-5">
            <div className="text-center">
                <h1 style={{ fontSize: '100px', fontWeight: 'bold' }}>404</h1>
                <p>Page Not Found</p>
                <Link to="/home"><button className="btn btn-dark">Back to Home</button></Link>
            </div>
        </div>
    );
};

export default NotFound;