import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Footer from '../Shared/Footer/Footer';
import Navigation from '../Shared/Navigation/Navigation';
import './Order.css';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';


const Order = () => {
    const { user, isLoading } = useAuth();
    const { id } = useParams();

    const [bike, setBike] = useState({});
    const { bike_name, image, short_des, brand, price } = bike;

    const phoneNumberRef = useRef();
    const addressRef = useRef();

    const history = useHistory();

    const handleConfirm = e => {
        e.preventDefault();
        const userName = user.displayName;
        const userPhoneNumber = phoneNumberRef.current.value;
        const userEmail = user.email;
        const userAddress = addressRef.current.value;

        const serviceId = id;
        const orderStatus = "pending";
        const payment = false;

        const order = {
            serviceId,
            orderStatus,
            userName,
            userPhoneNumber,
            userEmail,
            userAddress,
            bike_name,
            brand,
            payment,
            price
        }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    // alert('Order Confirmed');
                    swal("Success!", "Order Placed!", "success");
                    e.target.reset();
                    history.push("/dashboard/myOrder");
                }
            })

    };

    useEffect(() => {
        fetch(`http://localhost:5000/bikes/${id}`)
            .then(res => res.json())
            .then(data => {
                setBike(data);
            })
    }, [id]);

    return (
        <div>
            <Navigation></Navigation>
            <div className="container">
                <h2 className="text-center my-5 text-danger">Please, Provide here some information to confirm the order</h2>
                {
                    isLoading && <Spinner animation="border" variant="danger" />
                }
                <div className="row my-5">
                    <div className="col-md-5">
                        <h3 className="bg-danger text-light ps-5">{bike_name}</h3>
                        <img className="img-fluid w-100" src={image} alt="" />
                        <div className="text-start ps-5 my-3">
                            <p className="my-3"><span className="bg-danger text-light p-1 rounded">{brand}</span></p>
                            <small className="text-muted">{short_des}</small>
                            <h3>BDT. {price}</h3>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <h3 className="bg-danger text-light ps-5">Fill the Address Form</h3>
                        <form onSubmit={handleConfirm} className="customer-form">
                            <input type="text" value={user.displayName} placeholder="Name" required />
                            <input type="number" ref={phoneNumberRef} name="" id="" placeholder="Phone Number" required />
                            <input type="email" value={user.email} placeholder="Email Address" required />
                            <textarea type="text" ref={addressRef} placeholder="Home Address" required />

                            <input className="order-btn" type="submit" value="Submit & confirm" />
                        </form>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Order;