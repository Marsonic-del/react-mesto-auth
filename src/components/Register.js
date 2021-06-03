import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

// Через пропс onRegister передаем введенные пользователем email
// и пароль функции handleRegister из Арр, через которую управляется процес 
// авторизации
function Register({onRegister}) {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if(email && password) {
            onRegister(password,email)
        }
    }
    const handleDataChange = (e) => {
        const target = e.target;
        target.name === "email" ? setEmail(target.value) : setPassword(target.value)
    }
    return(
        <form className="popup__form popup__form_type_auth" onSubmit={handleSubmit}  noValidate>
            <h3 className="popup__heading popup__heading_type_auth">Регистрация</h3>
            <input id="email-input"  type="email" value={email} onChange={handleDataChange} placeholder="Email" className="popup__input popup__input_type_auth" name="email" required minLength="2" maxLength="30"/>
            <span className="popup__error place-input-error"></span>
            <input id="password-input"  type="password" value={password} onChange={handleDataChange} name="password" placeholder="Пароль" className="popup__input popup__input_type_auth" name="password" required/>
            <span className="popup__error password-input-error"></span>
            <button type="submit" className="popup__button popup__button_type_auth"  aria-label="Войти">Зарегистрироваться
            </button>
            <Link to='/sign-in' className='register__link'>Уже зарегистрированы? Войти</Link>
        </form>
    )
}
export default Register;