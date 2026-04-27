import React, { useState, useRef, useEffect } from "react";
import Spinner from "../ui/Spinner";
import { toast } from "react-toastify";

// handlers and utils

import { handleTextChange, handleImageChange } from "@/lib/FormHandler";

// APIs:

import { cmsApi } from "@/admin/api/cmsApi";

//CREATE-CMS-MODAL
export const CreateCmsModal = ({ onSuccess }) => {
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
      if (!res.success) {
        toast.error(res.message || "Failed to create CMS");
        setLoading(false);
        return;
      }
      toast.success(res.message || "CMS created successfully");
      setLoading(false);
      setFormData({
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
      document.querySelector("#createCms .btn-close")?.click();
      if (onSuccess) onSuccess(); // to refresh
    } catch (error) {
      console.log(error);
      toast.error("Failed to create CMS");
    } finally {
      setLoading(false);
    }
  };

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
                    <label htmlFor="type">
                      Type <span className="text-danger">*</span>
                    </label>
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
                      <option disabled selected>
                        SELECT TYPE
                      </option>
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
                    <label htmlFor="name">
                      Name<span className="text-danger">*</span>
                    </label>
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
                    <label htmlFor="title">
                      Title<span className="text-danger">*</span>
                    </label>
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
                    <label htmlFor="heading">
                      Heading<span className="text-danger">*</span>
                    </label>
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
                    <label htmlFor="url">
                      URL<span className="text-danger">*</span>
                    </label>
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

//UPDATE-CMS-MODAL

export const UpdateCmsModal = ({ id, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false); // for pre-filling form
  const [preview, setPreview] = useState({
    thumbnail: null,
    breadcrumb: null,
  });

  const emptyForm = {
    type: "page",
    parent: null,
    name: "",
    title: "",
    heading: "",
    url: "",
    target: "_self",
    position: { menu: false, top_header: false, footer: false },
    order: { menu: 0, top_header: 0, footer: 0 },
    class: { menu: "", top_header: "", footer: "" },
    content: "",
    short_description: "",
    meta_title: "",
    meta_keywords: "",
    meta_description: "",
    styles: "",
    thumbnail: null,
    breadcrumb: null,
  };

  const [formData, setFormData] = useState(emptyForm);

  // ✅ When modal opens and id changes, fetch that page's data
  useEffect(() => {
    if (!id) return;

    const fetchPage = async () => {
      try {
        setFetching(true);
        const res = await cmsApi.getCmsById(id); // you'll create this API call
        const data = res.data;

        // pre-fill the form with existing data
        setFormData({
          type: data.type || "page",
          parent: data.parent?._id || null,
          name: data.name || "",
          title: data.title || "",
          heading: data.heading || "",
          url: data.url || "",
          target: data.target || "_self",
          position: data.position || {
            menu: false,
            top_header: false,
            footer: false,
          },
          order: data.order || { menu: 0, top_header: 0, footer: 0 },
          class: data.class || { menu: "", top_header: "", footer: "" },
          content: data.content || "",
          short_description: data.short_description || "",
          meta_title: data.meta_title || "",
          meta_keywords: data.meta_keywords || "",
          meta_description: data.meta_description || "",
          styles: data.styles || "",
          thumbnail: null, // don't prefill file inputs
          breadcrumb: null,
        });

        // ✅ show existing images in preview
        setPreview({
          thumbnail: data.thumbnail || null,
          breadcrumb: data.breadcrumb || null,
        });
      } catch (error) {
        console.error("fetchPage error:", error);
        toast.error("Failed to load page data");
      } finally {
        setFetching(false);
      }
    };

    fetchPage();
  }, [id]); // ✅ runs every time a new id is passed

  const handleCheckbox = (section, key) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  const UPDATE_CMS = async () => {
    const requiredFields = ["type", "name", "url"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      toast.error(`Please fill: ${emptyFields.join(", ")}`);
      return;
    }

    setLoading(true);
    try {
      // ✅ correct API call with id
      const res = await cmsApi.updateCms(id, formData);
      console.log(res);
      if (!res.success) {
        toast.error(res.message || "Failed to update");
        return;
      }

      toast.success("Page updated successfully!");

      // ✅ close the correct modal
      document.querySelector("#updateCms .btn-close")?.click();

      // ✅ refresh the list in parent
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("UPDATE_CMS error:", error);
      toast.error("Failed to update page");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal"
      id="updateCms"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="updateCmsLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header bg-theme">
            <i className="typcn typcn-document-text menu-icon fs-5 mr-1 text-white"></i>
            <h1
              className="modal-title fs-5 fw-semibold text-white"
              id="updateCmsLabel"
            >
              Update CMS
            </h1>
            <button
              type="button"
              className="btn-close bg-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <div className="modal-body py-1 px-5">
            {/* ✅ Show loader while fetching existing data */}
            {fetching ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status" />
                <p className="mt-2">Loading page data...</p>
              </div>
            ) : (
              <>
                <div className="row py-3 rounded-2">
                  {/* ── Left Column ── */}
                  <div className="col-lg-7 border-end">
                    {/* Type */}
                    <div className="row mb-2">
                      <div className="col-lg-3">
                        <label>Type*</label>
                      </div>
                      <div className="col-lg-9">
                        <select
                          className="form-control"
                          name="type"
                          value={formData.type}
                          onChange={(e) => handleTextChange(e, setFormData)}
                        >
                          <option value="cms">CMS</option>
                          <option value="page">PAGE</option>
                        </select>
                      </div>
                    </div>

                    {/* Parent */}
                    <div className="row mb-2">
                      <div className="col-lg-3">
                        <label>Parent</label>
                      </div>
                      <div className="col-lg-9">
                        <select
                          className="form-control"
                          name="parent"
                          value={formData.parent || ""}
                          onChange={(e) => handleTextChange(e, setFormData)}
                        >
                          <option value="">SELECT PARENT</option>
                          <option value="category">CATEGORY</option>
                        </select>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="row mb-2">
                      <div className="col-lg-3">
                        <label>Name*</label>
                      </div>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          name="name"
                          value={formData.name}
                          onChange={(e) => handleTextChange(e, setFormData)}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="row mb-2">
                      <div className="col-lg-3">
                        <label>Title</label>
                      </div>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Title"
                          name="title"
                          value={formData.title}
                          onChange={(e) => handleTextChange(e, setFormData)}
                        />
                      </div>
                    </div>

                    {/* Heading */}
                    <div className="row mb-2">
                      <div className="col-lg-3">
                        <label>Heading</label>
                      </div>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Heading"
                          name="heading"
                          value={formData.heading}
                          onChange={(e) => handleTextChange(e, setFormData)}
                        />
                      </div>
                    </div>

                    {/* URL */}
                    <div className="row mb-2">
                      <div className="col-lg-3">
                        <label>URL*</label>
                      </div>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="URL"
                          name="url"
                          value={formData.url}
                          onChange={(e) => handleTextChange(e, setFormData)}
                        />
                      </div>
                    </div>

                    {/* Target */}
                    <div className="row mb-2">
                      <div className="col-lg-3">
                        <label>Target</label>
                      </div>
                      <div className="col-lg-9">
                        <select
                          className="form-control"
                          name="target"
                          value={formData.target}
                          onChange={(e) => handleTextChange(e, setFormData)}
                        >
                          <option value="_self">_self</option>
                          <option value="_blank">_blank</option>
                        </select>
                      </div>
                    </div>

                    {/* Position / Order / Class Table */}
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
                            {/* Position */}
                            <tr>
                              <td>Position</td>
                              {["menu", "top_header", "footer"].map((key) => (
                                <td key={key}>
                                  <input
                                    type="checkbox"
                                    checked={formData.position[key]}
                                    onChange={() =>
                                      handleCheckbox("position", key)
                                    }
                                  />
                                </td>
                              ))}
                            </tr>
                            {/* Order */}
                            <tr>
                              <td>Order</td>
                              {["menu", "top_header", "footer"].map((key) => (
                                <td key={key}>
                                  <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    min="0"
                                    value={formData.order[key] || ""}
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        order: {
                                          ...prev.order,
                                          [key]: e.target.value,
                                        },
                                      }))
                                    }
                                  />
                                </td>
                              ))}
                            </tr>
                            {/* Class */}
                            <tr>
                              <td>Class</td>
                              {["menu", "top_header", "footer"].map((key) => (
                                <td key={key}>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={formData.class[key] || ""}
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        class: {
                                          ...prev.class,
                                          [key]: e.target.value,
                                        },
                                      }))
                                    }
                                  />
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* ── Right Column — Images ── */}
                  <div className="col-lg-5">
                    {["thumbnail", "breadcrumb"].map((imgKey) => (
                      <div className="mb-3 text-center" key={imgKey}>
                        <label className="text-capitalize">{imgKey}</label>
                        <div
                          className="border p-3 mb-2"
                          style={{ minHeight: 100 }}
                        >
                          {/* ✅ shows existing image OR "No File" */}
                          {preview[imgKey] ? (
                            <img
                              src={preview[imgKey]}
                              alt={imgKey}
                              style={{
                                maxWidth: "100%",
                                maxHeight: 120,
                                objectFit: "contain",
                              }}
                            />
                          ) : (
                            <span className="text-muted">No File</span>
                          )}
                        </div>
                        <input
                          type="file"
                          className="form-control form-control-sm"
                          id={imgKey}
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            handleImageChange(e, setFormData, setPreview)
                          }
                        />
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            document.getElementById(imgKey).click()
                          }
                        >
                          Choose
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Content Section ── */}
                <div className="row">
                  {[
                    { label: "Content", name: "content", rows: 6 },
                    {
                      label: "Short Description",
                      name: "short_description",
                      rows: 3,
                    },
                    { label: "Meta Title", name: "meta_title", rows: 2 },
                    { label: "Meta Keywords", name: "meta_keywords", rows: 3 },
                    {
                      label: "Meta Description",
                      name: "meta_description",
                      rows: 3,
                    },
                    { label: "Link CSS / JS Tags", name: "styles", rows: 3 },
                  ].map(({ label, name, rows }) => (
                    <React.Fragment key={name}>
                      <h5 className="heading-divider text-center rounded-2 fs-6 py-1">
                        {label}
                      </h5>
                      <textarea
                        className="form-control mb-3"
                        rows={rows}
                        placeholder={label}
                        name={name}
                        value={formData[name] || ""}
                        onChange={(e) => handleTextChange(e, setFormData)}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="modal-footer border-top">
            <div className="mx-auto d-flex gap-4">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={UPDATE_CMS}
                disabled={loading || fetching}
              >
                {loading ? "Saving..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//DELETE CMS MODAL
export const DeletecCmsModal = ({ id, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const DELETE_CMS = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await cmsApi.deleteCms(id);
      toast.success(data.message || "Page deleted successfully!");

      document.querySelector("#deleteCmsModal .btn-close")?.click();

      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.message || "Error deleting user!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal modal-sm mx-auto  "
      id="deleteCmsModal"
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
                onClick={DELETE_CMS}
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
