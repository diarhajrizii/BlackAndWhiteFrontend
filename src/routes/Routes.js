import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AboutUs from "../pages/about-us/AboutUs";
import Services from "../pages/services/Services";
import Portfolio from "../pages/portfolio/Portfolio";
import Testimonials from "../pages/testimonials/Testimonials";
import ContactUs from "../pages/contact-us/ContactUs";

const userRoutes = [
  { path: "/aboutus", component: AboutUs },
  { path: "/services", component: Services },
  { path: "/testimonials", component: Testimonials },
  { path: "/portfolio", component: Portfolio },
  { path: "/contactus", component: ContactUs },
  { path: "/", component: AboutUs },
  { path: "/", exact: true, component: () => <Navigate to="/" /> },
];
export { userRoutes };
