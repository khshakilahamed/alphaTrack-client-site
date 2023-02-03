import React, { useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
import useAuth from '../../../hooks/useAuth';
import './AddProduct.css'

const AddProduct = () => {
    const { isLoading } = useAuth();

    const bikeNameRef = useRef();
    const brandRef = useRef();
    const descriptionRef = useRef();
    const imageUrlRef = useRef();
    const priceRef = useRef();

    if (isLoading) {
        return <div>
            <div className="text-center"><Spinner animation="border" variant="danger" /></div>
        </div>
    }


    const handleAddBike = e => {
        e.preventDefault();
        const bike_name = bikeNameRef.current.value;
        const brand = brandRef.current.value;
        const short_des = descriptionRef.current.value;
        const image = imageUrlRef.current.value;
        const price = priceRef.current.value;

        const newBike = { bike_name, image, short_des, brand, price }
        // console.log(newBike)

        fetch('https://alpha-tracks-server-site-g2v8.vercel.app/bikes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBike)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    swal("Added!", "Successfully added a Bike!", "success");
                    e.target.reset();
                }
            })
    }

    return (
        <div className="my-4">
            <h2 className="text-center bg-danger text-light py-2 my-4">Add here a Bike with Details</h2>
            <form onSubmit={handleAddBike} className="add-product-form">
                <input ref={bikeNameRef} type="text" placeholder="Bike Name" required />
                <input ref={brandRef} type="text" placeholder="Brand Name" required />
                <textarea ref={descriptionRef} name="" id="" cols="30" rows="5" placeholder="Write Here Short Description of Bike" required></textarea>
                <input ref={imageUrlRef} type="text" placeholder="Image URL Of Bike" required />
                <input ref={priceRef} type="text" placeholder="Price Of Bike" required />
                <button className="order-btn">Add Bike</button>
            </form>
        </div>
    );
};

export default AddProduct;