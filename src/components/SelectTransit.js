import React from "react";

const SelectTransit = ({ handleRadioChange, selectedValue }) => {
  return (
    <div className="icon-section">
      <input
        type="radio"
        name="way"
        value="DRIVING"
        onChange={handleRadioChange}
        checked={selectedValue === "DRIVING"}
      />{" "}
      <i class="fa fa-bus icon-color"></i>
      <input
        type="radio"
        name="way"
        value="TRANSIT"
        onChange={handleRadioChange}
        checked={selectedValue === "TRANSIT"}
      />{" "}
      <i class="fa fa-subway icon-color"></i>
      <input
        type="radio"
        name="way"
        value="WALKING"
        onChange={handleRadioChange}
        checked={selectedValue === "WALKING"}
      />{" "}
      ​<i class="fas fa-walking icon-color"></i>
    </div>
  );
};

export default SelectTransit;
