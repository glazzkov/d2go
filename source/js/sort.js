//инициализация сортировки
export const initSort = (sortSelector) => {
  const form = document.querySelector(sortSelector);
  const button = form.querySelector(".sort__button");
  const fieldset = form.querySelector(".sort__fieldset");
  const sortValue = button.querySelector(".sort__value");

  const state = {
    states: {
      default: "по умолчанию",
      "expensive-first": "сначала дорогие",
      "inexpensive-first": "сначала дешёвые",
      "high-rating-first": "высокий рейтинг",
    },
    value: "default",
    open: false,
  };

  const updateView = () => {
    sortValue.textContent = state.states[state.value];
    state.open
      ? fieldset.classList.add("active")
      : fieldset.classList.remove("active");
  };

  button.addEventListener("click", (e) => {
    e.preventDefault();
    state.open = !state.open;
    updateView();
  });

  form.addEventListener("input", (e) => {
    e.preventDefault();
    const value = Object.fromEntries(new FormData(form)).sort;
    state.value = value;
    state.open = !state.open;
    updateView();
    // form.submit() - // при реализации переключения сортировки можно вызывать сабмит формы
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // здесь можно прописать логику сабмита формы сортировки
  });
};
