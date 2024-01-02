import React, { useState } from "react";
import OracleReadingModal from "../../OracleReadingModal/OracleReadingModal";
import { useForm } from "../../../hooks/useForm";
import "./SavedReadingSection.css";

const SavedReadingSection = ({
  //   oracleReadings,
  onSavedReading,
  onUpdateReading,
  onDeleteReading,
  oracleReadings,
}) => {
  const [selectedReading, setSelectedReading] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { values, handleChange } = useForm({
    title: "",
  });




  const handleSelectReading = (reading) => {
    setSelectedReading(reading);
  };

  const handleCloseModal = () => {
    setSelectedReading(null);
  };

  const handleSavedReadingSubmit = (e) => {
    e.preventDefault();
    console.log("Saved reading submitted");
    onSavedReading(values);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <section className="section__saved-reading">
      <h1 className="section__saved-reading_title">Your Saved Readings</h1>
      <ul className="section__saved-list">
        {oracleReadings.map((reading, index) => (
          <li
            key={index}
            className="section__saved-item"
            onClick={() => handleSelectReading(reading)}
          >
            {isEditing ? (
              <input
                type="text"
                value={values.title}
                onChange={handleChange}
              />
            ) : (
              <span>{reading.title}</span>
            )}
            {reading.date}
            <div className="section__reading_button-container">
              <button
                className="section__edit-button"
                type="button"
                onClick={handleEditClick}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              {isEditing && (
                <button
                  className="section__save-button"
                  type="button"
                  onClick={handleSavedReadingSubmit}
                >
                  Save
                </button>
              )}
              <button
                className="section__delete-button"
                type="button"
                onClick={() => onDeleteReading(reading._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedReading && !isEditing && (
        <OracleReadingModal
          oracleResponse={selectedReading.text}
          onClose={handleCloseModal}
          onSavedReading={() => onSavedReading(selectedReading._id)}
          onUpdateReading={() => onUpdateReading(selectedReading._id)}
          onDeleteReading={() => onDeleteReading(selectedReading._id)}
        />
      )}
    </section>
  );
};

export default SavedReadingSection;
