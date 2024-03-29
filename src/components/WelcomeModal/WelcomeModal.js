import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const WelcomeModal = ({
  handleCloseModal,
  isOpen,
  buttonText,
  onSubmit,
  onLogInModal,
  onRegisterModalOnWelcomeModal,
  isValid,
  isMicActivated,
  isMicActivationPopupVisible,
  onMicActivation,
}) => {
  return (
    <div className="welcome__modal">
      <ModalWithForm
        buttonText={buttonText}
        onClose={handleCloseModal}
        isOpen={isOpen}
        modalName={"Welcome_Modal"}
        isButtonDisabled={isValid}
        onSubmit={onSubmit}
      >
        <div className="welcome__modal__text">
          <h3 className="welcome__modal_title">Prologue:</h3>
          <div className="welcome__modal_content">
            Enter the mystical realm of Madame Oracle, where your journey
            through cosmic wonders begins. By granting microphone access, you
            enhance your interaction with Madame Oracle, allowing her to provide
            insights tailored to your unique cosmic essence. Share essential
            details like your birth date and place, sexual orientation, and
            marital status for a truly personalized celestial experience.
            <p className="welcome__modal_paragraph">
              When you're ready, activate your mic and click the crystal ball to
              begin your journey.
            </p>
            <div className="welcome__modal_button-container">
              <button
                className="welcome__modal_button-mic"
                onClick={onMicActivation}
                disabled={isMicActivated}
                type="button"
              >
                {buttonText}
              </button>
              <button
                className="welcome__modal_button-register"
                onClick={onRegisterModalOnWelcomeModal}
                disabled={isMicActivationPopupVisible}
                type="button"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </ModalWithForm>
    </div>
  );
};

export default WelcomeModal;
