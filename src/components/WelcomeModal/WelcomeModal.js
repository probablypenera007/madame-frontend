import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const WelcomeModal = ({
  handleCloseModal,
  isOpen,
  openLogInModal,
  openRegisterModal,
}) => {
  return (
    <div className="welcome__modal">
      <ModalWithForm
        title="Welcome to Oracle"
        onClose={handleCloseModal}
        isOpen={isOpen}
        modalName={"Welcome_Modal"}
      >
        <div className="welcome__modal__text">
          <p className="welcome__modal__text__paragraph">
            Madame Oracle TESTING! insert why we need microphone for full
            experience and date of birth , place of birth etc. for horoscope
            reading
          </p>
        </div>
        <div className="welcome__modal__buttons">
          <button
            className="welcome__modal__buttons__button"
            onClick={openLogInModal}
          >
            Log In
          </button>
          <button
            className="welcome__modal__buttons__button"
            onClick={openRegisterModal}
          >
            Register
          </button>
        </div>
      </ModalWithForm>
    </div>
  );
};

export default WelcomeModal;
