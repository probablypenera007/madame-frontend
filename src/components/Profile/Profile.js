import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SideBar from "./SideBar/SideBar";
import OracleSection from "./OracleSection/OracleSection";
import "./Profile.css";

function Profile({
  onLogOut,
  isLoggedIn,
  onEditProfile,
  isRecording,
  startRecording,
  stopRecording,
  oracleResponse,
  handleCloseModal,
  isReadingCompleted,
  setIsReadingCompleted,
  isOracleProcessingSTT,
  isOracleProcessingTTS,
  isOraclePlayingAudio,
  isUserTalking,
  setIsUserTalking,
  oracleReadings,
  onSaveReading,
  onDeleteReading,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <section className="profile">
      <SideBar
        onLogOut={onLogOut}
        isLoggedIn={isLoggedIn}
        onEditProfile={onEditProfile}
      />
      <div>
        <OracleSection
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          oracleResponse={oracleResponse}
          handleCloseModal={handleCloseModal}
          isReadingCompleted={isReadingCompleted}
          setIsReadingCompleted={setIsReadingCompleted}
          isOracleProcessingSTT={isOracleProcessingSTT}
          isOracleProcessingTTS={isOracleProcessingTTS}
          isOraclePlayingAudio={isOraclePlayingAudio}
          isUserTalking={isUserTalking}
          setIsUserTalking={setIsUserTalking}
          oracleReadings={oracleReadings}
          onSaveReading={onSaveReading}
          onDeleteReading={onDeleteReading}
        />
      </div>
    </section>
  );
}

export default Profile;
