const grid = document.querySelector('.grid-container');
const resultsText = document.querySelector('.game-results'); // 게임 결과표시
const scoresText = document.querySelector('.game-scores'); // 게임 점수 표시
let shooter = 202; // shooter가 있는 위치
let width = 15; 
let direction = 1;
let invadersId;
let goingRight = true;
let aliensRemoved = [];
let results = 0;

// 각각의 장애물들이 width가 20, height이 20이고 grid-container의 크기는 각각 300px이므로 index 역시 15*15 = 225이다.
// container안에 div를 225개 생성해준다!
for (let i = 0; i < 225; i++) {
  const square = document.createElement('div');
  grid.appendChild(square);
} 

const squares = Array.from(document.querySelectorAll('.grid-container div'));
// 모든 grid-container안의 div들을 배열로 만들어준다

const invaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39,
]
// 왼쪽 상단 장애물들 3줄이 생기게끔 인덱스를 설정해준다

function draw() {
  for (let i = 0; i < invaders.length; i++) {
    if(!aliensRemoved.includes(i)) {
      squares[invaders[i]].classList.add('invader');
    }
  }
}

draw()
// grid-container안의 모든 div들 중 invaders안에 있는 index값들에 invader이라는 클래스를 추가해준다


squares[shooter].classList.add('shooter');
// 정의한 shooter인덱스에 shooter class를 추가해준다

// shooter를 움직이게끔 하는 함수
function moveShooter(e) {
  squares[shooter].classList.remove('shooter') // 우선 shooter 클래스를 지워준다
  switch(e.key) {
    case 'ArrowLeft':
      if (shooter % width !== 0) shooter -=1 // arrowleft즉 왼쪽 키를 눌렀을때! invader의 인덱스 첫부분이 0 15 30이므로 나머지가 0이 아닐때 -1을 해주어야함
      break
      case 'ArrowRight' :
        if (shooter % width < width - 1) shooter +=1 // arrowright 즉 오른쪽 키를 눌렀을때! invader의 나머지가 width-1 일경우 인덱스를 한칸씩 늘려준다
        break
      }
      squares[shooter].classList.add('shooter') // 인덱스를 옮겨주고 shooter 클래스를 추가
    }
    document.addEventListener('keydown', moveShooter);
    // 키를 누를때 keydown이라는 이벤트가 발생하고 이때 moveShooter라는 함수를 실행시킨다
    
function remove() {
  for (let i = 0; i < invaders.length; i++) {
    squares[invaders[i]].classList.remove('invader');
  }
}

// invader들이 움직이게끔 하는 함수
function moveInvaders() {
  const leftEdge = invaders[0] % width === 0
  const rightEdge = invaders[invaders.length - 1] % width === width - 1
  remove() // 클래스 invader를 제거해준다 

  if (rightEdge && goingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += width + 1 // 오른쪽 edge에 닿는 경우 내 원래 인덱스에서 width + 1한 만큼 더해준다
      direction = -1 
      goingRight = false
    }
  }

  if(leftEdge && !goingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += width - 1 // 왼쪽 edge에 닿는 경우 내 원래 인덱스에서 width + 1한 만큼 더해준다
      direction = 1
      goingRight = true
    }
  }

  for (let i = 0; i < invaders.length; i++) {
    invaders[i] += direction // direction을 더해줌으로써 사용자의 눈에는 벽을 찍고 움직이는 것 처럼 보여주게 된다
  }

  draw()
  // 다시 draw함수를 실행하여 invader를 칠해준다

  if (squares[shooter].classList.contains('invader', 'shooter')) {
    resultsText.innerHTML = 'GAME OVER';
    clearInterval(invadersId); // clearInterval 반복중단
  }

  // invader과 shooter가 겹치게 된다면 gameover

  for (let i = 0; i < invaders.length; i++) {
    if(invaders[i] > (squares.length)) {
      resultsText.innerHTML = 'GAME OVER';
      clearInterval(invadersId); // clearInterval 반복중단
    }
  }
  // invader의 인덱스가 원 인덱스보다 길어질 경우 game over
  if (aliensRemoved.length === invaders.length) {
    resultsText.innerHTML = 'YOU WIN';
    clearInterval(invadersId);
  }
  // 즉 invaders의 length이 alineRemoved와 같으면 즉, 30이면 전부다 처치한것이므로 이긴것!, 밑의 moveLaser 함수가 실행되면 alinesRemoved에 추가됨
}
invadersId = setInterval(moveInvaders, 650)

function shoot(e) {
  let laserId
  let currentLaserIndex = shooter
  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    squares[currentLaserIndex].classList.add('laser')

    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invader')
      squares[currentLaserIndex].classList.add('boom')
      // laser와 invader의 인덱스가 겹치는 경우 laser class제거, invader class제거, boom class추가

      setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
      // 일정시간이 지난 후에 boom class를 remove해주고
      clearInterval(laserId)

      const alienRemoved = invaders.indexOf(currentLaserIndex)
      // laserindex를 invaders에서 찾아 alinesRemoved안에 넣어준다
      aliensRemoved.push(alienRemoved)
      results++
      scoresText.innerHTML = results
    }

  }
  switch(e.key) {
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 100)
  }
  // 화살표 위쪽을 누르면 movelaser함수가 실행되게 된다
}

document.addEventListener('keydown', shoot)