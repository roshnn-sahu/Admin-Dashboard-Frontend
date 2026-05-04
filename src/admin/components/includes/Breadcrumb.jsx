import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  RiAddCircleLine,
  RiCalendarLine,
  RiMailLine,
  RiFolderLine,
  RiFileList3Line,
  RiArrowRightSLine,
} from "@remixicon/react";

const Breadcrumb = () => {
  const location = useLocation();

  // Break the path into parts (excluding empty and "admin")
  const pathnames = location.pathname
    .split("/")
    .filter((x) => x && x.toLowerCase() !== "admin");

  // Capitalize first letter of each word
  const formatName = (name) =>
    name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <nav
      className="navbar-breadcrumb col-xl-12 col-12 d-flex flex-row p-0"
      style={{ height: "45px" }}
    >
      {/* Left Side Icons */}
      <div
        className="navbar-links-wrapper d-flex align-items-stretch bg-dark"
        style={{ height: "45px" }}
      >
        <div className="nav-link bg-danger">
          <a href="#">
            <RiCalendarLine size={18} className="text-white" />
          </a>
        </div>
        <div className="nav-link bg-warning">
          <a href="#">
            <RiMailLine size={18} className="text-white" />
          </a>
        </div>
        <div className="nav-link bg-primary">
          <a href="#">
            <RiFolderLine size={18} className="text-white" />
          </a>
        </div>
        <div className="nav-link bg-success">
          <a href="#">
            <RiFileList3Line size={18} className="text-white" />
          </a>
        </div>
      </div>

      {/* Right Side Breadcrumb */}
      <div
        className="navbar-menu-wrapper d-flex align-items-center justify-content-end position-relative"
        style={{ height: "45px" }}
      >
        <ul className="navbar-nav mr-lg-2 py-2 position-absolute start-0">
          <li className="nav-item">
            <div className="d-flex align-items-baseline flex-wrap">
              <Link to="/" className="text-white mb-0 text-decoration-none">
                Home
              </Link>

              {pathnames.length > 0 && (
                <>
                  {pathnames.map((value, index) => {
                    // Split "lead-list" into ["lead", "list"]
                    const words = value.split("-");
                    return words.map((word, wordIndex) => {
                      const isLast =
                        index === pathnames.length - 1 &&
                        wordIndex === words.length - 1;

                      return (
                        <React.Fragment key={`${index}-${word}`}>
                          <RiArrowRightSLine size={16} className="text-white mx-1" />
                          {isLast ? (
                            <p className="mb-0 text-light">
                              {formatName(word)}
                            </p>
                          ) : (
                            <span className="text-white text-decoration-none">
                              {formatName(word)}
                            </span>
                          )}
                        </React.Fragment>
                      );
                    });
                  })}
                </>
              )}
            </div>
          </li>
        </ul>

      <ExternalCreateButton pathnames={pathnames} />
      </div>
    </nav>
  );
};

export default Breadcrumb;

const ExternalCreateButton = ({ pathnames }) => {

  return (
<>
   
        {pathnames.includes("cms") && (
          <button
            className="btn btn-primary btn-sm bg-white text-success border-0 shadow-sm d-flex align-items-center"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#createCms"
          >
            <RiAddCircleLine size={14} />
            Add New
          </button>
        )}
</>
  );
};
