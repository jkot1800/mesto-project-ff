//КОД ВАЛИДАЦИИ

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
export function setEventListeners(formElement, validationConfig) {
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
      isValid(formElement, inputElement, validationConfig);
    });
  });
}

// 3 --- Функция проверки на валидность
export function isValid(formElement, inputElement, validationConfig) {
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
export function toggleButtonState(inputList, buttonElement, validationConfig) {
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
export function showInputError(
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
export function hideInputEror(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.setCustomValidity("");
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
