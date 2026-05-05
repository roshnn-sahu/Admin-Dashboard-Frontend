import Navbar from "../includes/Navbar";
import Sidebar from "../includes/Sidebar";
import Breadcrumb from "../includes/Breadcrumb";
import { Outlet } from "react-router-dom";
import Footer from "../includes/Footer";
import { X } from "lucide-react";
import useExternalStyles from "@/hooks/useExternalStyles";

const AdminLayout = ({ userData }) => {
  useExternalStyles([
    "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css",
    "/admin/assets/styles/style.css",
  ]);
  return (
    <>
      <div className="row d-none" id="proBanner">
        <div className="col-12">
          <X className="fs-5" id="bannerClose" />
        </div>
      </div>
      <div className="container-scroller">
        {/* <!-- partial:partials/_navbar.html --> */}
        <Navbar userData={userData} />
        {/* <!-- partial --> */}
        <Breadcrumb />
        <div className="container-fluid page-body-wrapper ">
          <Sidebar />
          <div className="main-panel  py-2 rounded-3  ml-3 pe-3 mb-3">
            {/* <!-- partial:partials/_sidebar.html --> */}
            {/* <!-- partial --> */}
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AdminLayout;
