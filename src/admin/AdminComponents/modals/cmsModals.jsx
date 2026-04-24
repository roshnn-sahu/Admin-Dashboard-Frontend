import { useState, useRef, useEffect } from "react";
import Spinner from "../ui/Spinner";
import { toast } from "react-toastify";

// handlers and utils

import { handleTextChange, handleImageChange } from "@/lib/FormHandler";

// APIs:

import { cmsApi } from "@/admin/api/cmsApi";

//CmsModal
export const CreateCmsModal = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState({
    thumbnail: null,
    breadcrumb: null,
  });

  const [formData, setFormData] = useState({
    type: null,
    parent: null,
    name: null,
    title: null,
    heading: null,
    url: null,
    target: null,
    position: {
      menu: false,
      top_header: false,
      footer: false,
    },
    order: {
      menu: null,
      top_header: null,
      footer: null,
    },
    class: {
      menu: null,
      top_header: null,
      footer: null,
    },

    content: null,
    short_description: null,
    meta_title: null,
    meta_keywords: null,
    meta_description: null,
    styles: null,
  });

  // HANDERS
  const handleCheckbox = (section, key) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  // APIs calls and handelers

  const CREATE_CMS = async () => {
    const requiredFields = ["type", "name", "title", "heading", "url"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      toast.error(`Please fill : ${emptyFields.join(", ")}`);
      return;
    }

    setLoading(true);
    try {
      const res = await cmsApi.createCms(formData);
      console.log(res);
      toast.success("CMS created successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create CMS");
      setLoading(false);
    }
  };

  console.log(formData);

  return (
    <div
      className="modal"
      id="createCms"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog  modal-xl modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header bg-theme">
            <i className="typcn typcn-document-text menu-icon fs-5 mr-1 text-white"></i>
            <h1
              className="modal-title fs-5 fw-semibold text-white "
              id="staticBackdropLabel"
            >
              Add Cms
            </h1>
            <button
              type="button"
              className="btn-close  bg-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body py-1 px-5 ">
            <div className="row  py-3 rounded-2">
              {/* Left Column - Form Fields */}
              <div className="col-lg-7 border-end">
                {/* Type */}
                <div className="row mb-2">
                  <div className="col-lg-3">
                    <label htmlFor="type">Type*</label>
                  </div>
                  <div className="col-lg-9">
                    <select
                      className="form-control f"
                      name="type"
                      id="type"
                      required
                      value={formData.type || ""}
                      onChange={(e) => handleTextChange(e, setFormData)}
                    >
                      <option value="cms" defaultValue>
                        CMS
                      </option>
                      <option value="page">PAGE</option>
                    </select>
                  </div>
                </div>

                {/* Parent Menu */}
                <div className="row mb-2">
                  <div className="col-lg-3">
                    <label htmlFor="parent">
                      Parent <span style={{ fontSize: "12px" }}>(Menu)</span>
                    </label>
                  </div>
                  <div className="col-lg-9">
                    <select
                      className="form-control"
                      name="parent"
                      id="parent"
                      value={formData.parent || ""}
                      onChange={(e) => handleTextChange(e, setFormData)}
                    >
                      <option value="" disable>
                        SELECT PARENT
                      </option>

                      <option value="category">CATEGORY</option>
                      <option value="page">PAGE</option>
                    </select>
                  </div>
                </div>

                {/* Name */}
                <div className="row mb-2">
                  <div className="col-lg-3">
                    <label htmlFor="name">Name*</label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      value={formData.name || ""}
                      onChange={(e) => handleTextChange(e, setFormData)}
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="row mb-2">
                  <div className="col-lg-3">
                    <label htmlFor="title">Title*</label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      name="title"
                      value={formData.title || ""}
                      onChange={(e) => handleTextChange(e, setFormData)}
                    />
                  </div>
                </div>

                {/* Heading */}
                <div className="row mb-2">
                  <div className="col-lg-3">
                    <label htmlFor="heading">Heading*</label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder="Heading"
                      name="heading"
                      value={formData.heading || ""}
                      onChange={(e) => handleTextChange(e, setFormData)}
                    />
                  </div>
                </div>

                {/* URL */}
                <div className="row mb-2">
                  <div className="col-lg-3">
                    <label htmlFor="url">URL*</label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder="URL"
                      name="url"
                      value={formData.url || ""}
                      onChange={(e) => handleTextChange(e, setFormData)}
                    />
                  </div>
                </div>

                {/* Target */}
                <div className="row mb-2">
                  <div className="col-lg-3">
                    <label htmlFor="target">Target</label>
                  </div>
                  <div className="col-lg-9">
                    <select
                      className="form-control"
                      name="target"
                      id="target"
                      value={formData.target || ""}
                      onChange={(e) => handleTextChange(e, setFormData)}
                    >
                      <option value="_self">_self</option>
                      <option value="_blank">_blank</option>
                      <option value="_new">_new</option>
                    </select>
                  </div>
                </div>

                {/* Position, Order, Class Table */}
                <div className="row mb-3">
                  <div className="col-12">
                    <table className="table table-bordered border text-center">
                      <thead className="table-light">
                        <tr>
                          <th>Field</th>
                          <th>Menu</th>
                          <th>Top Header</th>
                          <th>Footer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Position Row */}
                        <tr>
                          <td>Position</td>
                          <td>
                            <input
                              type="checkbox"
                              id="menu"
                              checked={formData.position.menu}
                              onChange={() =>
                                handleCheckbox("position", "menu")
                              }
                            />
                            <label htmlFor="menu" className="ms-1"></label>
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              id="topHeader"
                              checked={formData.position.top_header}
                              onChange={() =>
                                handleCheckbox("position", "top_header")
                              }
                            />
                            <label
                              htmlFor="top_header"
                              className="ms-1"
                            ></label>
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              id="footer"
                              checked={formData.position.footer}
                              onChange={() =>
                                handleCheckbox("position", "footer")
                              }
                            />
                            <label htmlFor="footer" className="ms-1"></label>
                          </td>
                        </tr>

                        {/* Order Row */}
                        <tr>
                          <td>Order</td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm "
                              placeholder="Menu"
                              name="menu"
                              min="0"
                              value={formData.order.menu || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  order: {
                                    ...prev.order,
                                    menu: e.target.value,
                                  },
                                }))
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              placeholder="Top Header"
                              name="top_header"
                              min="0"
                              value={formData.order.top_header || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  order: {
                                    ...prev.order,
                                    top_header: e.target.value,
                                  },
                                }))
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              placeholder="Footer"
                              name="footer"
                              min="0"
                              value={formData.order.footer || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  order: {
                                    ...prev.order,
                                    footer: e.target.value,
                                  },
                                }))
                              }
                            />
                          </td>
                        </tr>

                        {/* Class Row */}
                        <tr>
                          <td>Class</td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Menu"
                              name="menu"
                              value={formData.class.menu || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  class: {
                                    ...prev.class,
                                    menu: e.target.value,
                                  },
                                }))
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="top_header"
                              name="top_header"
                              value={formData.class.top_header || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  class: {
                                    ...prev.class,
                                    top_header: e.target.value,
                                  },
                                }))
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Footer"
                              name="footer"
                              value={formData.class.footer || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  class: {
                                    ...prev.class,
                                    footer: e.target.value,
                                  },
                                }))
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-lg-5">
                {/* Thumbnail */}
                <div className="mb-3 text-center">
                  <label>Thumbnail</label>
                  <div className="border p-5 mb-2">
                    <span>No File</span>
                    <img src={preview.thumbnail} alt="" />
                  </div>
                  <input
                    type="file"
                    className="form-control form-control-sm"
                    id="thumbnail"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange(e, setFormData, setPreview)
                    }
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => document.getElementById("thumbnail").click()}
                  >
                    Choose
                  </button>
                </div>

                {/* Breadcrumb */}
                <div className="mb-3 text-center">
                  <label>Breadcrumb</label>
                  <div className="border p-5 mb-2">
                    <span>No File</span>
                  </div>
                  <input
                    type="file"
                    className="form-control form-control-sm"
                    id="breadcrumb"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange(e, setFormData, setPreview)
                    }
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      document.getElementById("breadcrumb").click()
                    }
                  >
                    Choose
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}

            <ContentSection
              formData={formData}
              setFormData={setFormData}
              handleTextChange={handleTextChange}
            />
          </div>

          <div className="modal-footer  border-top">
            <div className="mx-auto d-flex gap-4">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={CREATE_CMS}
                type="button"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentSection = ({ formData, setFormData, handleTextChange }) => {
  return (
    <>
      <div className="row">
        <h5 className="heading-divider text-center rounded-2 fs-6 py-1">
          Content
        </h5>
        <textarea
          className="form-control mb-3"
          rows="6"
          placeholder="Contents"
          name="content"
          value={formData.content || ""}
          onChange={(e) => handleTextChange(e, setFormData)}
        ></textarea>

        <h5 className="heading-divider text-center rounded-2 fs-6 py-1">
          Short Description
        </h5>
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Short Description"
          name="short_description"
          value={formData.short_description || ""}
          onChange={(e) => handleTextChange(e, setFormData)}
        ></textarea>

        <h5 className="heading-divider text-center rounded-2 fs-6 py-1">
          Meta Keywords
        </h5>
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Meta Keywords"
          name="meta_keywords"
          value={formData.meta_keywords || ""}
          onChange={(e) => handleTextChange(e, setFormData)}
        ></textarea>

        <h5 className="heading-divider text-center rounded-2 fs-6 py-1">
          Meta Description
        </h5>
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Meta Description"
          name="meta_description"
          value={formData.meta_description || ""}
          onChange={(e) => handleTextChange(e, setFormData)}
        ></textarea>

        <h5 className="heading-divider text-center rounded-2 fs-6 py-1">
          meta Robots
        </h5>
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Meta Robots"
          name="meta_robots"
          value={formData.meta_robots || ""}
          onChange={(e) => handleTextChange(e, setFormData)}
        ></textarea>

        <h5 className="heading-divider text-center rounded-2 fs-6 py-1">
          Link CSS, JS Tags etc.
        </h5>
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Style,Scripts"
          name="styles"
          value={formData.styles || ""}
          onChange={(e) => handleTextChange(e, setFormData)}
        ></textarea>
      </div>
    </>
  );
};
