const square = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')
let score = document.querySelector('#score')

// 결과는 0점부터 시작
let result = 0
// 현재 시간(남은 플레이 시간)
let currentTime = timeLeft.textContent

// randomSquare 함수 선언
function randomSquare() {
    // 각 칸의 두더지를 지운다.
    square.forEach(className => {
        className.classList.remove('mole')
    })
    // 난수 * 9 (0부터 9전까지)
    // We use math floor to round down to the nearest integer so that the random position is always under or equivalent to nine.
    // randomPosition이 항상 9보다 작거나 같도록 Math.floor()을 사용하여 가장 가까운 정수로 내림한다.
    // 왜 9보다 작거나 같아야 할까? => 9칸이기 때문에
    let randomPosition = square[Math.floor(Math.random() * 9)]
    // 뽑힌 randomPosition 자리에 두더지가 뜨도록 한다.
    randomPosition.classList.add('mole')

    // assign the id of the randomPosition to the hitPosition for us to use later
    // hitPosition에 randomPosition의 ID를 할당
    // hitPosition은 두더지가 나타난 칸의 id
    hitPosition = randomPosition.id
}

square.forEach(id => {
    // 의미 : square의 각 요소를 id라고 하고,
    // 그 요소에 mouseup이라는 이벤트가 발생하면,
    // 콜백함수를 실행
    id.addEventListener('mouseup', () => {
        // mouseup 이벤트가 일어난 요소의 id값과 두더지가 나타난 칸의 id가 동일하면
        if (id.id === hitPosition) {
            // result + 1
            result = result + 1
            score.textContent = result
        }
    })
})

let timerId
moveMole();

// 두더지가 여기 떴다 저기 떴다 띄우는 함수
// 0.5초마다 두더지가 랜덤한 칸에서 떴다 사라졌다(깜빡깜빡)
function moveMole() {
    timerId = setInterval(randomSquare, 500)
}

// 카운트다운 함수
function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime === 0) {
        // 남은 시간이 0이 되면 함수 반복(카운트다운 함수, 두더지를 띄우는함수)을 종료
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert('게임 종료! 당신의 점수는 ' + result + '점입니다!')
    }
}

let countDownTimerId = setInterval(countDown, 1000);