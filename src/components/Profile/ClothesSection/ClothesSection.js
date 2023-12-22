import React from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import crystallball from "../../../images/";

import "./ClothesSection.css";


const ClothesSection = ({
 
}) => {
  const currentUser = React.useContext(CurrentUserContext)




  return (
    <section className="clothes__section">
      <div className="clothes__section-heading-container">
      <div className="clothes__section-title">Madame Oracle is waiting for you. </div>
      <button
        className="clothes__section_add-button"
        type="button"
        // onClick={onCreateModal}
      >
        this is crystal ball
      </button>
      </div>
      <div className="clothes__section-gallery">
     
         
       
       
      </div>
    </section>
  );
  }
export default ClothesSection;
