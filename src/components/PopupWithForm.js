import React from "react";

function PopupWithForm(props) {
    return (
        <div
            className={`popup ${props.popupName} ${
                props.isOpen ? `popup_opened` : ""
            }`}
        >
            <div className="popup__container">
                <form className="popup__form" name={`${props.formName}`}>
                    <h2 className="popup__title">{props.title}</h2>

                    {props.children}

                    <button type="submit" className="popup__btn-save">
                        {props.buttonText || "Сохранить"}
                    </button>
                </form>

                <button
                    className="popup__btn-close"
                    type="button"
                    onClick={props.onClose}
                ></button>
            </div>
        </div>
    );
}

export default PopupWithForm;