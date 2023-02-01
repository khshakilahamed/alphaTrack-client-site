import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const CheckoutForm = ({ order }) => {
    const [cardError, setCardError] = useState("");
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    const history = useHistory();

    // const {price} = order;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch('http://localhost:5000/create-payment-intent', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });


        if (error) {
            setCardError(error?.message);
            return;
        }
        else {
            setCardError("");
        }

        setProcessing(true);

        if (clientSecret.intent === "succeeded") {
            const { _id, ...others } = order;
            const intent = clientSecret.intent;
            const transactionId = clientSecret.paymentId;
            const orderId = _id;
            const paymentInfo = { orderId, intent, transactionId, ...others };

            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(paymentInfo)
            })
                .then(res => res.json())
                .then(data => {
                    swal("Success! Payment Successfully Completed!", {
                        icon: "success",
                    });
                    history.push("/dashboard/myOrder");
                })
        }
    }
    return (
        <div className='border p-4'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='text-center mt-4'>
                    <button
                        className='mt-3'
                        style={{
                            border: 'none',
                            backgroundColor: 'green',
                            color: 'white',
                            borderRadius: '5px'
                        }}
                        type="submit"
                        disabled={!stripe || !clientSecret}>
                        PAY NOW
                    </button>
                </div>
            </form>

            <p className='text-danger'>{cardError}</p>
        </div>
    );
};

export default CheckoutForm;