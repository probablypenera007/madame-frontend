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
        // title="Welcome to Madame Oracle"
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
            As you step into the realm of Madame Oracle, you embark on a journey
            guided by cosmic forces. To unlock the full experience and establish
            a profound connection with Madame Oracle, she kindly requests access
            to your microphone. This is the sole medium through which she
            communicates, transcending the boundaries of time and space.
          </p>
          <p className="welcome__modal_paragraph">
            Madame Oracle's cosmic reading ability is unlike any other. She is a
            guardian of fate and wisdom, woven into the fabric of the universe
            itself. By sharing your date of birth, place of birth, sexual
            orientation, and marital status, you enable Madame Oracle to
            harmonize your unique cosmic essence with the celestial bodies. This
            allows her to offer insights of unparalleled accuracy and depth,
            illuminating your path through the cosmos.
          </p>
          <div className="welcome__modal__buttons">
          <button
            className="welcome__modal__buttons_register"
            onClick={onRegisterModal}
            disabled={isMicActivationPopupVisible} 
          ></button>
        </div>
        </div>
     
      </ModalWithForm>
    </div>
  );
};

export default WelcomeModal;
