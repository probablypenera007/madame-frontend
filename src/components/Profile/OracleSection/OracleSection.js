import React from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";


import "./OracleSection.css";


const ClothesSection = ({
 
}) => {
  const currentUser = React.useContext(CurrentUserContext)




  return (
    <section className="oracle__section">
      <div className="oracle__section-heading-container">
      <div className="oracle__section-title">Madame Oracle is waiting for you. </div>
      <button
        className="oracle__section-button"
        type="button"
        // onClick={onCreateModal}
      >
       
      </button>
      </div>
      <div className="clothes__section-gallery">
     
         
       
       
      </div>
    </section>
  );
  }
export default ClothesSection;
