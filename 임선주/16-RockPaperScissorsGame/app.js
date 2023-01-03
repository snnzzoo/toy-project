// caching the DOM
let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice() {
  const choices = ["r", "p", "s"];
  const randomNumber = Math.floor(Math.random() * 3); // 0-3 사이의 값 (0, 1, 2)
  return choices[randomNumber];
}

function convertToWord(letter) {
  if (letter === "r") return "✊";
  if (letter === "p") return "🖐";
  return "✌";
}

// user가 이긴 경우
function win(userChoice, computerChoice) {
  // 작은 글씨
  const smallUserWord = "you".fontsize(3).sub();
  const smallCompWord = "computer".fontsize(3).sub();

  const userChoice_div = document.getElementById(userChoice);

  // user 점수 획득
  userScore++;

  // 점수 표기
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;

  // 문장
  // 🖐you beats ✊computer. You Win! 🔥
  result_p.innerHTML = `${convertToWord(
    userChoice
  )}${smallUserWord} beats ${convertToWord(
    computerChoice
  )}${smallCompWord}. You Win! 🔥`;

  // green-glow 효과
  userChoice_div.classList.add("green-glow");

  // 0.3초 유지 이후 효과 사라지게
  setTimeout(
    () => userChoice_div.classList.remove("green-glow"),
    300 // 300 millisecond = 0.3sec
  );
}

// user가 진 경우
function lose(userChoice, computerChoice) {
  // 작은 글씨
  const smallUserWord = "you".fontsize(3).sub();
  const smallCompWord = "computer".fontsize(3).sub();

  const userChoice_div = document.getElementById(userChoice);

  // computer 점수 획득
  computerScore++;

  // 점수 표기
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;

  // 문장
  // ✊you loses to 🖐computer. You lost... 💩
  result_p.innerHTML = `${convertToWord(
    userChoice
  )}${smallUserWord} loses to ${convertToWord(
    computerChoice
  )}${smallCompWord}. You lost... 💩`;

  // red-glow 효과
  userChoice_div.classList.add("red-glow");

  // 0.3초 유지 이후 효과 사라지게
  setTimeout(() => {
    userChoice_div.classList.remove("red-glow");
  }, 300);
}

// 동점일 경우
function draw(userChoice, computerChoice) {
  // 작은 글씨
  const smallUserWord = "you".fontsize(3).sub();
  const smallCompWord = "computer".fontsize(3).sub();

  const userChoice_div = document.getElementById(userChoice);

  // 문장
  // 🖐you equals 🖐computer. It's a draw. 👔
  result_p.innerHTML = `${convertToWord(
    userChoice
  )}${smallUserWord} equals ${convertToWord(
    computerChoice
  )}${smallCompWord}. It's a draw. 👔`;

  // gray-glow 효과
  userChoice_div.classList.add("gray-glow");

  // 0.3초 유지 이후 효과 사라지게
  setTimeout(() => userChoice_div.classList.remove("gray-glow"), 300);
}

// 가위바위보 게임
function game(userChoice) {
  // console.log("✊🖐✌" + userChoice);
  const computerChoice = getComputerChoice(); // r, p, s

  switch (userChoice + computerChoice) {
    // user가 이기는 경우
    case "rs":
    case "pr":
    case "sp":
      win(userChoice, computerChoice);
      break;
    // user가 지는 경우
    case "rp":
    case "ps":
    case "sr":
      lose(userChoice, computerChoice);
      break;
    // 비기는 경우
    case "rr":
    case "pp":
    case "ss":
      draw(userChoice, computerChoice);
      break;
  }
}

// ✊🖐✌ 아이콘 클릭
function main() {
  rock_div.addEventListener("click", () => game("r"));
  paper_div.addEventListener("click", () => game("p"));
  scissors_div.addEventListener("click", () => game("s"));
}

main();
