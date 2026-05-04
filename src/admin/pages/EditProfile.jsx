import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/ui/Spinner";
import { toast } from "react-toastify";
import { useRef } from "react";
import { authApi } from "../api/authApi";

const EditProfile = () => {
  const { userData, isLoading, checkAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: userData ? userData.name : "",
    gender: userData ? userData.gender : "",
    image: userData ? userData.image : "",
  });
  const [profilePreview, setProfilePreview] = useState(
    userData && userData.image != null
      ? import.meta.env.VITE_BACKEND_API + "/uploads/" + userData.image
      : "/assets/img/profile/Default_pfp.png",
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const fileInputRef = useRef();

  // ✅ Handle image upload and preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleImageClick = () => fileInputRef.current.click();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authApi.updateProfile(userData.user_id, formData);
      toast.success(data.message);
      setFormData(data.user);
      await checkAuth(); // refresh session
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!userData || loading) return <Spinner size="lg" />;
  return (
    <>
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Profile Info</h4>
            <form
              className="form-sample"
              onSubmit={handleSubmit}
              enctype="multipart/form-data"
            >
              <div className="row mb-3">
                <div className="col-4 mx-auto justify-content-center d-flex">
                  <div className="form-group d-flex justify-content-center align-items-center  ">
                    <div className="profile-img w-50 rounded-full overflow-hidden">
                      <img
                        src={
                          profilePreview
                            ? profilePreview
                            : import.meta.env.VITE_BACKEND_API +
                              "/uploads/" +
                              userData.image
                        }
                        alt="profile-img"
                        onClick={handleImageClick}
                        className="w-100 mx-auto border rounded-3"
                      />
                      <input
                        className="form-control form-control-sm my-3"
                        id="formFileSm"
                        name="image"
                        type="file"
                        ref={fileInputRef}
                        disabled={loading}
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <label for="">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id=""
                      placeholder="Name"
                      onChange={handleChange}
                      disabled={loading}
                      value={formData != null ? formData.name : userData.name}
                    />
                  </div>
                  <div className="form-group row">
                    <label>Designation</label>
                    <div className="">
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        value={userData.role}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Gender</label>
                    <div className="col-sm-9">
                      <select
                        className="form-control text-dark"
                        name="gender"
                        value={
                          formData != null ? formData.gender : userData.gender
                        }
                        onChange={handleChange}
                        disabled={loading}
                      >
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-md-6"></div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Mobile</label>
                    <div className="col-sm-9">
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        value={userData.mobile}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Email ID</label>
                    <div className="col-sm-9">
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        value={userData.email_id}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Reg.Date</label>
                    <div className="col-sm-9">
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        value={userData.date.slice(0, 10)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Status</label>
                    <div className="col-sm-9">
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        value={userData.status}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                disabled={loading}
                type="submit"
                className="btn btn-danger float-right btn-sm"
              >
                {loading ? <Spinner /> : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
