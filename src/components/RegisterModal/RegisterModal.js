import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from '../../hooks/useForm';
import { useState } from "react";

const RegisterModal = ({
  handleCloseModal,
  isOpen,
  onSubmit,
  buttonText,
  openLogInModal,
}) => {
  const { values, handleChange } = useForm({ email: '', password: '', name: '', avatar: '' });

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const [avatar, setAvatar] = useState("");
  const history = useHistory();

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  // const handleNameChange = (e) => {
  //   setName(e.target.value);
  // };

  // const handleAvatarChange = (e) => {
  //   setAvatar(e.target.value);
  // };

  // const handleFormSubmitRegister = (e) => {
  //   e.preventDefault();
  //   onSubmit({ email, password, name, avatar });
  // };

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
            // onChange={handleEmailChange}
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
            // onChange={handleNameChange}
            autoComplete="off"
            required
          />
        </label>
        <label className="modal__label modal__label_register">
          Avatar URL
          <input
            id="register-avatar"
            className="modal__input-text modal__input_text-register"
            type="url"
            name="avatar"
            placeholder="Avatar URL"
            value={values.avatar}
            onChange={handleChange}
            // onChange={handleAvatarChange}
            minLength="1"
            autoComplete="off"
            // required
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
