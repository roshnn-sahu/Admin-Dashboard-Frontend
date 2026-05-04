import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "@/ui/Spinner";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.newPassword !== formData.confirmPassword) {
      toast.warning("New Password and Confirm Password do not match!");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Something went wrong");
        navigate(data.redirectUrl);
      } else {
        const data = await res.json();
        toast.success(data.message || "Password changed successfully");
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }

      setLoading(false);
    } catch (error) {}
  };

  return (
    <div className="w-100 ">
      <div className="row ">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title"> Change Password</h4>

              <form className="forms-sample" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label for="exampleInputUsername1">Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="oldPassword"
                    id="exampleInputUsername1"
                    placeholder="Old Password"
                    required
                    onChange={handleChange}
                    value={formData.oldPassword}
                  />
                </div>

                <div className="form-group">
                  <label for="exampleInputPassword1">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="New Password"
                    required
                    onChange={handleChange}
                    value={formData.newPassword}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputConfirmPassword1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    id="exampleInputConfirmPassword1"
                    placeholder="Confirm Password"
                    required
                    onChange={handleChange}
                    value={formData.confirmPassword}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mr-2 w-25"
                  disabled={loading}
                >
                  {loading ? <Spinner /> : "Change"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
