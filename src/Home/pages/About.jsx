const About = () => {
  return (
    <>
      <div className="mt-5">
        <section id="about" className="section-padding border-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12">
                <div className="img-thumb wow fadeInLeft" data-wow-delay="0.3s">
                  <img
                    className="img-fluid"
                    src="assets/img/about/about-1.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12">
                <div
                  className="profile-wrapper wow fadeInRight"
                  data-wow-delay="0.3s"
                >
                  <span className="text-theme-primary fs-5 fw-semibold">
                    About Us{" "}
                  </span>
                  <h3 className="text-start text-black fs-1 fw-semibold">
                    We help teams build, ship, and scale the modern web.
                  </h3>
                  <p className="fs-6">
                    MeetMe is a powerful and intuitive platform designed to help
                    product teams move seamlessly from idea to impact—fast. By
                    eliminating the hassle of complex configurations,
                    infrastructure setup, and ongoing operational overhead,
                    MeetMe allows your developers to focus on what truly
                    matters: delivering customer value and driving innovation.
                    Built with security, performance, and reliability at its
                    core, MeetMe ensures that every project runs smoothly and
                    scales effortlessly. Whether you’re building your first MVP
                    or managing large-scale enterprise products, MeetMe provides
                    the speed, stability, and support your team needs to turn
                    great ideas into measurable success.
                  </p>
                  <div className="row">
                    <div className="col-4">
                      <div className="border d-flex  justify-content-center flex-column  rounded-3 shadow-sm px-3 py-2 ">
                        <h3 className="fw-semibold m-0 p-0">2019</h3>
                        <p className="p-0 m-0">Founded</p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="border d-flex  justify-content-center flex-column  rounded-3 shadow-sm px-3 py-2 ">
                        <h3 className="fw-semibold m-0 p-0">120+</h3>
                        <p className="p-0 m-0">Teammates</p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="border d-flex  justify-content-center flex-column  rounded-3 shadow-sm px-3 py-2 ">
                        <h3 className="fw-semibold m-0 p-0">50K+</h3>
                        <p className="p-0 m-0">Projects </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
