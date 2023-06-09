import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";

function App() {
    /*начальное состояние попапов*/
    const [isEditAvatarPopupOpen, setIsOpenPopupAvatarEdit] =
        React.useState(false);
    const [isEditProfilePopupOpen, setIsOpenPopupFormEdit] =
        React.useState(false);
    const [isAddPlacePopupOpen, setIsOpenPopupFormAdd] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    /*начальное состояние пользователя/карточек*/
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    /*функции изменения состояний попапов*/
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

    /*лайк карточки*/
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        if (!isLiked) {
            api.addCardLike(card._id, !isLiked)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => console.log(err));
        } else {
            api.deleteCardLike(card._id, !isLiked)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => console.log(err));
        }
    }

    /*удаление карточки*/
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
    /*обнвление данных пользователя*/
    function handleUpdateUser(data) {
        api.setUserInfo(data)
            .then((newUser) => {
                setCurrentUser(newUser);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }
    /*обновление аватара*/
    function handleUpdateAvatar(data) {
        api.setProfileAvatar(data)
            .then((newAvatar) => {
                setCurrentUser(newAvatar);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }
    /*добавление новой крточки*/
    function handleAddPlaceSubmit(data) {
        api.addNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }
    /*взятие данных с сервера*/
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
                        <AddPlacePopup
                            isOpen={isAddPlacePopupOpen}
                            onClose={closeAllPopups}
                            onSubmit={handleAddPlaceSubmit}
                        />
                        <EditAvatarPopup
                            isOpen={isEditAvatarPopupOpen}
                            onClose={closeAllPopups}
                            onUpdateAvatar={handleUpdateAvatar}
                        />

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
