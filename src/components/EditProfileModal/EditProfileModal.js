import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { useForm } from '../../hooks/useForm';

const EditProfileModal = ({
  handleCloseModal,
  isOpen,
  onSubmit,
  buttonText,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange } = useForm({ name: currentUser.name, avatar: currentUser.avatar });

  // const [name, setName] = useState(currentUser.name);
  // const [avatar, setAvatar] = useState(currentUser.avatar);

  // const handleNameChange = (e) => {
  //   setName(e.target.value);
  // };

  // const handleAvatarChange = (e) => {
  //   setAvatar(e.target.value);
  // };

  const handleFormSubmitEdit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="edit__profile">
      <ModalWithForm
        title="Change Profile Data"
        onClose={handleCloseModal}
        isOpen={isOpen}
        onSubmit={handleFormSubmitEdit}
        buttonText={buttonText}
        modalName={"EditProfile_Modal"}
      >
        <label className="modal__label  modal__label_edit">
          Name:
          <input
            id="edit-name"
            className="modal__input-text modal__input-text-edit"
            type="text"
            name="name"
            value={values.name}
            // onChange={handleNameChange}
            onChange={handleChange}
            minLength="1"
            required
          />
        </label>
        <label className="modal__label modal__label_edit">
          Avatar:
          <input
            id="edit-avatar"
            className="modal__input-text modal__input-text-edit"
            type="url"
            name="avatar"
            value={values.avatar}
            // onChange={handleAvatarChange}
            onChange={handleChange}
            minLength="1"
          />
        </label>
      </ModalWithForm>
    </div>
  );
};

export default EditProfileModal;
