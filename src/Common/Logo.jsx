import React from "react";
import logo from "../assets/photoneo-logo-narrow.svg";

const Logo = ({ className }) => {
  return <img className={className || ""} src={logo} alt="Photoneo Logo" />;
};

export default Logo;
