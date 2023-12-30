import React from "react";
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
  // onAboutUsClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [currentView, setCurrentView] = React.useState("oracle");

  const switchToSavedReadings = () => {
    setCurrentView("savedReadings");
  };

  const switchToOracleView = () => {
    setCurrentView("oracle")
  }

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
      <div>
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
            onSavedReading={onSavedReading}
            onUpdateReading={onUpdateReading}
            onDeleteReading={onDeleteReading}
          />
        )}
      </div>
    </section>
  );
}

export default Profile;
