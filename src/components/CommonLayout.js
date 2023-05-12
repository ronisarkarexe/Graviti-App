import React from "react";

const CommonLayout = ({distance, distanceName}) => {
  return (
    <div className="distance-section">
      <div>
        <h4>{distanceName}</h4>
      </div>
      <div>
        <h5>{distance === null ? "0" : distance}</h5>
      </div>
    </div>
  );
};

export default CommonLayout;
