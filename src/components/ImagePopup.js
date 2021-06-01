import React from 'react';

function ImagePopup ({ name, onClose, isOpen, handleClickClose, card }) {

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

    return (
      <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`} onClick={handleClickClose}>
        <div className="popup__container">
          <img className="popup__picture"  alt={card.name} src={card.link} />
          <p className="popup__caption">{card.name}</p>
          <button type="button" onClick={onClose} className="popup__button-close" aria-label="Закрыть попап" ></button>
        </div>
      </section>
    )
}

export default ImagePopup;