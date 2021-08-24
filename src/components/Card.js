import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({ name, link, likes, _id, owner, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
const isOwn = owner === currentUser.data._id;

// Создаём переменную, которую после зададим в `className` для кнопки удаления
const cardDeleteButtonClassName = (
  `element__trash ${isOwn && 'element__trash_visible'}`
);

// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = likes.some(like => like === currentUser.data._id);
console.log('currentUser',currentUser)
// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = (`element__button-like ${ isLiked && 'element__button-like_active'}`);

  function handleClick() {
    onCardClick(name, link);
  }

  function handleLikeClick() {
    onCardLike({name, link, likes, _id})
  }

  function handleDeleteClick() {
    onCardDelete(_id)
  }

    return (
        <li className="elements-list__item" >
            <article className="element">
              <button  className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"  aria-label="Удалить"></button>
              <img className="element__picture" onClick={handleClick} src={link}  alt={name}  />
              <div className="element__description">
                <h2 className="element__name">{name}</h2>
                <div className="element__likes">
                  <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} aria-label="Кнопка нравится"></button>
                  <p className="element__likes-number">{likes.length}</p>
                </div>
              </div>
            </article>
          </li>
    )
}

export default Card;