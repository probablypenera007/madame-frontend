import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";

const RegisterModal = ({
  handleCloseModal,
  isOpen,
  onSubmit,
  buttonText,
  openLogInModal,
}) => {
  const { values, handleChange } = useForm({
    name: "",
    dob: "",
    placeOfBirth: "",
    maritalStatus: "",
    gender: "",
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleFormSubmitRegister = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  const handleOpenLogin = (e) => {
    e.preventDefault();
    openLogInModal();
  };

  return (
    <div className="register">
      <ModalWithForm
        title="Sign Up"
        onClose={handleCloseModal}
        isOpen={isOpen}
        onSubmit={handleFormSubmitRegister}
        buttonText={buttonText}
        modalName={"Register_Modal"}
      >
        <label className="modal__label modal__label_register">
          Name
          <input
            id="register-name"
            className="modal__input-text modal__input_text-register"
            type="text"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </label>
        <label className="modal__label modal__label_register">
          DOB*
          <input
            id="register-dob"
            className="modal__input_text modal__input_text-register"
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={values.dob}
            onChange={handleChange}
            required
          />
        </label>
        <label className="modal__label modal__label_register">
          Place of Birth
          <input
            id="register-placeOfBirth"
            className="modal__input-text modal__input_text-register"
            type="text"
            name="placeOfBirth"
            placeholder="Place of Birth"
            value={values.placeOfBirth}
            onChange={handleChange}
            autoComplete="off"
          />
        </label>
        <label className="modal__label modal__label_register">
          Marital Status
          <select
            id="register-gender"
            placeholder="Marital Status"
            className="modal__input_text modal__input_text-register"
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
        <label className="modal__label modal__label_register">
          Gender
          <select
            id="register-gender"
            placeholder="Gender"
            className="modal__input_text modal__input_text-register"
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
        <label className={"modal__label modal__label_register"}>
          Email*
          <input
            id="register-email"
            className="modal__input-text modal__input_text-register"
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            minLength="1"
            maxLength="30"
            autoComplete="off"
            required
          />
        </label>
        <label className="modal__label modal__label_register">
          Password*
          <input
            id="register-password"
            className="modal__input-text modal__input_text-register"
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            // onChange={handlePasswordChange}
            minLength="1"
            autoComplete="off"
            required
          />
        </label>
        <Link to="/" className="login__link" onClick={handleOpenLogin}>
          or Log In
        </Link>
      </ModalWithForm>
    </div>
  );
};

export default RegisterModal;
