import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import useExternalStyles from "@/hooks/useExternalStyles";

const FrontendLayout = () => {
  useExternalStyles([
    "/assets/styles/bootstrap.min.css",
    "/assets/styles/about.css",
    "/assets/styles/animate.css",
    "/assets/styles/main.css",
    "/assets/styles/responsive.css",
    "/assets/styles/slicknav.css",
    "/assets/styles/nivo-lightbox.css",
  ]);
  return (
    <>
      <Header />
      <Outlet />

      <Footer />
    </>
  );
};

export default FrontendLayout;
