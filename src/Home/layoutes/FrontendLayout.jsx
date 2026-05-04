import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const FrontendLayout = () => {
  return (
    <>
      <Header />
      <Outlet />

      <Footer />
    </>
  );
};

export default FrontendLayout;
