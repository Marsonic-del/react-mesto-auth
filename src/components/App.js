import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup  from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import renderLoading from '../utils/utils';
import Login from './Login';
import Register from './Register';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data)
      })
      .catch((err) => console.log(err));
  }, [])

  // Функция для добавления/удаления лайков
  // Используется при клике на кнопку лайк карточки
  function handleCardLike({likes, _id}) { // Аргументы функции: лайки и id карточки.
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(_id, isLiked)
    .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === _id ? newCard : c));
    })
    .catch((err) => console.log(err));
}
  // Функция для удаления карточки
  // Используется при клике на кнопку удаления карточки
  // Удалять можна только карточки добавленные пользователем 
  function handleCardDelete(idCard) {
    api.removeCard(idCard)
    .then(() => { setCards((cards) => cards.filter(item => {return item._id !== idCard}) )})
    .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({submitButtonRef, ...newPlace}) {
    renderLoading(submitButtonRef, true);
    api.addCard(newPlace)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(submitButtonRef, false)
      })
  }
  

  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data)
      })
      .catch((err) => console.log(err));
  }, [])

  function handleUpdateUser({submitButtonRef, ...userInfo}) {
    renderLoading(submitButtonRef, true);
    api.editProfile(userInfo)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(submitButtonRef, false)
      })
  }

  function handleUpdateAvatar(newAvatar, submitButtonRef) {
    renderLoading(submitButtonRef, true);
    api.editAvatar(newAvatar)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(submitButtonRef, false)
      })
  }

  function handleCardClick (name, link) {
    setSelectedCard({name, link})
    setIsImagePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);  
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true); 
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleClickClose(evt) {
    const evtTarget = evt.target;
    if (evtTarget.classList.contains('popup') || evtTarget.classList.contains('popup__button-close')) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsRemovePopupOpen(false);
    setSelectedCard({});
  }
  return (
    <div className="App">
        <div className="page">
          <Header/>
          <Switch>
            <Route path="/sign-in">
              <div className="loginContainer">
                <Login />
              </div>
            </Route>
            <Route path="/sign-up">
              <div className="registerContainer">
                <Register />
              </div>
            </Route>
            <CurrentUserContext.Provider value={currentUser}>
              <Main onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete} />      
              <Footer/>

            

              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} handleClickClose={handleClickClose} onAddPlace={handleAddPlaceSubmit} />
            
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} handleClickClose={handleClickClose} />

              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} handleClickClose={handleClickClose} />
            

              <PopupWithForm isOpen={isRemovePopupOpen} onClose={closeAllPopups}  handleClickClose={handleClickClose} name="remove" title="Вы уверены?" buttonName="Да" >   
              </PopupWithForm>

              <ImagePopup onClose={closeAllPopups} name="image" isOpen={isImagePopupOpen}  handleClickClose={handleClickClose} card={selectedCard} />
            </CurrentUserContext.Provider>
          </Switch>
        </div>        
    </div>
  );
}

export default App;
