# 이미지 슬라이더



- 본 프로젝트에서의 주요 개념

  - querySelectorAll()
  - addEventListener()
  - forEach()
  - if/else statements



- 방법 1 : 처음으로 돌아가기

![Animation1](README.assets/Animation1.gif)



```javascript
// caching the DOM
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");

slides.forEach(function (slide, index) {
  // css에서와 같이
  slide.style.left = `${index * 100}%`;
});

let counter = 0;

// next 버튼을 클릭하면 counter가 증가
nextBtn.addEventListener("click", function () {
  counter++;
  carousel();
});

// prev 버튼을 클릭하면 counter가 감소
prevBtn.addEventListener("click", function () {
  counter--;
  carousel();
});

function carousel() {
  // working with slides
  if (counter === slides.length) {
    counter = 0;
  }
  if (counter < 0) {
    counter = slides.length - 1;
  }

  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}
```



- 방법 2 : prev/next 버튼 숨기기

![Animation2](README.assets/Animation2.gif)



```javascript
function carousel() {
   // working with buttons
    
  // next 버튼
  if (counter < slides.length - 1) {
    nextBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
  }

  // prev 버튼
  if (counter > 0) {
    prevBtn.style.display = "block";
  } else {
    prevBtn.style.display = "none";
  }

  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}

prevBtn.style.display = "none";
```

