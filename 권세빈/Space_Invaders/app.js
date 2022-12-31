// 15 x 15칸 만들기
for (let i = 0; i < 255; i++) {
  // div 요소 생성
  const divElement = document.createElement("div");
  // grid에 div 요소 추가
  const grid = document.querySelector(".grid");
  grid.appendChild(divElement);
}

// 브라우저가 HTML을 전부 읽고 DOM 트리를 완성하자마자 발생하는 이벤트
document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const resultDisplay = document.querySelector("#result");
  let width = 15;
  let currentShooterIndex = 202;
  let currentInvaderIndex = 0;
  let alienInvadersTakenDown = [];
  let result = 0;
  let direction = 1;
  let invaderId;

  // invaders 정의하기, 15 x 15칸에 0부터 시작하는 30개 뭉치
  const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39,
  ];

  // invaders 그리기, 모든 칸이 들어있는 배열 squares에서 invader에 해당하는 칸만 style 적용
  alienInvaders.forEach((invader) =>
    squares[currentInvaderIndex + invader].classList.add("invader")
  );

  // shooter 그리기
  squares[currentShooterIndex].classList.add("shooter");

  // shooter 움직이기
  function moveShooter(e) {
    // 예전 위치 지우기
    squares[currentShooterIndex].classList.remove("shooter");
    // 이벤트 요소의 키값 비교하기
    switch (e.key) {
      case "ArrowLeft":
        // 인덱스 범위 안에서만 움직이게 하기
        if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
        break;
      case "ArrowRight":
        // 인덱스 범위 안에서만 움직이게 하기
        if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
        break;
    }
    squares[currentShooterIndex].classList.add("shooter");
  }
  document.addEventListener("keydown", moveShooter);

  // invaders 움직이기
  function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    
    // 왼쪽 벽이면서 왼쪽으로 가려할 때, 혹은 오른쪽 벽이면서 오른쪽으로 가려할 때
    if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
      // invaders 전체를 밑으로 내려주기
      direction = width
    } else if (direction === width) {
      if (leftEdge) direction = 1
      else direction = -1
    }
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      squares[alienInvaders[i]].classList.remove('invader')
    }
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      alienInvaders[i] += direction
    }
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      // 레이저에 맞지 않았다면 
      if (!alienInvadersTakenDown.includes(i)) {
        squares[alienInvaders[i]].classList.add('invader')
      }
    }

    // game over 정의하기
    // shooter가 있는 인덱스에 클래스가 invader, shooter 둘다 있다면 game over
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
      resultDisplay.textContent = 'Game Over'
      squares[currentShooterIndex].classList.add('boom')
      clearInterval(invaderId)
    }
    for (let i = 0; i <= alienInvaders.length -1; i++) {
      // invaders의 인덱스가 grid의 마지막 줄보다 크다면 game over
      if (alienInvaders[i] > (squares.length - (width - 1))) {
        resultDisplay.textContent = 'Game Over'
        clearInterval(invaderId)
      }
    }

    // 이겼을 때
    if (alienInvadersTakenDown.length === alienInvaders.length) {
      resultDisplay.textContent = 'You Win'
      clearInterval(invaderId)
    }

  }
  invaderId = setInterval(moveInvaders, 500)

  // invader에게 레이저 쏘기
  function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex

    // shooter에서부터 레이저 나가기
    function moveLaser() {
      squares[currentLaserIndex].classList.remove('laser')
      // 레이저의 행 이동
      currentLaserIndex -= width
      squares[currentLaserIndex].classList.add('laser')
      // 만약 invader가 레이저에 맞았다면
      if (squares[currentLaserIndex].classList.contains('invader')) {
        squares[currentLaserIndex].classList.remove('laser')
        squares[currentLaserIndex].classList.remove('invader')
        squares[currentLaserIndex].classList.add('boom')

        setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250)
        clearInterval(laserId)

        // invaders 배열에 레이저 인덱스가 있다면 alienInvadersTakenDown에 추가하기
        const alienTakenDown = alienInvaders.indexOf(currentLaserIndex)
        alienInvadersTakenDown.push(alienTakenDown)
        result++
        resultDisplay.textContent = result
      }

      // 레이저는 빠르게 사라지기
      if (currentLaserIndex < width) {
        clearInterval(laserId)
        setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100)
      }
    }

    switch(e.code) {
      case 'Space':
        laserId = setInterval(moveLaser, 100)
        break
    }
  }
document.addEventListener('keydown', shoot)
});
