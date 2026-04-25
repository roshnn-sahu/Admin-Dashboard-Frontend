import React, { useEffect, useState } from "react";
import Spinner from "../AdminComponents/ui/Spinner";
import { cmsApi } from "../api/cmsApi";
import { CreateCmsModal } from "../AdminComponents/modals/cmsModals";

const CmsList = () => {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const limit = 10;

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await cmsApi.getCmsList({ page, limit });

      // ✅ your controller returns { success, data, total, totalPages }
      setPages(res.data.data);
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

      <div className="row">
        <div className="col-md-12">
          <div className="card">

            {/* ✅ Spinner OUTSIDE table */}
            {loading && (
              <div className="text-center my-4">
                <Spinner color="primary" />
              </div>
            )}

            <div className="table-responsive rounded-3">
              <table className="table table-striped border table-bordered">
                <thead>
                  <tr className="table-head">
                    <th width="20">#</th>
                    <th width="*">Name</th>
                    <th width="*">Title</th>
                    <th width="*">URL</th>
                    <th width="*">Content Preview</th>
                    <th width="30">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && pages.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No pages found.
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    pages.map((page, index) => (
                      <tr key={page._id}>

                        {/* ✅ correct serial number with pagination */}
                        <td className="text-center">
                          {(page - 1) * limit + index + 1}
                        </td>

                        <td><b>{page.name}</b></td>
                        <td>{page.title || "—"}</td>
                        <td>{page.url}</td>

                        {/* ✅ safe content preview — won't crash if null */}
                        <td className="text-muted">
                          {page.content
                            ? page.content.substring(0, 100) + "..."
                            : "No content"}
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
                                data-bs-target="#editCmsModal"
                                onClick={() => setSelectedId(page._id)} // ✅ fixed: was lead._id
                              >
                                <i className="typcn typcn-pen"></i> View / Edit
                              </button>
                              <button
                                className="dropdown-item text-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteCmsModal"
                                onClick={() => setSelectedId(page._id)} // ✅ fixed
                              >
                                <i className="typcn typcn-trash"></i> Delete
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
        <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
          &laquo;
        </button>
      </li>

      {/* Page numbers */}
      {pages.map((num) => (
        <li key={num} className={`page-item ${num === currentPage ? "active" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(num)}>
            {num}
          </button>
        </li>
      ))}

      {/* Next */}
      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
        <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
          &raquo;
        </button>
      </li>
    </ul>
  );
};