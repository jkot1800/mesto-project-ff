import "../pages/index.css";
import { initialCards } from "./components/cards.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createNewCard(item, deleteCard) {
  const cardListItem = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardListItem.querySelector(".card__delete-button");
  const cardImage = cardListItem.querySelector(".card__image");
  cardImage.src = item.link;
  cardImage.alt = item.name;


  // Добавление попапа для открытия изображения в функции создания карточки
  const imagePopup = document.querySelector(".popup_type_image");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupImageSubtitle = imagePopup.querySelector(".popup__caption");
  cardImage.addEventListener("click", function () {
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupImageSubtitle.textContent = item.name;
    openPopup(imagePopup);
  });


  // Закрытие попапа изображения кликом на крестик
  const ImagePopupCrost = imagePopup.querySelector(".popup__close");
  ImagePopupCrost.addEventListener("click", function () {
    closePopup(imagePopup);
  });
  ImagePopupCrost.removeEventListener("click", function () {
    closePopup(imagePopup);
  });
  // Закрытие попапа изображения кликом на оверлей
  imagePopup.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(imagePopup);
    }
  });

  // Закрытие попапа изображения кликом на ESC
  function closeImagePopupEsc(evt) {
    if (evt.key === "Escape") {
      if (imagePopup.classList.contains("popup_is-opened")) {
        closePopup(imagePopup);
      }
      evt.target.removeEventListener("keydown", closeImagePopupEsc);
    }
  }
  document.addEventListener("keydown", closeImagePopupEsc);

  cardListItem.querySelector(".card__title").textContent = item.name;

  deleteButton.addEventListener("click", deleteCard);

  return cardListItem;
}
// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  cardList.append(createNewCard(item, deleteCard));
});

// ОТКРЫТИЕ И ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН ПО КЛИКУ
// функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}
// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

// ПОПАП ОКНО ПРОФАЙЛА
const profileButoon = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");

//функция открытия попапа на профайле
profileButoon.addEventListener("click", function () {
  openPopup(profilePopup);
});

//функция закрытия попапа на профайле кликом по крестику
const popapProfileCrost = profilePopup.querySelector(".popup__close");
popapProfileCrost.addEventListener("click", function () {
  closePopup(profilePopup);
});

//функция закрытия попапа на профайле кликом на оверлей
profilePopup.addEventListener("click", function (evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(profilePopup);
  }
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

//Функция попапа добавления изображения
addButton.addEventListener("click", function () {
  openPopup(addModal);
});
//функция закрытия попапа добавления изображения кликом по крестику
const addButtonCrost = addModal.querySelector(".popup__close");
addButtonCrost.addEventListener("click", function () {
  closePopup(addModal);
});

//закрытие попапа добавления изображения кликом на оверлей
addModal.addEventListener("click", function (evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(addModal);
  }
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
  cardList.prepend(createNewCard(cardObj, deleteCard));
  closePopup(addModal);
  newPlaceCardForm.reset();
}
newPlaceCardForm.addEventListener("submit", newCardItem);
//КОНЕЦ КОДА ПОПАПА ДОБАВЛЕНИЯ ИЗОБРАЖЕНИЯ НА БОЛЬШОЙ ПЛЮС

//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ ФОРМ(за исключением попапа изображения на карточке) клавишей ESC
function removePopupEsc(evt) {
  if (evt.key === "Escape") {
    if (profilePopup.classList.contains("popup_is-opened")) {
      closePopup(profilePopup);
    }
    if (addModal.classList.contains("popup_is-opened")) {
      closePopup(addModal);
    }
  }
  evt.target.removeEventListener("keydown", removePopupEsc);
}
document.addEventListener("keydown", removePopupEsc);
