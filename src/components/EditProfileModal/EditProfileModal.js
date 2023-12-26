import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { useForm } from "../../hooks/useForm";

const EditProfileModal = ({
  handleCloseModal,
  isOpen,
  onSubmit,
  buttonText,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

  const { values, handleChange } = useForm({
    name: currentUser.name,
    dob: formatDate(currentUser.dob),
    placeOfBirth: currentUser.placeOfBirth,
    maritalStatus: currentUser.maritalStatus,
    gender: currentUser.gender,
  });

  const handleFormSubmitEdit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="edit__profile">
      <ModalWithForm
        title="Change Profile Data"
        onClose={handleCloseModal}
        isOpen={isOpen}
        onSubmit={handleFormSubmitEdit}
        buttonText={buttonText}
        modalName={"EditProfile_Modal"}
      >
        <label className="modal__label  modal__label_edit">
          Name:
          <input
            id="edit-name"
            className="modal__input-text modal__input-text-edit"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            minLength="1"
            required
          />
        </label>
        <label className="modal__label modal__label_edit">
          DOB*
          <input
            id="register-dob"
            className="modal__input_text modal__input_text-edit"
            type="date"
            name="dob"
            placeholder={formatDate(currentUser.dob)}
            value={values.dob}
            onChange={handleChange}
            required
          />
        </label>
        <label className="modal__label modal__label_edit">
          Place of Birth
          <input
            id="register-placeOfBirth"
            className="modal__input-text modal__input_text-edit"
            type="text"
            name="placeOfBirth"
            placeholder={currentUser.placeOfBirth}
            value={values.placeOfBirth}
            onChange={handleChange}
            autoComplete="off"
          />
        </label>
        <label className="modal__label modal__label_edit">
          Marital Status
          <select
            id="register-gender"
            placeholder={currentUser.maritalStatus}
            className="modal__input_text modal__input_text-edit"
            name="maritalStatus"
            value={values.maritalStatus}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Marital Status</option>
            <option value="Single">Single</option>
            <option value="In a Relationship">In a Relationship</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </label>
        <label className="modal__label modal__label_edit">
          Gender
          <select
            id="register-gender"
            placeholder={currentUser.gender}
            className="modal__input_text modal__input_text-edit"
            name="gender"
            value={values.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Genderqueer">Genderqueer</option>
            <option value="Genderfluid">Genderfluid</option>
            <option value="Bigender">Bigender</option>
            <option value="Agender">Agender</option>
            <option value="Pangender">Pangender</option>
            <option value="Neutrois">Neutrois</option>
            <option value="Androgyne">Androgyne</option>
            <option value="Demiboy">Demiboy</option>
            <option value="Demigirl">Demigirl</option>
            <option value="Two-Spirit">Two-Spirit</option>
            <option value="Third Gender">Third Gender</option>
            <option value="Other">Other</option>
          </select>
        </label>
       
      </ModalWithForm>
    </div>
  );
};

export default EditProfileModal;
