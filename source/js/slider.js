// инициализация слайдера
export const initSlider = (sliderSelector) => {
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
