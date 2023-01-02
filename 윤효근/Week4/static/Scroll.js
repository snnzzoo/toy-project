//타이머 설정
const months = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
];
const weekdays = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];


//날짜 설정
const sdate = document.getElementById('date');
sdate.innerHTML = new Date().getFullYear()

//반응형 메뉴 생성 및 이벤트 추가
const navToggle = document.querySelector('.nav-toggle')
const linksContainer = document.querySelector('.links-container')
const links = document.querySelector('.links')

//모바일 환경이 될시 메뉴를 햄버거로 변경
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
    const scrollheight = window.scrollY                 //pageYOffset이 곧 사용할 수 없게 되어 scrollY로 대체
    const navheight = navbar.getBoundingClientRect().height; //네브바의 길이 구하기

    //스크롤하면 네브바의 타입을 변경하여 따라가게 만듬
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

        const navHeight = navbar.getBoundingClientRect().height //네브바의 높이 구하기
        const containerHeight = linksContainer.getBoundingClientRect().height // 햄버거 메뉴 높이 구하기
        const fixedNav = navbar.classList.contains('fixed-nav') //고정 네브바의 높이 구하기
        let position = element.offsetTop - navHeight //이동할 높이 계산
        if (!fixedNav){ //고정 네브바가 아닐시 (페이지의 처음)
            position = position - navHeight
        }
        if (navHeight > 82){ //모바일 환경일 경우
            position = position + containerHeight
        }
        window.scrollTo(
            {
                left: 0,
                top: position,
            }
        )
        linksContainer.style.height = '0' //이동 후 메뉴 닫기
    })
})

//타이머
const priot = document.querySelector('.p-riot')
const deadline = document.querySelector('.deadline')
const items = document.querySelectorAll('.deadline-format h4')

let futureDate = new Date(2022,11,26,10,0,0)

const year = futureDate.getFullYear()
const hour = futureDate.getHours()
const min = futureDate.getMinutes()

let month = futureDate.getMonth()
month = months[month]

const date = futureDate.getDate()
let weekday =weekdays[futureDate.getDay()]

priot.textContent = `${year}.${month}.${date} ${weekday} 오전 ${hour}:${min}부터`

//타이머 변환
const futureTime = futureDate.getTime()

function getRemainingTime(){
    const today = new Date().getTime() //현재시간 구하기
    let t = futureTime - today //남은 시간 구하기
    if(t<0){                    // 만약 시간이 지나면 카운트 다운에서 타이머로 전환
        t = today - futureTime
    }
    // 각각의 시간 설정 (밀리초 기준)
    const onesec =  1000
    const onemin =  60 * onesec
    const onehour = 60 * onemin
    const oneday = 24 * onehour

    let days = t/oneday
    days = Math.floor(days)
    let hours = Math.floor((t % oneday) / onehour)
    let minutes = Math.floor((t % onehour) / onemin)
    let seconds = Math.floor((t % onemin) / onesec)

    const values = [days,hours,minutes,seconds]

    function format(item){
        if(item <10 ){
            return (item = `0${item}`)
        }
        return item
    }

    items.forEach(function (item,index) {
        item.innerHTML = format(values[index])
    })

}
//카운트 다운
let countdown = setInterval(getRemainingTime,1000)

getRemainingTime()