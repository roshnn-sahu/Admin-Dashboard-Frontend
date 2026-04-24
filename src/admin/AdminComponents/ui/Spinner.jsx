import React from "react";

const Spinner = ({
  className,
  size = "spinner-border-sm",
  color = "primary",
}) => {
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center ">
      <div
        className={`spinner-border ${size} text-${color} ${className}`}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
