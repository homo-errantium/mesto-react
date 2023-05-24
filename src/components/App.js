/* eslint-disable no-undef */
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";

function App() {
    const [isEditAvatarPopupOpen, setIsOpenPopupAvatarEdit] =
        React.useState(false);
    const [isEditProfilePopupOpen, setIsOpenPopupFormEdit] =
        React.useState(false);
    const [isAddPlacePopupOpen, setIsOpenPopupFormAdd] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});

    function openPopupAvatarEdit() {
        setIsOpenPopupAvatarEdit(true);
    }

    function openPopupFormEdit() {
        setIsOpenPopupFormEdit(true);
    }

    function openPopupFormAdd() {
        setIsOpenPopupFormAdd(true);
    }

    function openPopupViewer() {
        setSelectedCard(true);
    }

    function closeAllPopups() {
        setIsOpenPopupAvatarEdit(false);
        setIsOpenPopupFormEdit(false);
        setIsOpenPopupFormAdd(false);
        setSelectedCard({});
    }

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCurrentUser(user);
                setCards(cards);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="root">
            <div className="page">
                <div className="page__container">
                    <Header />
                    <Main
                        user={currentUser}
                        cards={cards}
                        onEditAvatar={openPopupAvatarEdit}
                        onEditProfile={openPopupFormEdit}
                        onAddPlace={openPopupFormAdd}
                        onCardClick={openPopupViewer}
                    />
                    <Footer />
                    <PopupWithForm />
                    <PopupWithForm
                        popupName="popup_form_add"
                        isOpen={isAddPlacePopupOpen}
                        formName="placeData"
                        onClose={closeAllPopups}
                        // onSubmit={handleAddPlaceSubmit}
                        title="Новое место"
                        buttonText="Создать"
                    >
                        <fieldset className="popup__fieldset">
                            <input
                                className="popup__input"
                                id="place-name"
                                type="text"
                                name="name"
                                placeholder="Название"
                                minLength="2"
                                maxLength="30"
                                required
                            />
                            <span className="popup__input-error place-name-error"></span>
                            <input
                                className="popup__input"
                                id="place-link"
                                type="url"
                                name="url"
                                placeholder="Ссылка на картинку"
                                required
                            />
                            <span className="popup__input-error place-link-error"></span>
                        </fieldset>
                    </PopupWithForm>
                    <PopupWithForm
                        popupName="popup_form_edit"
                        isOpen={isEditProfilePopupOpen}
                        formName="profileData"
                        onClose={closeAllPopups}
                        // onSubmit={handleEditProfileSubmit}
                        title="Редактировать профиль"
                        buttonText="Сохранить"
                    >
                        <fieldset className="popup__fieldset">
                            <input
                                className="popup__input"
                                id="name"
                                type="text"
                                name="title"
                                placeholder="Имя"
                                minLength="2"
                                maxLength="40"
                                required
                            />
                            <span className="popup__input-error name-error"></span>
                            <input
                                className="popup__input"
                                id="description"
                                type="url"
                                name="subtitle"
                                placeholder="О себе"
                                required
                                minLength="2"
                                maxLength="200"
                            />
                            <span className="popup__input-error description-error"></span>
                        </fieldset>
                    </PopupWithForm>
                    <PopupWithForm
                        popupName="popup_form_avatar"
                        isOpen={isEditAvatarPopupOpen}
                        formName="placeData"
                        onClose={closeAllPopups}
                        // onSubmit={handleEditProfileSubmit}
                        title="Обновить аватар"
                        buttonText="Сохранить"
                    >
                        <fieldset className="popup__fieldset">
                            <input
                                className="popup__input"
                                id="avatar"
                                type="url"
                                name="url"
                                placeholder="Ссылка на аватар"
                                minLength="2"
                                maxLength="40"
                                required
                            />
                            <span className="popup__input-error avatar-error"></span>
                        </fieldset>
                    </PopupWithForm>

                    <ImagePopup
                        isOpen={selectedCard}
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
