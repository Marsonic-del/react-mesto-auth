import React, {useState} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, handleClickClose, onAddPlace}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const handlePlaceChange = (e) => {
        const target = e.target;
        target.type === "url" ? setLink(target.value) : setName(target.value)
    };
    const handleSubmit = (submitButtonRef) => {
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
            name,
            link,
            submitButtonRef,
        });
       setName('');
        setLink('');
    }

    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose}  handleClickClose={handleClickClose} onSubmit={handleSubmit} name="add-card" title="Новое место" buttonName="Сохранить" >
              <input id="place-input" value={name} onChange={handlePlaceChange} type="text" placeholder="Название" className="popup__input popup__input_type_name" name="name" required minLength="2" maxLength="30"/>
              <span className="popup__error place-input-error"></span>
              <input id="url-input" value={link} onChange={handlePlaceChange} type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" name="link" required/>
              <span className="popup__error url-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup