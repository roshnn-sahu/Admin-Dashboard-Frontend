import { Link } from "react-router-dom"

const Header = () => {
  return (
 <>
       <header id="header-wrap">
        {/* <!-- Navbar Start --> */}
        <nav className="navbar navbar-expand-lg fixed-top scrolling-navbar indigo">
          <div className="container">
            {/* <!-- Brand and toggle get grouped for better mobile display --> */}
            <div className="navbar-header">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#main-navbar"
                aria-controls="main-navbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
                <span className="icon-menu"></span>
                <span className="icon-menu"></span>
                <span className="icon-menu"></span>
              </button>
              <Link to="/" className="navbar-brand">
                <img src="assets/img/logo.png" alt="" />
              </Link>
            </div>
            <div className="collapse navbar-collapse" id="main-navbar">
              <ul className="onepage-nev navbar-nav mr-auto w-100 justify-content-end clearfix">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/services">
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/testimonial">
                    Testimonial
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/portfolio">
                    Work
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* <!-- Mobile Menu Start --> */}
          <ul className="onepage-nev mobile-menu">
            <li>
              <Link to="#home">Home</Link>
            </li>
            <li>
              <Link to="#about">about</Link>
            </li>
            <li>
              <Link to="#services">Services</Link>
            </li>
            <li>
              <Link to="#testimonial">Tesimonial</Link>
            </li>
            <li>
              <Link to="#portfolio">Work</Link>
            </li>
            <li>
              <Link to="#contact">Contact</Link>
            </li>
          </ul>
          {/* <!-- Mobile Menu End --> */}
        </nav>
        {/* <!-- Navbar End --> */}

   
      </header>
 </>
  )
}

export default Header