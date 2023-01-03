document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div');
  const play = document.querySelector('.play');
  const scoreText = document.querySelector('#title');
  const mainImage = document.querySelector('.main-image');
  const innerScore = document.querySelector('#innerScore');
  let doodlerLeftSpace = 50;
  let startPoint = 150;
  let doodlerBottomSpace = startPoint;
  let isGameOver = false;
  let platformCount = 5;
  let platforms = [];
  let upTimerId;
  let downTimerId;
  let isJumping = true;
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimerId;
  let rightTimerId;
  let score = 0;

  function createDoodler() {
    // 두들러 캐릭터 추가
    grid.appendChild(doodler);
    doodler.classList.add('doodler');

    // 첫 시작은 처음 발판에서 시작
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = doodlerLeftSpace + 'px';
    doodler.style.bottom = doodlerBottomSpace + 'px';
  };

  class Platform {
    constructor(newPlatBottom) {
      // 새로운 발판의 위치
      this.bottom = newPlatBottom;
      // 왼쪽 값을 기준으로 발판은 총 너비 400 - 발판 너비 85를 뺀 315 안에서의 랜덤한 값으로 지정
      this.left = Math.random() * 315;
      this.visual = document.createElement('div');

      const visual = this.visual;
      visual.classList.add('platform');
      visual.style.left = this.left + 'px';
      visual.style.bottom = this.bottom + 'px';
      grid.appendChild(visual);
    }
  };

  function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
      // 발판의 개수를 5개로 지정한 뒤 처음 시작
      let platGap = 600 / platformCount;
      // 발판의 간격을 100으로 하여 새로운 발판의 위치를 지정
      let newPlatBottom = 100 + i * platGap;
      // 새로운 발판의 위치를 가지고 새로운 발판 생성
      let newPlatform = new Platform(newPlatBottom);
      platforms.push(newPlatform);
      console.log(platforms);
    }
  };

  function movePlatforms() {
    // 두들러의 높이가 200보다 클 경우
    if (doodlerBottomSpace > 200) {
      // 각각의 발판은 시간에 따라 4px 간격으로 내려가게 됨
      platforms.forEach(platform => {
        platform.bottom -= 4;
        let visual = platform.visual;
        visual.style.bottom = platform.bottom + 'px';

        // 만약 발판의 높이가 10보다 작다면
        if (platform.bottom < 10) {
          // 발판은 사라짐
          let firstPlatform = platforms[0].visual;
          firstPlatform.classList.remove('platform');
          // 첫 번째 요소를 제거하는 shift()
          platforms.shift();
          console.log(platforms);
          score++;
          let newPlatform = new Platform(600);
          platforms.push(newPlatform);
        }
      })
    }

    innerScore.innerText = `SCORE : ${score}`;
  };

  function jump() {
    // 떨어지는 반복을 중단
    clearInterval(downTimerId);
    isJumping = true;

    // 위로 올라가는 반복(setInterval)
    upTimerId = setInterval(function () {
      doodlerBottomSpace += 20;
      doodler.style.bottom = doodlerBottomSpace + 'px';

      if (doodlerBottomSpace > startPoint + 200) {
        fall();
        isJumping = false;
      }
    }, 30);
  };

  function fall() {
    clearInterval(upTimerId);
    isJumping = false;

    downTimerId = setInterval(function () {
      doodlerBottomSpace -= 5;
      doodler.style.bottom = doodlerBottomSpace + 'px';

      if (doodlerBottomSpace <= 0) {
        gameOver();
      }

      platforms.forEach(platform => {
        if (
          // 두들러가 발판에 닿았을 경우 && 점프를 하고 있는 중이 아닐 경우
          (doodlerBottomSpace >= platform.bottom) &&
          (doodlerBottomSpace <= platform.bottom + 15) &&
          ((doodlerLeftSpace + 60) >= platform.left) &&
          (doodlerLeftSpace <= (platform.left + 85)) &&
          !isJumping
        ) {
          console.log('landed');
          // 두들러의 초기 위치를 발판의 위치로 변경 후 다시 jump 함수 실행
          startPoint = doodlerBottomSpace;
          jump();
          isJumping = true;
        }
      })
    }, 20);
  };

  function gameOver() {
    console.log('game over');
    isGameOver = true;

    // grid의 모든 요소들을 제거
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }

    // 점수 출력
    scoreText.innerText = `SCORE : ${score}`;
    grid.appendChild(scoreText);

    // 리플레이 버튼 출력
    play.style.display = 'block';
    play.innerText = 'REPLAY';
    grid.appendChild(play);
    
    // clearInterval로 반복을 중단
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);

    // 리플레이 버튼 추가
    play.addEventListener('click', () => {
      location.reload();
    });
  };

  function control(e) {
    if (e.key === 'ArrowLeft') {
      // move left
      if (!isGoingLeft) {
        moveLeft();
      }
    } else if (e.key === 'ArrowRight') {
      // move right
      if (!isGoingRight) {
        moveRight();
      }
    } else if (e.key === 'ArrowUp') {
      // move straight
      moveStraight();
    }
  };

  // 왼쪽 방향키를 누를 경우 오른쪽으로 움직임을 멈춤
  function moveLeft() {
    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    
    // 왼쪽으로 이동하면서 벽을 만났을 때 오른쪽으로 이동
    isGoingLeft = true;
    leftTimerId = setInterval(function () {
      if (doodlerLeftSpace >= 0) {
        doodlerLeftSpace -= 5;
        doodler.style.left = doodlerLeftSpace + 'px';
      } else moveRight();
    }, 20);
  };

  // 오른쪽 방향키를 누를 경우 오른쪽으로 움직임을 멈춤
  function moveRight() {
    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }

    // 오른쪽으로 이동하면서 벽을 만났을 때 왼쪽으로 이동
    isGoingRight = true;
    rightTimerId =setInterval(function () {
      if (doodlerLeftSpace <= 340) {
        doodlerLeftSpace += 5;
        doodler.style.left = doodlerLeftSpace + 'px';
      } else moveLeft();
    }, 20);
  };

  // 위 방향키를 누를 경우 왼쪽, 오른쪽으로 이동을 멈춤
  function moveStraight() {
    isGoingLeft = false;
    isGoingRight = false;
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
  };
  
  function start() {
    // 게임오버가 초기에 false이므로 아래의 조건이 무조건 실행
    if (!isGameOver) {
      createPlatforms();
      createDoodler();
      setInterval(movePlatforms, 30);
      jump(startPoint);
      document.addEventListener('keyup', control);
    }
  };
  
  play.innerText = 'START';
  
  play.addEventListener('click', () => {
    mainImage.style.display = 'none';
    scoreText.innerText = '';
    // 게임 시작시 버튼은 다시 none
    play.style.display = 'none';
    start();
  })
})