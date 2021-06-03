import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isRegPopupOpen, setIsRegPopupOpen] = useState(false);
  const [isRegErrorPopupOpen, setIsRegErrorPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({_id: '', email: '', });
  const history = useHistory();

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
    setIsRegPopupOpen(false);
    setIsRegErrorPopupOpen(false)
    setSelectedCard({});
  }

      /* ------  Функции и хуки проектной работы №12 ------- */

// Функция регистрации пользователя. Если ответ сервера успешный,
// перенаправляем пользователя на страницу авторизации(компонент Login).
// В противном случае показываем попап с ошибкой.
// Пробрасывается в компонент Register через пропс onRegister. 
  function handleRegister(password,email) {
    console.log(password,email )
    auth.register(password,email)
      .then((res) => {
        if(res) {
          setIsRegPopupOpen(true)
          history.push("/sign-in")
        }
      })
      .catch(() => {setIsRegPopupOpen(true);
        setIsRegErrorPopupOpen(true)})
  }

  // Функция авторизации пользователя. Если ответ сервера успешный,
  // устанавливаем в userInfo введенный нами email, переменную стейта 
  // loggedIn в true (теперь пользователь авторизованный), через хук
  // useEffect c зависимостю [loggedIn] направляем пользователя на 
  // главную страницу (компонент Main, url= '/').
  function handleAuthorize(password,email) {
    auth.authorize(password,email)
      .then((data) => {
        if(data.token) {
          localStorage.setItem('jwt', data.token);
          setUserInfo({email,})
          setLoggedIn(true)
        }
      })
      // Если ответ сервера показывает ошибку,
      // выводим попап с ошибкой.
      .catch(() => {setIsRegPopupOpen(true);
        setIsRegErrorPopupOpen(true)})
  }

  // Функция проверяет наличие сохраненного токена в localStorage.
  // Если он там есть, отправляем его на проверку на сервер.
  // В случае упешной проверки устанавливаем полученные в ответе сервера
  // данные пользователя в userInfo, стейт loggedIn в true, напрявляем
  // ползователя еа главную страницу
  function checkToken() {
    if(localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.getContent(jwt)
        .then((res) => {
          if(res) {
            setUserInfo({
              _id: res.data._id,
              email: res.data.email,
            })
            setLoggedIn(true);
          }
        })
        // В случае не соответствия токена перенаправляем пользователя
        // на страницу авторизации (компонент Login).
        .catch(() => history.push('/sign-in'))
    }
  }

  // При нажатии на ссылку "Выйти" в шапке сайта сбрасываем loggedIn в false,
  // удаляем токен с localStorage, сбрасываем данные пользователя в userInfo,
  // перенаправляем его на страницу авторизации (компонент Login).
  function handleExit() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setUserInfo({email: '', _id: '',});
    history.push('/sign-in');
  }

  // Используем этот хук для проверки токена при загрузке страницы.
  // Если токен "правильный" переходим происходит автоматическая авторизация.
  useEffect(() => {checkToken()}, []);

  // Используем этот хук чтобы не писать  history.push('/') в функциях
  // handleAuthorize и checkToken.
  useEffect(() => {
    if(loggedIn) {
      history.push('/')
    }
  }, [loggedIn])
 
    /* ----------------------------------------------------------*/

  return (
    <div className="App">
        <div className="page">
          <Header loggedIn={loggedIn} userInfo={userInfo} handleExitClick={handleExit} />
          <Switch>
            <CurrentUserContext.Provider value={currentUser}>
              <ProtectedRoute
                path="/"
                loggedIn={loggedIn}
                component={Main}
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Route path="/sign-in">
                <Login onAuthorize={handleAuthorize} />
              </Route>
              <Route path="/sign-up">
                <Register onRegister={handleRegister} />
              </Route>
                 
                <Footer/>

                <InfoTooltip isOpen={isRegPopupOpen} handleClickClose={handleClickClose} isRegError={isRegErrorPopupOpen} />

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
