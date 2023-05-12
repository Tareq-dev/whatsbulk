import React from "react";
import loading from "../asset/loading.svg";

const Loading = () => {
  return (
    <div
      style={{ height: "200px" }}
      className="flex-col aligns-center justify-center"
    >
      <div className="flex justify-center items-center">
        <div className="" role="status">
          <img alt="" src={loading} />
        </div>
      </div>
      {/* <p className="text-center text-green-600">Wait for Client Ready...</p> */}
    </div>
  );
};

export default Loading;
