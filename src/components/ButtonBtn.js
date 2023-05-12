import React from "react";

const ButtonBtn = ({
  calculateRoute,
  clearRoute,
  directionsResponse,
}) => {
  return (
    <div>
      {directionsResponse === null ? (
        <button type="submit" onClick={calculateRoute}>
          Calculate
        </button>
      ) : (
        <button type="submit" onClick={clearRoute}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default ButtonBtn;
