let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win = false;

// 카운터
const turnCounter = document.querySelector("#turn");
// 버튼들
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
// 컨트롤
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

// strict 버튼 클릭 이벤트 리스너
// strict 모드 활성화 유무 결정
strictButton.addEventListener('click', (event) => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

// POWER ON 버튼 클릭 이벤트 리스너
// POWER on/off 에 따라 카운터 표시
// off 일 때, 이전 setInterval 메소드 호출으로 인한 예약 취소 
onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.insertAdjacentHTML("beforeend", "-");
  } else {
    on = false;
    turnCounter.textContent = '';
    clearColor();
    clearInterval(intervalId);
  }
});

// 시작 버튼 클릭 이벤트 리스너
startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});

// 실질적으로 사이먼 게임을 실행하는 함수
function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.textContent = 1;
  good = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;

  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;

  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

// 각 함수는 버튼에 따라 음성이 나오고 색깔을 밝게 변화 시킨다.
function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}

function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}

function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}

// 4개 버튼 모두 어두운 계열 색깔 로 초기화
function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}

// 이겼을 때 호출되는 함수로써,
// 4개 버튼 모두 밝은 계열 색깔로 초기화
function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

// 각 함수는 4개 각각 버튼들에 대한 클릭 이벤트 리스너
// 이긴게 아니면 원래 색깔로 모두 되돌린다. 이기면 밝은 색깔로 모두 바꾼다.
topLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

// 플레이어가 제대로 했는지 검사하는 함수
function check() {
  // 누를 때마다 check 함수가 호출되므로
  // playerOrder 배열의 모든 요소를 검사하는 로직이 된다.
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == 3 && good) {
    winGame();
  }

  // 잘못 입력할 경우
  // counter 에 'NO!' 를 출력하고 실패 음성 출력을 한다.
  // 800ms 후 strict 값에 따라 변수를 초기화 할 것인지 결정하고
  // 현재 턴으로 출력하고 4개 버튼들의 모든 색깔을 원래대로 되돌린다.
  // strict mode ON : 1 라운드 부터 시작
  // strict mode OFF : 계속 이어서 진행
  if (good == false) {
    flashColor();
    turnCounter.textContent = "NO!";
    let audio = document.getElementById("fail");
    audio.play();
    setTimeout(() => {
      turnCounter.textContent = turn;
      clearColor();

      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.textContent = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}

// 모든 버튼을 밝게 만들고, counter 에 승리 표시를 한다.
function winGame() {
  flashColor();
  turnCounter.textContent = "WIN!";
  on = false;
  win = true;
}






