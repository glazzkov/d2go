// инициализация мобильного меню
const initBurger = (buttonSelector) => {
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

// инициализация слайдера
const initSlider = (sliderSelector) => {
  const slider = document.querySelector(sliderSelector);
  const slides = slider.querySelectorAll(".slide");
  const paginationButtons = slider.querySelectorAll(
    ".slider__pagination-button"
  );
  const buttonLeft = slider.querySelector(".slider__button--left");
  const buttonRight = slider.querySelector(".slider__button--right");

  const state = {
    currentSlideId: 1,
    firstSlideId: 1,
    lastSlideId: slides.length,
  };

  const updateView = () => {
    slides.forEach((slide) => {
      slide.classList.remove("active");
      if (parseInt(slide.dataset.id) === state.currentSlideId) {
        slide.classList.add("active");
      }
    });
    paginationButtons.forEach((button) => {
      button.classList.remove("active");
      if (parseInt(button.dataset.slideId) === state.currentSlideId) {
        button.classList.add("active");
      }
    });
    state.currentSlideId === state.firstSlideId
      ? (buttonLeft.disabled = true)
      : (buttonLeft.disabled = false);

    state.currentSlideId === state.lastSlideId
      ? (buttonRight.disabled = true)
      : (buttonRight.disabled = false);
  };

  paginationButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      state.currentSlideId = parseInt(button.dataset.slideId);
      updateView();
    });
  });

  buttonLeft.addEventListener("click", (e) => {
    e.preventDefault();
    state.currentSlideId =
      state.currentSlideId <= state.firstSlideId
        ? state.firstSlideId
        : state.currentSlideId - 1;
    updateView();
  });

  buttonRight.addEventListener("click", (e) => {
    e.preventDefault();
    state.currentSlideId =
      state.currentSlideId >= state.lastSlideId
        ? state.lastSlideId
        : state.currentSlideId + 1;
    updateView();
  });
};

//инициализация сортировки
const initSort = (sortSelector) => {
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

const initMap = (mapId) => {
  const map = L.map(mapId).setView(
    {
      lat: 59.968137,
      lng: 30.316272,
    },
    16
  );
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: "./img/map-pin.svg",
    iconSize: [38, 50],
    iconAnchor: [19, 48],
  });

  const marker = L.marker(
    {
      lat: 59.968137,
      lng: 30.316272,
    },
    {
      icon: mainPinIcon,
    }
  );
  marker.addTo(map);
};

initBurger("#main-navigation-button");
initSlider("#hero-slider");
initSort("#catalog-sort-form");
initMap("map");
