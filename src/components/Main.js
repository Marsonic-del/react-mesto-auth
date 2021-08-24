import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards,
  onCardLike, onCardDelete }) {
  //Подписка на контекст, через который получаем данные пользователя
  // (методом api.getUserInfo() в компоненте App)
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
  <main className="main">
    <section className="profile">
      <div className="profile__avatar-container" >
        <img className="profile__avatar" src={currentUser.data.avatar}  alt={currentUser.data.name}/>
        <button className="profile__avatar-button" onClick={onEditAvatar} type="button" aria-label="Кнопка редактирования"></button>
      </div>
      <div className="profile__info">
        <div className="profile__wrapper">
          <h1 className="profile__heading">{currentUser.data.name}</h1>
          <button className="profile__edit-button" onClick={onEditProfile} type="button" aria-label="Кнопка редактирования"></button>
        </div>
        <p className="profile__heading-description">{currentUser.data.about}</p>
      </div>
      <button className="profile__add-button" onClick={onAddPlace} type="button" aria-label="Кнопка добавить"></button>
    </section>
    <section className="elements">
      <ul className="elements-list">
       {cards.map((card) => { return (<Card key={card._id} {...card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)})}
      </ul>
    </section>
  </main>
  );
}
  
export default Main;