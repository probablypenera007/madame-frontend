
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    return `${month}-${day}-${year}`;
  };
  
  function formatOracleResponse(response) {
    return response.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  }

const OracleReadingModal = ({ oracleResponse, onClose }) => {
    return (
        <ModalWithForm
        modalName={"Oracle_Modal"}
        onClose={onClose}>
      <div className="oracle__reading">
        <h2 className="oracle__reading_title" >Madame Oracle's Reading for:{formatDate(Date.now())}</h2>
        <p className="oracle__response" >{formatOracleResponse(oracleResponse)}</p>
        <button className="oracle__button_close" onClick={onClose}></button>
        <button className="oracle__button_save">Save</button>
        <button className="oracle__button_delete">Delete</button>
      </div>
      </ModalWithForm>
    );
  };
  
  export default OracleReadingModal;