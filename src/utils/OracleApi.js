import { request, baseUrl } from "./Api";

export const sendAudioToOracle = (audioBlob) => {
    const formData = new FormData();
    formData.append('file', audioBlob);

    return request(`${baseUrl}/speech-to-text`, {
        method: "POST",
        body: formData,
    });
};

export const getMadameOracleResponse = ({userId, transcription}) => {
    return request(`${baseUrl}/fortune-teller`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userId, userInput: transcription}),
    });
};

export const getTextFromOracleToAudio = ({ text }) => {
    return fetch(`${baseUrl}/text-to-speech`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
    .then((response) => {
      if (response.ok) {
        return response.arrayBuffer(); // Fetch the audio data as a Blob
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    });
  };
  