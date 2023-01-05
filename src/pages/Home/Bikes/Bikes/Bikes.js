import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import Bike from '../Bike/Bike';
import './Bikes.css';

const Bikes = () => {
    const [bikes, setBikes] = useState([]);
    const [displayMatchedBike, setDisplayMatchedBike] = useState([]);
    const { isLoading } = useAuth();

    useEffect(() => {
        fetch('http://localhost:5000/bikes')
            .then(res => res.json())
            .then(data => {
                setBikes(data);
                setDisplayMatchedBike(data);
            })
    }, []);

    const handleSearchBike = e => {
        const searchValue = e.target.value;
        const matchedBike = bikes.filter(bike => bike.bike_name.toLowerCase().includes(searchValue.toLowerCase()));
        setDisplayMatchedBike(matchedBike);
    }


    if (isLoading) {
        return <div className="text-center"><Spinner animation="border" variant="danger" /></div>
    }
    return (
        <div className="container">
            <div class="my-3 text-center">
                <input onChange={handleSearchBike} className="w-50 search-field" type="text" placeholder="search your favorite bike" />
                <button className="btn btn-secondary"> Search</button>
            </div>
            <div className="text-center">
                <div className="row my-5">
                    {
                        displayMatchedBike.map(bike => <Bike key={bike._id} bike={bike}></Bike>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Bikes;