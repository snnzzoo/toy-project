const computerRspItems = document.querySelectorAll('.rsp-container.computer .rsp-item')
const userRspItems = document.querySelectorAll('.rsp-container.user .rsp-item')
const rspResult = document.querySelector('#RPS-result')
const btns = document.querySelector('.btns')
const cover = document.querySelector('.cover')
const rspIndex = {
  'Rock': 0,
  'Scissor': 1,
  'Paper': 2
}



// 특정 item이 mouseover될 때 스타일(color 등)을 변화시키는 함수
const whenHoveringItem = function (item) {
  item.addEventListener('mouseover', function (event) {
    event.currentTarget.classList.add('mouseover')
  })
  item.addEventListener('mouseout', function (event) {
    event.currentTarget.classList.remove('mouseover')
  })
}



// computer의 가위바위보 결과를 반환
const computerRandomChoice = function () {
  const rsp = ['Rock', 'Scissor', 'Paper']
  return rsp[Math.floor(Math.random() * 3)]
}



// 가위바위보 경기 승부를 판단해 winner 반환
const judgeRspGame = function (computerChoice, userChoice) {
  if (rspIndex[computerChoice] === rspIndex[userChoice]) {
    return 'draw'
  } else if ((rspIndex[computerChoice] + 1) % 3 === rspIndex[userChoice]) {
    return 'computer'
  } else {
    return 'user'
  }
}



// 경기 결과를 화면에 표시
const displayRspResult = function (computerChoice, userChoice, winner) {
  if (winner === 'user') {
    var content = `${userChoice}<span class='small'>user</span> beats ${computerChoice}<span class='small'>comp</span>. You win!🔥`
    var scoreTag = document.querySelector('.score-box .user')
    var userResult = 'win'
    var computerResult = 'lose'
  } else if (winner === 'computer') {
    var content = `${userChoice}<span class='small'>user</span> loses to ${computerChoice}<span class='small'>comp</span>. You lost...💩`
    var scoreTag = document.querySelector('.score-box .computer')
    var userResult = 'lose'
    var computerResult = 'win'
  } else {
    var content = `${userChoice}<span class='small'>user</span> equals ${computerChoice}<span class='small'>comp</span>. It's a draw.`
    var scoreTag = null
    var userResult = 'draw'
    var computerResult = 'draw'
  }
  // text로 표시
  rspResult.innerText = ''
  rspResult.insertAdjacentHTML('beforeend', content)
  // score 표시
  if (scoreTag) {
    let score = scoreTag.innerText
    scoreTag.innerText = Number(score) + 1
  }
  // color로 표시
  userRspItems[rspIndex[userChoice]].classList.add(userResult)
  computerRspItems[rspIndex[computerChoice]].classList.add(computerResult)
}



// computer와 user의 가위바위보 스타일 초기화
const resetRspStyle = function () {
  for (let i = 0; i < 3; i++) {
    userRspItems[i].classList.remove('win')
    userRspItems[i].classList.remove('lose')
    userRspItems[i].classList.remove('draw')
    computerRspItems[i].classList.remove('win')
    computerRspItems[i].classList.remove('lose')
    computerRspItems[i].classList.remove('draw')
  }
}



// 게임 재시작
const againGame = function () {
  // #RPS-result의 텍스트 초기화
  rspResult.innerText = 'Make Your Move!'

  // computer와 user의 가위바위보 스타일 초기화
  resetRspStyle()

  // again 버튼과 reset 버튼이 화면에서 없앰
  btns.classList.remove('show')

  // 가위바위보 클릭 할 수 있게 방어막 제거
  cover.classList.remove('active')
}



// 게임 종료
const endGame = function () {
  // again 버튼과 reset 버튼이 화면에 나타남
  btns.classList.add('show')

  // 가위바위보 클릭 못 하게 방어막 생성
  cover.classList.add('active')

  // again 버튼 클릭 시, 게임 재시작
  const againBtn = btns.querySelector('.again-btn')
  againBtn.addEventListener('click', function () {
    againGame()
  })

  // reset 버튼 클릭 시, score를 0으로 되돌린 후 게임 재시작
  const resetBtn = btns.querySelector('.reset-btn')
  resetBtn.addEventListener('click', function () {
    const scores = document.querySelectorAll('.score-box .score')
    scores.forEach(function (score) {
      score.innerText = 0
    })
    againGame()
  })
}



// 로딩되면 바로 게임 시작
document.addEventListener('DOMContentLoaded', function () {
  userRspItems.forEach(function (userRspItem) {
    // 호버 시, 해당 item에 mouseover 클래스 추가
    whenHoveringItem(userRspItem)

    // 클릭 시, 가위바위보가 진행되고 경기 결과를 나타냄
    userRspItem.addEventListener('click', function (event) {
      let computerChoice = computerRandomChoice()
      let userChoice = event.currentTarget.dataset.rsp
      let winner = judgeRspGame(computerChoice, userChoice)
      displayRspResult(computerChoice, userChoice, winner)
      endGame()
    })
  })
})