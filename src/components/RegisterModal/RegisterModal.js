import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import TinyPopup from "../TinyPopUp/TinyPopUp";

const RegisterModal = ({
  handleCloseModal,
  isOpen,
  onSubmit,
  buttonText,
  openLogInModal,
}) => {
  const [isTooltipDOBVisible, setIsTooltipDOBVisible] = useState(false);
  const [isTooltipBirthPlaceVisible, setIsTooltipBirthPlaceVisible] =
    useState(false);
  const [isTooltipMaritalVisible, setIsTooltipMaritalVisible] = useState(false);
  const [isTooltipSexOrientationVisible, setIsTooltipSexOrientationVisible] =
    useState(false);

  const { values, handleChange } = useForm({
    name: "",
    dob: "",
    placeOfBirth: "",
    maritalStatus: "",
    sexualOrientation: "",
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
            className="modal__input_text modal__input_text-register"
            type="text"
            name="name"
            placeholder="First Name"
            value={values.name}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </label>
        <label className="modal__label modal__label_register">
          DOB*
          <span
            className="span_dob"
            onMouseEnter={() => setIsTooltipDOBVisible(true)}
            onMouseLeave={() => setIsTooltipDOBVisible(false)}
          >
            <TinyPopup
              name="dob"
              text="Date of Birth helps align your cosmic essence with celestial bodies for accurate insights."
              isVisible={isTooltipDOBVisible}
              onHide={() => setIsTooltipDOBVisible(false)}
            />
          </span>
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
          <span
            className="span_birthplace"
            onMouseEnter={() => setIsTooltipBirthPlaceVisible(true)}
            onMouseLeave={() => setIsTooltipBirthPlaceVisible(false)}
          >
            <TinyPopup
              name="birthplace"
              text="Birthplace connects your cosmic energy with the universe for precise readings."
              isVisible={isTooltipBirthPlaceVisible}
              onHide={() => setIsTooltipBirthPlaceVisible(false)}
            />
          </span>
          <input
            id="register-placeOfBirth"
            className="modal__input_text modal__input_text-register"
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
          <span
            className="span_marital"
            onMouseEnter={() => setIsTooltipMaritalVisible(true)}
            onMouseLeave={() => setIsTooltipMaritalVisible(false)}
          >
            <TinyPopup
              name="marital"
              text="Marital Status tailors guidance to your unique life journey. "
              isVisible={isTooltipMaritalVisible}
              onHide={() => setIsTooltipMaritalVisible(false)}
            />
          </span>
          <select
            id="register-maritalStatus"
            placeholder="Marital Status"
            className="modal__input_text modal__input_text-register"
            name="maritalStatus"
            value={values.maritalStatus}
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
        </label>
        <label className="modal__label modal__label_register">
          Sexual Orientation
          <span
            className="span_sexual-orientation"
            onMouseEnter={() => setIsTooltipSexOrientationVisible(true)}
            onMouseLeave={() => setIsTooltipSexOrientationVisible(false)}
          >
            <TinyPopup
              name="sexual-orientation"
              text="Sexual Orientation provides cosmic insights resonating with your essence."
              isVisible={isTooltipSexOrientationVisible}
              onHide={() => setIsTooltipSexOrientationVisible(false)}
            />
          </span>
          <select
            id="register-sexualOrientation"
            placeholder="Sexual Orientation"
            className="modal__input_text modal__input_text-register"
            name="sexualOrientation"
            value={values.sexualOrientation}
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
        </label>
        <label className={"modal__label modal__label_register"}>
          Email*
          <input
            id="register-email"
            className="modal__input_text modal__input_text-register"
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
            className="modal__input_text modal__input_text-register"
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
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
