import React from "react";
import state from "../store";
import { useSnapshot } from "valtio";

const CustomButton = ({ type, title, handleClick, styles }) => {
  const stateSnapshot = useSnapshot(state);

  const generateStyle = (type) => {
    if (type === "filled") {
      return {
        backgroundColor: stateSnapshot.color,
        color: "#fff",
        border: "none",
      };
    }
  };

  return (
    <button
      className={`${styles} px-2 py-1.5 flex-1 rounded-md`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
