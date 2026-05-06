import { StrictMode } from "react";
import { createRoot } from "react-dom/client";


import { AuthProvider } from "./admin/context/AuthContext";
import { DataRefreshProvider } from "./admin/context/DataRefreashContext";
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
