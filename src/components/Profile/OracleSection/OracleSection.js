import React, { useState } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import OracleReadingModal from "../../OracleReadingModal/OracleReadingModal";  
import "./OracleSection.css";



const OracleSection = ({
  startRecording,
  stopRecording,
  isRecording,
  oracleResponse,
  handleCloseModal,
  isReadingCompleted,
  setIsReadingCompleted
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  //const [isRecording, setIsRecording] = useState(false);
  // const [recording, setRecording] = useState(false)
  // console.log("currentUser in OracleSection", currentUser)

  function formatOracleResponse(response) {
    return response.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  }

  return (
    <section className="oracle__section">
      <div className="oracle__section-heading-container">
        <div className="oracle__section-title">
          {!isRecording
            ? "Madame Oracle is waiting for you to hold the ball"
            : "She is listening, Hold and don't let go... speak!"}
        </div>
        {/* <button className="oracle__section-button" type="button" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}></button> */}
        {isRecording ? (
          <button
            className="oracle__section-button"
            type="button"
            onMouseUp={stopRecording}
          ></button>
        ) : (
          <button
            className="oracle__section-button"
            type="button"
            onMouseDown={() => startRecording(currentUser._id)}
          ></button>
        )}
      </div>
      <div></div>
      {/* <audio id="audioPlayer" controls>
  testing Audio source for the AI response
</audio> */}
    {isReadingCompleted && (
        <OracleReadingModal
          oracleResponse={oracleResponse}
          onClose={() => setIsReadingCompleted(false)} 
        />
      )}
    </section>
  );
};
export default OracleSection;
