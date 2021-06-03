import React from 'react';
import imageSucces from '../images/Union.svg';
import errorImage from '../images/errorImage.svg';
import '../styles/InfoTooltip.css';

// Через пропс isRegError передаем из Арр значение стейта isRegErrorPopupOpen,
// ели ее значение true - ответ сервера сообщил об ошибке и наоборот.
// handleClickClose передает одноименную функцию из Арр для закрытия попапов.
function InfoTooltip({isOpen, handleClickClose, isRegError}) {
    return(
        <section className={`popup popup_type_infoToolPopup ${isOpen && "popup_opened"} `} onClick={handleClickClose} >
           <form className="popup__form popup__form_infoToolPopup" >
           <button type="button" className="popup__button-close"  aria-label="Закрыть попап"></button>
           <div className="infoTooltip__messageBox">
            <img className="infoTooltip__picture" alt="Результат запроса" src={isRegError ? errorImage : imageSucces} />
            <p className="infoTooltip__message">{isRegError ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"}</p>
           </div>
            </form>
        </section>
    )
}
export default InfoTooltip;