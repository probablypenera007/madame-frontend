import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SideBar from "./SideBar/SideBar";
import OracleSection from "./OracleSection/OracleSection";
import "./Profile.css";

function Profile({
  clothingItems,
  onSelectCard,
  onCreateModal,
  onLogOut,
  isLoggedIn,
  onEditProfile,
  onLikeClick,
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
        <OracleSection />
      </div>
    </section>
  );
}

export default Profile;
