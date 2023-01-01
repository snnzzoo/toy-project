// 맵 생성 전 변수 선언
let width = 0;
let map_size = 0;
const mapBtn = document.querySelector(".map");

// 맵 생성 함수
function makeMap() {
  width = 0;
  map_size = document.querySelector('input[name="map-size"]:checked').value; // 라디오 버튼 체크 된 항목의 value값 가져옴
  document.getElementById("grid").style.width = `${map_size}px`;  // css에 width를 mapsize로 계산한 값 입력
  document.getElementById("grid").style.height = `${map_size}px`; // css에 height를 mapsize로 계산한 값 입력
  width = map_size / 30;
  // 블럭(div) 개수 맵 사이즈에 맞게 자동 생성
  for (let i = 0; i < width ** 2; i++) {
    let block = document.createElement("div");
    document.querySelector(".grid").appendChild(block);
  }
}
mapBtn.addEventListener("click", makeMap);

// 로딩 되면 자동 실행
document.addEventListener("DOMContentLoaded", () => {
  const scoreDisplay = document.querySelector("span");
  const startBtn = document.querySelector(".start");

  let squares = 0;
  let currentIndex = 0;
  let appleIndex = 0;
  let currentSnake = [2, 1, 0];
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  // start, restart game
  function startGame() {
    squares = document.querySelectorAll(".grid div");
    currentSnake.forEach((index) => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = document.querySelector('input[name="level"]:checked').value; // 레벨 선택 라디오 버튼 value값 사용
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcomes, intervalTime);
  }

  function moveOutcomes() {
    // 뱀이 벽 또는 자기 자신 부닺힐 경우
    if (
      (currentSnake[0] + width >= width * width && direction === width) || //뱀이 바닥 부딪힘
      (currentSnake[0] % width === width - 1 && direction === 1) || //뱀이 오른쪽 부딪힘
      (currentSnake[0] % width === 0 && direction === -1) || //뱀이 왼쪽 부딪힘
      (currentSnake[0] - width < 0 && direction === -width) || //뱀이 위에 부딪힘
      squares[currentSnake[0] + direction].classList.contains("snake") //스스로에게 부딪힘
    ) {
      alert("gameover!!!");
      startGame();
      return clearInterval(interval);
    }

    const tail = currentSnake.pop(); // 배열 마지막 부분 삭제 및 테일에 담기
    squares[tail].classList.remove("snake"); // 꼬리 클래스 삭제
    currentSnake.unshift(currentSnake[0] + direction); // 배열 맨앞에 방향정보 삽입

    // 뱀이 사과 먹은 경우
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      randomApple();
      // 사과 제거
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }
    squares[currentSnake[0]].classList.add("snake");
  }
  // 뱀이 사과 먹으면 자동으로 랜덤으로 생성
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
  }

  function control(e) {
    squares[currentIndex].classList.remove("snake");
    if (e.keyCode === 39) {
      direction = 1; // 방향키 오른쪽 누르면
    } else if (e.keyCode === 38) {
      direction = -width; // 방향키 위 누르면
    } else if (e.keyCode === 37) {
      direction = -1; // 방향키 왼쪽 누르면
    } else if (e.keyCode === 40) {
      direction = +width; // 방향키 아래 누르면
    }
  }

  document.addEventListener("keyup", control);
  startBtn.addEventListener("click", startGame);
});
