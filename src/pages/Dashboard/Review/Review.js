import React, { useState } from 'react';
import swal from 'sweetalert';
import useAuth from '../../../hooks/useAuth';

const Review = () => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handleRating = e => {
        setRating(e.target.value);
    };

    const handleText = e => {
        setReviewText(e.target.value);
    };

    const handleReview = e => {
        e.preventDefault();
        const newReview = { displayName: user.displayName, email: user.email, rating, reviewText }
        fetch('https://alpha-tracks-server-site-g2v8.vercel.app/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newReview)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    // alert('Review Added Successfully!');
                    swal("Success!", "Order Placed!", "success");
                    console.log(data);
                }
            })
    }
    return (
        <div className="container">
            <h3 className="text-center bg-danger text-light my-4 py-2">Please, Share a Review About Us</h3>
            <form onSubmit={handleReview} className="customer-form">
                <select value={rating} onChange={handleRating}>
                    <option value="0">Select Rating</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <textarea onChange={handleText} type="text" placeholder="Write About us" required />
                <input disabled className="order-btn" type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Review;