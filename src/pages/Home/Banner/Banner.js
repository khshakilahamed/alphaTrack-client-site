import React from 'react';
import { Carousel } from 'react-bootstrap';


// https://i.ibb.co/WfcVMPx/banner-1.jpg
// https://i.ibb.co/Q9rLn9T/banner-2.jpg
// https://i.ibb.co/KrfbdRB/banner-3.jpg

const Banner = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={"https://i.ibb.co/WfcVMPx/banner-1.jpg"}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={"https://i.ibb.co/Q9rLn9T/banner-2.jpg"}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={"https://i.ibb.co/KrfbdRB/banner-3.jpg"}
                    alt="Third slide"
                />

                {/* <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
        </Carousel>
    );
};

export default Banner;