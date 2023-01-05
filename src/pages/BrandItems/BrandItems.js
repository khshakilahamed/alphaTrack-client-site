import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Bike from "./../Home/Bikes/Bike/Bike";
import Navigation from '../Shared/Navigation/Navigation';
import Footer from '../Shared/Footer/Footer';

const BrandItems = () => {
    const location = useLocation();
    const brandName = location.state;

     const [brandBikes, setBrandBikes] = useState([]);

     useEffect(() => {
        fetch(`http://localhost:5000/brandItems/${brandName}`)
            .then(res => res.json())
            .then(data =>setBrandBikes(data))
    }, []);

  return (
    <div>
        <Navigation/>
        <div className="container">
        <div className="text-center">
                <div className="row my-5">
                    {
                        brandBikes.map(bike => <Bike key={bike._id} bike={bike}></Bike>)
                    }
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default BrandItems