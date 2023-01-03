// getBoundingClientRect 메소드는 DOMRect 라는 객체를 반환한다.
// 반환되는 해당 객체는 element 를 포함하는 가장 작은 사각형이다.
// pageYOffset 는 윈도우 객체의 프로퍼티로써 읽기 전용이며 이때까지 스크롤한 픽셀의 수를 나타낸다.

// footer 연도 날짜 설정
// link : https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentText
const date = document.getElementById("date");
date.insertAdjacentText("beforeend", new Date().getFullYear());

// ********** navbar ************

// 링크 및 토글 버튼
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

// 숨어있는 link 높이만큼 높이 조절
navToggle.addEventListener("click", function () {
  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

// 스크롤에 대한 이벤트리스너, navbar 높이에 따른 클래스를 부여
window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;

  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }

  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// navbar 내 각 링크에 대하여 해당 section 으로 스크롤 이동
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // href 내에서 id 선택자를 제외한 값을 string 으로 추출
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    // navbar 높이, toggle 했을 때의 높이, fixed 인지 유무를 구함
    // position 은 처음 ~ 해당 section 까지 높이에서 navbar 만큼 빼야
    // navbar 가 딱 맞게 들어갈 수 있다. 따라서 저 수식이 나온 것.
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    // 스크롤이 navbar 높이 초과의 경우
    // 맨 위 navbar 자리랑 현재 보이는 navbar 높이를 제거해야 딱 맞으므로
    // fixed 된 navbar 를 한번 더 빼준다.
    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });

    linksContainer.style.height = 0;
  });
});

// ********** slider ************

// 사진들과 이전/다음 버튼
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");

// 각 슬라이드를 인덱스 값에 따라 위로 밀어넣음
slides.forEach(function (slide, index) {
  slide.style.top = `${index * 100}%`;
});
let counter = 0;

// 이전, 다음 버튼에 carousel 함수 호출하도록 이벤트 추가
nextBtn.addEventListener("click", function () {
  counter++;
  carousel();
});

prevBtn.addEventListener("click", function () {
  counter--;
  carousel();
});

// counter 값에 따른 버튼 표시 유무 처리 및 각 슬라이드 상단 이동 처리
function carousel() {
  if (counter < slides.length - 1) {
    nextBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
  }
  if (counter > 0) {
    prevBtn.style.display = "block";
  } else {
    prevBtn.style.display = "none";
  }
  slides.forEach(function (slide) {
    slide.style.transform = `translateY(-${counter * 100}%)`;
  });
}

// 초기 상태는 이전 버튼 안보이게 처리
prevBtn.style.display = "none";

