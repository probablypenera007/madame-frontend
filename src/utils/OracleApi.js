import { request, baseUrl } from "./Api";

export const sendAudioToOracle = ({audioFile}) => {
    const formData = new FormData();
    formData.append('file', audioFile);

    return request(`${baseUrl}/speech-to-text`, {
        method: "POST",
        body: formData,
    });
};

export const getMadameOracleResponse = ({transcription}) => {
    return request(`${baseUrl}/fortune-teller`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userId, userInput: transcription}),
    });
};

export const getTextFromOracleToAudio = ({text}) => {
    return request(`${baseUrl}/text-to-speech`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({text}),
    });
};