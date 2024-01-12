import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { useForm } from "../../hooks/useForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

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
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // console.log("currentuser DOB: ", formatDate(currentUser.dob));

  const { values, handleChange, errors, isValid, setValues, setErrors } = useFormAndValidation({
    name: currentUser.name,
    dob: formatDate(currentUser.dob),
    placeOfBirth: currentUser.placeOfBirth,
    maritalStatus: currentUser.maritalStatus,
    sexualOrientation: currentUser.sexualOrientation,
  });

  const handleFormSubmitEdit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(values);
    }
  };

  console.log("values: ", values);
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
          First Name:
          <input
            id="edit-name"
            className="modal__input_text modal__input-text-edit"
            type="text"
            name="name"
            placeholder={currentUser.name}
            value={values.name || ""}
            onChange={handleChange}
            minLength="1"
            required
          />
        </label>
        <label className="modal__label modal__label_edit">
          DOB*
          <input
            id="register-dob"
            className="modal__input_text modal__input_text-register"
            type="date"
            name="dob"
            placeholder={formatDate(currentUser.dob)}
            value={values.dob || ""}
            onChange={handleChange}
            required
          />
           {errors.dob && <span className="error-message">{errors.dob}</span>}
        </label>
        <label className="modal__label modal__label_edit">
          Place of Birth
          <input
            id="register-placeOfBirth"
            className="modal__input_text modal__input_text-edit"
            type="text"
            name="placeOfBirth"
            placeholder={currentUser.placeOfBirth}
            value={values.placeOfBirth || ""}
            onChange={handleChange}
            autoComplete="off"
          />
           {errors.placeOfBirth && <span className="error-message">{errors.placeOfBirth}</span>}
        </label>
        <label className="modal__label modal__label_edit">
          Marital Status
          <select
            id="register-gender"
            placeholder={currentUser.maritalStatus}
            className="modal__input_text modal__input_text-register"
            name="maritalStatus"
            value={values.maritalStatus || ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Marital Status
            </option>
            <option value="Single">Single</option>
            <option value="In a Relationship">In a Relationship</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
          {errors.maritalStatus && <span className="error-message">{errors.maritalStatus}</span>}
        </label>
        <label className="modal__label modal__label_edit">
          Sexual Orientation
          <select
            id="register-gender"
            placeholder={currentUser.sexualOrientation}
            className="modal__input_text modal__input_text-register"
            name="sexualOrientation"
            value={values.sexualOrientation || "" }
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Sexual Orientation
            </option>
            <option value="Straight-Male">Straight-Male</option>
            <option value="Straight-Female">Straight-Female</option>
            <option value="Gay">Gay</option>
            <option value="Lesbian">Lesbian</option>
            <option value="Bisexual">Bisexual</option>
            <option value="Pansexual">Pansexual</option>
            <option value="Asexual">Asexual</option>
            <option value="Queer">Queer</option>
            <option value="Questioning">Questioning</option>
            <option value="Demisexual">Demisexual</option>
            <option value="Greysexual">Greysexual</option>
            <option value="Heteroflexible">Heteroflexible</option>
            <option value="Homoflexible">Homoflexible</option>
            <option value="Androgynosexual">Androgynosexual</option>
            <option value="Skoliosexual">Skoliosexual</option>
            <option value="Polysexual">Polysexual</option>
            <option value="Two-Spirit">Two-Spirit</option>
            <option value="Agender">Agender</option>
            <option value="Bigender">Bigender</option>
            <option value="Genderfluid">Genderfluid</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Other">Other</option>
          </select>
          {errors.sexualOrientation && <span className="error-message">{errors.sexualOrientation}</span>}
        </label>
      </ModalWithForm>
    </div>
  );
};

export default EditProfileModal;
