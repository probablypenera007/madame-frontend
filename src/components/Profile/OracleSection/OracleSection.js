import React from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import "./OracleSection.css";

const OracleSection = ({oracleResponse, recording, handleOracleRequest, startRecording, stopRecording, }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const handleRecordingButton = () => {
    if (recording) {
      startRecording();
      console.log("recording...", recording);
      console.log("Oracle is starting to record", startRecording)
 
    } else {
      stopRecording();
      handleOracleRequest();
      console.log("Oracle is stopping to record", stopRecording)
      console.log("Oracle is responding", handleOracleRequest)
    }
  };


  return (
    <section className="oracle__section">
      <div className="oracle__section-heading-container">
        <div className="oracle__section-title">
          Madame Oracle is waiting for you.
        </div>
        <button className="oracle__section-button" type="button" onClick={handleRecordingButton} ></button>
      </div>
      <div className="clothes__section-gallery"></div>
    </section>
  );
};
export default OracleSection;
