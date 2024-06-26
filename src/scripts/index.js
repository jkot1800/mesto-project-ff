import "../pages/index.css";
import { initialCards } from "./components/cards.js";
import { createNewCard, deleteCard, addLikeButton } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupOverlay,
  allPopups,
} from "./components/modal.js";

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  cardList.append(createNewCard(item, deleteCard, imageModal, addLikeButton));
});
// Анимация всех попапов (навешивание класса .popup_is-animated на все попапы при открытии страницы)
allPopups.forEach(function (item) {
  item.classList.add("popup_is-animated");
});

// ПОПАП ОКНО ПРОФАЙЛА
const profileButoon = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");

//функция открытия попапа на профайле
profileButoon.addEventListener("click", function () {
  openPopup(profilePopup);
});

// ИЗМЕНЕНИЕ СТРАНИЦЫ ЧЕРЕЗ ПОПАП (ФОРМА РЕДАКТИРОВАНИЯ ДАННЫХ О ПОЛЬЗОВАТЕЛЕ)
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function profileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}
profileForm.addEventListener("submit", profileFormSubmit);
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
  cardList.prepend(
    createNewCard(cardObj, deleteCard, imageModal, addLikeButton)
  );
  closePopup(addModal);
  newPlaceCardForm.reset();
}
newPlaceCardForm.addEventListener("submit", createNewCardItem);
//КОНЕЦ КОДА ПОПАПА ДОБАВЛЕНИЯ ИЗОБРАЖЕНИЯ НА БОЛЬШОЙ ПЛЮС

// Dom елементы модального окна карточки изображения
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupImageSubtitle = imagePopup.querySelector(".popup__caption");

// функция открытия модального окна карточки изображения
function imageModal(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupImageSubtitle.textContent = item.name;

  openPopup(imagePopup);
}

//ЗАКРЫТИЕ ПОПАПОВ КЛИКОМ НА ОВЕРЛЕЙ И НА КРЕСТИК
allPopups.forEach(function (item) {
  const popupCrost = item.querySelector(".popup__close");
  popupCrost.addEventListener("click", function () {
    if (item.classList.contains("popup_type_edit")) {
      closePopup(item);
      profileForm.reset();
    } else {
      closePopup(item);
    }
  });
  item.addEventListener("click", closePopupOverlay);
});
