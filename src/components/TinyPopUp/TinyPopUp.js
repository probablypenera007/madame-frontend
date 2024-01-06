import React, { useEffect } from "react";
import "./TinyPopUp.css"

const TinyPopup = ({ name, text, isVisible, onHide }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 2000); 

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isVisible, onHide]);

  return (
    <div className={`tiny-popup_${name}${isVisible ? "" : " hidden"}`}>
      {text}
    </div>
  );
};

export default TinyPopup;
