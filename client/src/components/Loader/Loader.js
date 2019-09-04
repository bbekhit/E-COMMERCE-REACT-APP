import React from "react";

function Loader(props) {
  return (
    <div className={!props.load ? "container" : ""}>
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
