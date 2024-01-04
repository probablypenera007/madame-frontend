import React, { useState } from "react";
import OracleReadingModal from "../../OracleReadingModal/OracleReadingModal";
import { useForm } from "../../../hooks/useForm";
import "./SavedReadingSection.css";

const SavedReadingSection = ({
  oracleReadings,
  onSavedReading,
  onUpdateReading,
  onDeleteReading,
}) => {
  const [selectedReading, setSelectedReading] = useState(null);
  const [editingReadingId, setEditingReadingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState("");
  const { values, handleChange, setValues } = useForm({
    title: "",
  });

  const handleSelectReading = (oracleReading) => {
    if (editingReadingId !== oracleReading._id) {
      setSelectedReading(oracleReading);
    }
  };

  const handleCloseModal = () => {
    setSelectedReading(null);
  };

  const handleEditClick = (readingId) => {
    if (editingReadingId === readingId) {
      setEditingReadingId(null);
      setValues({ title: "" });
      setIsEditing(false);
       setIsEditing(false);
    } else {
      const readingToEdit = oracleReadings.find(reading => reading._id === readingId);
      if (readingToEdit) {
        setValues({ title: readingToEdit.title });
        setIsEditing(true);
        setEditingReadingId(readingId);
      }
    }
  };

  const handleUpdatedTitleReadingSubmit = (e, readingId) => {
    e.preventDefault();
    console.log("Saved reading submitted");
    onUpdateReading(editingReadingId, values.title);
    setIsEditing(false);
    setEditingReadingId(null);
  };

  //https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key 

  return (
    <section className="section__saved-reading">
      <h1 className="section__saved-reading_title">Your Saved Readings</h1>
      <ul className="section__saved-list">
        {oracleReadings.map((reading) => (
          <li key={reading._id} className="section__saved-item">
            <span onClick={() => handleSelectReading(reading)}>
              {editingReadingId === reading._id ? (
                <input
                  name="title"
                  type="text"
                  value={editingReadingId === reading._id ? values.title : reading.title}
                  onChange={handleChange}
                />
              ) : (
                <span>{reading.title}</span>
              )}
            </span>
            {reading.date}
            <div className="section__reading_button-container">
              <button
                className="section__edit-button"
                type="button"
                onClick={() => handleEditClick(reading._id)}
              >
                {editingReadingId === reading._id ? "Cancel" : "Edit"}
              </button>
              {editingReadingId === reading._id && (
                <button
                  className="section__save-button"
                  type="button"
                  onClick={(e) =>
                    handleUpdatedTitleReadingSubmit(e, reading._id)
                  }
                >
                  Update
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
      {selectedReading && !editingReadingId && (
        <OracleReadingModal
          oracleResponse={selectedReading.text}
          onClose={handleCloseModal}
          updatedTitle={values.title}
          onSavedReading={() => onSavedReading(selectedReading._id)}
          //onUpdateReading={() => onUpdateReading(selectedReading._id)}
          onDeleteReading={() => onDeleteReading(selectedReading._id)}
        />
      )}
    </section>
  );
};

export default SavedReadingSection;
