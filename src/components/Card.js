import React from "react";
import buttonLike from "../images/btn-like-active.svg";
import buttonDislike from "../images/btn-like-disabled.svg";
import buttonTrash from "../images/btn-trash.svg";

function Card(card) {
    function handleClick() {
        card.onCardClick(card);
    }
    return (
        <figure className="element">
            {/* изображение карточки*/}
            <img
                className="element__image"
                src={card.link}
                alt={card.name}
                title={card.name}
                onClick={handleClick}
            />
            {/* кнопка удаления карточки */}
            <button
                className="element__btn-trash"
                type="button"
                title="Удалить"
            >
                {/* <img
                    src={buttonTrash}
                    alt="Иконка удаления"
                    // className={}
                /> */}
            </button>
            {/* блок информации карточки */}
            <figcaption className="element__info">
                {/* название карточки */}
                <h2 className="element__caption">{card.name}</h2>
                <div className="element__like-container">
                    {/* кнопка лайк */}
                    <button
                        className="element__btn-like"
                        type="button"
                        title="Нравится"
                    >
                        {/* <img src={buttonDislike} alt="Иконка лайк" /> */}
                    </button>
                    {/* счетчик лайков */}
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </figcaption>
        </figure>
    );
}

export default Card;
