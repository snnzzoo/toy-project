// caching the DOM
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const slideIcons = document.querySelectorAll(".slide-icon");
const numberOfSlides = slides.length;
let slideNumber = 0;

// next button
nextBtn.addEventListener("click", () => {
  // slides.forEach((slide) => {
  //   slide.classList.remove("active");
  // });
  // slideIcons.forEach((slideIcon) => {
  //   slideIcon.classList.remove("active");
  // });

  slideNumber++;

  if (slideNumber > numberOfSlides - 1) {
    slideNumber = 0;
  }

  carousel();
  // slides[slideNumber].classList.add("active");
  // slideIcons[slideNumber].classList.add("active");
});

// previous button
prevBtn.addEventListener("click", () => {
  // slides.forEach((slide) => {
  //   slide.classList.remove("active");
  // });
  // slideIcons.forEach((slideIcon) => {
  //   slideIcon.classList.remove("active");
  // });

  slideNumber--;

  if (slideNumber < 0) {
    slideNumber = numberOfSlides - 1;
  }
  carousel();
  // slides[slideNumber].classList.add("active");
  // slideIcons[slideNumber].classList.add("active");
});

// 중복되는 부분을 함수로 만들자
function carousel() {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
  });

  slides[slideNumber].classList.add("active");
  slideIcons[slideNumber].classList.add("active");
}

// autoplay
let playSlider;

let repeater = () => {
  playSlider = setInterval(function () {
    // slides.forEach((slide) => {
    //   slide.classList.remove("active");
    // });
    // slideIcons.forEach((slideIcon) => {
    //   slideIcon.classList.remove("active");
    // });

    slideNumber++;

    if (slideNumber > numberOfSlides - 1) {
      slideNumber = 0;
    }
    carousel();
    // slides[slideNumber].classList.add("active");
    // slideIcons[slideNumber].classList.add("active");
  }, 3000);
};
repeater();

// stop the image slider autoplay on mouseover
slider.addEventListener("mouseover", () => {
  clearInterval(playSlider);
});

// start the image slider autoplay again on mouseout
slider.addEventListener("mouseout", () => {
  repeater();
});
