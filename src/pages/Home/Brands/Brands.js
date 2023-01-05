import React from 'react';
import Fade from 'react-reveal/Fade';
import Rotate from 'react-reveal/Rotate';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import './Brands.css';

// https://i.ibb.co/grSgbRj/aprilia.jpg
// https://i.ibb.co/K0QXr7L/bajaj.jpg
// https://i.ibb.co/xF2CM5b/bmw.jpg
// https://i.ibb.co/DRbswRt/hero.jpg
// https://i.ibb.co/NLNBLdL/honda.jpg
// https://i.ibb.co/VVxdfnF/royal-enfield.jpg
// https://i.ibb.co/n88Zcdd/suzuki.jpg
// https://i.ibb.co/GFdxzmc/tvs.jpg
// https://i.ibb.co/JCTmY53/yamaha.jpg

const Brands = () => {
    let history = useHistory();

    const handleBrandProducts = (brand) => {
        console.log(brand);
        history.push("/brandItems", brand);
    }
    
    return (
        <div className="container my-5">
            <Fade left>
                <h2 className="text-center text-danger">Offered Brands</h2>
                <div className="row text-center mt-4">
                    <div className="col-6 col-lg-2 col-md-3 col-sm-4 py-3">
                        <div onClick={() => handleBrandProducts("Aprilia")}>
                            <img className="img-fluid w-75 brandImg" src={`https://i.ibb.co/grSgbRj/aprilia.jpg`} alt="" />
                            <h4 className="text-muted my-4">Aprilia</h4>
                        </div>
                    </div>
                    <div className="col-6 col-lg-2 col-md-3 col-sm-4 py-3">
                        <div onClick={() => handleBrandProducts("BMW")}>
                            <img className="img-fluid w-75 brandImg" src={`https://i.ibb.co/xF2CM5b/bmw.jpg`} alt="" />
                            <h4 className="text-muted my-4">BMW</h4>
                        </div>
                    </div>
                    <div className="col-6 col-lg-2 col-md-3 col-sm-4 py-3">
                        <div onClick={() => handleBrandProducts("Royal Enfield")}>
                            <img className="img-fluid w-75 brandImg" src={`https://i.ibb.co/VVxdfnF/royal-enfield.jpg`} alt="" />
                            <h4 className="text-muted my-4">Royal Enfield</h4>
                        </div>
                    </div>
                    <div className="col-6 col-lg-2 col-md-3 col-sm-4 py-3">
                        <div onClick={() => handleBrandProducts("Yamaha")}>
                            <img className="img-fluid w-75 brandImg" src={`https://i.ibb.co/JCTmY53/yamaha.jpg`} alt="" />
                            <h4 className="text-muted my-4">Yamaha</h4>
                        </div>
                    </div>
                    <div className="col-6 col-lg-2 col-md-3 col-sm-4 py-3">
                        <div onClick={() => handleBrandProducts("Honda")}>
                            <img className="img-fluid w-75 brandImg" src={`https://i.ibb.co/NLNBLdL/honda.jpg`} alt="" />
                            <h4 className="text-muted my-4">Honda</h4>
                        </div>
                    </div>
                    <div className="col-6 col-lg-2 col-md-3 col-sm-4 py-3">
                        <div onClick={() => handleBrandProducts("Bajaj")}>
                            <img className="img-fluid w-75 brandImg" src={`https://i.ibb.co/K0QXr7L/bajaj.jpg`} alt="" />
                            <h4 className="text-muted my-4">Bajaj</h4>
                        </div>
                    </div>
                    <div className="col-6 col-lg-2 col-md-3 col-sm-4 py-3">
                        <div onClick={() => handleBrandProducts("Suzuki")}>
                            <img className="img-fluid w-75 brandImg" src={`https://i.ibb.co/n88Zcdd/suzuki.jpg`} alt="" />
                            <h4 className="text-muted my-4">Suzuki</h4>
                        </div>
                    </div>
                    <div className="col-6 col-lg-2 col-md-3 col-sm-4 py-3">
                        <div onClick={() => handleBrandProducts("TVS")}>
                            <img className="img-fluid w-75 brandImg" src={`https://i.ibb.co/GFdxzmc/tvs.jpg`} alt="" />
                            <h4 className="text-muted my-4">TVS</h4>
                        </div>
                    </div>
                    <div className="col-6 col-lg-2 col-md-3 col-sm-4 py-3">
                        <div onClick={() => handleBrandProducts("Hero")}>
                            <img className="img-fluid w-75 brandImg" src={`https://i.ibb.co/DRbswRt/hero.jpg`} alt="" />
                            <h4 className="text-muted my-4">Hero</h4>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
};

export default Brands;