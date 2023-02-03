import React, { useEffect, useState } from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';
import Banner from '../Banner/Banner';
import Bike from '../Bikes/Bike/Bike';
import Brands from '../Brands/Brands';
import ShowReview from '../ShowReview/ShowReview';
import Fade from 'react-reveal/Fade';
import { Spinner } from 'react-bootstrap';

const Home = () => {
    const [bikes, setBikes] = useState([]);

    useEffect(() => {
        fetch('https://alpha-tracks-server-site-g2v8.vercel.app/bikes')
            .then(res => res.json())
            .then(data => setBikes(data))
    }, [bikes]);

    return (
        <div>
            <Navigation></Navigation>
            <Banner></Banner>
            <Brands></Brands>

            <div className="container">
                <div className="text-center">
                    <Fade top>
                        <h2 className="text-danger">Bikes for You</h2>
                    </Fade>
                    {bikes ?
                        <div className="row my-5">
                            {
                                bikes.slice(0, 6).map(bike => <Bike key={bike._id} bike={bike}></Bike>)
                            }
                        </div>
                        :
                        <div className="text-center" >
                            <Spinner animation="border" variant="danger" />
                        </div>
                    }
                </div>
            </div>
            <ShowReview></ShowReview>
            <Footer></Footer>
        </div>
    );
};

export default Home;