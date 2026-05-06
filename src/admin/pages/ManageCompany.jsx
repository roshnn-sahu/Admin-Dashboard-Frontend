import React, { useState, useEffect } from "react";
import { RiFileList3Line, RiCloseLine } from "@remixicon/react";
import {
  handleNumberChange,
  handleTextChange,
  handleImageChange,
} from "../lib/FormHandler";
import { toast } from "react-toastify";
import useGetCompany from "../Hooks/useGetCompany";
import Spinner from "@/shared/ui/Spinner";

const ManageCompany = () => {
  const { companyDetails, isLoading, getCompanyDetails } = useGetCompany();
  const BASE_URL = import.meta.env.VITE_BACKEND_API;

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState({
    logo: null,
    icon: null,
    login_icon: null,
    login_bg: null,
  });

  const [formData, setFormData] = useState({
    name: "",
    display_name: "",
    gstin: "",
    aadhaar: "",
    pan: "",
    jurisdiction: "",
    phone: "",
    mobile: "",
    email_id: "",
    website: "",
    city: "",
    state: "",
    country: "",
    address: "",
    pin: "",
    facebook: null,
    instagram: null,
    twitter: null,
    linkedin: null,
    youtube: null,
    rss: null,
    icon: null,
    logo: null,
    login_icon: null,
    login_bg: null,
  });

  // Update form data when company details are available
  useEffect(() => {
    if (companyDetails) {
      setFormData({
        name: companyDetails.name || "",
        display_name: companyDetails.display_name || "",
        gstin: companyDetails.gstin || "",
        aadhaar: companyDetails.aadhaar || "",
        pan: companyDetails.pan || "",
        jurisdiction: companyDetails.jurisdiction || "",
        phone: companyDetails.phone || "",
        mobile: companyDetails.mobile || "",
        email_id: companyDetails.email_id || "",
        website: companyDetails.website || "",
        city: companyDetails.city || "",
        state: companyDetails.state || "",
        country: companyDetails.country || "",
        address: companyDetails.address || "",
        pin: companyDetails.pin || "",
        facebook: companyDetails.social.facebook || "",
        instagram: companyDetails.social.instagram || "",
        twitter: companyDetails.social.twitter || "",
        linkedin: companyDetails.social.linkedin || "",
        youtube: companyDetails.social.youtube || "",
        rss: companyDetails.social.rss || "",
        logo: null,
        icon: null,
        login_icon: null,
        login_bg: null,
      });
      setPreview({
        logo:
          companyDetails.images.logo != null
            ? BASE_URL +companyDetails.images.logo +`?t=${Date.now()}`
            : null,
        icon:
          companyDetails.images.icon != null
            ? BASE_URL  +
              companyDetails.images.icon +
              `?t=${Date.now()}`
            : null,
        login_icon:
          companyDetails.images.login_icon != null
            ? BASE_URL  +
              companyDetails.images.login_icon +
              `?t=${Date.now()}`
            : null,
        login_bg:
          companyDetails.images.login_bg != null
            ? BASE_URL  +
              companyDetails.images.login_bg +
              `?t=${Date.now()}`
            : null,
      });
    }
  }, [companyDetails]);

  //manage company
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/manage-company`,
        {
          method: "POST",
          credentials: "include",
          body: data,
        },
      );
      if (!res.ok) {
        toast.error("Somthing went wrong!");
      } else {
        const data = await res.json();
        toast.success(data.message);

        setFormData({
          name: "",
          display_name: "",
          gstin: "",
          aadhaar: "",
          pan: "",
          Jurisdiction: "",
          phone: "",
          mobile: "",
          email_id: "",
          website: "",
          city: "",
          state: "",
          country: "",
          address: "",
          pin: "",
          facebook: "",
          instagram: "",
          twitter: "",
          linkedin: "",
          youtube: "",
          rss: "",
          icon: null,
          logo: null,
          login_icon: null,
          login_bg: null,
        });
        setPreview({
          logo: null,
          icon: null,
          login_icon: null,
          login_bg: null,
        });
      }
      await getCompanyDetails();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading || isLoading ? (
        <Spinner size="lg" />
      ) : (
        <div className="w-100  ">
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <div className="row ">
              <div className="col-md-12 ">
                <div className="w-100  bg-white shadow">
                  <CompanyDetails
                    setFormData={setFormData}
                    formData={formData}
                  />
                  <CompanyContactDetails
                    setFormData={setFormData}
                    formData={formData}
                  />
                  <CompanySocialDetails
                    setFormData={setFormData}
                    formData={formData}
                  />
                  <CompanyLogoDetails
                    setFormData={setFormData}
                    formData={formData}
                    setPreview={setPreview}
                    preview={preview}
                    companyDetails={companyDetails}
                  />

                  <div className="w-100 bg-theme text-center  p-2 text-white fw-semibold">
                    <button
                      type="submit"
                      className="btn btn-primary w-25 shadow "
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ManageCompany;

const CompanyDetails = ({ setFormData, formData }) => {
  return (
    <>
      <div className="w-100 bg-theme   p-2 text-white fw-semibold">
        <RiFileList3Line className="menu-icon fs-5 mr-2" size={20} />
        Company Form
      </div>

      <div className="p-3">
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="company-name" className="form-label text-xs">
              Name <span className="text-danger">*</span>
            </label>
          </div>
          <div className="col-md-9">
            <input
              name="name"
              type="text"
              className="form-control form-control-sm m-0"
              id="companyName"
              placeholder="Example"
              required
              maxLength={200}
              value={formData.name}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyDisplayName" className="form-label text-xs">
              Display Name <span className="text-danger">*</span>
            </label>
          </div>
          <div className="col-md-9">
            <input
              required
              name="display_name"
              type="text"
              className="form-control form-control-sm m-0"
              id="companyDisplayName"
              placeholder="Example"
              maxLength={200}
              value={formData.display_name}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyGstin" className="form-label text-xs">
              GSTIN
            </label>
          </div>
          <div className="col-md-9">
            <input
              name="gstin"
              type="text"
              className="form-control form-control-sm m-0"
              id="companyGstin"
              maxLength={30}
              value={formData.gstin}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyAadhaar" className="form-label text-xs">
              AADHAAR
            </label>
          </div>
          <div className="col-md-9">
            <input
              name="aadhaar"
              type="text"
              className="form-control form-control-sm m-0"
              id="companyAadhaar"
              maxLength={12}
              value={formData.aadhaar}
              onChange={(e) => {
                handleNumberChange(e, setFormData);
              }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyPan" className="form-label text-xs">
              PAN
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              name="pan"
              className="form-control form-control-sm m-0"
              id="companyPan"
              maxLength={10}
              value={formData.pan}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyJurisdiction" className="form-label text-xs">
              Jurisdiction
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              name="jurisdiction"
              className="form-control form-control-sm m-0"
              id="companyJurisdiction"
              placeholder="Subjected to Bilaspur Jurisdiction"
              maxLength={100}
              value={formData.jurisdiction}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const CompanyContactDetails = ({ setFormData, formData }) => {
  return (
    <>
      <div className="w-100 bg-theme text-center  p-2 text-white fw-semibold">
        Contact
      </div>

      <div className="p-3">
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyPhone" className="form-label text-xs">
              Phone <span className="text-danger">*</span>
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              name="phone"
              className="form-control form-control-sm m-0"
              id="companyPhone"
              placeholder="0123456789"
              required
              inputMode="numeric"
              maxLength={10}
              value={formData.phone}
              onChange={(e) => handleNumberChange(e, setFormData)}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyMobile" className="form-label text-xs">
              Mobile <span className="text-danger">*</span>
            </label>
          </div>
          <div className="col-md-9">
            <input
              required
              type="text"
              name="mobile"
              className="form-control form-control-sm m-0"
              id="companyMobile"
              placeholder="0123456789"
              inputMode="numeric"
              maxLength={10}
              value={formData.mobile}
              onChange={(e) => handleNumberChange(e, setFormData)}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyEmail" className="form-label text-xs">
              Email Id <span className="text-danger">*</span>
            </label>
          </div>
          <div className="col-md-9">
            <input
              required
              type="email"
              name="email_id"
              className="form-control form-control-sm m-0"
              id="companyEmail"
              placeholder="email@example.com"
              maxLength={50}
              value={formData.email_id}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyWebsite" className="form-label text-xs">
              Website
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              name="website"
              className="form-control form-control-sm m-0"
              id="companyWebsite"
              placeholder="www.example.com"
              maxLength={200}
              value={formData.website}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyCity" className="form-label text-xs">
              City <span className="text-danger">*</span>
            </label>
          </div>
          <div className="col-md-9">
            <input
              required
              name="city"
              type="text"
              className="form-control form-control-sm m-0"
              id="companyCity"
              placeholder="City"
              max={50}
              value={formData.city}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyState" className="form-label text-xs">
              State <span className="text-danger">*</span>
            </label>
          </div>
          <div className="col-md-9">
            <input
              required
              type="text"
              name="state"
              className="form-control form-control-sm m-0"
              id="companyState"
              placeholder="State"
              maxLength={50}
              value={formData.state}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyCountry" className="form-label text-xs">
              Country <span className="text-danger">*</span>
            </label>
          </div>
          <div className="col-md-9">
            <input
              required
              type="text"
              name="country"
              className="form-control form-control-sm m-0"
              id="companyCountry"
              placeholder="Country"
              maxLength={50}
              value={formData.country}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyAddress" className="form-label text-xs">
              Address <span className="text-danger">*</span>
            </label>
          </div>
          <div className="col-md-9">
            <input
              required
              type="text"
              name="address"
              className="form-control form-control-sm m-0"
              id="companyAddress"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
              maxLength={50}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyPin" className="form-label text-xs">
              Pin <span className="text-danger">*</span>
            </label>
          </div>
          <div className="col-md-9">
            <input
              required
              type="text"
              name="pin"
              className="form-control form-control-sm m-0"
              id="companyState"
              placeholder="Pin"
              maxLength={6}
              value={formData.pin}
              onChange={(e) => {
                handleNumberChange(e, setFormData);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const CompanySocialDetails = ({ setFormData, formData }) => {
  return (
    <>
      <div className="w-100 bg-theme text-center  p-2 text-white fw-semibold">
        Social
      </div>

      <div className="p-3">
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyFacebook" className="form-label text-xs">
              Facebook
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control form-control-sm m-0"
              id="companyFacebook"
              maxLength={200}
              name="facebook"
              value={formData.facebook}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyInstagram" className="form-label text-xs">
              Instagram
            </label>
          </div>
          <div className="col-md-9">
            <input
              name="instagram"
              type="text"
              className="form-control form-control-sm m-0"
              id="companyInstagram"
              maxLength={200}
              value={formData.instagram}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyTwitter" className="form-label text-xs">
              Twitter
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control form-control-sm m-0"
              id="companyTwitter"
              maxLength={200}
              name="twitter"
              value={formData.twitter}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyLinkedin" className="form-label text-xs">
              Linkedin
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
              className="form-control form-control-sm m-0"
              id="companyLinkedin"
              maxLength={200}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyYoutube" className="form-label text-xs">
              Youtube
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control form-control-sm m-0"
              id="companyYoutube"
              maxLength={200}
              name="youtube"
              value={formData.youtube}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyRss" className="form-label text-xs">
              Rss
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control form-control-sm m-0"
              id="companyRss"
              name="rss"
              maxLength={200}
              value={formData.rss}
              onChange={(e) => {
                handleTextChange(e, setFormData);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const CompanyLogoDetails = ({
  setFormData,
  formData,
  setPreview,
  preview,
  companyDetails,
}) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_API;
  return (
    <>
      <div className="w-100 bg-theme text-center  p-2 text-white fw-semibold">
        Logo
      </div>

      <div className="p-3">
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyIcon" className="form-label text-xs">
              Icon
            </label>
          </div>
          <div className="col-md-4  d-flex align-items-center gap-2">
            <input
              type="file"
              name="icon"
              className="form-control form-control-sm m-0"
              id="companyIcon"
              placeholder="Example"
              maxLength={100}
              onChange={(e) => {
                handleImageChange(e, setFormData, setPreview);
              }}
            />
            {formData.icon ? (
              <RiCloseLine
                className="menu-icon fs-4 border rounded-circle px-1 cursor-pointer"
                size={24}
                onClick={() => {
                  setPreview((prev) => ({ ...prev, icon: "" }));
                  setFormData((prev) => ({ ...prev, icon: "" }));
                }}
              />
            ) : null}
          </div>
          <div className="col-md-5 text-center">
            <img
              src={
                preview.icon !== `${BASE_URL}/uploads/null` ? preview.icon : ""
              }
              alt={
                preview.icon !== `${BASE_URL}/uploads/null`
                  ? preview.icon
                  : null
              }
              className="mx-auto"
              style={{ width: "70px" }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyLogo" className="form-label text-xs">
              Logo
            </label>
          </div>
          <div className="col-md-4 d-flex align-items-center gap-2">
            <input
              name="logo"
              type="file"
              className="form-control form-control-sm m-0"
              id="companyLogo"
              placeholder="Example"
              maxLength={100}
              onChange={(e) => {
                handleImageChange(e, setFormData, setPreview);
              }}
            />
            {formData.logo ? (
              <RiCloseLine
                className="menu-icon fs-4 border rounded-circle px-1 cursor-pointer"
                size={24}
                onClick={() => {
                  setPreview((prev) => ({ ...prev, logo: "" }));
                  setFormData((prev) => ({ ...prev, logo: "" }));
                }}
              />
            ) : null}
          </div>
          <div className="col-md-5 text-center">
            <img
              src={
                preview.logo !== `${BASE_URL}/uploads/null`
                  ? preview.logo
                  : null
              }
              alt={
                preview.logo !== `${BASE_URL}/uploads/null`
                  ? preview.logo
                  : null
              }
              className="mx-auto"
              style={{ width: "70px" }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyLoginIcon" className="form-label text-xs">
              Login Icon
            </label>
          </div>
          <div className="col-md-4 d-flex align-items-center gap-2">
            <input
              type="file"
              name="login_icon"
              className="form-control form-control-sm m-0"
              id="companyLoginIcon"
              placeholder="Example"
              maxLength={100}
              onChange={(e) => {
                handleImageChange(e, setFormData, setPreview);
              }}
            />

            {formData.login_icon ? (
              <RiCloseLine
                className="menu-icon fs-4 border rounded-circle px-1 cursor-pointer"
                size={24}
                onClick={() => {
                  setPreview((prev) => ({ ...prev, login_icon: "" }));
                  setFormData((prev) => ({ ...prev, login_icon: "" }));
                }}
              />
            ) : null}
          </div>
          <div className="col-md-5 text-center">
            <img
              src={
                preview.login_icon !== `${BASE_URL}/uploads/null`
                  ? preview.login_icon
                  : null
              }
              alt={
                preview.login_icon !== `${BASE_URL}/uploads/null`
                  ? preview.login_icon
                  : "exp.png"
              }
              className="mx-auto"
              style={{ width: "70px" }}
            />
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label for="companyLoginBgImage" className="form-label text-xs">
              Login Bg Image
            </label>
          </div>
          <div className="col-md-4 d-flex align-items-center gap-2">
            <input
              type="file"
              name="login_bg"
              className="form-control form-control-sm m-0"
              id="companyLoginBgImage"
              placeholder="Example"
              maxLength={100}
              onChange={(e) => {
                handleImageChange(e, setFormData, setPreview);
              }}
            />

            {formData.login_bg ? (
              <RiCloseLine
                className="menu-icon fs-4 border rounded-circle px-1 cursor-pointer"
                size={24}
                onClick={() => {
                  setPreview((prev) => ({ ...prev, login_bg: "" }));
                  setFormData((prev) => ({ ...prev, login_bg: "" }));
                }}
              />
            ) : null}
          </div>

          <div className="col-md-5 text-center">
            <img
              src={
                preview.login_bg !== `${BASE_URL}/uploads/null`
                  ? preview.login_bg
                  : null
              }
              alt={
                preview.login_bg !== `${BASE_URL}/uploads/null`
                  ? preview.login_bg
                  : "exp.png"
              }
              className="mx-auto "
              style={{ width: "70px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
