import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';
import '../styles/Header.css';

// Пропсы: стейт-переменная loggedIn, если ее значение true - пользователь авторизирован и наоборот.
// Обьект с пользовательскими данными userInfo, с которого мы берем 
// значение email.
// Через handleExitClick мы передаем функцию handleExit в компоненте App,
// которая задействуется при выходе из системы.
function Header({loggedIn, userInfo, handleExitClick}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип mesto"/>
      <div className="header__box">
        {/*Если пользователь авторизирован, его email отображается в хэдере */}
        {loggedIn && <p className="header__userInfo" >{userInfo.email}</p>} 
        <nav className="menu">
          {/* Если пользователь неавторизирован, ссылка "Войти" отображается на страницы регистрации (компонент Register). На страницы авторизации "/sign-in" срабатывает activeClassName="header__link_hidden" у которого display: none. Следующие ссылки устроены аналогично. */}
          { !loggedIn && <NavLink to="/sign-in" className="header__link" activeClassName="header__link_hidden" >Войти</NavLink> }

          { !loggedIn && <NavLink to="/sign-up" className="header__link" activeClassName="header__link_hidden" >Регистрация</NavLink> }

          { loggedIn && <NavLink to="/sign-in" className="header__link" activeClassName="header__link_hidden" onClick={handleExitClick} style={{color: '#A9A9A9'}} >Выйти</NavLink> }
        </nav>
      </div>
    </header>
  );
}
  
export default Header;