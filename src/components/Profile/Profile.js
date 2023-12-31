import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SideBar from "./SideBar/SideBar";
import OracleSection from "./OracleSection/OracleSection";
import SavedReadingSection from "./SavedReadingSection/SavedReadingSection";
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
  onSavedReading,
  onDeleteReading,
  onUpdateReading,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [currentView, setCurrentView] = React.useState("oracle");

  const switchToSavedReadings = () => {
    setCurrentView("savedReadings");
  };

  const switchToOracleView = () => {
    setCurrentView("oracle");
  };

  return (
    <section className="profile">
      <SideBar
        onLogOut={onLogOut}
        isLoggedIn={isLoggedIn}
        onEditProfile={onEditProfile}
        onSwitchToSaveReadings={switchToSavedReadings}
        onSwitchToOracleView={switchToOracleView}
        isOracleView={currentView === "oracle"}
      />

      {currentView === "oracle" ? (
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
          onSavedReading={onSavedReading}
          onDeleteReading={onDeleteReading}
        />
      ) : (
        <SavedReadingSection
          oracleReadings={oracleReadings}
          onSavedReading={onSavedReading}
          onUpdateReading={onUpdateReading}
          onDeleteReading={onDeleteReading}
        />
      )}
    </section>
  );
}

export default Profile;
