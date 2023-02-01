import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe("pk_test_51MWZq0BPLpGeElP5OLk4qFrc94hvZ13TH9LHZUKKz6rmDIBT0GtVIm3q0lUbKEMBNEkhExCKjs7bQxPy31pV3bmd0003bjt1wT");

// console.log(process.env.REACT_APP_STRIPE_PK);


const Payment = () => {
    const [order, setOrder] = useState({})
    const { orderId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/order/${orderId}`)
            .then(res => res.json())
            .then(order => setOrder(order))
    }, [orderId]);

    return (
        <div>
            <p className='mt-5'>Please, pay BDT. <strong>{order?.price}</strong> for <strong>{order.bike_name}</strong></p>

            <div className='my-6' style={{ maxWidth: "500px" }}>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        order={order}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;