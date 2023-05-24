import React from "react";
import api from "../utils/Api";
import editAvatar from "../images/btn-edit-avatar.svg";
import Card from "./Card";

function Main(props) {
    return (
        <main className="content">
            <section className="profile">
                <img
                    className="profile__avatar"
                    src={props.user.avatar}
                    alt={props.user.name}
                />
                <button
                    className="profile__avatar-edit"
                    type="button"
                    title="Обновить аватар"
                    onClick={props.onEditAvatar}
                ></button>
                <div className="profile__info">
                    <h1 className="profile__name">{props.user.name}</h1>
                    <button
                        className="profile__btn-edit"
                        type="button"
                        title="Редактировать профиль"
                        onClick={props.onEditProfile}
                    ></button>
                    <p className="profile__about">{props.user.about}</p>
                </div>
                <button
                    className="profile__btn-add"
                    type="button"
                    title="Добавить новую фотографию"
                    onClick={props.onAddPlace}
                ></button>
            </section>

            <section className="elements">
                {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        {...card}
                        onCardClick={props.onCardClick}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;
