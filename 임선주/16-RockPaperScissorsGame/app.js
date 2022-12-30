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
  // console.log(Math.floor(Math.random() * 3));
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}
// console.log(getComputerChoice());

function convertToWord(letter) {
  if (letter === "r") return "✊";
  if (letter === "p") return "🖐";
  return "✌";
}

function win(userChoice, computerChoice) {
  const smallUserWord = "you".fontsize(3).sub();
  const smallCompWord = "computer".fontsize(3).sub();
  const userChoice_div = document.getElementById(userChoice);
  userScore++;
  // console.log("WIN");
  // console.log(userScore);
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = `${convertToWord(
    userChoice
  )}${smallUserWord} beats ${convertToWord(
    computerChoice
  )}${smallCompWord}. You Win! 🔥`;

  // green-glow 효과
  userChoice_div.classList.add("green-glow");

  setTimeout(
    () => userChoice_div.classList.remove("green-glow"),
    300 // 300millisecond = 0.3sec
  );
}

function lose(userChoice, computerChoice) {
  const smallUserWord = "you".fontsize(3).sub();
  const smallCompWord = "computer".fontsize(3).sub();
  const userChoice_div = document.getElementById(userChoice);
  // console.log("LOSE");
  computerScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = `${convertToWord(
    userChoice
  )}${smallUserWord} loses to ${convertToWord(
    computerChoice
  )}${smallCompWord}. You lost... 💩`;

  // red-glow 효과
  userChoice_div.classList.add("red-glow");

  setTimeout(() => {
    userChoice_div.classList.remove("red-glow");
  }, 300);
}

function draw(userChoice, computerChoice) {
  // console.log("DRAW");
  const smallUserWord = "you".fontsize(3).sub();
  const smallCompWord = "computer".fontsize(3).sub();
  const userChoice_div = document.getElementById(userChoice);
  result_p.innerHTML = `${convertToWord(
    userChoice
  )}${smallUserWord} equals ${convertToWord(
    computerChoice
  )}${smallCompWord}. It's a draw. 👔`;

  // gray-glow 효과
  userChoice_div.classList.add("gray-glow");

  setTimeout(() => userChoice_div.classList.remove("gray-glow"), 300);
}

function game(userChoice) {
  // console.log("💩💩💩" + userChoice);
  const computerChoice = getComputerChoice();
  // console.log("user choice =>" + userChoice);
  // console.log("computer choice =>" + computerChoice);
  switch (userChoice + computerChoice) {
    case "rs":
    case "pr":
    case "sp":
      win(userChoice, computerChoice);
      break;
    case "rp":
    case "ps":
    case "sr":
      lose(userChoice, computerChoice);
      break;
    case "rr":
    case "pp":
    case "ss":
      draw(userChoice, computerChoice);
      break;
  }
}

function main() {
  rock_div.addEventListener("click", () => game("r"));
  paper_div.addEventListener("click", () => game("p"));
  scissors_div.addEventListener("click", () => game("s"));
}

main();
