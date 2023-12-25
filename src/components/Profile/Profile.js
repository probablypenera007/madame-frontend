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
        // oracleResponse={oracleResponse}          
        //  recording={recording}                   
        // handleOracleRequest={handleOracleRequest}
        isRecording={isRecording}
         startRecording={startRecording}
         stopRecording={stopRecording}
        oracleResponse={oracleResponse}
        />
      </div>
    </section>
  );
}

export default Profile;
