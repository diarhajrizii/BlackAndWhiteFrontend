import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "../src/store"; // Import your Redux store created with RTK
import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import "assets/scss/black-and-white.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { AuthProvider } from "views/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/admin/*" element={<AdminLayout />} />
              <Route path="/rtl/*" element={<RTLLayout />} />
              <Route
                path="*"
                element={<Navigate to="/admin/dashboard" replace />}
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  </Provider>
);
