import React from "react";

const LayoutText = ({ originRef, destiantionRef, distance }) => {
  return (
    <div className="dis-text">
      <h6 className="distance-text">
        The distance between{" "}
        <span className="target-color">
          {originRef?.current?.value === undefined
            ? "Origin"
            : originRef?.current?.value}
        </span>{" "}
        and{" "}
        <span className="target-color">
          {destiantionRef?.current?.value === undefined
            ? "Destination"
            : destiantionRef?.current?.value}
        </span>{" "}
        via the seleted route is{" "}
        <span className="target-color">
          {distance === null ? "0" : distance}.
        </span>
      </h6>
    </div>
  );
};

export default LayoutText;
