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

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

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
      const readingToEdit = oracleReadings.find(
        (reading) => reading._id === readingId
      );
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
    onUpdateReading(readingId, values.title);
    setIsEditing(false);
    setEditingReadingId(null);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  //https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key

  return (
    <section className="section__saved-reading">
      <h1 className="section__saved-reading_title">Your Saved Readings</h1>
      <ul className="section__saved-list">
        {oracleReadings.slice(startIndex, endIndex).map((reading) => (
          <li key={reading._id} className="section__saved-item">
            <span onClick={() => handleSelectReading(reading)}>
              {editingReadingId === reading._id ? (
                <input
                className="section__saved-title"
                  name="title"
                  type="text"
                  value={
                    editingReadingId === reading._id
                      ? values.title
                      : reading.title
                  }
                  onChange={handleChange}
                />
              ) : (
                <span className="section__saved-title" >{reading.title}</span>
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
      <div className="pagination-buttons">
        <button
          className="section__previous-button"
          type="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
          className="section__next-button"
          type="button"
          onClick={handleNextPage}
          disabled={endIndex >= oracleReadings.length}
        >
          {">>"}
        </button>
      </div>
      {selectedReading && !editingReadingId && (
        <OracleReadingModal
          oracleResponse={selectedReading.text}
          onClose={handleCloseModal}
          updatedTitle={values.title}
          onSavedReading={() => onSavedReading(selectedReading._id)}
          onDeleteReading={() => onDeleteReading(selectedReading._id)}
        />
      )}
    </section>
  );
};

export default SavedReadingSection;
