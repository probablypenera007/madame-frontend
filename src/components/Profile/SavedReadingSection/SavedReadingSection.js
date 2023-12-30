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
            {reading.title}
          </li>
        ))}
      </ul>
      {selectedReading && (
        <OracleReadingModal
          oracleResponse={selectedReading.text}
          onClose={handleCloseModal}
          onUpdateReading={() => onUpdateReading(selectedReading._id)}
          onDeleteReading={() => onDeleteReading(selectedReading._id)}
        />
      )}
    </section>
  );
};

export default SavedReadingSection;
