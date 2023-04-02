// инициализация мобильного меню
export const initBurger = (buttonSelector) => {
  const button = document.querySelector(buttonSelector);
  const buttonText = button.querySelector("span");
  const navigation = document.querySelector(button.dataset.target);

  const state = {
    isOpen: false,
  };

  button.classList.remove("no-js");
  navigation.classList.remove("no-js");

  const updateView = () => {
    if (!state.isOpen) {
      button.classList.remove("open");
      navigation.classList.remove("open");
      buttonText.textContent = "Открыть меню навигации";
    } else {
      button.classList.add("open");
      navigation.classList.add("open");
      buttonText.textContent = "Закрыть меню навигации";
    }
  };

  button.addEventListener("click", (e) => {
    e.preventDefault();
    state.isOpen = !state.isOpen;
    updateView();
  });
};
