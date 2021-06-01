import React from 'react';
import { Link } from 'react-router-dom';
import PopupWithForm from './PopupWithForm';
//import './styles/Register.css';

function Register() {
    return(
        <PopupWithForm  >
              <input id="name-input"  type="text" placeholder="Имя" className="popup__input popup__input_type_name" name="name" required minLength="2"  maxLength="40"/>
              <span className="popup__error name-input-error"></span>
              <input id="about-input" type="text" placeholder="О себе" className="popup__input popup__input_type_about" name="about" required minLength="2" maxLength="200"/>
              <span className="popup__error about-input-error"></span>
        </PopupWithForm>
    )
}
export default Register;