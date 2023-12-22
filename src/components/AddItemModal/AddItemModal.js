//import { useState } from "react";
import { useForm } from "../../hooks/useForm";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen, buttonText }) => {
  // const [name, setName] = useState("");
  // const [imageUrl, setimageUrl] = useState("");
  // const [weather, setSelectedWeatherType] = useState("");

  const { values, handleChange } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

  // const handleAddItemNameChange = (e) => {
  //   setName(e.target.value);
  // };

  // const handleAddItemUrlChange = (e) => {
  //   setimageUrl(e.target.value);
  // };

  // const handleAddItemRadioWeatherType = (e) => {
  //   setSelectedWeatherType(e.target.value);
  // };

  // const handleAddItemSubmit = (e) => {
  //   e.preventDefault();
  //   const newItem = { name, imageUrl, weather };
  //   onAddItem(newItem);
  // };

  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleAddItemSubmit}
      buttonText={buttonText}
      modalName={"AddItem_Modal"}
    >
      <label className="modal__label modal__label-add">
        Name
        <input
          className="modal__input-text modal__input-text-add"
          placeholder="Name"
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          value={values.name}
          // onChange={handleAddItemNameChange}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </label>
      <label className="modal__label modal__label-add">
        Image
        <input
          className="modal__input-text modal__input-text-add"
          placeholder="Image URL"
          type="url"
          name="imageUrl"
          minLength="1"
          maxLength="1000"
          value={values.imageUrl}
          // onChange={handleAddItemUrlChange}
          onChange={handleChange}
          // autoComplete="off"
          required
        />
      </label>
      <label className="modal__label modal__label-add">
        Select the Weather Type:
      </label>
      <div>
        <div>
          <input
            className="modal__input-radio"
            type="radio"
            id="radioHot"
            value="hot"
            name="weather"
            // onChange={handleAddItemRadioWeatherType}
            onChange={handleChange}
            checked={values.weather === "hot"}
          />
          <label className="modal__label-radio" htmlFor="radioHot">
            Hot
          </label>
        </div>
        <div>
          <input
            className="modal__input-radio"
            type="radio"
            id="radioWarm"
            value="warm"
            name="weather"
            // onChange={handleAddItemRadioWeatherType}
            onChange={handleChange}
            checked={values.weather === "warm"}
          />
          <label className="modal__label-radio" htmlFor="radioWarm">
            Warm
          </label>
        </div>
        <div>
          <input
            className="modal__input-radio"
            type="radio"
            id="radioCold"
            value="cold"
            name="weather"
            // onChange={handleAddItemRadioWeatherType}
            onChange={handleChange}
            checked={values.weather === "cold"}
          />
          <label className="modal__label-radio" htmlFor="radioCold">
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
