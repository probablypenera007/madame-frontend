import { Link } from "react-router-dom/cjs/react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const LogInModal = ({
  handleCloseModal,
  isOpen,
  onSubmit,
  buttonText,
  openRegisterModal,
  inputError,
}) => {
  const { values, handleChange, errors, isValid, setErrors } = useFormAndValidation({ email: "", password: "" });

  const history = useHistory();

  const handleFormSubmitLogIn = (e) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(values);
    }
  };

  const handleOpenRegisterModal = (e) => {
    e.preventDefault();
    handleCloseModal();
    openRegisterModal();
  };

  return (
    <div className="login">
      <ModalWithForm
        title="Log In"
        onClose={handleCloseModal}
        isOpen={isOpen}
        onSubmit={handleFormSubmitLogIn}
        buttonText={buttonText}
        modalName={"LogIn_Modal"}
        isButtonDisabled={!isValid}
      >
        <label className="modal__label modal__label_login">
          <input
            id="login-email"
            className="modal__input_text modal__input_text-login"
            type="email"
            placeholder="Email"
            name="email"
            value={values.email || ""}
            onChange={handleChange}
            minLength="1"
            required
            autoComplete="email"
          />
            {errors.email && <span className="error-message">{errors.email}</span>}
        </label>
        <label className="modal__label modal__label_login">
          <input
            id="login-password"
            className="modal__input_text modal__input_text-login"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password || ""}
            onChange={handleChange}
            minLength="1"
            autoComplete="off"
            required
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </label>
        <button
          className="register__button"
          type="button"
          onClick={handleOpenRegisterModal}
        >
          or Register
        </button>
      </ModalWithForm>
    </div>
  );
};

export default LogInModal;
