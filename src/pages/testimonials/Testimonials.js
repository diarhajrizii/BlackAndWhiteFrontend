import React from "react";
import "./Testimonials.css"
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Testimonials = () => { 
    return(
        <>
        <Header/>
        <div className="testimonials-container">
            <div className="row line-container">
                <div className="footer-line col-4 col-lg-10 col-sm-4"></div>
                <div className="page-name col-8 col-lg-2 col-sm-8 mb-5">
                    CLIENT .TESTIMONIALS
                </div>
            </div>
            <div className="row d-flex justify-content-start testimonials-page-info-text">
                <div className="col-12 col-lg-5 col-sm-12 row">
                    <div className="col-7 col-lg-12 col-sm-7 testimonials-page-number">
                        03
                    </div>
                    <div className="col-7 col-lg-12 col-sm-7 testimonials-page-title">
                        CLIENT TESTIMONIALS
                    </div>
                    <div className="col-12 testimonials-page-text-info">
                        We’re happy to see more satisfied clients that have trusted us to work with thier projects. Are you next?
                    </div>
                </div>
            </div>
            <div className="row testimonials-profile-info-container">
                <div className="col-12 col-lg-4 col-sm-12 first-profile-container profiles-info-container">
                    <div className="profiles-info">
                        <div className="col-12">
                            <img className="profiles-img" src="./assets/images/66680042e64b10f16f2946ff4ef3113e 1.png"></img>
                        </div>
                        <div className="col-12">
                            <div className="col-12 profile-name-text">
                                JOHN DOE
                            </div>
                            <div className="col-12 profile-position-info">
                                CEO/Founder
                            </div>
                            <div className="col-12 company-name-info">
                                Company Name
                            </div>
                            <div className="col-11 profile-bio-info">
                            <span className="thojza">"</span> Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.
                                In vel dolor ut ante egestas
                                elementum. Lorem ipsum
                                dolor sit amet, consectetur 
                                adipiscing elit. Integer ante 
                                lacus, elementum at tempor 
                                vel...<span className="thojza">"</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4 col-sm-12 second-profile-container profiles-info-container">
                    <div className="profiles-info">
                        <div className="col-12">
                            <div className="col-12 second-profile-name-text">
                                JUDY CARLOS
                            </div>
                            <div className="col-12 second-profile-position-info">
                                CEO/Founder
                            </div>
                            <div className="col-12 second-company-name-info">
                                Company Name
                            </div>
                            <div className="col-12 second-profile-bio-info">
                                “Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.
                                In vel dolor ut ante egestas
                                elementum. Lorem ipsum
                                dolor sit amet, consectetur 
                                adipiscing elit. Integer ante 
                                lacus, elementum at tempor 
                                vel...”
                            </div>
                        </div>
                        <div className="col-12">
                            <img className="profiles-img" src="./assets/images/TESTI 2 copy 1.png"></img>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4 col-sm-12 third-profile-container profiles-info-container">
                    <div className="profiles-info">
                        <div className="col-12">
                            <img className="profiles-img" src="./assets/images/TESTI 3 copy 1.png"></img>
                        </div>
                        <div className="col-12">
                            <div className="col-12 third-profile-name-text">
                                JOHN DOE
                            </div>
                            <div className="col-12 third-profile-position-info">
                                CEO/Founder
                            </div>
                            <div className="col-12 third-company-name-info">
                                Company Name
                            </div>
                            <div className="col-12 third-profile-bio-info">
                                “Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.
                                In vel dolor ut ante egestas
                                elementum. Lorem ipsum
                                dolor sit amet, consectetur 
                                adipiscing elit. Integer ante 
                                lacus, elementum at tempor 
                                vel...”
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 text-center see-more-container">
                see more
            </div>
        </div>
        <Footer/>
       </>
    )
}

export default Testimonials