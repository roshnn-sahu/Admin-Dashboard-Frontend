import React, { useState } from "react";

import Spinner from "../AdminComponents/ui/Spinner";
import { CreateCmsModal } from "../AdminComponents/modals/cmsModals";

const CmsList = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <CreateCmsModal />
      
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="table-responsive rounded-3 ">
              <table className="table table-striped border table-bordered">
                <thead className="">
                  <tr className="table-head ">
                    <th width="20" className="ml-5">
                      #
                    </th>
                    <th width="20" className="ml-5">
                      id
                    </th>
                    <th width="*">Name</th>
                    <th width="*">Title</th>
                    <th width="*">Url</th>

                    <th width="30">
                      {" "}
                      <i className="typcn typcn-th-menu"></i>{" "}
                    </th>
                  </tr>
                </thead>
                {/* <tbody>
                        {loading
                          ? ""
                          : leads.toReversed().map((lead, index) => (
                              <tr key={index}>
                                <td className="text-center">
                                  {(page - 1) * limit + index + 1}
                                </td>
    
                                <td>
                                  <b>{lead.name}</b>{" "}
                                </td>
                                <td>{lead.email_id}</td>
                                <td className="text-center">{lead.subject}</td>
                                <td colSpan="3" className="text-theme-primary">
                                  {lead.message}
                                </td>
                                <td>
                                  <div className="d-flex align-items-center float-right">
                                    <div className="dropdown">
                                      <button
                                        type="button"
                                        className="btn btn-primary btn-sm dropdown-toggle"
                                        id="dropdownMenuIconButton3"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                      ></button>
                                      <div
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuIconButton3"
                                      >
                                        <a
                                          className="dropdown-item"
                                          href="#"
                                          type="button"
                                          data-bs-toggle="modal"
                                          data-bs-target="#editLead"
                                          onClick={(e) => setLeadId(lead._id)}
                                        >
                                          <i className="typcn typcn-pen"></i> View /
                                          Edit
                                        </a>
                                        <a
                                          className="dropdown-item text-danger"
                                          type="button"
                                          data-bs-toggle="modal"
                                          data-bs-target="#delete"
                                          onClick={(e) => {
                                            setLeadId(lead._id);
                                          }}
                                        >
                                          <i className="typcn typcn-trash"></i>{" "}
                                          Delete{" "}
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                      </tbody> */}
                {loading && (
                  <div className="text-center my-5 position-absolute w-100">
                    <Spinner color="primary" />
                  </div>
                )}
              </table>
              <div className="d-flex justify-content-center">
                {/* <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={(newPage) => {
                          if (newPage >= 1 && newPage <= totalPages) {
                            setPage(newPage);
                          }
                        }}
                      /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CmsList;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div aria-label="Page navigation example  mx-auto">
      <ul className="pagination ">
        <li
          className={`page-item ${
            currentPage === 1 ? "disabled bg-light" : ""
          }`}
        >
          <Link
            to=""
            className={`page-link ${
              currentPage === 1 ? "disabled bg-disabled border" : ""
            }`}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &laquo;
          </Link>
        </li>

        {pages.map((num) => (
          <li
            key={num}
            className={`page-item ${num === currentPage ? "active" : ""}`}
          >
            {" "}
            <button className="page-link" onClick={() => onPageChange(num)}>
              {num}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className={`page-link ${
              currentPage === totalPages ? "disabled bg-disabled border" : ""
            }`}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </div>
  );
};
