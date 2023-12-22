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
import {
  getForecastWeather,
  parseWeatherData,
  parseLocationData,
  parseWeatherForecastData,
  parseTimeOfDay,
} from "../../utils/weatherApi";
//import getForecastWeather from "../../utils/weatherApi";
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
  const [weatherForecast, setWeatherForecast] = useState("");
  const [isDay, setIsDay] = useState(true);
  const [currentTemperatureUnit, setCurrentTempUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
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
  // CLOTHING ITEMS
  // -------------------------

  useEffect(() => {
    // if (isLoggedIn) {
      api
        .getItems()
        .then((res) => {
          if (Array.isArray(res.data)) {
            setClothingItems(res.data);
          } else {
            console.error("Data received is not an array:", res.data);
          }
        })
        .catch(console.error);
  }, []);

  // useEffect(() => {
  //   console.log("Updated clothingItems:", clothingItems);
  // }, [clothingItems]);
  

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItemSubmit = (newItem) => {
    const token = localStorage.getItem("jwt");

    function requestAddItem() {
        return api.addItem(newItem, token).then((res) => {
            if (res && res.data) {
                setClothingItems(previousItems => [res.data, ...previousItems]);
            }
        });
    }

    handleSubmit(requestAddItem);
};

  const handleDeleteCard = (card) => {
    function requestDeleteItem() {
      return api.deleteItem(card._id).then(() => {
        const updatedItems = clothingItems.filter(
          (item) => item._id !== card._id
        );
        setClothingItems(updatedItems);
      });
    }
    handleSubmit(requestDeleteItem);
  };

  const handleLikeClick = ({ id, isLiked }) => {
    const jwt = localStorage.getItem("jwt");
    !isLiked
      ? 
        api
          .addCardLike(id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) => {
              return cards.map((c) => (c._id === id ? updatedCard.data : c));
            });
          })
          .catch((err) => console.log(err))
      :
        api
          .removeCardLike(id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) => {
              return cards.map((c) => (c._id === id ? updatedCard.data : c));
            });
          })
          .catch((err) => console.log(err));
  };

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

  // -------------------------
  //     WEATHER - RELATED
  // -------------------------

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTempUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTempUnit("C");
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        const location = parseLocationData(data);
        setWeatherLocation(location);
        const weatherForecast = parseWeatherForecastData(data);
        setWeatherForecast(weatherForecast);
        const isDay = parseTimeOfDay(data);
        setIsDay(isDay);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            weatherLocation={weatherLocation}
            onCreateModal={handleCreateModal}
            temp={temp}
            isLoggedIn={isLoggedIn}
            onLogInModal={handleLogInModal}
            onRegisterModal={handleRegisterModal}
          />
          <Switch>
            <Route exact path="/">
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                isDay={isDay}
                weatherForecast={weatherForecast}
                clothingItems={clothingItems}
                onLikeClick={handleLikeClick}
              />
            </Route>
            <Route path="/profile">
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  clothingItems={clothingItems}
                  onSelectCard={handleSelectedCard}
                  onCreateModal={handleCreateModal}
                  onLogOut={handleLogOut}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  onEditProfile={handleEditProfileModal}
                  onLikeClick={handleLikeClick}
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
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
