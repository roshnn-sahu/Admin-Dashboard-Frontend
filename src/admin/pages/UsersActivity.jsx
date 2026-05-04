import { useEffect, useState } from "react";
import Spinner from "../components/ui/Spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UsersActivitySearchBar } from "../components/SearchBars";
import { activityApi } from "../api/activityApi";

const UsersActivity = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;

  const [loading, setLoading] = useState(false);
  const [activites, setActivities] = useState([]);
  //search Variables
  const [filters, setFilters] = useState({
    user: queryParams.get("user") || "",
    action: queryParams.get("action") || "",
    role: queryParams.get("role") || "",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);

  //pagination variables
  const [page, setPage] = useState(currentPage);
  const [limit, setLimit] = useState(15);
  const [totalPages, setTotalPages] = useState();
  const params = new URLSearchParams({
    page,
    limit,
    user: appliedFilters.user,
    action: appliedFilters.action,
    role: appliedFilters.role,
  }).toString();

  const getUsersActivites = async () => {
    setLoading(true);
    try {
      const res = await activityApi.getUsersActivites(params);
      setActivities(res.activities);
      setTotalPages(res.totalPages || 1);
      setPage(res.currentPage || 1);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigate(`?${params}`, { replace: false });
    getUsersActivites();
  }, [page, appliedFilters]);

  return (
    <>
      <UsersActivitySearchBar
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
      ) : !activites || activites.length == 0 ? (
        <h2 className="text-black-50 text-center mt-5">No data Available</h2>
      ) : (
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="table-responsive rounded-3 ">
                <table
                  border="1"
                  className="table table-striped border table-bordered"
                >
                  <thead className="">
                    <tr className="table-head ">
                      <th width="2%" className="ml-5">
                        #
                      </th>
                      <th width="2%">Date</th>
                      <th width="17%">User</th>
                      <th width="17%">Role</th>
                      <th width="19%">Action</th>
                      <th width="22%">Action On</th>
                      <th width="16%">Browser </th>
                      <th width="9%">Os </th>
                      <th width="9%">Ip </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading
                      ? ""
                      : activites.map((val, index) => (
                          <tr key={index}>
                            <td className="text-center">
                              {(page - 1) * limit + index + 1}
                            </td>

                            <td>
                              {val.date
                                ? isNaN(new Date(val.date).getTime())
                                  ? val.date
                                  : new Date(val.date).toLocaleString()
                                : ""}
                            </td>
                            <td>{val.user_id?.name ?? "Unknown"}</td>
                            <td className="text-center">{val.role}</td>
                            <td className="text-center">{val.action}</td>
                            <td className="text-center">{val.action_on}</td>
                            <td className="text-theme-primary text-center">
                              {val.browser}
                            </td>
                            <td className="text-theme-primary text-center">
                              {val.os}
                            </td>
                            <td className="text-theme-primary text-center">
                              {val.ip}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                  {/* {loading && (
                    <div className="text-center my-5 position-absolute w-100">
                      <Spinner color="primary" />
                    </div>
                  )} */}
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

export default UsersActivity;

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
              currentPage === 1 ? "disabled  bg-disabled border" : ""
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
