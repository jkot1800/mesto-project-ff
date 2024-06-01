// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addNewCard(item) {
    const cardListItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardListItem.querySelector('.card__delete-button');
    cardListItem.querySelector('.card__image').src = item.link;
    cardListItem.querySelector('.card__image').alt = item.name;
    cardListItem.querySelector('.card__title').textContent = item.name;
   
    deleteButton.addEventListener('click', closeCard)

    cardList.append(cardListItem);
    return cardListItem;
}
// @todo: Функция удаления карточки
function closeCard(evt) {
    evt.target.closest('.places__item').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    addNewCard(item);
});




