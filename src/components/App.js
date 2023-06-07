import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";

function App() {
    const [isEditAvatarPopupOpen, setIsOpenPopupAvatarEdit] =
        React.useState(false);
    const [isEditProfilePopupOpen, setIsOpenPopupFormEdit] =
        React.useState(false);
    const [isAddPlacePopupOpen, setIsOpenPopupFormAdd] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.addCardLike(card._id, !isLiked).then((newCard) => {
            setCards((state) =>
                state.map((c) => (c._id === card._id ? newCard : c))
            );
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then((newCard) => {
                const newCards = cards.filter((c) =>
                    c._id === card._id ? "" : newCard
                );
                setCards(newCards);
            })
            .catch((err) => console.log(err));
    }
    function openPopupAvatarEdit() {
        setIsOpenPopupAvatarEdit(true);
    }

    function handleEditProfileClick() {
        setIsOpenPopupFormEdit(true);
    }

    function openPopupFormAdd() {
        setIsOpenPopupFormAdd(true);
    }

    function openPopupViewer(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsOpenPopupAvatarEdit(false);
        setIsOpenPopupFormEdit(false);
        setIsOpenPopupFormAdd(false);
        setSelectedCard(false);
    }

    function handleUpdateUser(data) {
        api.setUserInfo(data)
            .then((newUser) => {
                setCurrentUser(newUser);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
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
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <div className="page">
                    <div className="page__container">
                        <Header />
                        <Main
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            cards={cards}
                            onEditAvatar={openPopupAvatarEdit}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={openPopupFormAdd}
                            onCardClick={openPopupViewer}
                        />
                        <Footer />

                        <PopupWithForm
                            popupName="popup_form_add"
                            isOpen={isAddPlacePopupOpen}
                            formName="placeData"
                            onClose={closeAllPopups}
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
                        {/* <PopupWithForm
                            popupName="popup_form_edit"
                            isOpen={isEditProfilePopupOpen}
                            formName="profileData"
                            onClose={closeAllPopups}
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
                        </PopupWithForm> */}
                        <PopupWithForm
                            popupName="popup_form_avatar"
                            isOpen={isEditAvatarPopupOpen}
                            formName="placeData"
                            onClose={closeAllPopups}
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
                        <EditProfilePopup
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser}
                        />
                        <ImagePopup
                            isOpen={selectedCard}
                            card={selectedCard}
                            onClose={closeAllPopups}
                        />
                    </div>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
