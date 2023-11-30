import React from "react";
import "./App.css";
import { userRoutes } from "./routes/Routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Updated import

import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext } from "./context/AppContext";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {" "}
          {/* Replace Switch with Routes */}
          {userRoutes.map((route, index) => (
            <Route
              path={route.path}
              element={<route.component />}
              key={index}
            />
          ))}
        </Routes>{" "}
        {/* Replace Switch with Routes */}
      </Router>
    </>
  );
}

export default App;
