// ОТКРЫТИЕ И ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН ПО КЛИКУ
// функция открытия попапа
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}
// функция закрытия попапа
export function closePopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.remove("popup_is-opened");
}

//Массив всех попапов
export const allPopups = document.querySelectorAll(".popup");

//Закрытия попапа кликом на оверлей
export function closePopupOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target);
  }
}

// Закрытие попапов клавишей ESC
export function removePopupEsc(evt) {
  if (evt.key === "Escape") {
    allPopups.forEach(function (item) {
      if (item.classList.contains("popup_is-opened")) {
        item.classList.add("popup_is-animated");
        item.classList.remove("popup_is-opened");
      }
    });
  }
  evt.target.removeEventListener("keydown", removePopupEsc);
}
