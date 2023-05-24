import React from "react";

function Card(card) {
    function handleClick() {
        card.onCardClick(card);
    }
    return (
        <figure className="element">

            <img
                className="element__image"
                src={card.link}
                alt={card.name}
                title={card.name}
                onClick={handleClick}
            />

            <button
                className="element__btn-trash"
                type="button"
                title="Удалить"
            >
            </button>
            <figcaption className="element__info">
    
                <h2 className="element__caption">{card.name}</h2>
                <div className="element__like-container">
   
                    <button
                        className="element__btn-like"
                        type="button"
                        title="Нравится"
                    >
                    </button>
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </figcaption>
        </figure>
    );
}

export default Card;
