import '../pages/index.css';
import {initialCards} from './cards.js'; 

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
