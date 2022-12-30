const message = document.querySelector('.ment');
const rock = document.querySelector('.rock');
const scissors = document.querySelector('.scissors');
const paper = document.querySelector('.paper');
const computerScoreResult = document.querySelector('.computer__score');
const userScoreResult = document.querySelector('.user__score');
// 변수
const computerScore = 0;
const userScore = 0;
const rockPaperScissors = ['rock', 'scissors', 'paper'];
// *3을 하면 0~2 사이의 수 출력, Math.floor로 정수만 출력
const randomNumber = Math.floor(Math.random() * 3);

function addUserScore(userScore) {
  console.log(userScore);
}

function choiceComputer() {
  return rockPaperScissors[randomNumber];
}

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

// 각 버튼 눌렀을 때 함수 실행
rock.addEventListener('click', play());
scissors.addEventListener('click', play());
paper.addEventListener('click', play());
