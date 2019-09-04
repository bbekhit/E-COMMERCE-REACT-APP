import React from "react";
function Star({
  value,
  color,
  handleHover,
  handleHoverLeave,
  handleClick,
  isFilled
}) {
  return (
    <span
      className="star"
      style={{ color }}
      onMouseEnter={() => handleHover(value)}
      onMouseLeave={() => handleHoverLeave()}
      onClick={() => handleClick(value)}
    >
      {isFilled ? "★" : "☆"}
    </span>
  );
}
export default Star;
