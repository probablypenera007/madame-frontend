import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import LogInModal from "../LogInModal/LogInModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  Switch,
  Route,
  useHistory,
} from "react-router-dom/cjs/react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as ai from "../../utils/OracleApi"
import * as auth from "../../utils/Auth";
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [weatherLocation, setWeatherLocation] = useState("");
  const [currentTemperatureUnit, setCurrentTempUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [inputError, setInputError] = useState("");
// testing useState for  Oracle API
  const [oracleResponse, setOracleResponse] = useState("");
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);


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

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then((data) => {
        handleCloseModal();
        return data;
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  // -------------------------
  //         USERS
  // -------------------------

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res.data);
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
            history.push("/profile");
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
    history.push("/");
  };

  const handleRegisterModal = () => {
    setActiveModal("register-signup");
  };

  const handleRegisterSubmit = (data) => {
    console.log("value of data top of RegisterSubmit app.js: ", data);
    setIsLoading(true);
    return auth
      .register(data)
      .then((res) => {
        console.log("registration response in registersubmit: ", res);
        handleLogInSubmit(data);
        history.push("/profile");
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

  // -------------------------
  //      MADAME ORACLE 
  // -------------------------
  useEffect(() => {
    // Check if MediaRecorder API is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("MediaRecorder API is not available.");
      return;
    }

    // Request microphone access
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("Microphone access granted");
        const mediaRecorder = new MediaRecorder(stream);
        console.log("MediaRecorder created:", mediaRecorder);
        setMediaRecorder(mediaRecorder);

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setAudioChunks([...audioChunks, event.data]);
          }
        };
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  }, [audioChunks]);

  const startRecording = () => {
    setAudioChunks([]);
    if (mediaRecorder) {
      console.log("Starting recording...");
      mediaRecorder.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      console.log("Stopping recording...");
      mediaRecorder.stop();
      setRecording(false);
    } else {
      console.error("MediaRecorder is not available.");
      console.error("MediaRecorder is not recording.");
    }
  };


  const handleOracleRequest = () => {
    console.log("Oracle is requesting...");
    if (audioChunks.length === 0) {
      console.error("No audio recorded.");
      return;
    }
  
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
  
    const formData = new FormData();
    formData.append("file", audioBlob);
  
    ai
      .sendAudioToOracle({ audioFile: formData })
      .then((res) => {
        console.log("Oracle received a response:", res);
        const transcription = res.transcription;
        return ai.getMadameOracleResponse({ transcription });
      })
      .then((aiResponse) => {
        console.log("Oracle Response:", aiResponse.res);
        setOracleResponse(aiResponse.res);
        return ai.getTextFromOracleToAudio({ text: aiResponse.res });
      })
      .then((audioFile) => {
        const audioBlob = new Blob([audioFile], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      })
      .catch(err => console.error("Madmae Oracle Error: ",err));
  };

  // USER'S MIC INPUT  REQUEST TO AI
  // INPUT GETS PROCESSED BY AI MODEL
  // AI MODEL RETURNS RESPONSE AS AUDIO

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="bg__galaxy"></div>
      <div className="page">
        {/* <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }} WILL UPDATE THIS TO LIGHT MODE AND DARK MODE
        > */}
        <Header
          weatherLocation={weatherLocation}
          temp={temp}
          isLoggedIn={isLoggedIn}
          onLogInModal={handleLogInModal}
          onRegisterModal={handleRegisterModal}
        />
        <Switch>
          <Route exact path="/">
            <Main weatherTemp={temp} />
          </Route>
          <Route path="/profile">
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile
                onLogOut={handleLogOut}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                onEditProfile={handleEditProfileModal}
                oracleResponse={oracleResponse}
                recording={recording}
                handleOracleRequest={handleOracleRequest}
                startRecording={startRecording}
                stopRecording={stopRecording}
              />
            </ProtectedRoute>
          </Route>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={handleAddItemSubmit}
            buttonText={isLoading ? "Saving..." : "Add Garment"}
            handleSubmit={handleSubmit}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            onDeleteCard={handleDeleteCard}
            buttonText={isLoading ? "Removing..." : "Delete Item"}
          />
        )}
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
        {/* </CurrentTemperatureUnitContext.Provider> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
