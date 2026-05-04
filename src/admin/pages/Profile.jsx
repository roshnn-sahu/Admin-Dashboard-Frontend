import Spinner from "@/ui/Spinner";
import { useAuth } from "../context/AuthContext";
const Profile = () => {
  const { userData, isLoading, isAuthenticated } = useAuth();

  return (
    <>
      {!userData ? (
        <h2 className="text-black-50 text-center mt-5">No data Available</h2>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title ">Profile Info</h4>
              <form className="form-sample">
                <div className="row mb-3">
                  <div className="col-4 mx-auto justify-content-center d-flex">
                    <div className="form-group d-flex justify-content-center align-items-center border rounded-3">
                      <div className="profile-img w-50 rounded-full overflow-hidden ">
                        <img
                          src={
                            userData && userData.image != null
                              ? import.meta.env.VITE_BACKEND_API +
                                "/uploads/profile/" +
                                userData.image
                              : "/public/assets/img/profile/Default_pfp.jpg"
                          }
                          alt=""
                          className="w-100 mx-auto"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <label for="">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="Name"
                        disabled
                        value={userData.name}
                      />
                    </div>
                    <div className="form-group ">
                      <label>Designation</label>
                      <div className>
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
                          disabled
                          value={userData.gender}
                        >
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">
                      Date of Birth
                    </label>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        placeholder="dd/mm/yyyy"
                      />
                    </div>
                  </div>
                </div> */}
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
                      <label className="col-sm-3 col-form-label">
                        Email ID
                      </label>
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
                      <label className="col-sm-3 col-form-label">
                        Reg.Date
                      </label>
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
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
