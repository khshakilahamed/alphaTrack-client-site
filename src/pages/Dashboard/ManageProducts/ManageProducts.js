import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';

const ManageProducts = () => {
    const [bikes, setBikes] = useState([]);

    useEffect(() => {
        fetch('https://alpha-tracks-server-site-g2v8.vercel.app/bikes')
            .then(res => res.json())
            .then(data => setBikes(data))
    }, [bikes]);

    const handleDeleteBike = id => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Bike!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://alpha-tracks-server-site-g2v8.vercel.app/bikes/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                swal("Deleted", "The Bike is deleted!", "success");
                            }
                        })
                } else {
                    swal("The Bike is safe!");
                }
            });

    }

    return (
        <div>
            <h3 className="text-center bg-danger text-light my-4 py-2">All Bikes</h3>
            <div className="text-center">
                {
                    !bikes && <div className="text-center"><Spinner animation="border" variant="danger" /></div>
                }
                <div className="row my-5">
                    {
                        bikes?.map(bike => <div key={bike._id} className="col-md-6 col-lg-4">
                            <div className="border m-2">
                                <img className="img-fluid w-100" src={bike.image} alt="" />
                                <h4 className="my-3">{bike.bike_name}</h4>
                                <div className="d-flex justify-content-between px-5 my-3">
                                    <p>
                                        <NavLink to={`/updateProduct/${bike._id}`}>
                                            <button
                                                className="btn btn-success"
                                            >Update</button>
                                        </NavLink>
                                    </p>
                                    <p>
                                        <button
                                            onClick={() => handleDeleteBike(bike._id)}
                                            className="btn btn-danger"
                                        >Delete</button>
                                    </p>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;