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
