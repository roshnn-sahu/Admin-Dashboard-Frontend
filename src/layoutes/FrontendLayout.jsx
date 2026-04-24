import { Outlet } from "react-router-dom";
import Header from "../Home/Components/Header.jsx";
import Footer from "../Home/Components/Footer.jsx";

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
