import { useEffect, useState } from "react";
import {
  RiFileTextLine,
  RiGlobalLine,
  RiDashboardLine,
  RiFile3Line,
  RiFileList3Line,
  RiGroupLine,
  RiBarChartLine,
  RiSettings4Line,
  RiArrowRightSLine,
  RiArrowDownSLine,
} from "@remixicon/react";
import { NavLink, Link } from "react-router-dom";
import { AddLeadModal, FileUploadModal } from "../modals/LeadModals";
import { AddUserModal } from "../modals/UserModals";
import useAuthCheck from "../../Hooks/useAuthCheck";
import { rightsApi } from "../../api/rightsApi";
import Spinner from "@/ui/Spinner";

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
      setLoading(true);
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
                to="/admin/pages/Dashboard"
                className={`nav-link bg-light-50 active-sidebar`}
              >
                <RiDashboardLine className="menu-icon me-2" size={20} />
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
                <RiFile3Line className="menu-icon me-2" size={20} />
                <span className="menu-title">File</span>
                {openDropdown === "fileDropdown" ? (
                  <RiArrowDownSLine className="menu-arrow ml-auto" size={18} />
                ) : (
                  <RiArrowRightSLine className="menu-arrow ml-auto" size={18} />
                )}
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
                <RiFileList3Line className="menu-icon me-2" size={20} />
                <span className="menu-title">Lead</span>
                {openDropdown === "leadDropdown" ? (
                  <RiArrowDownSLine className="menu-arrow ml-auto" size={18} />
                ) : (
                  <RiArrowRightSLine className="menu-arrow ml-auto" size={18} />
                )}
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
                <RiGroupLine className="menu-icon me-2" size={20} />
                <span className="menu-title">Users</span>
                {openDropdown === "userDropdown" ? (
                  <RiArrowDownSLine className="menu-arrow ml-auto" size={18} />
                ) : (
                  <RiArrowRightSLine className="menu-arrow ml-auto" size={18} />
                )}
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
                <RiGlobalLine className="menu-icon me-2" size={20} />
                <span className="menu-title">Website</span>
                {openDropdown === "websiteDropdown" ? (
                  <RiArrowDownSLine className="menu-arrow ml-auto" size={18} />
                ) : (
                  <RiArrowRightSLine className="menu-arrow ml-auto" size={18} />
                )}
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
                <RiBarChartLine className="menu-icon me-2" size={20} />
                <span className="menu-title">Users Activity</span>
                {openDropdown === "userActivityDropdown" ? (
                  <RiArrowDownSLine className="menu-arrow ml-auto" size={18} />
                ) : (
                  <RiArrowRightSLine className="menu-arrow ml-auto" size={18} />
                )}
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
                  <RiSettings4Line className="menu-icon me-2" size={20} />
                  <span className="menu-title ">Settings</span>
                  {openDropdown === "settingDropdown" ? (
                    <RiArrowDownSLine className="menu-arrow ml-auto" size={18} />
                  ) : (
                    <RiArrowRightSLine className="menu-arrow ml-auto" size={18} />
                  )}
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
