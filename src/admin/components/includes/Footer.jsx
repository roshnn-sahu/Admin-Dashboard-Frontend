const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="footer ">
        <div className="card">
          <div className="card-body">
            <div className="d-sm-flex justify-content-center ">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Copyright © {currentYear}
                <a
                  href="https://www.expertitservices.in/"
                  className="text-theme ml-1 fw-semibold "
                  target="_blank"
                >
                  Expert It Services
                </a>
                . All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
