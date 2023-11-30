import React from "react";
import "./Portfolio.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Line from "../../components/lines/Line";

const Portfolio = () => {
    return (
        <>
        <Header />
        <div className="portfolio-container-page">
            <div className="row line-container">
                <div className="page-name col-4 col-lg-2 col-sm-4 mb-5">
                    OUR .PORTFOLIO
                </div>
                <div className="footer-line col-8 col-lg-10 col-sm-8"></div>
            </div>
            <div className="row d-flex justify-content-end portfolio-page-info-text">
                <div class="col-12 col-lg-5 col-sm-12 row">
                    <div className="col-5 col-lg-12 col-sm-5 portfolio-page-number">
                        02
                    </div>
                    <div className="col-12 portfolio-page-title">
                        OUR PORTFOLIO
                    </div>
                    <div className="col-12 portfolio-page-text-info">
                        A small section of our work that combines creativity and the latest technology available that appeal to large audiences.
                    </div>
                
                </div>
            </div>
            <div className="row portfolio-page-sport-info">
                <div className="col-12 row">
                    <div className="col-4 row contento">
                        <div className="col-12 omega-text">
                            OMEGA DUBAI DESERT CLASSIC
                        </div>
                        <div className="col-12 dubai-text">
                            Dubai Desert Classic attracts the biggest golf professionals, to come to Dubai and play the tournament year after year.
                        </div>
                        <div className="col-12">
                            <img src="./assets/images/desert classic 1 copy 1.png"></img>
                        </div>
                    </div>
                    <div className="col-12 col-lg-8 col-sm-12 row p-0 m-0">
                        <div className="col-12 text-end p-0">
                            <img class="desert-clasic-img" src="./assets/images/desert classic 1 copy 2.png"></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row portfolio-page-awards-info">
                <div className="col-12 col-lg-9 col-sm-12">
                    <img class="soccer-awards-img" src="./assets/images/SOCCER WARDS 2 copy.png"></img>
                </div>
                <div className="col-12 col-lg-3 col-sm-12 row">
                    <div className="col-12 dubai-globe-text">
                        DUBAI GLOBE SOCCER AWARDS
                    </div>
                    <div className="internation-football-text col-12">
                        The international football meeting takes the stage in Dubai and delights the stars by selecting them for its Awards.
                    </div>
                    <div className="col-12 soccer-awards-img-container">
                        <img src="./assets/images/SOCCER WARDS 3 copy 1.png"></img>
                    </div>
                </div>
            </div>
            <div className="col-12 text-center see-more-container">
                see more
            </div>
        </div>
        <Footer />
        </>
    )
}
export default Portfolio