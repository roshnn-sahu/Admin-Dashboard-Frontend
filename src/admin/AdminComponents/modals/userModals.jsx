import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/admin/context/AuthContext";

import Spinner from "../ui/Spinner";
import { toast } from "react-toastify";
import { useDataRefresh } from "@/admin/context/DataRefreashContext";

// APIs:
import { authApi } from "@/admin/api/authApi";
import { usersApi } from "@/admin/api/usersApi";

//--------------User Modals--------------

export const AddUserModal = () => {
  const fileInputRef = useRef(null);
  const { callRefresh } = useDataRefresh();
  const [preview, setPreview] = useState("/assets/img/profile/Default_pfp.png");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    gender: "",
    role: "",
    email: "",
    password: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Trigger file input when image is clicked
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      // Update state properly
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const clearForm = () => {
    setFormData({
      name: "",
      mobile: "",
      gender: "",
      role: "",
      email: "",
      password: "",
      image: null,
    });
    setPreview("/assets/img/profile/Default_pfp.png");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authApi.registerUser(formData);
      toast.success(res.message);
      clearForm();
      await callRefresh("userList");
      document.querySelector("#addUser .btn-close")?.click();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal"
      id="addUser"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog  modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <i className="typcn typcn-user fs-5 menu-icon"></i>
            <h1
              className="modal-title fs-5 fw-semibold"
              id="staticBackdropLabel"
            >
              User Registration Form
            </h1>
            <button
              onClick={clearForm}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form className="forms-sample" onSubmit={handleSubmit}>
              <div className="row p-2">
                <div className="col-6 col-lg-4">
                  <div className="form-group h-75">
                    <img
                      src={preview}
                      alt="profile preview"
                      onClick={handleImageClick}
                      className="new-user-img w-100 mb-2 border border-secondary rounded-3 pe-auto"
                      style={{ cursor: "pointer" }}
                    />

                    {/* Hidden file input */}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      className="form-control form-control-sm"
                      name="image"
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">Name</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail3">Email address</label>
                    <input
                      required
                      type="email"
                      className="form-control"
                      id="exampleInputEmail3"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputMobile">Mobile</label>
                    <input
                      maxLength={10}
                      required
                      type="text"
                      className="form-control"
                      id="exampleInputMobile"
                      placeholder="Mobile"
                      pattern="[6-9]{1}[0-9]{9}"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword4">Password</label>
                    <input
                      required
                      type="password"
                      className="form-control"
                      id="exampleInputPassword4"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect2">Gender</label>
                    <select
                      className="form-control text-dark border"
                      id="exampleFormControlSelect2"
                      name="gender"
                      required
                      onChange={handleChange}
                      value={formData.gender}
                    >
                      <option value="" disabled>
                        Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="roleSelect">Role</label>
                    <select
                      className="form-control text-dark border"
                      id="roleSelect"
                      required
                      onChange={handleChange}
                      value={formData.role}
                      name="role"
                    >
                      <option value="" disabled>
                        Role
                      </option>
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <button
                  disabled={loading ? true : false}
                  type="submit"
                  className="btn btn-block btn-primary font-weight-medium auth-form-btn w-25 float-right mb-3"
                >
                  {loading ? <Spinner /> : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
//Edit User
export const EditUserModal = ({ editUserId = null, onUserUpdate }) => {
  const { checkAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [preview, setPreview] = useState("/assets/img/profile/Default_pfp.png");
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    gender: "",
    role: "",
    email: "",
    password: "",
    image: null,
  });

  const fileInputRef = useRef(null);
  // ✅ Fetch user data when modal opens or ID changes
  const getUser = async () => {
    try {
      const user = await usersApi.getUserById(editUserId);
      setInitialData(user);
      setFormData({
        name: user.name || "",
        mobile: user.mobile || "",
        gender: user.gender || "",
        role: user.role || "",
        email: user.email_id || "",
        password: "",
        image: user.image || null,
      });
      setPreview(
        user.image
          ? `${import.meta.env.VITE_BACKEND_API}/uploads/${user.image}`
          : "/assets/img/profile/Default_pfp.png",
      );
    } catch (err) {
      toast.error("Failed to fetch user");
    }
  };
  // ✅ Fetch when ID changes
  useEffect(() => {
    if (editUserId) getUser();
  }, [editUserId]);

  // ✅ Fetch again every time modal is opened
  useEffect(() => {
    const modalEl = document.getElementById("editUser");
    const handleModalShow = () => {
      if (editUserId) getUser();
    };

    modalEl?.addEventListener("shown.bs.modal", handleModalShow);
    return () =>
      modalEl?.removeEventListener("shown.bs.modal", handleModalShow);
  }, [editUserId]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image upload and preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleImageClick = () => fileInputRef.current.click();

  // ✅ Submit edited user data

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await usersApi.updateUser(editUserId, formData);
      toast.success(result.message || "User updated successfully ✅");
      await checkAuth();
      if (onUserUpdate) onUserUpdate();
      document.querySelector("#editUser .btn-close")?.click();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      name: initialData.name || "",
      mobile: initialData.mobile || "",
      gender: initialData.gender || "",
      role: initialData.role || "",
      email: initialData.email_id || "",
      password: "",
      image: initialData.image || null,
    });

    setPreview(
      initialData.image
        ? `${import.meta.env.VITE_BACKEND_API}/uploads/${initialData.image}`
        : "/assets/img/profile/Default_pfp.png",
    );
  };

  return (
    <div
      className="modal "
      id="editUser"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="editUserLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header bg-light">
            <i className="typcn typcn-user fs-5 menu-icon"></i>
            <h1 className="modal-title fs-5 fw-semibold" id="editUserLabel">
              Edit User
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClear}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <form onSubmit={handleSubmit} className="forms-sample">
              <div className="row p-2">
                {/* Profile Image */}
                <div className="col-6 col-lg-4">
                  <div className="form-group h-75">
                    <img
                      src={
                        preview
                          ? preview
                          : import.meta.env.VITE_BACKEND_API +
                            "/uploads/" +
                            formData.image
                      }
                      alt="Profile"
                      onClick={handleImageClick}
                      className="new-user-img w-100 mb-2 border border-secondary rounded-3"
                      style={{ cursor: "pointer" }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      className="form-control form-control-sm"
                      name="image"
                    />
                  </div>
                </div>

                {/* User Info */}
                <div className="col-md-8">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      required
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label>Mobile</label>
                    <input
                      type="text"
                      className="form-control"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      maxLength="10"
                      pattern="[6-9]{1}[0-9]{9}"
                      required
                      placeholder="Enter mobile number"
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      disabled
                      placeholder="Cant Change Password"
                    />
                  </div>

                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      className="form-control text-dark border"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Role</label>
                    <select
                      className="form-control text-dark border"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      <option>User</option>
                      <option>Admin</option>
                      <option>Super Admin</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="text-end">
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-primary font-weight-medium auth-form-btn w-25 mb-3"
                >
                  {loading ? <Spinner /> : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

//Delete Modal
export const DeleteModal = ({ id, route, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const deleteUser = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await usersApi.deleteUser(route, id);
      toast.success(data.message || "User deleted successfully!");
      if (onUpdate) onUpdate();
      document.querySelector("#delete .btn-close")?.click();
    } catch (err) {
      toast.error(err.message || "Error deleting user!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal modal-sm mx-auto  "
      id="delete"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-sm   modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header " hidden>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body mx-auto p-4">
            <div className="d-flex gap-4 mx-auto">
              <button
                disabled={loading}
                type="button"
                className="btn btn-light border"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className="btn btn-danger"
                onClick={deleteUser}
              >
                {" "}
                {loading ? <Spinner /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//Delete Modal
export const ChangeUserPassword = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const modalRef = useRef(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await usersApi.changePassword(id, password);
      toast.success(data.message || "Password Changed!");
      document.querySelector("#changePassword .btn-close")?.click();
    } catch (error) {
      toast.error("Error deleting user!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal modal-sm mx-auto  "
      id="changePassword"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-sm   modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header " hidden>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body mx-auto p-4">
            <form action="">
              <input
                type="text"
                className="form-control"
                placeholder="Enter New Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div className="d-flex justify-content-between mx-auto">
                <button
                  disabled={loading}
                  type="button"
                  className="btn btn-light border"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  className="btn btn-danger"
                  onClick={handleSubmit}
                >
                  {" "}
                  {loading ? <Spinner /> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
