import "../pages/index.css";
import { createNewCard, deleteCard, addLikeButton } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupOverlay,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUser,
  getCards,
  sendUser,
  sendCard,
  deleteCardFromServer,
  updateAvatar,
} from "./components/api.js";

//Массив всех попапов
const allPopups = document.querySelectorAll(".popup");

//Объект с классами форм валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// Анимация всех попапов (навешивание класса .popup_is-animated на все попапы при открытии страницы)
allPopups.forEach(function (item) {
  item.classList.add("popup_is-animated");
});

// ПОПАП ОКНО ПРОФАЙЛА
const profileButoon = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");

//функция открытия попапа на профайле
profileButoon.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profilePopup);
  //функция сброса ошибок валидации при открытии формы
  clearValidation(profileForm, validationConfig);
});

// ИЗМЕНЕНИЕ СТРАНИЦЫ ЧЕРЕЗ ПОПАП (ФОРМА РЕДАКТИРОВАНИЯ ДАННЫХ О ПОЛЬЗОВАТЕЛЕ)
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function submitProfileForm(evt) {
  evt.preventDefault();

  const formButton = evt.submitter;
  const defaultTextButton = formButton.textContent;

  formButton.textContent = "Сохранение...";
  //Передача данных пользователя на сервер
  sendUser(nameInput.value, jobInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formButton.textContent = defaultTextButton;
    });
}
profileForm.addEventListener("submit", submitProfileForm);
//КОНЕЦ КОДА ПОПАПА ОКНА ПРОФАЙЛА

//ПОПАП ДОБАВЛЕНИЯ ИЗОБРАЖЕНИЯ НА БОЛЬШОЙ ПЛЮС
const addButton = document.querySelector(".profile__add-button");
const addModal = document.querySelector(".popup_type_new-card");
//Открытие попапа добавления изображения
addButton.addEventListener("click", function () {
  openPopup(addModal);
});
// Добавление изображения на страницу с помошью попапа
const newPlaceCardForm = document.forms["new-place"];
const placeNameInput = newPlaceCardForm.elements["place-name"];
const placeUrlInput = newPlaceCardForm.elements.link;
function createNewCardItem(evt) {
  evt.preventDefault();
  const cardObj = {};
  cardObj.name = placeNameInput.value;
  cardObj.link = placeUrlInput.value;

  const formButton = evt.submitter;
  const defaultTextButton = formButton.textContent;

  formButton.textContent = "Сохранение...";
  sendCard(cardObj.name, cardObj.link)
    .then((result) => {
      cardList.prepend(
        createNewCard(
          result,
          deleteCard,
          openImageModal,
          addLikeButton,
          result.owner,
          deleteCardFromServer
        )
      );
      closePopup(addModal);
      newPlaceCardForm.reset();
      clearValidation(addModal, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formButton.textContent = defaultTextButton;
    });
}

newPlaceCardForm.addEventListener("submit", createNewCardItem);

//КОНЕЦ КОДА ПОПАПА ДОБАВЛЕНИЯ ИЗОБРАЖЕНИЯ НА БОЛЬШОЙ ПЛЮС

// Dom елементы модального окна карточки изображения
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupImageSubtitle = imagePopup.querySelector(".popup__caption");

// функция открытия модального окна карточки изображения
function openImageModal(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupImageSubtitle.textContent = item.name;

  openPopup(imagePopup);
}

//ЗАКРЫТИЕ ПОПАПОВ КЛИКОМ НА ОВЕРЛЕЙ И НА КРЕСТИК
allPopups.forEach(function (item) {
  const popupCrost = item.querySelector(".popup__close");
  popupCrost.addEventListener("click", function () {
    closePopup(item);
  });
  item.addEventListener("click", closePopupOverlay);
});
//КОД ПОПАПА РЕДАКТИРОВАНИЯ АВАТАРА ПРОФИЛЯ
//Открытие попапа окна изменения изображения профиля
const popupAvatar = document.querySelector(".popup_type_avatar");
const profileAvatar = document.querySelector(".profile__image");
const avatarForm = document.forms["avatar-form"];
const avatarInputUrl = avatarForm.elements.link;
const avatarSubmitButton = avatarForm.querySelector(".popup__button");
profileAvatar.addEventListener("click", function () {
  openPopup(popupAvatar);
  clearValidation(avatarForm, validationConfig);
});

avatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const formButton = evt.submitter;
  const defaultTextButton = formButton.textContent;
  formButton.textContent = "Сохранение...";
  updateAvatar(avatarInputUrl.value)
    .then((result) => {
      profileAvatar.style.backgroundImage = `url(${result.avatar})`;
      closePopup(popupAvatar);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formButton.textContent = defaultTextButton;
    });
});
//КОНЕЦ КОДА ПОПАПА РЕДАКТИРОВАНИЯ АВАТАРА ПРОФИЛЯ

// Запуск валидации форм
enableValidation(validationConfig);

// Получение и вывод данных с сервера
Promise.all([getCards(), getUser()])
  .then(([cards, userData]) => {
    //профиль
    const profileImage = document.querySelector(".profile__image");
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    //вывод карточек
    cards.forEach(function (item) {
      cardList.append(
        createNewCard(
          item,
          deleteCard,
          openImageModal,
          addLikeButton,
          userData,
          deleteCardFromServer
        )
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
