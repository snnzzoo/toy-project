const message = document.querySelector('.ment');
const rock = document.querySelector('.rock');
const scissors = document.querySelector('.scissors');
const paper = document.querySelector('.paper');
const computerScoreResult = document.querySelector('.computer__score');
const userScoreResult = document.querySelector('.user__score');
// 변수
let computerScore = 0;
let userScore = 0;

function win() {
  userScore++;
  userScoreResult.innerHTML = userScore;
  computerScoreResult.innerHTML = computerScore;
}

function lose() {
  computerScore++;
  computerScoreResult.innerHTML = computerScore;
  userScoreResult.innerHTML = userScore;
}

function game(user, computer) {
  if (user === computer) {
    console.log('무승부');
  } else {
    switch (user + computer) {
      case '✌🏻✋🏻':
      case '✊🏻✌🏻':
      case '✋🏻✊🏻':
        win();
        console.log('사용자 승리');
        break;
      case '✌🏻✊🏻':
      case '✊🏻✋🏻':
      case '✋🏻✌🏻':
        lose();
        console.log('컴퓨터 승리');
        break;
    }
  }
}

function play(event) {
  const rockPaperScissors = ['✊🏻', '✌🏻', '✋🏻'];
  // *3을 하면 0~2 사이의 수 출력, Math.floor로 정수만 출력
  const randomNumber = Math.floor(Math.random() * 3);
  const computer = rockPaperScissors[randomNumber];
  const user = event.target.innerText;

  game(user, computer);
}

// 각 버튼 눌렀을 때 함수 실행
rock.addEventListener('click', play);
scissors.addEventListener('click', play);
paper.addEventListener('click', play);
