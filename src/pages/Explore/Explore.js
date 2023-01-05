import React from 'react';
import Bikes from '../Home/Bikes/Bikes/Bikes';
import Footer from '../Shared/Footer/Footer';
import Navigation from '../Shared/Navigation/Navigation';

const Explore = () => {
    return (
        <div>
            <Navigation></Navigation>
            <Bikes></Bikes>
            <Footer></Footer>
        </div>
    );
};

export default Explore;