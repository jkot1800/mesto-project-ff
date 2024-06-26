import "../pages/index.css";
import { initialCards } from "./components/cards.js";
import { createNewCard, deleteCard, addLikeButton } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupOverlay,
  removePopupEsc,
  allPopups,
} from "./components/modal.js";

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  cardList.append(createNewCard(item, deleteCard, imageModal, addLikeButton));
});

// ПОПАП ОКНО ПРОФАЙЛА
const profileButoon = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");

//функция открытия попапа на профайле
profileButoon.addEventListener("click", function () {
  openPopup(profilePopup);
});

// ИЗМЕНЕНИЕ СТРАНИЦЫ ЧЕРЕЗ ПОПАП (ФОРМА РЕДАКТИРОВАНИЯ ДАННЫХ О ПОЛЬЗОВАТЕЛЕ)
const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  closePopup(profilePopup);
}
formElement.addEventListener("submit", handleFormSubmit);
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
function newCardItem(evt) {
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
newPlaceCardForm.addEventListener("submit", newCardItem);
//КОНЕЦ КОДА ПОПАПА ДОБАВЛЕНИЯ ИЗОБРАЖЕНИЯ НА БОЛЬШОЙ ПЛЮС

// функция открытия модального окна карточки изображения
function imageModal(item) {
  const imagePopup = document.querySelector(".popup_type_image");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupImageSubtitle = imagePopup.querySelector(".popup__caption");

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
      item.classList.add("popup_is-animated");
      closePopup(item);
      formElement.reset();
    } else {
      item.classList.add("popup_is-animated");
      closePopup(item);
    }
  });
  item.addEventListener("click", closePopupOverlay);
});

//СЛУШАТЕЛЬ ЗАКРЫТИЯ ПОПАПОВ ФОРМ клавишей ESC
document.addEventListener("keydown", removePopupEsc);
