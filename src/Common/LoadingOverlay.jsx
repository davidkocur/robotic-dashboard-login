import React from "react";
import "./LoadingOverlay.css";

const LoadingOverlay = ({ show, scale, className }) => {
  return (
    <div
      className={`${
        show ? "visible" : "invisible"
      } absolute inset-0 w-full h-full flex justify-center items-center fill-current ${
        className || ""
      }`}
      data-testid="loading-overlay"
    >
      <svg
        width={24 * (scale || 1)}
        height={24 * (scale || 1)}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={show}
        className={`${
          show ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        } transition-all duration-500`}
      >
        <circle className="spinner_base" cx="4" cy="12" r="3" />
        <circle className="spinner_base spinner_offset_1" cx="12" cy="12" r="3" />
        <circle className="spinner_base spinner_offset_2" cx="20" cy="12" r="3" />
      </svg>
    </div>
  );
};

/*
<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<style>.spinner_base{animation:spinner_xe7Q .8s linear infinite}.spinner_offset_1{animation-delay:-.65s}.spinner_offset_2{animation-delay:-.5s}@keyframes spinner_xe7Q{93.75%,100%{r:3px}46.875%{r:.2px}}</style><circle class="spinner_base" cx="4" cy="12" r="3"/><circle class="spinner_base spinner_offset_1" cx="12" cy="12" r="3"/><circle class="spinner_base spinner_offset_2" cx="20" cy="12" r="3"/></svg>

*/

export default LoadingOverlay;
