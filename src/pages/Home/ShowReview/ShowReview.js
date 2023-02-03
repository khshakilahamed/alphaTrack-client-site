import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Rating from 'react-rating';
import Fade from 'react-reveal/Fade';

const ShowReview = () => {
    const [reviews, setReviews] = useState([]) || {};

    useEffect(() => {
        fetch('https://alpha-tracks-server-site-g2v8.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);
    return (
        <div className="container">
            <Fade top>
                <h2 className="text-danger text-center my-5">Customer Reviews</h2>
            </Fade>

            {reviews ?
                <div className="row text-center">
                    {
                        reviews.map(review =>
                            <Fade bottom>
                                <div key={review._id} className="col-sm-6 col-md-4 col-lg-3 mb-5">
                                    <div className="border py-5">
                                        <img className="img-fluid w-25 pb-3" src={'https://i.ibb.co/y4yHs7B/review-icon.png'} alt="" />
                                        <h2>{review.displayName}</h2>
                                        <p>{review.reviewText}</p>
                                        <Rating
                                            style={{ color: 'orange' }}
                                            initialRating={review.rating}
                                            emptySymbol="far fa-star"
                                            fullSymbol="fas fa-star"
                                            readonly
                                        />
                                    </div>
                                </div>
                            </Fade>
                        )
                    }
                </div>
                :
                <div className="text-center" ><Spinner animation="border" variant="danger" /></div>
            }
        </div>
    );
};

export default ShowReview;