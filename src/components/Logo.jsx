import React from "react";
import BlogLogo from "../assets/logo.png"; 

function Logo({ width = "100px" }) {
  return (
    <img
      src={BlogLogo}
      alt="Blog Logo"
      style={{ width: width, objectFit: "contain" }}
    />
  );
}

export default Logo;
