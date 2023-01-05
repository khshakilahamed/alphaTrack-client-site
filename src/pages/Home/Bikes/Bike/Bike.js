import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './Bike.css';
import Fade from 'react-reveal/Fade';

const Bike = ({ bike }) => {
    const { _id, bike_name, image, short_des, brand, price } = bike;

    const history = useHistory();

    const handleBikeDetails = (id) => {
        history.push("/bikeDetails", id);
    }
    return (
        <Fade bottom>
            <div className="col-md-4 col-sm-6 my-3" >
                <div className="border p-3 bike-descript">
                    <div className='bikeClickableDiv' onClick={() => handleBikeDetails(_id)}>
                        <img className="img-fluid w-100 border-bottom mb-3 p-2" src={image} alt="" />
                        <div className="text-start">
                            <h5>{bike_name}</h5>
                            <small className="text-muted">{short_des}</small>
                            <p>BDT. {price}</p>
                            <p ><span className="bg-danger text-light p-1 rounded">{brand}</span></p>
                        </div>
                    </div>
                    <div className="text-start">
                        <NavLink to={`/order/${_id}`}>
                            <button className="order-btn">Order Now</button>
                        </NavLink>

                        <button className="order-btn ms-2">Add to cart</button>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default Bike;