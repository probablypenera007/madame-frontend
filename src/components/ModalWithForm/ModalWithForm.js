import "./ModalWithForm.css";
import { Modal } from "../Modal/Modal";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  onClose,
  modalName,
  isOpen,
  onSubmit,
}) => {
  return (
    <Modal name={modalName} 
    onClose={onClose} 
    closeButtonStyle="button__close-modal-gray"
    >
{/*      
        <button
          className="button__close-modal-gray"
          type="button"
          onClick={onClose}
        /> */}
        <form className="modal__form" onSubmit={onSubmit}>
          <h3 className="modal__title">{title}</h3>
          {children}
          <button className={`button__submit-modal_${modalName}`} type="submit">
            {buttonText}
          </button>
        </form>
  
    </Modal>
  );
};

export default ModalWithForm;
