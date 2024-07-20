import { deleteLike, addLike } from "./api";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: Функция создания карточки
export function createNewCard(
  item,
  deleteCard,
  openImageModal,
  addLikeButton,
  userData,
  deleteCardFromServer
) {
  const cardListItem = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardListItem.querySelector(".card__delete-button");
  const cardImage = cardListItem.querySelector(".card__image");
  const likeButton = cardListItem.querySelector(".card__like-button");
  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardListItem.querySelector(".card__title").textContent = item.name;
  //Счетчик лайков карточки
  const likesCounter = cardListItem.querySelector(".card_like-counter");
  likesCounter.textContent = item.likes.length;
  //Скрытие кнопки удаления если карточка не ваша
  if (userData["_id"] !== item.owner["_id"]) {
    deleteButton.classList.add("card_delete-button-display-none");
  }
  //Закрашивание лайка там, где поставил его
  if (item.likes.some((like) => like["_id"] === userData["_id"])) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", function () {
    openImageModal(item);
  });
  //слушатель постановки лайка
  likeButton.addEventListener("click", function (evt) {
    addLikeButton(evt, item, likesCounter);
  });

  deleteButton.addEventListener("click", function (evt) {
    deleteCardFromServer(item["_id"])
      .then(() => {
        deleteCard(evt);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return cardListItem;
}

// @todo: Функция удаления карточки с изображением
export function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

//Функция лайка карточки
export function addLikeButton(evt, item, likesCounter) {
  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLike(item._id)
      .then((res) => {
        evt.target.classList.remove("card__like-button_is-active");
        likesCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLike(item._id)
      .then((res) => {
        evt.target.classList.add("card__like-button_is-active");
        likesCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
