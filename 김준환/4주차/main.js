// tabs javascript
const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");

about.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (id) {
    // 눌리지 않은 버튼의 active 삭제
    btns.forEach(function (btn) {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    // 다른 탭 내용 숨기기
    articles.forEach(function (article) {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});

// tabs-2 javascript
const btns_2 = document.querySelectorAll(".tab-btn-2");
const about_2 = document.querySelector(".about-2");
const articles_2 = document.querySelectorAll(".content-2");

about_2.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (id) {
    // 눌리지 않은 버튼의 active 삭제
    btns_2.forEach(function (btn) {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    // 다른 탭 내용 숨기기
    articles_2.forEach(function (article) {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});

// tabs-3 javascript
const btns_3 = document.querySelectorAll(".tab-btn-3");
const about_3 = document.querySelector(".about-3");
const articles_3 = document.querySelectorAll(".content-3");

about_3.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (id) {
    // 눌리지 않은 버튼의 active 삭제
    btns_3.forEach(function (btn) {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    // 다른 탭 내용 숨기기
    articles_3.forEach(function (article) {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});

// ----------------------------------------------------------------

// scrolls javascript
// set date
// select span
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// close links
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  // linksContainer.classList.toggle("show-links");

  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
  // console.log(linksContainer.getBoundingClientRect());
});

// fixed navbar

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  // setup back to top link

  if (scrollHeight > 500) {
    console.log("helo");

    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// smooth scroll
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

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
    // close
    linksContainer.style.height = 0;
  });
});
// calculate heights
