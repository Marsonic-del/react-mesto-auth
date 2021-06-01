import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, handleClickClose}) {
    const avatarInput = React.useRef();
    const handleSubmit = (submitButtonRef) => {
        onUpdateAvatar(avatarInput.current.value, submitButtonRef);
        avatarInput.current.value = '';
    }

    return(
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}  handleClickClose={handleClickClose} name="avatar" title="Обновить аватар" buttonName="Сохранить" >
              <input id="avatar-url-input" ref={avatarInput} type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" name="link" required/>
              <span className="popup__error avatar-url-input-error url-input-error url-input-error-avatar"></span>
        </PopupWithForm>
    )
}
export default EditAvatarPopup