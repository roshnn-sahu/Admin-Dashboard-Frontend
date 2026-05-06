import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "@/shared/ui/Spinner";
import {
  AddUserModal,
  EditUserModal,
  DeleteModal,
  ChangeUserPassword,
} from "../components/modals/userModals";
import { useDataRefresh } from "@/admin/context/DataRefreashContext";
import { useAuth } from "@/admin/context/AuthContext";
import { ShowEmail, ShowPhone } from "@/admin/lib/ShowFunctions";
import { UserListSearchBar } from "../components/SearchBars";
import { toast } from "react-toastify";

import {
  RiMenuLine,
  RiEyeLine,
  RiEditLine,
  RiKeyLine,
  RiDeleteBinLine,
} from "@remixicon/react";
import { usersApi } from "@/admin/api/usersApi";

const UserList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;
  //Hooks
  const { userData, isLoading, isAuthenticated } = useAuth();
  const { registerRefresh } = useDataRefresh();

  //States
  const [userId, setUserId] = useState(null);
  const [editUserId, setEditUserId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  //Pegination
  const [page, setPage] = useState(currentPage);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  //Search Filter
  const [filters, setFilters] = useState({
    name: queryParams.get("name") || "",
    email_id: queryParams.get("email_id") || "",
    mobile: queryParams.get("mobile") || "",
    status: queryParams.get("status") || "",
    gender: queryParams.get("gender") || "",
    role: queryParams.get("role") || "",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);

  const params = new URLSearchParams({
    page,
    limit,
    name: appliedFilters.name,
    email_id: appliedFilters.email_id,
    mobile: appliedFilters.mobile,
    status: appliedFilters.status,
    gender: appliedFilters.gender,
    role: appliedFilters.role,
  }).toString();

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const { users, totalPages, currentPage } =
        await usersApi.getAllUsers(params);
      setUsers(users);
      setTotalPages(totalPages);
      setPage(currentPage);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    registerRefresh("userList", getAllUsers);
    navigate(`?${params}`, { replace: false });
    getAllUsers();
  }, [page, appliedFilters]);

  return (
    <>
      <DeleteModal id={userId} route="delete-user" onUpdate={getAllUsers} />
      <EditUserModal editUserId={editUserId} onUserUpdate={getAllUsers} />
      <AddUserModal onUserAdded={getAllUsers} />
      <ChangeUserPassword id={userId} />

      <UserListSearchBar
        filters={filters}
        setFilters={setFilters}
        onSearch={() => {
          setPage(1);
          setAppliedFilters(filters);
        }}
        setAppliedFilters={setAppliedFilters}
      />

      {loading ? (
        <Spinner color="primary" className="mx-auto" size="lg" />
      ) : !users || users.length === 0 ? (
        <h2 className="text-black-50 text-center mt-5">No data Available</h2>
      ) : (
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="table-responsive rounded-3 ">
                <table className="table table-striped border table-bordered">
                  <thead className="">
                    <tr>
                      <th width="20" className="ml-5">
                        ID
                      </th>
                      <th width="*">Name</th>
                      <th width="10%">Gender </th>
                      <th width="10%">Role</th>
                      <th width="10%">Mobile </th>
                      <th width="10%">Email</th>
                      <th width="40" className="text-center">
                        Status{" "}
                      </th>
                      <th width="40">
                        {" "}
                        <RiMenuLine size={18} />{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading
                      ? ""
                      : users.toReversed().map((user, index) => (
                          <tr key={index}>
                            <td className="text-center ">{index + 1}</td>
                            <td>
                              <b>{user.name} </b>
                            </td>
                            <td className="text-center">{user.gender}</td>
                            <td>{user.role}</td>
                            <td>
                              <ShowPhone mobile={user.mobile} />
                            </td>
                            <td>
                              <ShowEmail email={user.email_id} />
                            </td>
                            <td className="text-center">
                              <span
                                class={`badge rounded-pill text-bg-${
                                  user.status === "Enabled"
                                    ? "success"
                                    : "danger"
                                } py-1`}
                              >
                                {" "}
                                {user.status}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex align-items-center float-right">
                                <div className="dropdown">
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm dropdown-toggle"
                                    id="dropdownMenuIconButton3"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  ></button>
                                  <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuIconButton3"
                                  >
                                    <Link
                                      className="dropdown-item"
                                      to={`/admin/profile/${user._id}`}
                                    >
                                      <RiEyeLine size={18} className="me-2" />{" "}
                                      View
                                    </Link>
                                    {(userData && userData.role === "Admin") ||
                                    (userData &&
                                      userData.role === "Super Admin") ? (
<button
                                        className="dropdown-item"
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editUser"
                                        onClick={() => setEditUserId(user._id)}
                                      >
                                        <RiEditLine
                                          size={18}
                                          className="me-2"
                                        />{" "}
                                        Edit
                                      </button>
                                    ) : (
                                      ""
                                    )}
                                    {userData &&
                                    userData.role === "Super Admin" ? (
<button
                                        className="dropdown-item text-danger"
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#changePassword"
                                        onClick={(e) => {
                                          setUserId(user._id);
                                        }}
                                      >
                                        <RiKeyLine size={18} className="me-2" />{" "}
                                        Change Password{" "}
                                      </button>
                                    ) : (
                                      ""
                                    )}
                                    {userData &&
                                    userData.role === "Super Admin" ? (
<button
                                        className="dropdown-item text-danger"
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#delete"
                                        onClick={(e) => {
                                          setUserId(user.email_id);
                                        }}
                                      >
                                        <RiDeleteBinLine
                                          size={18}
                                          className="me-2"
                                        />{" "}
                                        Delete{" "}
                                      </button>
                                    ) : (
                                      ""
                                    )}
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

                <div className="w-100 d-flex justify-content-center">
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

export default UserList;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div aria-label="Page navigation example  mx-auto">
      <ul className="pagination ">
        <li
          className={`page-item ${
            currentPage === 1 ? "disabled bg-light " : ""
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
