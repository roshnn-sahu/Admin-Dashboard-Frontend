import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "@/shared/ui/Spinner";
import useGetCompany from "../Hooks/useGetCompany";
import useExternalStyles from "@/shared/hooks/useExternalStyles";

const ADMIN_STYLES = ["/admin/assets/styles/style.css"];

const ForgetPassword = () => {
  useExternalStyles(ADMIN_STYLES);

  const { companyDetails, isLoading } = useGetCompany();
  const [cacheBust, setCacheBust] = useState("");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mobile: "",
    email: "",
  });

  const login_icon =
    companyDetails && companyDetails.images.login_icon != null
      ? import.meta.env.VITE_BACKEND_API +
        companyDetails.images.login_icon +
        `${cacheBust}`
      : "/admin/assets/images/logo-dark.svg";
  const login_bg =
    companyDetails && companyDetails.images.login_bg != null
      ? import.meta.env.VITE_BACKEND_API  +
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
        `${import.meta.env.VITE_BACKEND_API}/api/auth/forget-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
        setFormData({
          email: "",
          mobile: "",
        });
      }
    } catch (error) {
      throw Error(error);
    } finally {
      setLoading(false);
    }
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
              <div className="col-8 col-md-6 col-lg-5 col-xl-4 mx-auto px-2 shadow">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <div className="brand-logo">
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <img src={login_icon} alt="logo" />
                    )}
                  </div>
                  <h4>Forget Password?</h4>
                  <h6 className="font-weight-light">
                    Forget Password with few easy steps
                  </h6>
                  <form
                    className="pt-3"
                    onSubmit={handleSubmit}
                    enctype="multipart/form-data"
                  >
                    <div className="row  mx-auto">
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          className="form-control form-control-lg"
                          id="exampleInputEmail1"
                          placeholder="Registered Email"
                          required
                          onChange={handleChange}
                          value={formData.email}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="exampleInputUsername1"
                          placeholder="Registered Mobile"
                          name="mobile"
                          pattern="[0-9]{10}"
                          required
                          maxLength={10}
                          onChange={handleChange}
                          value={formData.mobile}
                        />
                      </div>

                      <div className="mt-3">
                        <button
                          disabled={loading ? true : false}
                          type="submit"
                          className="btn btn-block  bg-theme font-weight-medium auth-form-btn text-white"
                        >
                          {loading ? (
                            <Spinner color="white" className="my-2" />
                          ) : (
                            "Send Password"
                          )}
                        </button>
                      </div>
                      <div className="text-center mt-4 font-weight-light">
                        Back To?{" "}
                        <Link to="/admin/login" className="text-theme-primary">
                          Login
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
   
        </div>
        
      </div>
    </>
  );
};

export default ForgetPassword;
