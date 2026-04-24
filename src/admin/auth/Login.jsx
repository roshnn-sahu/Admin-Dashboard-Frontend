import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../AdminComponents/ui/Spinner";
import useGetCompany from "../Hooks/useGetCompany";

const Login = () => {
  const { companyDetails, isLoading } = useGetCompany();
  const [cacheBust, setCacheBust] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const login_icon =
    companyDetails && companyDetails.images.login_icon != null
      ? import.meta.env.VITE_BACKEND_API +
        "/uploads/" +
        companyDetails.images.login_icon +
        `${cacheBust}`
      : "/admin/assets/images/logo-dark.svg";
  const login_bg =
    companyDetails && companyDetails.images.login_bg != null
      ? import.meta.env.VITE_BACKEND_API +
        "/uploads/" +
        companyDetails.images.login_bg +
        `${cacheBust}`
      : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message);
      } else if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        navigate(data.redirectUrl);
      }
      setLoading(false);
    } catch (error) {}
  };

  // Run only when image name changes
  useEffect(() => {
    if (companyDetails?.images?.login_bg) {
      setCacheBust(`?t=${Date.now()}`);
    }
  }, [companyDetails?.images?.login_bg]);

  return (
    <>
      <div className="container-scroller">
        <div
          className="container-fluid page-body-wrapper full-page-wrapper"
          style={{
            backgroundImage: `url(${login_bg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto shadow">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <div className="brand-logo">
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <img src={login_icon} alt="logo" />
                    )}
                  </div>
                  <h4>Hello! let's get started</h4>

                  <form className="pt-3" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="exampleInputEmail1"
                        placeholder="Email"
                        name="email"
                        required
                        onChange={handleChange}
                        value={formData.email}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        name="password"
                        required
                        onChange={handleChange}
                        value={formData.password}
                      />
                    </div>
                    <div className="mt-3">
                      <button
                        disabled={loading ? true : false}
                        type="submit"
                        className="btn btn-block bg-theme text-white font-weight-medium auth-form-btn"
                        value={"LOGIN"}
                      >
                        {loading ? <Spinner /> : "Login"}
                      </button>
                    </div>
                    <div className="my-2 d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-check-label text-muted pl-0 ml-0">
                          Keep me signed in
                        </label>
                      </div>
                      <Link
                        to="/admin/forget-password"
                        className="auth-link text-black"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- content-wrapper ends --> */}
        </div>
        {/* <!-- page-body-wrapper ends --> */}
      </div>
    </>
  );
};

export default Login;
