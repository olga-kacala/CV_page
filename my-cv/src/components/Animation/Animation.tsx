import React from "react";

export const Animation = () => {
  return (
    <div
    style={{
      position: "relative",
      width: "100%",
      height: 0,
      paddingTop: "56.2225%",
      paddingBottom: 0,
      marginTop: "1.6em",
      marginBottom: "0.9em",
      overflow: "hidden",
      borderRadius: "8px",
      willChange: "transform",
      boxShadow: "0 2px 8px 0 rgba(255, 255, 255, 0)",
    }}
  >
    <iframe
      title="Canva Animation"
      loading="lazy"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        border: "none",
        padding: 0,
        margin: 0,
      }}
      src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF6IncKmzs&#x2F;view?embed"
    ></iframe>
   
  </div>
);
};

