import {
  RiDashboardLine,
  RiFile3Line,
  RiFileList3Line,
  RiGroupLine,
  RiGlobalLine,
  RiBarChartLine,
  RiSettings4Line,
  RiArrowDownSLine,
  RiArrowRightSLine,
} from "@remixicon/react";
import { NavLink, Link } from "react-router-dom";
import { AddLeadModal, FileUploadModal } from "../components/modals/leadModals";
import { AddUserModal } from "../components/modals/userModals";
import useAuthCheck from "../Hooks/useAuthCheck";
import { rightsApi } from "../api/rightsApi";
import Spinner from "@/shared/ui/Spinner";
import { useEffect, useState } from "react";

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
      setLoading(false);
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

      {!loading ? (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <ul className="nav border  ">
            {/* Dashboard - Always visible */}
            <li className="nav-item border-bottom">
              <NavLink
                to="/admin/dashboard"
                className={`nav-link active-sidebar`}
              >
                <RiDashboardLine className="menu-icon mr-2" size={18} />
                <span className="menu-title">Dashboard</span>
              </NavLink>
            </li>

            <li className="nav-item border-bottom">
              <Link
                onClick={() => toggleHandle("SQLDropdown")}
                className="nav-link  d-flex justify-content-between py-2"
                aria-expanded={openDropdown === "SQLDropdown"}
                aria-controls="SQLDropdown"
              >
                <div>
                  <RiFile3Line className="menu-icon mr-2" size={18} />
                  <span className="menu-title">SQL</span>
                </div>
                {openDropdown === "SQLDropdown" ? (
                  <RiArrowDownSLine
                    className="menu-arrow float-end"
                    size={18}
                  />
                ) : (
                  <RiArrowRightSLine
                    className="menu-arrow float-end"
                    size={18}
                  />
                )}
              </Link>

              <div
                className={`sub-menu-wrapper ${
                  openDropdown === "SQLDropdown" ? "show" : "hide"
                }`}
                id="SQLDropdown"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item border-bottom">
                    <Link to="/admin/sql">Add SQL File</Link>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-item border-bottom">
              <Link
                onClick={() => toggleHandle("fileDropdown")}
                className="nav-link  d-flex justify-content-between py-2"
                aria-expanded={openDropdown === "fileDropdown"}
                aria-controls="fileDropdown"
              >
                <div>
                  <RiFile3Line className="menu-icon mr-2" size={18} />
                  <span className="menu-title">File</span>
                </div>
                {openDropdown === "fileDropdown" ? (
                  <RiArrowDownSLine
                    className="menu-arrow float-end"
                    size={18}
                  />
                ) : (
                  <RiArrowRightSLine
                    className="menu-arrow float-end"
                    size={18}
                  />
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
                className="nav-link  d-flex justify-content-between py-2"
                aria-expanded={openDropdown === "leadDropdown"}
                aria-controls="leadDropdown"
              >
                <div>
                  <RiFileList3Line className="menu-icon mr-2" size={18} />
                  <span className="menu-title">Lead</span>
                </div>
                {openDropdown === "leadDropdown" ? (
                  <RiArrowDownSLine className="menu-arrow" size={18} />
                ) : (
                  <RiArrowRightSLine className="menu-arrow" size={18} />
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
                className="nav-link  d-flex justify-content-between py-2"
                aria-expanded={openDropdown === "userDropdown"}
                aria-controls="userDropdown"
              >
                <div>
                  <RiGroupLine className="menu-icon mr-2" size={18} />
                  <span className="menu-title">Users</span>
                </div>
                {openDropdown === "userDropdown" ? (
                  <RiArrowDownSLine className="menu-arrow" size={18} />
                ) : (
                  <RiArrowRightSLine className="menu-arrow" size={18} />
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

            <li className="nav-item border-bottom">
              <Link
                onClick={() => toggleHandle("websiteDropdown")}
                className="nav-link  d-flex justify-content-between py-2"
                aria-expanded={openDropdown === "websiteDropdown"}
                aria-controls="websiteDropdown"
              >
                <div>
                  <RiGlobalLine className="menu-icon mr-2" size={18} />
                  <span className="menu-title">Website</span>
                </div>
                {openDropdown === "websiteDropdown" ? (
                  <RiArrowDownSLine className="menu-arrow" size={18} />
                ) : (
                  <RiArrowRightSLine className="menu-arrow" size={18} />
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
                className="nav-link  d-flex justify-content-between py-2"
                aria-expanded={openDropdown === "userActivityDropdown"}
                aria-controls="userActivityDropdown"
              >
                <div>
                  <RiBarChartLine className="menu-icon mr-2" size={18} />
                  <span className="menu-title">Users Activity</span>
                </div>
                {openDropdown === "userActivityDropdown" ? (
                  <RiArrowDownSLine className="menu-arrow" size={18} />
                ) : (
                  <RiArrowRightSLine className="menu-arrow" size={18} />
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
                  className="nav-link  d-flex justify-content-between py-2"
                  aria-expanded={openDropdown === "settingDropdown"}
                  aria-controls="settingDropdown"
                >
                  <div>
                    <RiSettings4Line className="menu-icon mr-2" size={18} />
                    <span className="menu-title ">Settings</span>
                  </div>
                  {openDropdown === "settingDropdown" ? (
                    <RiArrowDownSLine className="menu-arrow" size={18} />
                  ) : (
                    <RiArrowRightSLine className="menu-arrow" size={18} />
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
        <div className="sidebar vh-100 d-flex align-items-center justify-content-center">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default Sidebar;
