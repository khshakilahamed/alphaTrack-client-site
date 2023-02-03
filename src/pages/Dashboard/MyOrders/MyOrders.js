import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import useAuth from '../../../hooks/useAuth';

const MyOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    // console.log(orders);

    useEffect(() => {
        fetch(`https://alpha-tracks-server-site-g2v8.vercel.app/orders/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data);
            })
    }, [user.email]);

    const handleCancelOrder = id => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this order!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    fetch(`https://alpha-tracks-server-site-g2v8.vercel.app/orders/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application.json'
                        }
                    })
                        .then(res => res.json());

                    swal("Success! Your Order has been deleted!", {
                        icon: "success",
                    });
                }
                else {
                    swal("Your order is safe!");
                }
            });

    }

    return (
        <div>
            <h2 className="text-center my-4 bg-danger text-light py-2">My Orders</h2>
            <div className="order-table-container">
                <table class="table table-success table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Status</th>
                            <th scope="col">Price</th>
                            <th scope="col">Payment</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <tr>
                                <td>{order.bike_name}</td>
                                <td>{order.userAddress}</td>
                                <td>{order.orderStatus}</td>
                                <td>{order.price}</td>
                                {
                                    order?.payment ?
                                        <td className="border-end" style={{ color: 'green' }}>Paid</td>
                                        :
                                        <td className="border-end">
                                            <Link to={`/dashboard/payment/${order._id}`}>
                                                <button
                                                    style={{
                                                        border: 'none',
                                                        backgroundColor: 'green',
                                                        color: 'white',
                                                        borderRadius: '5px'
                                                    }}
                                                >
                                                    PAY
                                                </button>
                                            </Link>
                                        </td>
                                }
                                <td>
                                    {(order.orderStatus !== "Approved" && !order.payment) && <button onClick={() => handleCancelOrder(order._id)} style={{ border: 'none' }}>Cancel</button>}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;