import React,{useState} from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import "./OracleSection.css";

const OracleSection = ({startRecording, stopRecording, isRecording, 
  oracleResponse 
 }) => {
  const currentUser = React.useContext(CurrentUserContext);
  //const [isRecording, setIsRecording] = useState(false);
 // const [recording, setRecording] = useState(false)
  // console.log("currentUser in OracleSection", currentUser)

  return (
    <section className="oracle__section">
      <div className="oracle__section-heading-container">
        <div className="oracle__section-title">
         {!isRecording ? "Madame Oracle is waiting for you to hold the ball" : "Madame Oracle is listening to your heart and reading the stars"} 
        </div>
        {/* <button className="oracle__section-button" type="button" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}></button> */}
        {isRecording ? (
          <button
            className="oracle__section-button"
            type="button"
            onMouseUp={stopRecording}
          >
            Stop Recording
          </button>
        ) : (
          <button
            className="oracle__section-button"
            type="button"
            onMouseDown={() => startRecording(currentUser._id)}
          >
            Start Recording
          </button>
        )}
      </div>
      <div className="clothes__section-gallery"></div>
      {/* <audio id="audioPlayer" controls>
  testing Audio source for the AI response
</audio> */}

      {oracleResponse && (
        <div className="oracle__response">
          Oracle Response: {oracleResponse}
        </div>
      )}
    </section>
  );
};
export default OracleSection;
