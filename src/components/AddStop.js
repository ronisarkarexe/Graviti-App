import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const AddStop = ({ handleSubmit }) => {
  return (
    <div className="btn-add-stop">
      <button type="submit" onClick={handleSubmit}>
        <FontAwesomeIcon
          icon={faCirclePlus}
          size="sm"
          style={{ color: "#506486" }}
        />{" "}
        Add another stop
      </button>
    </div>
  );
};

export default AddStop;
