import React from "react";

const CommonLayout = ({ distance, distanceName }) => {
  return (
    <div className="dis-1">
      <div className="distance-div">
        <p className="distance-div-1">Distance</p>
        <p className="distance-div-2">{distance === null ? "0" : distance}</p>
      </div>
    </div>
  );
};

export default CommonLayout;
