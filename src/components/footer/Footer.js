import React from "react";
import Line from "../lines/Line";
import "./Footer.css";

 
const Footer = () => {
    return(
        <>
            <div className="footer-container-div">
                <div className="footer-container">
                    <div className="row mb-5">
                        <div className="page-name col-5 col-md-2 col-lg-2 col-sm-5">
                            CONTACT .US
                        </div>
                        <div className="footer-line col-7 col-lg-10 col-md-10 col-7"></div>
                    </div>
                    <div className="row contact_container">
                        <div className="col-12 col-lg-2 col-sm-12">
                            <div className="col-7 simply-works-text">
                                SIMPLY.WORKS
                            </div>
                        </div>
                        <div className="col-12 col-lg-2 col-sm-12 talk-to-us row text-white">
                            <div className="col-4 col-lg-12 col-sm-4">
                                TALK TO US
                            </div>
                        </div>
                        <div className="col-12 col-lg-8 col-sm-12">
                            <div className="col-12 text-white contact-help-text">
                                We’re here to help and answer any question you might have. We are looking forward to start a project with you!  
                            </div>  
                            <div className="col-12">
                                <button className="contact-us-btn-container">
                                    Contact Us         
                                </button>
                            </div>
                        </div>
                        <div className="reserved-paid-container col-12 col-lg-12 col-sm-12">
                            © 2021 Simply Works, All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer