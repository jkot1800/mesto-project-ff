// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: Функция создания карточки
export function createNewCard(item, deleteCard, openImageModal, addLikeButton) {
  const cardListItem = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardListItem.querySelector(".card__delete-button");
  const cardImage = cardListItem.querySelector(".card__image");
  const likeButton = cardListItem.querySelector(".card__like-button");
  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardListItem.querySelector(".card__title").textContent = item.name;

  cardImage.addEventListener("click", function () {
    openImageModal(item);
  });

  likeButton.addEventListener("click", addLikeButton);

  deleteButton.addEventListener("click", deleteCard);

  return cardListItem;
}

// @todo: Функция удаления карточки с изображением
export function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

//Функция лайка карточки
export function addLikeButton(evt) {
  if (evt.target.classList.contains("card__like-button_is-active")) {
    evt.target.classList.remove("card__like-button_is-active");
  } else {
    evt.target.classList.add("card__like-button_is-active");
  }
}
