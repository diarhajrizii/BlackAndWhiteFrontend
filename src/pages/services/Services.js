import React from "react";
import "./Services.css"
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Line from "../../components/lines/Line";


const Services = () => {
    return(
        <>
        <Header/>
        <div className="services-page-container">
            <div className="services-container">
                <div className="row line-container">
                    <div className="footer-line col-6 col-lg-10 col-sm-6"></div>
                    <div className="page-name col-6 col-lg-2 col-sm-6 mb-5">
                        OUR .SERVICES
                    </div>
                </div>
                <div className="row d-flex justify-content-start services-page-info-text">
                    <div class="col-12 col-lg-5 col-sm-12 row">
                        <div className="col-12 services-page-number">
                            01
                        </div>
                        <div className="col-12 services-page-title">
                            OUR SERVICES
                        </div>
                        <div className="col-12 services-page-text-info">
                            We’re happy to see more satisfied clients that have trusted us to work with thier projects. Are you next?
                        </div>
                    </div>
                </div>
                <div className="row p-0 m-0 button-services-container">
                    <div className="col-12 col-lg-4 col-sm-12 row digital-row btn-info-row">
                        <div className="col-12 digital-strategy-img-container btn-img-container">
                            <img src="./assets/images/Group 929 (4).png"></img>
                        </div>
                        <div className="col-12 digital-strategy-title services-content-title">
                            DIGITAL STRATEGY
                        </div>
                        <div className="col-12 vector-img-container">
                            <img src="./assets/images/Vector 3.png"></img>
                        </div>
                        <div className="services-content-info">
                            We work with you to research, design and build world-class applications and software that engage and inspire.
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 col-sm-12 btn-info-row">
                        <div className="col-12 user-experience-img-container btn-img-container">
                            <img src="./assets/images/Group 929 (1).png"></img>
                        </div>
                        <div className="col-12 user-experience-title services-content-title">
                            USER EXPERIENCE 
                        </div>
                        <div className="col-12 vector-img-container">
                            <img src="./assets/images/Vector 3.png"></img>
                        </div>
                        <div className="services-content-info">
                            We work with you to research, design and build world-class applications and software that engage and inspire.
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 col-sm-12 btn-info-row">
                        <div className="col-12 product-design-img-container btn-img-container">
                            <img src="./assets/images/Group 929.png"></img>
                        </div>
                        <div className="col-12 product-design-title services-content-title">
                            PRODUCT DESIGN
                        </div>
                        <div className="col-12 vector-img-container">
                            <img src="./assets/images/Vector 3.png"></img>
                        </div>
                        <div className="services-content-info">
                            We work with you to research, design and build world-class applications and software that engage and inspire.
                        </div>
                    </div>
                    <div className="col-12 text-center mt-5">
                        {/* <img src="./assets/images/arrow slider.png"></img> */}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}
export default Services
