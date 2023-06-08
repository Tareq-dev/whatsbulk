import React from "react";
import loading from "../asset/loading.svg";

const GlobalLoading = () => {
  return (
    <div style={{ height: "600px" }}
      className="w-full flex aligns-center justify-center"
    >
      <div className="flex justify-center items-center space-x-2">
        <div
          className=""
          role="status"
        >
          <img alt="" src={loading} />
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
