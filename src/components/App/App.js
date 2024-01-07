import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AboutUs from "../AboutUs/AboutUs";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import LogInModal from "../LogInModal/LogInModal";
import WelcomeModal from "../WelcomeModal/WelcomeModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import TinyPopup from "../TinyPopUp/TinyPopUp";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  Switch,
  Route,
  useHistory,
} from "react-router-dom/cjs/react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as ai from "../../utils/OracleApi";
import * as auth from "../../utils/Auth";
import * as api from "../../utils/Api";
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [inputError, setInputError] = useState("");
  const [oracleResponse, setOracleResponse] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isReadingCompleted, setIsReadingCompleted] = useState(false);
  const [isUserTalking, setIsUserTalking] = useState(false);
  const [isOracleProcessingSTT, setIsOracleProcessingSTT] = useState(false);
  const [isOracleProcessingTTS, setIsOracleProcessingTTS] = useState(false);
  const [isOraclePlayingAudio, setIsOraclePlayingAudio] = useState(false);
  const [oracleReadings, setOracleReadings] = useState([]);
  const [isMicActivated, setIsMicActivated] = useState(false);
  const [isMicActivationPopupVisible, setIsMicActivationPopupVisible] =
    useState(false);

  const history = useHistory();

  // -------------------------
  // MODALS
  // -------------------------

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleCloseModal = () => {
    setActiveModal("");
  };

  // -------------------------
  //      USER READINGS
  // -------------------------
  // useEffect(() => {
  //   // console.log("Updated oracleReadings state:", oracleReadings);
  // }, [oracleReadings]);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserReadings()
        .then((res) => {
          setOracleReadings(res.data);
          // console.log("data from getUserReadings: ", res.data);
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);
  // }, []);

  const handleSavedReading = (readingData) => {
    const token = localStorage.getItem("jwt");
    return api
      .saveReading(readingData, token)
      .then((newReading) => {
        // console.log("newReading value BEFORE setOracleReadings from App.js: ", newReading);
        setOracleReadings((prevReadings) => [newReading, ...prevReadings]);
        // console.log("newReading  value AFTER setOracleReadings from App.js: ", newReading);
      })
      .catch(console.error);
  };

  const handleDeleteReading = (readingId) => {
    api
      .deleteReading(readingId)
      .then(() => {
        setOracleReadings((prevReadings) =>
          prevReadings.filter((reading) => reading._id !== readingId)
        );
      })
      .catch(console.error);
  };

  const handleUpdateReading = (readingId, title) => {
    api
      .updateReadingTitle(readingId, title)
      .then((updateReading) => {
        // console.log("updateReading from App.js: ", updateReading);
        setOracleReadings((prevReadings) =>
          prevReadings.map((reading) =>
            reading._id === readingId ? updateReading.data : reading
          )
        );
      })
      .catch(console.error);
  };

  // console.log("oracle reading value in App.js: ", oracleReadings);

  // -------------------------
  //         USERS
  // -------------------------

  useEffect(() => {
    setActiveModal("welcome");
    const jwt = localStorage.getItem("jwt");
    const isMicActivated = localStorage.getItem("isMicActivated") === "true"; // Check if mic was previously activated

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res.data);
            api.getUserReadings().then((res) => {
              setOracleReadings(res.data);
              // console.log("data from getUserReadings: ", res.data);
            });
          }
        })
        .then(() => {
          if (currentUser) {
            history.push("/profile");
          } else {
            history.push("/");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setIsMicActivated(isMicActivated);
  }, []);

  const handleAuthErrors = (error) => {
    const errorMessage = error.message || "";
    setInputError(
      errorMessage.includes("invalid email")
        ? "Invalid Email"
        : errorMessage.includes("incorrect password")
        ? "Incorrect Password"
        : "Login Failed. Please Try Again"
    );
    console.error(error);
  };

  const handleLogInModal = () => {
    setActiveModal("login-signin");
  };

  const handleLogInSubmit = (data) => {
    setIsLoading(true);
    return auth.logIn(data).then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        auth
          .checkToken(res.token)
          .then((user) => {
            setCurrentUser(user.data);
            setOracleReadings(user.data.readings);
            history.push("/");
            handleCloseModal();
          })
          .catch(handleAuthErrors)
          .finally(() => setIsLoading(false));
      }
    });
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    setOracleReadings([]);
    history.push("/");
  };

  const handleRegisterModal = () => {
    if (!isMicActivated) {
      setIsMicActivationPopupVisible(true);
    } else {
      setActiveModal("register-signup");
    }
  };

  const handleRegisterSubmit = (data) => {
    console.log("value of data top of RegisterSubmit app.js: ", data);
    setIsLoading(true);
    return auth
      .register(data)
      .then((res) => {
        console.log("registration response in registersubmit: ", res);
        // setCurrentUser(user.data);
        // setOracleReadings(user.data.readings);
        handleLogInSubmit(data);
        history.push("/");
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  const handleEditProfileSubmit = (data) => {
    setIsLoading(true);
    return auth
      .editProfile(data)
      .then((update) => {
        setCurrentUser(update.data);
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleTermsAndConditions = (e) => {
    e.preventDefault();
    history.push("/terms-and-conditions");
  };

  const handleAboutUs = (e) => {
    e.preventDefault();
    history.push("/aboutus");
  };

  // -------------------------
  //      MADAME ORACLE
  // -------------------------
  // Supported formats: ['flac', 'm4a', 'mp3', 'mp4', 'mpeg', 'mpga', 'oga', 'ogg', 'wav', 'webm']",
  // https://developer.mozilla.org/en-US/docs/Web/API/Blob/arrayBuffer#:~:text=,interface%27s%20method
  // https://developer.mozilla.org/en-US/docs/Web/API/Blob/arrayBuffer#:~:text=,arrayBuffer

  // const showMicActivationPopup = () => {
  //   setIsMicActivationPopupVisible(true);
  // };

  const handleMicActivation = () => {
    if (!isMicActivated) {
      console.log("Mic activated");
      setIsMicActivated(true);
      setActiveModal("welcome");
    } else {
      console.log("Mic is already activated");
      history.push("/");
    }
  };

  const processAudio = async (audioBlob) => {
    const arrayBuffer = await blobToArrayBuffer(audioBlob);
    const convertedBlob = new Blob([arrayBuffer], { type: "audio/wav" });
    return convertedBlob;
  };

  const blobToArrayBuffer = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (event) => {
        reject(new Error("Error reading Blob as ArrayBuffer"));
      };
      reader.readAsArrayBuffer(blob);
    });
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(async (stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start();
        setIsUserTalking(true);
        setIsRecording(true);

        const chunks = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
          }
          console.log("Received audio data chunk format:", e.data);
        };

        recorder.onstop = async () => {
          setIsUserTalking(false);
          setIsRecording(false);
          setIsOracleProcessingSTT(true); //show the galaxy overlay that will make the crystall ball look like it's spinning - (text for oracle section title would be: Madame Oracle is searching the galaxy for an answer)
          const audioBlob = new Blob(chunks, { type: "audio/webm" });

          try {
            const convertedAudioBlob = await processAudio(audioBlob);
            console.log("Audio Blob format:", audioBlob);
            ai.sendAudioToOracle(convertedAudioBlob)
              .then((data) => {
                console.log("Oracle transcription:", data.transcript);
                return ai.getMadameOracleResponse({
                  userId: currentUser._id,
                  transcription: data.transcript,
                });
              })
              .then((aiResponse) => {
                setIsOracleProcessingSTT(false); // Oracle done processing SST - crystall ball becomes solid black - ( prepare yourself, the stars and cosmic energy has spoken )
                setIsOracleProcessingTTS(true); // Oracle starts processing TTS - hyper space drive starts, galactic background goes on an infinite illusion of space travel
                console.log("Oracle response:", aiResponse.reply);
                setOracleResponse(aiResponse.reply);
                return ai.getTextFromOracleToAudio({ text: aiResponse.reply });
              })
              .then((audioBuffer) => {
                console.log("Received audioBuffer:", audioBuffer);

                const audioBlob = new Blob([audioBuffer], {
                  type: "audio/mpeg",
                });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audioElement = new Audio(audioUrl);
                audioElement.src = audioUrl;
                setIsOracleProcessingTTS(false); // Oracle done processing TTS - hyper space drive stops, record button still disabled
                setIsOraclePlayingAudio(true); // Oracle starts playing audio - waveform starts and make the crystal ball look like it's glowing or something, record button still disabled
                console.log("Audio element src:", audioElement.src);
                audioElement.play();
                audioElement.onended = () => {
                  URL.revokeObjectURL(audioUrl);
                  setIsOraclePlayingAudio(false); // Oracle done playing audio - waveform stops and crystal ball stops glowing, record button still disabled
                  setIsReadingCompleted(true);
                };
              })
              .catch((error) => {
                console.error("Error processing audio:", error);
              });
          } catch (error) {
            console.error("Error processing audio:", error);
          }
        };
      });
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div
        className={`bg__galaxy ${
          isOracleProcessingTTS ? "bg__galaxy--hyperdrive-active" : ""
        }`}
      ></div>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          onLogInModal={handleLogInModal}
          onRegisterModal={handleRegisterModal}
          onAboutUs={handleAboutUs}
        />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/profile">
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile
                onLogOut={handleLogOut}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                onEditProfile={handleEditProfileModal}
                isRecording={isRecording}
                startRecording={startRecording}
                stopRecording={stopRecording}
                oracleResponse={oracleResponse}
                handleCloseModal={handleCloseModal}
                isReadingCompleted={isReadingCompleted}
                setIsReadingCompleted={setIsReadingCompleted}
                isOracleProcessingSTT={isOracleProcessingSTT}
                isOracleProcessingTTS={isOracleProcessingTTS}
                isOraclePlayingAudio={isOraclePlayingAudio}
                isUserTalking={isUserTalking}
                setIsUserTalking={setIsUserTalking}
                oracleReadings={oracleReadings}
                onSavedReading={handleSavedReading}
                onDeleteReading={handleDeleteReading}
                onUpdateReading={handleUpdateReading}
              />
            </ProtectedRoute>
          </Route>
          <Route path="/aboutus">
            {" "}
            <AboutUs />
          </Route>
          <Route path="/terms-and-conditions">
            {" "}
            <TermsAndConditions />
          </Route>
        </Switch>
        <Footer
          onAboutUs={handleAboutUs}
          onTermsAndConditions={handleTermsAndConditions}
        />

        {activeModal === "login-signin" && (
          <LogInModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "login-signin"}
            buttonText={isLoading ? "Logging In..." : "Log In"}
            onSubmit={handleLogInSubmit}
            openRegisterModal={handleRegisterModal}
            inputError={inputError}
          />
        )}
        {activeModal === "register-signup" && (
          <RegisterModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "register-signup"}
            buttonText={isLoading ? "Signing Up..." : "Next"}
            onSubmit={handleRegisterSubmit}
            openLogInModal={handleLogInModal}
          />
        )}
        {activeModal === "edit-profile" && (
          <EditProfileModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "edit-profile"}
            buttonText={isLoading ? "Saving.." : "Save Changes"}
            onSubmit={handleEditProfileSubmit}
          />
        )}
        {activeModal === "welcome" && !isLoggedIn && (
          <WelcomeModal
            isOpen={activeModal === "welcome"}
            buttonText={
              isMicActivated
                ? "Mic is Activated"
                : isLoading
                ? "Activating..."
                : "Activate Mic"
            }
            isMicActivated={isMicActivated}
            isMicActivationPopupVisible={isMicActivationPopupVisible}
            onSubmit={handleMicActivation}
            onLogInModal={handleLogInModal}
            onClose={handleCloseModal}
            onRegisterModal={handleRegisterModal}
            isButtonDisabled={isMicActivated || isLoading}
          />
        )}
        <TinyPopup
          name="mic"
          text="Activate your mic and embrace the celestial journey"
          isVisible={isMicActivationPopupVisible}
          onHide={() => setIsMicActivationPopupVisible(false)}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
