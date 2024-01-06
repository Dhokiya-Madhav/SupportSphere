import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <>
            <br></br><br></br>
            <footer className="bg-dark text-light py-4">
                <div className="container">
                    <div className="row">
                        {/* Navigation Links */}
                        <div className="col-md-4">
                            <h5>Navigation</h5>
                            <ul className="list-unstyled">
                                <li><Link to='http://localhost:3000/'>Home</Link></li>
                                <li><Link to='http://localhost:3000/fr'>Browse Fundraiser</Link></li>
                                <li><Link to='http://localhost:3000/about'>About Us</Link></li>
                            </ul>
                        </div>
                        {/* Contact Information */}
                        <div className="col-md-4">
                            <h5>Contact</h5>
                            <p><strong>Email:</strong> info@medicalcrowdfunding.com</p>
                            <p><strong>Phone:</strong> +123-456-7890</p>
                        </div>
                        {/* Social Media Links */}
                        <div className="col-md-4">
                            
                            <ul className="list-inline">
                                <li className="list-inline-item"><a href="#" className="text-light"><i className="fab fa-facebook"></i></a></li>
                                <li className="list-inline-item"><a href="#" className="text-light"><i className="fab fa-twitter"></i></a></li>
                                <li className="list-inline-item"><a href="#" className="text-light"><i className="fab fa-instagram"></i></a></li>
                                <li className="list-inline-item"><a href="#" className="text-light"><i className="fab fa-linkedin"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <hr className="my-2" />
                    {/* Copyright Information */}
                    <div className="row ">
                        <div className="col-md-6">
                            <p className="text-white">&copy; 2023 Medical Crowdfunding Platform. All rights reserved.</p>
                        </div>
                        <div className="col-md-6 text-right">
                            <p className="text-white">Privacy Policy | Terms of Service</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
