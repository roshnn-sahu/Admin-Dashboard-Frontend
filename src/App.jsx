import { useState } from "react";
import "./App.css";
import "./styles/table.css";
import { Routes, Route, Link } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Routes
import Home from "./home/pages/Home";
import About from "./home/pages/About";
import Service from "./home/pages/Service";
import Testimonial from "./home/Components/Testimonial";
import Portfolio from "./home/pages/Portfolio";
import Contact from "./home/pages/Contact";
import DynamicPage from "./Home/pages/dynamic-pages";

//admin Routes
import AdminDashboard from "./admin/AdminDashboard";
import Login from "./admin/auth/Login";
import LeadList from "./admin/pages/LeadList";
import FrontendLayout from "./layoutes/FrontendLayout";
import AdminLayout from "./layoutes/AdminLayout";
import Profile from "./admin/pages/Profile";
import EditProfile from "./admin/pages/EditProfile";
import ChangePassword from "./admin/pages/changePassword";
import UserList from "./admin/pages/UserList";
import ViewProfile from "./admin/pages/ViewProfile";
import ForgetPassword from "./admin/auth/ForgetPassword";
//seting Route
import ManageCompany from "./admin/pages/ManageCompany";
import UsersActivity from "./admin/pages/UsersActivity";
import PageNotFound from "./admin/pages/PageNotFound";
import Cms from "./admin/pages/CmsList";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {/* Frontend routes */}
      <Routes>
        <Route element={<FrontendLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} /> */}
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
          {/* ✅ CMS catch-all — always last */}
          <Route path="/:slug" element={<DynamicPage />} />
          {/* if you have nested urls like /services/web-design */}
          <Route path="/:slug/*" element={<DynamicPage />} />
        </Route>
        {/* Admin routes */}

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/forget-password" element={<ForgetPassword />} />

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/profile/:id" element={<ViewProfile />} />
          <Route path="/admin/rights/:id" element={<ViewProfile />} />
          <Route path="/admin/edit/profile" element={<EditProfile />} />
          <Route path="/admin/change-password" element={<ChangePassword />} />
          <Route path="/admin/lead-list" element={<LeadList />} />
          <Route path="/admin/users-list" element={<UserList />} />
          <Route path="/admin/settings" element={<ManageCompany />} />
          <Route path="/admin/users-activity" element={<UsersActivity />} />
          <Route path="/admin/website/cms" element={<Cms />} />

          <Route path="admin/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
