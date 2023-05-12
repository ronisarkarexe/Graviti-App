import React from "react";

const InputLabel = ({props}) => {
  return (
    <>
      <label htmlFor="input-field">
        <span className="label-text">{props}</span>
      </label>
    </>
  );
};

export default InputLabel;
