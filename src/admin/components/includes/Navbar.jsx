import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import logo from "/admin/assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import {
  RiArrowDownDoubleLine,
  RiArrowDownWideLine,
  RiMenu2Line,
  RiArrowDownSLine,
  RiUserLine,
  RiEditLine,
  RiKeyLine,
  RiLogoutBoxLine,
  RiCalendarLine,
  RiSettings4Line,
  RiNotification3Line,
  RiInformationLine,
} from "@remixicon/react";

const navbar = () => {
  const navigate = useNavigate();
  const { userData, isLoading, isAuthenticated } = useAuth();
  const handleLogOut = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/logout`,
        {
          method: "GET",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      if (res.ok) {
        const data = await res.json();
        navigate(data.redirectUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex justify-content-center">
          <div className="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
            <Link className="navbar-brand brand-logo" to="/admin/pages/Dashboard">
              <img src={logo} alt="logo" />
            </Link>
            <Link
              className="navbar-brand brand-logo-mini"
              to="/admin/pages/Dashboard"
            >
              <img src="/public/admin/assets/images/logo-mini.svg" alt="logo" />
            </Link>
          </div>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          {/* User Profile */}
          <ul className="navbar-nav mr-lg-2 profile-dropdown">
            <li className="nav-item nav-profile dropdown">
              <Link
                className="nav-link  rounded-3"
                to="#"
                data-toggle="dropdown"
                id="profileDropdown"
              >
                <img
                  src={
                    userData && userData.image
                      ? `${import.meta.env.VITE_BACKEND_API}/uploads/profile/${
                          userData.image
                        }?t=${Date.now()}`
                      : "/assets/img/profile/Default_pfp.png"
                  }
                  alt="profile"
                  className="m-auto"
                />
              </Link>
              <div
                className="d-flex flex-column justify-content-center lh-1  cursor-auto"
                data-toggle="dropdown"
                id="profileDropdown"
              >
                <span className="nav-profile-name fs-5 fw-bold ml-2 p-0">
                  {userData ? userData.name : "User Name"}

                  <RiArrowDownSLine size={18} className="fw-normal align-self-start rotate-45 mx-0" />
                </span>
                <p className="ml-2 mb-0 p-0 text-dark ">
                  {" "}
                  {userData ? userData.role : "User Name"}
                </p>
              </div>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown  "
                aria-labelledby="profileDropdown"
              >
                <Link to="/admin/profile" className="dropdown-item">
                  <RiUserLine className="text-theme-primary me-2" size={18} />
                  Profile
                </Link>
                <Link to="/admin/edit/profile" className="dropdown-item">
                  <RiEditLine className="text-theme-primary me-2" size={18} />
                  Edit Profile
                </Link>
                <Link to="/admin/change-password" className="dropdown-item">
                  <RiKeyLine className="text-theme-primary me-2" size={18} />
                  Change Password
                </Link>
                <Link className="dropdown-item" onClick={handleLogOut}>
                  <RiLogoutBoxLine className="text-theme-primary me-2" size={18} />
                  Logout
                </Link>
              </div>
            </li>
          </ul>

          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-date dropdown">
              <Link
                className="nav-link d-flex justify-content-center align-items-center"
                to="javascript:;"
              >
                <h6 className="date mb-0">
                  Today : {new Date().toDateString()}
                </h6>
                <RiCalendarLine className="ms-2" size={18} />
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center"
                id="messageDropdown"
                to="#"
                data-toggle="dropdown"
              >
                <RiSettings4Line className="mx-0" size={20} />
                <span className="count"></span>
              </Link>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="messageDropdown"
              >
                <p className="mb-0 font-weight-normal float-left dropdown-header">
                  Messages
                </p>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img
                      src="/public/admin/assets/images/faces/face4.jpg"
                      alt="image"
                      className="profile-pic"
                    />
                  </div>
                  <div className="preview-item-content flex-grow">
                    <h6 className="preview-subject ellipsis font-weight-normal">
                      David Grey
                    </h6>
                    <p className="font-weight-light small-text text-muted mb-0">
                      The meeting is cancelled
                    </p>
                  </div>
                </Link>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img
                      src="/public/admin/assets/images/faces/face2.jpg"
                      alt="image"
                      className="profile-pic"
                    />
                  </div>
                  <div className="preview-item-content flex-grow">
                    <h6 className="preview-subject ellipsis font-weight-normal">
                      Tim Cook
                    </h6>
                    <p className="font-weight-light small-text text-muted mb-0">
                      New product launch
                    </p>
                  </div>
                </Link>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img
                      src="/public/admin/assets/images/faces/face3.jpg"
                      alt="image"
                      className="profile-pic"
                    />
                  </div>
                  <div className="preview-item-content flex-grow">
                    <h6 className="preview-subject ellipsis font-weight-normal">
                      {" "}
                      Johnson
                    </h6>
                    <p className="font-weight-light small-text text-muted mb-0">
                      Upcoming board meeting
                    </p>
                  </div>
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown mr-0">
              <Link
                className="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center"
                id="notificationDropdown"
                to="#"
                data-toggle="dropdown"
              >
                <RiNotification3Line className="mx-0" size={20} />
                <span className="count"></span>
              </Link>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="notificationDropdown"
              >
                <p className="mb-0 font-weight-normal float-left dropdown-header">
                  Notifications
                </p>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <RiInformationLine className="mx-0 text-white" size={18} />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">
                      Application Error
                    </h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      Just now
                    </p>
                  </div>
                </Link>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-warning">
                      <RiSettings4Line className="mx-0 text-white" size={18} />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">
                      Settings
                    </h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      Private message
                    </p>
                  </div>
                </Link>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-info">
                      <RiUserLine className="mx-0 text-white" size={18} />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">
                      New user registration
                    </h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      2 days ago
                    </p>
                  </div>
                </Link>
              </div>
            </li>
          </ul>

          <span
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center border-0 outline-0"
            type="button"
            data-toggle="offcanvas"
          >
            <RiMenu2Line />
          </span>
        </div>
      </nav>
    </div>
  );
};

export default navbar;
