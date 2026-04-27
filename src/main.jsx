import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { AuthProvider } from "./admin/context/AuthContext.jsx";
import { DataRefreshProvider } from "./admin/context/DataRefreashContext.jsx";
import { HelmetProvider } from "react-helmet-async";

import "./App.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <DataRefreshProvider>
            <App />
          </DataRefreshProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
