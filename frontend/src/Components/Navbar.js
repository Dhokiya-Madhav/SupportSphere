import React, { useEffect, useState } from 'react';
import Logo from '../images/donation.png';
import { Link } from 'react-router-dom';
export default function Navbar() {
    
    var button1;
    const userEmail = sessionStorage.getItem("userEmail");
    console.log(userEmail);
    if (userEmail) {
        console.log('Here');
        button1 = <Link to='/myprofile'><button style={{ backgroundColor: "", color: "#EFEFEF" }} className='btn btn-outline-dark ms-2'>My Profile</button></Link>;
    } else {
        button1 = <Link to='/login'><button style={{ backgroundColor: "", color: "#EFEFEF" }} className='btn btn-outline-dark ms-2' type="submit">Login</button></Link>;
    }

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#FF5001" }}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#"><Link to='/'><img src={Logo} className='img-fluid' height={50} width={50} /></Link></a>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" style={{ color: "#EFEFEF", fontFamily: 'Nunito', fontSize: 19 }} aria-current="page" href="#"><b><i>Support-Sphere</i></b></a>
                        </li>
                        <li className="nav-item">
                            <Link to='/fr' className='nav-link' style={{ color: "#EFEFEF" }}>Browse Fundraisers</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" style={{ color: "#EFEFEF" }} href="#">About us</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <Link to='/raiseFund'><button style={{ backgroundColor: "", color: "#EFEFEF" }} className='btn btn-outline-dark' type="submit">Start a Fundraiser</button></Link>
                        {/* <Link to='/login'><button style={{ backgroundColor: "", color: "#EFEFEF" }} className='btn btn-outline-dark ms-2' type="submit">Login</button></Link>*/}
                        {button1}
                    </form>
                </div>
            </div>
        </nav>
    )
}