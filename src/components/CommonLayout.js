import React from "react";

const CommonLayout = ({ distance }) => {
  console.log("Distance: ", distance)
  return (
    <div className="dis-1">
      <div className="distance-div">
        <p className="distance-div-1">Distance</p>
        <p className="distance-div-2">{distance.length === 0 ? "0" : distance.toLocaleString()}{" "}km</p>
      </div>
    </div>
  );
};

export default CommonLayout;
