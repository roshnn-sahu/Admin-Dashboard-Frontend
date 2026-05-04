import React, { useEffect, useState } from "react";
import Spinner from "@/ui/Spinner";
import { cmsApi } from "../api/cmsApi";
import {
  CreateCmsModal,
  DeletecCmsModal,
  UpdateCmsModal,
} from "../components/modals/cmsModals";
import {
  RiMenuLine,
  RiEditLine,
  RiDeleteBinLine,
} from "@remixicon/react";

const CmsList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const limit = 10;

  const BASE_URL = import.meta.env.VITE_FRONTEND_API || `http://localhost:5173`;

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await cmsApi.getCmsList({ page, limit });
      setdata(res.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("fetchPages error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ re-fetch when page changes
  useEffect(() => {
    fetchPages();
  }, [page]);

  return (
    <>
      <CreateCmsModal onSuccess={fetchPages} />
      <UpdateCmsModal onSuccess={fetchPages} id={selectedId} />
      <DeletecCmsModal onSuccess={fetchPages} id={selectedId} />
      {/* ✅ Spinner OUTSIDE table */}
      {loading && (
        <div className="text-center my-4 w-100 d-block mx-auto">
          <Spinner color="primary" />
        </div>
      )}
      {loading ? (
        ""
      ) : (
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="table-responsive rounded-3">
                <table className="table  border table-bordered">
                  <thead>
                    <tr className="table-head">
                      <th rowspan="2" width="20">
                        #
                      </th>
                      <th rowspan="2" width="20">
                        type
                      </th>
                      <th rowspan="2" width="10%">
                        parent
                      </th>
                      <th rowspan="2" width="15%" align="center">
                        Name
                      </th>
                      <th rowspan="2" width="*15%">
                        Title
                      </th>
                      <th rowspan="2" width="*">
                        URL
                      </th>
                      <th colspan="3" width="15%">
                        Position-order
                      </th>

                      <th rowspan="2" width="30">
                        {" "}
                        <RiMenuLine size={18} />{" "}
                      </th>
                    </tr>
                    <tr>
                      <th>MENU</th>
                      <th>HEADER</th>
                      <th>FOOTER</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading && data.length === 0 && (
                      <tr>
                        <td colSpan="10" className="text-center py-4">
                          No pages found.
                        </td>
                      </tr>
                    )}

                    {!loading &&
                      data.map((page, index) => (
                        <tr key={page._id}>
                          {/* ✅ correct serial number with pagination */}
                          <td className="text-center">{index + 1}</td>

                          <td>{page.type}</td>
                          <td className="text-muted text-center">
                            <b>{page.parent ? page.parent : "—"}</b>
                          </td>
                          <td>{page.name || "—"}</td>
                          <td>{page.title || "—"}</td>
                          <td className="text-center">
                            <a target="_blank" href={BASE_URL + page.url}>
                              {page.url}
                            </a>
                          </td>
                          <td>
                            {page.position.menu === true
                              ? page.order.menu
                              : "—"}
                          </td>
                          <td>
                            {page.position.top_header === true
                              ? page.order.top_header
                              : "—"}
                          </td>
                          <td>
                            {page.position.footer === true
                              ? page.order.footer
                              : "—"}
                          </td>

                          <td>
                            <div className="dropdown">
                              <button
                                type="button"
                                className="btn btn-primary btn-sm dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              />
                              <div className="dropdown-menu">
                                <button
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#updateCms"
                                  onClick={() => setSelectedId(page._id)} // ✅ fixed: was lead._id
                                >
                                  <RiEditLine size={18} className="me-2" /> View /
                                  Edit
                                </button>
                                <button
                                  className="dropdown-item text-danger"
                                  data-bs-toggle="modal"
                                  data-bs-target="#deleteCmsModal"
                                  onClick={() => setSelectedId(page._id)} // ✅ fixed
                                >
                                  <RiDeleteBinLine size={18} className="me-2" /> Delete
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {/* ✅ Pagination */}
                <div className="d-flex justify-content-center pb-3">
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

export default CmsList;

// ─── Pagination Component ─────────────────────────────────────────────────────
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      {/* Prev */}
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => onPageChange(currentPage - 1)}
        >
          &laquo;
        </button>
      </li>

      {/* Page numbers */}
      {pages.map((num) => (
        <li
          key={num}
          className={`page-item ${num === currentPage ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => onPageChange(num)}>
            {num}
          </button>
        </li>
      ))}

      {/* Next */}
      <li
        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => onPageChange(currentPage + 1)}
        >
          &raquo;
        </button>
      </li>
    </ul>
  );
};
