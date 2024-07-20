//КОД ВАЛИДАЦИИ

//Объект с классами форм валидации
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

// 1 --- Установка слушателей на формы
export function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach(function (form) {
    setEventListeners(form, validationConfig);
  });
}

// 2 --- Функция установки слушателей validationConfig.formSelector
function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  
  toggleButtonState(inputList, buttonElement, validationConfig);
  
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      
      toggleButtonState(inputList, buttonElement, validationConfig);
      isValid(formElement, inputElement);
    });
  });
}

// 3 --- Функция проверки на валидность
function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputEror(formElement, inputElement, validationConfig);
  }
}

//функция переключения состояния кнопки при валидации
function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

//функция-Проверка валидности всех инпутов формы
function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

//Функция показа ошибки ввода
function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationConfig.inputErrorClass);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

//Функция скрытия ошибки ввода
function hideInputEror(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
}

//Функция очистки полей валидации
export function clearValidation(profileForm, validationConfig) {
  const inputList = profileForm.querySelectorAll(
    validationConfig.inputSelector
  );
  const profileButoon = profileForm.querySelector(
    validationConfig.submitButtonSelector
  );
  profileButoon.disabled = true;
  profileButoon.classList.add(validationConfig.inactiveButtonClass);
  inputList.forEach(function (input) {
    hideInputEror(profileForm, input, validationConfig);
  });
}
