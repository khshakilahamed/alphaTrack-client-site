import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
import './ManageOrder.css'

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);



    useEffect(() => {
        fetch(`http://localhost:5000/orders`)
            .then(res => res.json())
            .then(data => {
                setOrders(data);
            })
    }, [orders]);

    // if (isLoading) {
    //     return <div className="text-center "><Spinner animation="border" variant="danger" /></div>
    // }

    // console.log(orders);

    const handleDeleteOrder = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this order!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://localhost:5000/orders/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application.json'
                        }
                    })
                        .then(res => res.json())

                    swal("The order has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("The order is safe!");
                }
            });

    };

    const handleApproveOrder = id => {
        swal({
            title: "Are you sure?",
            text: "you want to approved the order!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const matchedOrder = orders.filter(order => order._id === id);
                    matchedOrder[0].orderStatus = "Approved";

                    fetch(`http://localhost:5000/orders/${id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(matchedOrder[0])
                    })
                        .then(res => res.json())

                    swal("The order has been Approved!", {
                        icon: "success",
                    });
                } else {
                    swal("The order is still pending!");
                }
            });
    }

    return (
        <div>
            <h3 className="text-center bg-danger text-light my-4 py-2">All Orders</h3>
            {
                !orders && <div className="text-center"><Spinner animation="border" variant="danger" /></div>
            }
            <div className="order-table-container">
                <table class="table table-success table-striped mb-5">
                    <thead>
                        <tr>
                            <th scope="col">Customer</th>
                            <th scope="col">Customer Address</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                            <th scope="col">Payment</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <tr>
                                <td className="border-end">Name: {order.userName} <br /> Email: {order.userEmail} <br /> Phone: {order.userPhoneNumber}</td>
                                <td className="border-end">{order.userAddress} </td>
                                <td className="border-end">{order.bike_name}</td>
                                <td className="border-end">{order.price}</td>
                                <td className="border-end">{order.orderStatus}</td>
                                {
                                    order?.payment ?
                                        <td className="border-end" style={{ color: 'green' }}>Paid</td>
                                        :
                                        <td className="border-end" style={{ color: 'red' }}>Unpaid</td>
                                }

                                <td className="border-end">
                                    {
                                        !order?.payment && <button onClick={() => handleDeleteOrder(order._id)} style={{ border: 'none', backgroundColor: 'red', color: 'white', borderRadius: '5px', marginBottom: '5px' }}>Delete</button>
                                    }
                                    <br />
                                    {
                                        order.orderStatus === 'pending' && <button onClick={() => handleApproveOrder(order._id)} style={{ border: 'none', backgroundColor: 'green', color: 'white', borderRadius: '5px' }}>Approve</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;