import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Spinner from "../AdminComponents/ui/Spinner";
import { useDataRefresh } from "../context/DataRefreashContext";
import {
  DeleteModal,
  AddLeadModal,
  EditLeadModal,
} from "../AdminComponents/modals/leadModals";
import { LeadListSearchBar } from "../AdminComponents/SearchBars";

import { leadsApi } from "../api/leadsApi";

const LeadList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;

  const { registerRefresh } = useDataRefresh();
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState([]); //array of leads
  const [leadId, setLeadId] = useState(null); //for edit lead

  //Pegination
  const [page, setPage] = useState(currentPage);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  //Search Filter
  const [filters, setFilters] = useState({
    name: queryParams.get("name") || "",
    email_id: queryParams.get("email_id") || "",
    mobile: queryParams.get("mobile") || "",
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);
  const params = new URLSearchParams({
    page,
    limit,
    name: appliedFilters.name,
    email_id: appliedFilters.email_id,
    mobile: appliedFilters.mobile,
  }).toString();

  //Fetching all Leads
  const getAllLeads = async () => {
    setLoading(true);
    try {
      const res = await leadsApi.getAllLeads(params);
      setLeads(res.leads);
      setTotalPages(res.totalPages || 1);
      setPage(res.currentPage || 1);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    registerRefresh("leadList", getAllLeads);
    navigate(`?${params}`, { replace: false });
    // 🔹 Always keep URL in sync
    getAllLeads();
  }, [page, appliedFilters]);

  return (
    <>
      <DeleteModal id={leadId} route="delete-lead" onUpdate={getAllLeads} />
      <AddLeadModal onLeadAdded={getAllLeads} />
      <EditLeadModal onUpdate={getAllLeads} leadId={leadId} />

      <LeadListSearchBar
        filters={filters}
        setFilters={setFilters}
        setAppliedFilters={setAppliedFilters}
        onSearch={() => {
          setPage(1);
          setAppliedFilters(filters);
        }}
      />
      {loading ? (
        <Spinner color="primary" className="mx-auto" size="lg" />
      ) : !leads || leads.length == 0 ? (
        <h2 className="text-black-50 text-center mt-5">No data Available</h2>
      ) : (
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
                      <th width="*">Name</th>
                      <th width="10%">Email</th>
                      <th width="10%">Subject</th>
                      <th colSpan="3">Message </th>
                      <th width="30">
                        {" "}
                        <i className="typcn typcn-th-menu"></i>{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
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
                  </tbody>
                  {loading && (
                    <div className="text-center my-5 position-absolute w-100">
                      <Spinner color="primary" />
                    </div>
                  )}
                </table>
                <div className="d-flex justify-content-center">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => {
                      if (newPage >= 1 && newPage <= totalPages) {
                        setPage(newPage);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeadList;

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
