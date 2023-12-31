import React, { useState } from "react";
import OracleReadingModal from "../../OracleReadingModal/OracleReadingModal";

const SavedReadingSection = ({
  //   oracleReadings,
  onSavedReading,
  onUpdateReading,
  onDeleteReading,
  oracleReadings,
}) => {
  const [selectedReading, setSelectedReading] = useState(null);

  const handleSelectReading = (reading) => {
    setSelectedReading(reading);
  };

  const handleCloseModal = () => {
    setSelectedReading(null);
  };

  const handleSavedReadingSubmit = (e) => {
    e.preventDefault();
    console.log("Saved reading submitted");
    onSavedReading();
  };

  return (
    <section className="section__saved-reading">
      <h1 className="section__saved-reading_title"> Your Saved Readings </h1>
      <ul className="section__saved-list">
        {oracleReadings.map((reading, index) => (
          <li
            key={index}
            className="section__saved-item"
            onClick={() => handleSelectReading(reading)}
          >
            {reading.title} ---------
            <div className="section__reading_button-container">
              <button className="section__edit-button" type="button">
                Edit
              </button>
              <button className="section__delete-button" type="button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedReading && (
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
