import React from 'react';
import { Link } from 'react-router-dom';
import PopupWithForm from './PopupWithForm';
import '../styles/Login.css';

function Login() {
    return(
        <form className="popup__form popup__form_type_auth"  noValidate>
            <h3 className="popup__heading popup__heading_type_auth">Вход</h3>
            <input id="email-input"  type="email" placeholder="Email" className="popup__input popup__input_type_auth" name="email" required minLength="2" maxLength="30"/>
              <span className="popup__error place-input-error"></span>
              <input id="password-input"  type="password" placeholder="Пароль" className="popup__input popup__input_type_auth" name="password" required/>
              <span className="popup__error password-input-error"></span>
            <button type="submit" className="popup__button popup__button_type_auth"  aria-label="Войти">Войти
            </button>
        </form>
    )
}
export default Login;