import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const { isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [addAdmin, setAddAdmin] = useState(false);

    if (isLoading) {
        return <div className="text-center"><Spinner animation="border" variant="danger" /></div>
    }


    const handleAdminEmail = e => {
        setEmail(e.target.value);
    }

    const handleMakeAdmin = e => {
        e.preventDefault();
        const user = { email };

        // const confirmAdmin = window.confirm('Sure you want to make an Admin?');


        swal({
            title: "Are you sure?",
            text: "You are going to add a new admin!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://alpha-tracks-server-site-g2v8.vercel.app/users/admin`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.modifiedCount) {
                                setAddAdmin(true);
                                swal("Success!", "New admin added!", "success");
                                setEmail('');
                            }
                            else {
                                swal("Sorry!", "Not Added!", "info");
                            }
                        })
                } else {
                    swal("Did not add a new admin!");
                }
            });

        // if (confirmAdmin) {
        //     fetch(`https://alpha-tracks-server-site-g2v8.vercel.app/users/admin`, {
        //         method: 'PUT',
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         body: JSON.stringify(user)
        //     })
        //         .then(res => res.json())
        //         .then(data => {
        //             if (data.modifiedCount) {
        //                 setAddAdmin(true);
        //                 setEmail('');
        //             }
        //         })
        // }
    }
    return (
        <div className="container">
            <h3 className="text-center bg-danger text-light my-4 py-2">Make an Admin Here</h3>
            <div className="text-center mt-5">
                <form onSubmit={handleMakeAdmin}>
                    <input
                        onBlur={handleAdminEmail}
                        className="w-50"
                        style={{ outline: 'none' }}
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <button
                        style={{ background: 'green', color: 'white', outline: 'none', border: 'none', padding: '4px 10px', borderRadius: '5px' }}
                        type="submit"
                    >Make Admin</button>
                </form>
                {
                    addAdmin && <div className="d-flex justify-content-center mt-2">
                        <div className="alert alert-info w-75" role="alert">
                            Successfully Added an Admin
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default MakeAdmin;