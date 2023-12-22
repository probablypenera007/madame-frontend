import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";
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
        <ClothesSection
          clothingItems={clothingItems}
          onSelectCard={onSelectCard}
          onCreateModal={onCreateModal}
          isLoggedIn={isLoggedIn}
          onLikeClick={onLikeClick}
        />
      </div>
    </section>
  );
}

export default Profile;
