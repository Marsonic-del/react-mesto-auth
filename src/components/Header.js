import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';
import '../styles/Header.css';

function Header({loggedIn, userInfo, handleExitClick}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип mesto"/>
      <div className="header__box">
        {loggedIn && <p className="header__userInfo" >{userInfo.email}</p>} 
        <nav className="menu">
          { !loggedIn && <NavLink to="/sign-in" className="header__link" activeClassName="header__link_hidden" >Войти</NavLink> }

          { !loggedIn && <NavLink to="/sign-up" className="header__link" activeClassName="header__link_hidden" >Регистрация</NavLink> }

          { loggedIn && <NavLink to="/sign-in" className="header__link" activeClassName="header__link_hidden" onClick={handleExitClick} style={{color: '#A9A9A9'}} >Выйти</NavLink> }
        </nav>
      </div>
    </header>
  );
}
  
export default Header;