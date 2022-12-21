//날짜 설정
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear()

//링크 닫기 (반응형)
const navToggle = document.querySelector('.nav-toggle')
const linksContainer = document.querySelector('.links-container')
const links = document.querySelector('.links')

navToggle.addEventListener('click', function () {
    // linksContainer.classList.toggle("show-links")
    const containerHeight = linksContainer.getBoundingClientRect().height
    const linksHeight = links.getBoundingClientRect().height
    if (containerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        linksContainer.style.height = '0';
    }
})

// 네브바 수정
const navbar = document.getElementById('nav')
const toplink = document.querySelector(".top-link")

window.addEventListener("scroll", function () {
    const scrollheight = window.scrollY
    const navheight = navbar.getBoundingClientRect().height;

    if (scrollheight > navheight) {
        navbar.classList.add('fixed-nav');
    } else {
        navbar.classList.remove('fixed-nav');
    }
    // top버튼 생성
    if (scrollheight > 500) {
        toplink.classList.add("show-link")
    } else {
        toplink.classList.remove("show-link")
    }

})
// 부드러운 스크롤
//링크 선택
const scrollLinks = document.querySelectorAll('.scroll-link')

scrollLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
        //prevent default
        e.preventDefault();
        // 특정 지점으로 이동
        const id = e.currentTarget.getAttribute('href').slice(1)
        const element = document.getElementById(id)

        const navHeight = navbar.getBoundingClientRect().height
        const containerHeight = linksContainer.getBoundingClientRect().height
        const fixedNav = navbar.classList.contains('fixed-nav')
        let position = element.offsetTop - navHeight
        if (!fixedNav){
            position = position - navHeight
        }
        if (navHeight > 82){
            position = position + containerHeight
        }
        console.log(position)
        window.scrollTo(
            {
                left: 0,
                top: position,
            }
        )
        linksContainer.style.height = '0'
    })
})