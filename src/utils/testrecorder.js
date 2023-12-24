import React, { useState } from "react";

const AudioRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        const chunks = []; // Create an array to store chunks
  
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data); // Store the data chunks
          }
        };
  
        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: "audio/wav" }); // Create Blob from all recorded chunks
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play();
        };
  
        setMediaRecorder(recorder);
        recorder.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };
  

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <button onClick={playRecording} disabled={audioChunks.length === 0}>
        Play Recording
      </button>
      {audioChunks.length > 0 ? (
        <p>Audio recorded successfully!</p>
      ) : (
        <p>No audio recorded yet.</p>
      )}
    </div>
  );
};

export default AudioRecorder;
