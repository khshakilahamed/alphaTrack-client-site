import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navigation from '../Shared/Navigation/Navigation';
import './BikeDetails.css';


const BikeDetails = () => {
    const [bike, setBike] = useState({});
    const location = useLocation();
    const bikeId = location.state;

    // console.log(bike);

    useEffect(() => {
        fetch(`https://alpha-tracks-server-site-g2v8.vercel.app/bikes/${bikeId}`)
            .then(res => res.json())
            .then(data => {
                setBike(data);
            })
    }, [bikeId]);

    return (
        <div>
            <Navigation />

            <div className='container py-5 my-5 row'>
                <div className='row'>
                    <div className='col-md-6 bikeImageDiv'>
                        <img className='bikeImage' src={bike.image} alt="" />
                    </div>
                    <div className='col-md-6'>
                        <h1>{bike.bike_name}</h1>
                        <p>{bike.brand}</p>
                        <p>{bike.short_des}</p>
                        <p>BDT. {bike.price}</p>
                        <div className="text-start">
                            <NavLink to={`/order/${bike._id}`}>
                                <button className="order-btn me-2">Order Now</button>
                            </NavLink>

                            <button className="order-btn ms-2">Add to cart</button>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default BikeDetails