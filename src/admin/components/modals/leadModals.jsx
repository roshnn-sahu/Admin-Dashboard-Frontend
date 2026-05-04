import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/admin/context/AuthContext";

import Spinner from "@/ui/Spinner";
import { toast } from "react-toastify";
import { useDataRefresh } from "@/admin/context/DataRefreashContext";
import { RiFileList3Line, RiEditLine } from "@remixicon/react";

import DragDropUpload from "../DragDropUpload";

//--------------Lead Modals---------------
export const AddLeadModal = () => {
  const { callRefresh } = useDataRefresh();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/create-lead`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      if (!res.ok) {
        toast.error("Something went wrong!");
      } else {
        toast.success("Lead Added Successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        await callRefresh("leadList");
        document.querySelector("#addLead .btn-close")?.click();
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal"
      id="addLead"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog  modal-lg modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <RiFileList3Line size={20} className="me-2" />
            <h1
              className="modal-title fs-5 fw-semibold "
              id="staticBackdropLabel"
            >
              Add Lead
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="col-12 grid-margin stretch-card">
              <div className="card border ">
                <div className="card-body">
                  <form className="forms-sample" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label for="exampleInputName1">Name</label>
                      <input
                        disabled={loading}
                        required
                        type="text"
                        name="name"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputEmail3">Email address</label>
                      <input
                        disabled={loading}
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

                    <div className="form-group">
                      <label for="exampleInputCity1">Subject</label>
                      <input
                        disabled={loading}
                        required
                        type="text"
                        className="form-control"
                        id="exampleInputCity1"
                        placeholder="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label for="exampleTextarea1">Textarea</label>
                      <textarea
                        disabled={loading}
                        required
                        className="form-control"
                        id="exampleTextarea1"
                        rows="4"
                        placeholder="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="d-flex gap-3 float-right">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        disabled={loading}
                        type="submit"
                        className="btn btn-primary"
                      >
                        {loading ? <Spinner /> : "Save Lead"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditLeadModal = ({ leadId, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email_id: "",
    subject: "",
    message: "",
    response: "",
  });

  const getLead = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/get-lead/${leadId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (!res.ok) {
        throw Error("Something went wrong!");
      } else {
        const data = await res.json();
        const lead = data.lead;
        setInitialData(lead);
        setFormData({
          name: lead.name || "",
          message: lead.message || "",
          email_id: lead.email_id || "",
          subject: lead.subject || "",
          response: lead.response || "",
        });
      }
    } catch (error) {
      throw Error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (leadId) getLead();
  }, [leadId]);

  // ✅ Fetch again every time modal is opened
  useEffect(() => {
    const modalEl = document.getElementById("editLead");
    const handleModalShow = () => {
      if (leadId) getLead(); // 🔥 Fixed: was checking editUserId instead of leadId
    };

    modalEl?.addEventListener("shown.bs.modal", handleModalShow);
    return () =>
      modalEl?.removeEventListener("shown.bs.modal", handleModalShow);
  }, [leadId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit edited user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/edit-lead/${leadId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        },
      );

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Update failed");
      } else {
        const data = await res.json();
        const lead = data.lead;

        // 🔥 Fixed: Update BOTH initialData and formData with new values
        setInitialData(lead);
        setFormData({
          name: lead.name || "",
          message: lead.message || "",
          email_id: lead.email_id || "", // 🔥 Fixed: was "email" should be "email_id"
          subject: lead.subject || "",
          response: lead.response || "",
        });

        toast.success("Lead updated successfully!");
      }

      if (onUpdate) onUpdate(); // trigger refresh in parent if passed
      document.querySelector("#editLead .btn-close")?.click();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      name: initialData.name || "",
      email_id: initialData.email_id || "",
      subject: initialData.subject || "",
      message: initialData.message || "",
      response: initialData.response || "",
    });
  };

  if (!formData || formData.length == 0)
    return <Spinner color="primary" className="mx-auto" size="lg" />;

  return (
    <div
      className="modal "
      id="editLead"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog  modal-lg modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <RiEditLine size={20} className="me-2" />
            <h1
              className="modal-title fs-5 fw-semibold "
              id="staticBackdropLabel"
            >
              Edit Lead Info
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={handleClear}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="col-12 grid-margin stretch-card">
              <div className="card border ">
                <div className="card-body">
                  <form className="forms-sample" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="row align-items-center">
                        <div className="col-lg-3 ">
                          <label htmlFor="exampleInputName1" className="fs-6">
                            Name
                          </label>
                        </div>
                        <div className="col-lg-9">
                          <input
                            disabled={loading}
                            required
                            type="text"
                            name="name"
                            className="form-control"
                            id="exampleInputName1"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row align-items-center">
                        <div className="col-lg-3 ">
                          <label htmlFor="exampleInputEmail3">
                            Email address
                          </label>
                        </div>
                        <div className="col-lg-9">
                          <input
                            disabled={loading}
                            required
                            type="email"
                            className="form-control"
                            id="exampleInputEmail3"
                            placeholder="Email"
                            name="email_id"
                            value={formData.email_id}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="row align-items-center">
                        <div className="col-lg-3">
                          <label htmlFor="exampleInputCity1">Subject</label>
                        </div>
                        <div className="col-lg-9">
                          <input
                            disabled={loading}
                            required
                            type="text"
                            className="form-control"
                            id="exampleInputCity1"
                            placeholder="Subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleTextarea1">Message</label>
                      <textarea
                        disabled={loading}
                        required
                        className="form-control"
                        id="exampleTextarea1"
                        rows="4"
                        placeholder="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleTextarea2">Response</label>
                      <textarea
                        disabled={loading}
                        required
                        className="form-control"
                        id="exampleTextarea2"
                        rows="4"
                        placeholder="Response"
                        name="response"
                        value={formData.response}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="d-flex gap-3 float-right">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={handleClear}
                      >
                        Close
                      </button>
                      <button
                        disabled={loading}
                        type="submit"
                        className="btn btn-primary"
                      >
                        {loading ? <Spinner /> : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
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

//FileModal
export const FileUploadModal = () => {
  const [filesUploaded, setFilesUploaded] = useState(null);
  const modalRef = useRef(null);
  return (
    <div
      className="modal"
      id="fileUpload"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog  modal-lg modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <RiFileList3Line size={20} className="me-2" />
            <h1
              className="modal-title fs-5 fw-semibold "
              id="staticBackdropLabel"
            >
              Add File
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <DragDropUpload />
          </div>
        </div>
      </div>
    </div>
  );
};
