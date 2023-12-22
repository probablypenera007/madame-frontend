import React from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import ItemCard from "../../ItemCard/ItemCard";
import "./ClothesSection.css";


const ClothesSection = ({
  clothingItems,
  onSelectCard,
  onCreateModal,
  onLikeClick,
}) => {
  const currentUser = React.useContext(CurrentUserContext)
const userClothingItems = clothingItems.filter((item) => {
  return item.owner === currentUser._id;
});

// console.log("value of item.owner._id: " , item.owner._id)
// console.log("value of item.owner.id: " , item.owner.id)
// console.log("value of currentUser._id: " , currentUser._id)
// console.log("value of currentUer.id: " , currentUser.id)


  return (
    <section className="clothes__section">
      <div className="clothes__section-heading-container">
      <div className="clothes__section-title">Your Item</div>
      <button
        className="clothes__section_add-button"
        type="button"
        onClick={onCreateModal}
      >
        + Add items
      </button>
      </div>
      <div className="clothes__section-gallery">
        {userClothingItems.map((item) => {
          //console.log("value of item: looking for id and owner: ", item)
          return (
            <ItemCard
             // id={item._id || item.id} 
              key={item._id || item.id}
              item={item}
              onSelectCard={onSelectCard}
              //currentUser={currentUser}
              onLikeClick={onLikeClick}
              //itemId={item._id || item.id }
            />
          );
        })}
      </div>
    </section>
  );
};
export default ClothesSection;
