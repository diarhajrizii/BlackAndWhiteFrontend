import React from "react";
import "./Header.css";
import ReactDOM from 'react-dom';
import {Navbar, Nav, Container } from 'react-bootstrap';

 
const Header = () => {
    return(
        <>
        <div className="header_container-nav">
            <div className="header_container">
                <nav className="nav_container">
                    <ul className="d-flex justify-content-end">
                        <li className="cl_nav_link"><a href="aboutus">About Us</a></li>
                        <li className="cl_nav_link"><a href="services">Services</a></li>
                        <li className="cl_nav_link"><a href="testimonials">Testimonials</a></li>
                        <li className="cl_nav_link"><a href="portfolio" className="active">Portfolio</a></li>
                        <li className="cl_nav_link"><a href="contactus">Contact Us</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        </>
    )
}
export default Header