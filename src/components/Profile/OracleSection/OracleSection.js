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
  setIsReadingCompleted,
  isOracleProcessingSTT,
  isOracleProcessingTTS,
  isOraclePlayingAudio,
  isUserTalking,
  setIsUserTalking,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  //const [isRecording, setIsRecording] = useState(false);
  // const [recording, setRecording] = useState(false)
  // console.log("currentUser in OracleSection", currentUser)
  const isButtonDisabled =
    isRecording ||
    isOracleProcessingSTT ||
    isOracleProcessingTTS ||
    isOraclePlayingAudio;

  return (
    <section className="oracle__section">
      <div className="oracle__section-heading-container">
        <div className="oracle__section-title">
          {isOracleProcessingSTT
            ? "Madame Oracle is searching the galaxy for an answer"
            : isOracleProcessingTTS
            ? "Prepare yourself, the stars and cosmic energy has spoken"
            : isOraclePlayingAudio
            ? "This is the moment you have been waiting for, listen. "
            : !isRecording
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
            disabled={isButtonDisabled}
            onMouseDown={() => startRecording(currentUser._id)}
          ></button>
        )}
      </div>
      {(isOracleProcessingSTT || isOracleProcessingTTS) && (
        <div className="spinner"></div>
      )}

      {isUserTalking && <div className="user-talking-pulse"></div>}

      {isOraclePlayingAudio && (
        <div className="oracle__audio-playing-container">
          <img className="oracle-face" alt="oracle-face" />
          <img className="oracle-zodiacWheel" alt="zodiac-wheel"/>
          <div className="oracle-talking-pulse"></div>
        </div>
      )}

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
