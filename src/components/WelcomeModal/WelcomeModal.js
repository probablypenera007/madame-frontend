import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const WelcomeModal = ({
  handleCloseModal,
  isOpen,
  buttonText,
  onSubmit,
  onLogInModal,
  onRegisterModal,
  isButtonDisabled,
  isMicActivated,
  isMicActivationPopupVisible,
}) => {
  return (
    <div className="welcome__modal">
      <ModalWithForm
        buttonText={buttonText}
        onSubmit={onSubmit}
        onClose={handleCloseModal}
        isOpen={isOpen}
        modalName={"Welcome_Modal"}
        isButtonDisabled={isButtonDisabled}
      >
        <div className="welcome__modal__text">
          <h3 className="welcome__modal_title">Prologue:</h3>
          <p className="welcome__modal_paragraph">
            Enter the mystical realm of Madame Oracle, where your journey
            through cosmic wonders begins. By granting microphone access, you
            enhance your interaction with Madame Oracle, allowing her to provide
            insights tailored to your unique cosmic essence. Share essential
            details like your birth date and place, sexual orientation, and
            marital status for a truly personalized celestial experience.
            <br />
            <br />
            When you're ready, activate your mic and click the crystal ball to
            begin your journey.
            <br />
            <button
              className="welcome__modal__buttons_register"
              onClick={onRegisterModal}
              disabled={isMicActivationPopupVisible}
            ></button>
          </p>
        </div>
      </ModalWithForm>
    </div>
  );
};

export default WelcomeModal;
