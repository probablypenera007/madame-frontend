import { Link } from "react-router-dom/cjs/react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { useForm } from '../../hooks/useForm';
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const LogInModal = ({
  handleCloseModal,
  isOpen,
  onSubmit,
  buttonText,
  openRegisterModal,
  inputError,
}) => {
  const { values, handleChange } = useForm({ email: '', password: '' });

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmitLogIn = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  // const handleFormSubmitLogIn = (e) => {
  //   e.preventDefault();
  //   onSubmit({ email, password });
  // };

  const handleOpenRegisterModal = (e) => {
    e.preventDefault();
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
      >
        <label className="modal__label modal__label_login">
        {/* // {`modal__label modal__label_login ${inputError === "Invalid Email" ? "error" : ""}`}>
        //   {inputError === "Invalid Email" ? "Invalid Email" : "Email"} */}
          <input
            id="login-email"
            className="modal__input-text modal__input_text-login"
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            // onChange={handleEmailChange}
            minLength="1"
            required
            autoComplete="email"
          />
        </label>
        <label className="modal__label modal__label_login" >
        {/* // {`modal__label modal__label_login ${inputError === "Incorrect Password" ? "error" : ""}`}>
        //   {inputError === "Incorrect Password" ? "Incorrect Password" : "Password"} */}
          <input
            id="login-password"
            className="modal__input-text modal__input_text-login"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            // onChange={handlePasswordChange}
            minLength="1"
            autoComplete="off"
            required
          />
        </label>

        <Link
          to="/"
          className="register__link"
          onClick={handleOpenRegisterModal}
        >
          or Register
        </Link>
      </ModalWithForm>
    </div>
  );
};

export default LogInModal;
