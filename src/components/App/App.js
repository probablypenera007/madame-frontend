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
import * as api from "../../utils/Api";
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
      auth.checkToken(jwt)
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
      return auth
        .logIn(data)
        .then((res) => {
          if (res.token) {
            localStorage.setItem("jwt", res.token);
            setIsLoggedIn(true);
            auth.checkToken(res.token)
            .then((user) => {
              setCurrentUser(user.data)
              history.push("/profile");
              handleCloseModal();
            })
            .catch(handleAuthErrors)
            .finally(() => setIsLoading(false));
          }
        }) 
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
    console.log("value of data top of RegisterSubmit app.js: ", data)
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
              <Main
                weatherTemp={temp}
   
              />
            </Route>
            <Route path="/profile">
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  onLogOut={handleLogOut}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  onEditProfile={handleEditProfileModal}
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
