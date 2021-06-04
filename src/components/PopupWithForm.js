import React from 'react';

function PopupWithForm({name, title, isOpen, onClose, buttonName, handleClickClose, onSubmit, children}) {
    const submitButtonRef = React.useRef();
    function handleFormSubmit(e) {
      e.preventDefault();
      onSubmit(submitButtonRef.current)
    }

    React.useEffect(() => {
        if (!isOpen) return;
        const handleEscapeClose = (event) => {
          if (event.key === 'Escape') {
            onClose();
          }
        };
        document.addEventListener("keydown", handleEscapeClose);
        return () => {
          document.removeEventListener("keydown", handleEscapeClose);
        };
      }, [isOpen, onClose]);

    return(
        <section className={`popup popup_type_${name} ${isOpen && "popup_opened"} `} onClick={handleClickClose} >
           <form className="popup__form" onSubmit={handleFormSubmit} name={name} >
              <button type="button" className="popup__button-close" onClick={onClose} aria-label="Закрыть попап"></button>
              <h3 className="popup__heading">{title}</h3>
              {children}
              <button type="submit" ref={submitButtonRef} className="popup__button"  aria-label={buttonName}>
              {buttonName}
              </button>
            </form>
        </section>
    )
}
export default PopupWithForm