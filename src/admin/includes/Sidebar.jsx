import { useEffect, useState } from "react";
import { RiFileTextLine, RiGlobalLine } from "@remixicon/react";
import { NavLink, Link } from "react-router-dom";
import {
  AddLeadModal,
  FileUploadModal,
} from "../AdminComponents/modals/leadModals";
import { AddUserModal } from "../AdminComponents/modals/userModals";
import useAuthCheck from "../Hooks/useAuthCheck";
import { rightsApi } from "../api/rightsApi";
import Spinner from "../AdminComponents/ui/Spinner";

const Sidebar = () => {
  const { userData } = useAuthCheck();
  const [userRights, setUserRights] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleHandle = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };


  const getRights = async () => {
    setLoading(true);
    try {
      const rightsRes = await rightsApi.getRights(userData?._id);
      setUserRights(rightsRes?.data?.modules);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true );
    }
  };
  useEffect(() => {
    getRights();
  }, [userData]);

  return (
    <>
      <AddLeadModal />
      <AddUserModal />
      <FileUploadModal />

      {loading ? (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <ul className="nav">
            {/* Dashboard - Always visible */}
            <li className="nav-item border-bottom">
              <NavLink
                to="/admin/dashboard"
                className={`nav-link bg-light-50 active-sidebar`}
              >
                <i className="typcn typcn-device-desktop menu-icon"></i>
                <span className="menu-title">Dashboard</span>
              </NavLink>
            </li>

            <li className="nav-item border-bottom">
              <Link
                onClick={() => toggleHandle("fileDropdown")}
                className="nav-link bg-light"
                aria-expanded={openDropdown === "fileDropdown"}
                aria-controls="fileDropdown"
              >
                <i className="typcn typcn-document menu-icon"></i>
                <span className="menu-title">File</span>
                <i className="menu-arrow"></i>
              </Link>

              <div
                className={`sub-menu-wrapper ${
                  openDropdown === "fileDropdown" ? "show" : "hide"
                }`}
                id="fileDropdown"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item border-bottom">
                    <Link
                      className="nav-link add-items text-success"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#fileUpload"
                    >
                      Add File
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* LeadDropdown */}
            <li className="nav-item border-bottom">
              <Link
                onClick={() => toggleHandle("leadDropdown")}
                className="nav-link bg-light"
                aria-expanded={openDropdown === "leadDropdown"}
                aria-controls="leadDropdown"
              >
                <i className="typcn typcn-document-text menu-icon"></i>
                <span className="menu-title">Lead</span>
                <i className="menu-arrow"></i>
              </Link>

              <div
                className={`sub-menu-wrapper ${
                  openDropdown === "leadDropdown" ? "show" : "hide"
                }`}
                id="leadDropdown"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item border-bottom">
                    <Link
                      className="nav-link add-items text-success"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#addLead"
                    >
                      Add Lead
                    </Link>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/admin/lead-list"
                      className={`nav-link active-sidebar`}
                    >
                      Lead List
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            {/* User Dropdown - Show if user has any user rights */}
            <li className="nav-item border-bottom">
              <Link
                onClick={() => toggleHandle("userDropdown")}
                className="nav-link bg-light"
                aria-expanded={openDropdown === "userDropdown"}
                aria-controls="userDropdown"
              >
                <i className="typcn typcn-group-outline menu-icon"></i>
                <span className="menu-title">Users</span>
                <i className="menu-arrow"></i>
              </Link>

              <div
                className={`sub-menu-wrapper ${
                  openDropdown === "userDropdown" ? "show" : "hide"
                }`}
                id="userDropdown"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item border-bottom">
                    <Link
                      className="nav-link add-items text-success"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#addUser"
                    >
                      Add User
                    </Link>
                  </li>

                  {/* Users List - Show only if list right is true */}

                  <li className="nav-item">
                    <NavLink
                      to="/admin/users-list"
                      className={`nav-link active-sidebar`}
                    >
                      Users List
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            {/* WEBSITE Dropdown - Show if user has any user rights */}

            <li className="nav-item border-bottom">
              <Link
                onClick={() => toggleHandle("websiteDropdown")}
                className="nav-link bg-light"
                aria-expanded={openDropdown === "websiteDropdown"}
                aria-controls="websiteDropdown"
              >
                <RiGlobalLine className="me-2" style={{ height: "20px" }} />
                <span className="menu-title">Website</span>
                <i className="menu-arrow"></i>
              </Link>

              <div
                className={`sub-menu-wrapper ${
                  openDropdown === "websiteDropdown" ? "show" : "hide"
                }`}
                id="websiteDropdown"
              >
                <ul className="nav flex-column sub-menu">
                  {/* Users List - Show only if list right is true */}

                  <li className="nav-item">
                    <NavLink
                      to="/admin/website/cms"
                      className={`nav-link active-sidebar`}
                    >
                      Cms
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            {/* User Activity Dropdown - Always visible or conditionally based on your requirements */}
            <li className="nav-item border-bottom">
              <Link
                onClick={() => toggleHandle("userActivityDropdown")}
                className="nav-link bg-light"
                aria-expanded={openDropdown === "userActivityDropdown"}
                aria-controls="userActivityDropdown"
              >
                <i className="typcn typcn-chart-area-outline menu-icon"></i>
                <span className="menu-title">Users Activity</span>
                <i className="menu-arrow"></i>
              </Link>

              <div
                className={`sub-menu-wrapper ${
                  openDropdown === "userActivityDropdown" ? "show" : "hide"
                }`}
                id="userActivityDropdown"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <NavLink
                      to="/admin/users-activity"
                      className={`nav-link active-sidebar`}
                    >
                      Users Activity
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            {/* Settings Dropdown - Only for Super Admin */}
            {userData?.role === "Super Admin" && (
              <li className="nav-item border-bottom">
                <Link
                  onClick={() => toggleHandle("settingDropdown")}
                  className="nav-link bg-light "
                  aria-expanded={openDropdown === "settingDropdown"}
                  aria-controls="settingDropdown"
                >
                  <i className="typcn typcn-cog-outline menu-icon"></i>
                  <span className="menu-title ">Settings</span>
                  <i className="menu-arrow "></i>
                </Link>

                <div
                  className={`sub-menu-wrapper ${
                    openDropdown === "settingDropdown" ? "show" : "hide"
                  }`}
                  id="settingDropdown"
                >
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item border-bottom">
                      <NavLink
                        to="/admin/settings/"
                        className={`nav-link active-sidebar`}
                      >
                        Manage Company
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </nav>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Sidebar;
