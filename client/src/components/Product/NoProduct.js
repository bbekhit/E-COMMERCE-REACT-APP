import React from "react";

function NoProduct(props) {
  return (
    <div
      style={{
        margin: "150px auto",
        textAlign: "center"
      }}
    >
      {props.text === "Thank You For Your Purchase" ? (
        <i
          className="	far fa-grin"
          style={{
            fontSize: "5rem",
            marginBottom: "1rem"
          }}
        ></i>
      ) : (
        <i
          className="far fa-frown"
          style={{
            fontSize: "5rem",
            marginBottom: "1rem"
          }}
        ></i>
      )}

      <p style={{ padding: "0", margin: "0", fontSize: "2rem" }}>
        {props.text}
      </p>
    </div>
  );
}

export default NoProduct;
