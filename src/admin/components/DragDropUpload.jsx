import React, { useRef, useState } from "react";
import {
  RiUploadCloud2Line,
  RiDownload2Line,
  RiCloseLine,
} from "@remixicon/react";
import Spinner from "@/shared/ui/Spinner";

const MAX_FILES = 3;
const MAX_TOTAL_SIZE = 5 * 1024 * 1024; // 5 MB

const DragDropUpload = () => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [download, setDownload] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFiles = (selectedFiles) => {
    setFileUploadError(null);

    const fileArray = Array.from(selectedFiles);

    if (fileArray.length + files.length > MAX_FILES) {
      setFileUploadError("Maximum 3 files allowed");
      setTimeout(() => {
        setFileUploadError(null);
      }, 2000);
      return;
    }

    const totalSize =
      fileArray.reduce((acc, file) => acc + file.size, 0) +
      files.reduce((acc, file) => acc + file.size, 0);

    if (totalSize > MAX_TOTAL_SIZE) {
      setFileUploadError("Total file size must be under 5 MB");
      setTimeout(() => {
        setFileUploadError(null);
      }, 2000);
      return;
    }

    setFiles((prev) => [...prev, ...fileArray]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setFileUploadError(null);
  };

  const handleUpload = () => {
    setLoading(true);
    if (files.length > 0) {
      setTimeout(() => {
        setDownload(true);
        setFiles([]);
        setLoading(false);
      }, 3000);
    } else {
      setFileUploadError("No file Uploaded");
      setLoading(false);
      setTimeout(() => {
        setFileUploadError(null);
      }, 2000);
    }
  };
  return (
    <div className="container mt-4">
      <div className="d-flex w-100 align-items-center justify-content-between mb-4">
        <h4 className="fs-6">Supported file types are pdf and images.</h4>
        <h5 className="fs-6">Max: 3 files (5 MB total)</h5>
      </div>

      <div
        className="border border-secondary rounded p-5 my-3 text-center bg-light text-dark"
        style={{ borderStyle: "dashed", cursor: "pointer" }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <div className="mb-2">
          <RiUploadCloud2Line size={48} className="text-secondary" />
        </div>

        <p className="mb-1">
          Drag files here or{" "}
          <span className="text-theme fw-bold text-decoration-underline">
            browse
          </span>{" "}
          to upload.
        </p>

        <small className="text-muted">Max: 3 files (5 MB total)</small>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          multiple
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="list-group mt-3">
          {files.map((file, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center border"
            >
              <span>
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </span>

              <button
                className="btn btn-sm btn-outline-danger p-1"
                onClick={() => removeFile(index)}
              >
                <RiCloseLine size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {fileUploadError && (
        <span className="ms-2 text-danger">{fileUploadError}</span>
      )}

      {download == true ? (
        <div className="w-100">
          <h3 className="fs-6 text-theme fw-semibold text-center">
            Your File Is Ready
          </h3>
          <ul className="list-group mt-3">
            <li className="list-group-item d-flex justify-content-between align-items-center border">
              <span>File.pdf</span>

              <div>
                <a
                  href="/saveCitizenLogin.do.pdf"
                  download="file.pdf"
                  className="btn btn-warning me-2 btn-sm"
                >
                  <RiDownload2Line size={18} />
                </a>

                <button
                  className="btn btn-sm btn-outline-danger p-1"
                  onClick={() => setDownload(false)}
                >
                  <RiCloseLine size={18} />
                </button>
              </div>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}

      <div className="mt-4">
        <button
          className="btn btn-primary bg-theme border-0 float-end"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? <Spinner color="white" /> : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default DragDropUpload;
