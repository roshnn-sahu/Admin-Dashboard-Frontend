import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer-area  pt-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-4 col-md-6">
              <h3 className="text-white fw-semibold">MeetMe</h3>
              <p className="text-secondary">
                {" "}
                MeetMe is a powerful and intuitive platform designed to help
                product teams move seamlessly from idea to impact—fast. By
                eliminating the hassle of complex configurations, infrastructure
                setup, and ongoing operational overhead, MeetMe allows your
                developers to focus...
              </p>
              <ul className="social-icon  pl-0">
                <li>
                  <a className="facebook" href="#">
                    <i className="icon-social-facebook"></i>
                  </a>
                </li>
                <li>
                  <a className="twitter" href="#">
                    <i className="icon-social-twitter"></i>
                  </a>
                </li>
                <li>
                  <a className="instagram" href="#">
                    <i className="icon-social-instagram"></i>
                  </a>
                </li>
                <li>
                  <a className="instagram" href="#">
                    <i className="icon-social-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a className="instagram" href="#">
                    <i className="icon-social-google"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6">
              <h3 className="text-white fs-4">Quick Links</h3>
              <ul className="text-light  pl-0 lh-base">
                <li>
                  <a
                    href="#hero-area"
                    className="text-decoration-none text-secondary"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#hero-area"
                    className="text-decoration-none text-secondary"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#hero-area"
                    className="text-decoration-none text-secondary"
                  >
                    Service
                  </a>
                </li>
                <li>
                  <a
                    href="#hero-area"
                    className="text-decoration-none text-secondary"
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a
                    href="#hero-area"
                    className="text-decoration-none text-secondary"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h3 className="text-white fs-4">Informations</h3>
              <ul className="text-light  pl-0 lh-base">
                <li>
                  Address :{" "}
                  <span className="text-secondary">San Francisco, CA</span>
                </li>
                <li>
                  Email : <span className="text-secondary">xyz@gmail.com</span>
                </li>
                <li>
                  Phone : <span className="text-secondary">123456789</span>
                </li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h3 className="text-white fs-4">Newsletter</h3>
              <p className="text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                obcaecati perferendis quibusdam aliquam, ea .
              </p>
              <div className="row gap-2 pl-3 ">
                <input
                  type="text"
                  className=" border-0 outline-0 px-2 py-2 rounded-3 col-lg-6 col-md-6 col-6 "
                  placeholder="Subscribe"
                />
                <button className="btn btn-primary col-lg-4 col-md-2 col-3">Submit</button>
              </div>
            </div>
          </div>
          <div className="row  border-top">
            <div className="col-12">
              <div
                className="footer-text text-center wow fadeInDown"
                data-wow-delay="0.3s"
              >
                <p>Copyright © 2018 UIdeck All Right Reserved</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- Footer Section End --> */}

      {/* <!-- Go to Top Link --> */}
      <a href="#" className="back-to-top">
        <i className="icon-arrow-up"></i>
      </a>
    </>
  );
};

export default Footer;
