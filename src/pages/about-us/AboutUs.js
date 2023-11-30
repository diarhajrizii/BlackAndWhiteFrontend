import React from "react";
import "./AboutUs.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
const AboutUs = () => {
  const [BackEndData, setBackEndData] = useState([{}]);
  useEffect(() => {
    fetch("/api/v1/sports/sport")
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data, "SportsRoutes");
        setBackEndData(data);
      });
  });
  return (
    <>
      <Header />
      <div className="about-us-page-container">
        <div className="about-us-container">
          <div className="about-us-container-img d-flex justify-content-between">
            <div className="about-us-img"></div>
            <div>
              <span className="weare-text">WE’RE A</span>
              <span className="digital-text">DIGITAL</span>
              <span className="agency-text">AGENCY</span>
              <span className="based-in-text">BASED IN</span>
              <span className="london-text">LONDON DUBAI</span>
            </div>
            <div className="vector"></div>
            <span className="information-text">
              We are app and web development company with offices in London and
              Dubai creating apps for top startups and well established brands.{" "}
            </span>
          </div>
        </div>
        <div className="about-us-bottom-page">
          <div className="row mb-5 about-us-line-vector">
            <div className="page-name col-2">ABOUT .US</div>
            <div className="footer-line col-10"></div>
          </div>
        </div>
        <div className="about-us-video-container">
          <img
            className="about-us-video-img"
            src="./assets/images/video_image_2 copy a 1.png"
          ></img>
        </div>
        <div className="who-weare-container">
          <div className="row">
            <div className="col-4 who-we-are-txt">
              <div className="col-12">WHO</div>
              <div className="col-12">WE ARE</div>
            </div>
            <div className="col-8">
              <div className="col-12 who-1-txt">
                WE SUPERCHARGE DIGITAL CAPABILITIES
              </div>
              <div className="col-12 who-2-txt">
                Our team has over 20 years collective experience delivering
                digital projects in the Middle east. We are passionate about
                user experience driven products and digital technologies. We
                have worked across many sectors including government, education,
                legal, finance, retail and lifestyle.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
