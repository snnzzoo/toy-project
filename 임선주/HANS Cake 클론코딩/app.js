// Carousel
let counter = 1;

setInterval(function () {
  // radio1 => radio2 => radio3 => radio4
  document.getElementById("radio" + counter).checked = true;

  counter++;

  // radio4 => radio1
  if (counter > 4) {
    counter = 1;
  }
}, 4000); // 4초 간격으로

// Slides
// caching the DOM
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev__button");
const nextBtn = document.querySelector(".next__button");
const numberOfSlides = slides.length;
let slideNumber = 0;

// 다음 버튼
nextBtn.addEventListener("click", () => {
  slideNumber++;

  // 마지막 슬라이드일 경우 다시 처음으로
  if (slideNumber > numberOfSlides - 1) {
    slideNumber = 0;
  }

  carousel();
});

// 이전 버튼
prevBtn.addEventListener("click", () => {
  slideNumber--;

  // 처음 슬라이드일 경우 마지막 슬라이드로
  if (slideNumber < 0) {
    slideNumber = numberOfSlides - 1;
  }

  carousel();
});

function carousel() {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  slides[slideNumber].classList.add("active");
}

// 자동재생
let playSlider;

// 정방향 재생 4초 간격으로 반복
let repeater = () => {
  playSlider = setInterval(function () {
    slideNumber++;

    if (slideNumber > numberOfSlides - 1) {
      slideNumber = 0;
    }

    carousel();
  }, 4000);
};

repeater();
