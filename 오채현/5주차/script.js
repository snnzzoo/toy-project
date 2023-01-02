// 그리드 너비, 높이 지정
const gridWidth = 10;
const gridHeight = 20;

// 그리드
const grid = document.querySelector('.grid');
// 그리드 내의 div태그를 전부 가져와서 배열에 넣음
let squares = Array.from(grid.querySelectorAll('div'));
// 다음 테트로노미 미리보기 그리드
const displaySquares = document.querySelectorAll('.prev-grid div');
// 시작 버튼
const startBtn = document.querySelector('#btn-start');
// 리셋 버튼
const resetBtn = document.querySelector('#btn-reset');
// 스코어, 라인 수 표시
const scoreBoard = document.querySelector('.score-board');
const linesBoard = document.querySelector('.lines-board');
const playTime = document.querySelector('.play-time');

// 현재 위치, 인덱스
let currentPos = 4;
let currentIndex = 0;
let playSec = 0;

// 현재 스코어, 라인 수
let score = 0;
let lines = 0;

// 타이머
let timerId;
let playTimer;

// 키보드 방향키에 이벤트 적용
function control(e) {
    // KeyCode는 더이상 지원하지 않음. 그러나 오래된 브라우저를 위해 || 로 남겨둠
    // 오른쪽 방향키
    if (e.key === 'ArrowRight' || e.KeyCode === 39) {
        moveRight();
    }
    // 왼쪽 방향키
    else if (e.key === 'ArrowLeft' || e.KeyCode === 37) {
        moveLeft();
    }// 위쪽 방향키
    else if (e.key === 'ArrowUp' || e.KeyCode === 38) {
        rotate();
    }// 아래쪽 방향키
    else if (e.key === 'ArrowDown' || e.KeyCode === 40) {
        moveDown();
    }
}
document.addEventListener('keydown', control);



//테트로미노 지정 배열 - 각각의 테트로미노가 회전하는 경우 
const lTetromino = [
    [1, gridWidth + 1, gridWidth * 2 + 1, 2],
    [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 2],
    [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 2],
    [gridWidth, gridWidth * 2, gridWidth * 2 + 1, gridWidth * 2 + 2]
]

const zTetromino = [
    [0, gridWidth, gridWidth + 1, gridWidth * 2 + 1],
    [gridWidth + 1, gridWidth + 2, gridWidth * 2, gridWidth * 2 + 1],
    [0, gridWidth, gridWidth + 1, gridWidth * 2 + 1],
    [gridWidth + 1, gridWidth + 2, gridWidth * 2, gridWidth * 2 + 1]
]

const tTetromino = [
    [1, gridWidth, gridWidth + 1, gridWidth + 2],
    [1, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 1],
    [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 1],
    [1, gridWidth, gridWidth + 1, gridWidth * 2 + 1]
]

const oTetromino = [
    [0, 1, gridWidth, gridWidth + 1],
    [0, 1, gridWidth, gridWidth + 1],
    [0, 1, gridWidth, gridWidth + 1],
    [0, 1, gridWidth, gridWidth + 1]
]

const iTetromino = [
    [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 3 + 1],
    [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3],
    [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 3 + 1],
    [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3]
]

const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

// 5개의 테트로미노 중 한 가지 랜덤 선택 
let random = Math.floor(Math.random() * theTetrominoes.length);
let currentRotation = 0;
let current = theTetrominoes[random][currentRotation];

// 사각형 그리기
function draw() {
    current.forEach(idx => {
        squares[currentPos + idx].classList.add('block');
    });
};

// 사각형 지우기
function undraw() {
    current.forEach(idx => {
        squares[currentPos + idx].classList.remove('block');
    });
};

// 테트로미노 아래로 움직이기
function moveDown() {
    // 기존 위치에서 사각형 지우고
    undraw();
    // 현재 위치 업데이트 후에
    currentPos = currentPos += gridWidth;
    // 현재 위치에 사각형 생성
    draw();
    freeze();
}

// 테트로미노 오른쪽으로 움직이기
function moveRight() {
    // 기존 위치에서 사각형 지움
    undraw();
    // 그리드 오른쪽 끝에 닿았는지 확인 T/F 값 반환
    const rightEdge = current.some(idx => (currentPos + idx) % gridWidth === gridWidth - 1);
    // 그리드 끝에 닿지 않았으면 현재 위치 값 증가
    if (!rightEdge) currentPos += 1;
    if (current.some(idx => squares[currentPos + idx].classList.contains('block2'))) {
        currentPos -= 1;
    };

    // 이동한 위치에 사각형 생성
    draw();
}

// 테트로미노 왼쪽으로 움직이기
function moveLeft() {
    // 기존 위치에서 사각형 지움
    undraw();
    // 그리드 왼쪽 끝에 닿았는지 확인 T/F 값 반환
    const leftEdge = current.some(idx => (currentPos + idx) % gridWidth === 0);
    // 그리드 끝에 닿지 않았으면 현재 위치 값 감소
    if (!leftEdge) currentPos -= 1;
    if (current.some(idx => squares[currentPos + idx].classList.contains('block2'))) {
        currentPos += 1;
    }
    // 이동한 위치에 사각형 생성
    draw();
}

//  테트로미노 회전
function rotate() {
    // 기존 사각형 지움
    undraw();
    // 현재 회전값 증가시킴
    currentRotation++;
    // 증가한 값이 범위(4)를 벗어난 경우 0으로 되돌리기
    if (currentRotation === current.length) {
        currentRotation = 0;
    }
    // 현재 테트로미노의 회전 값 업데이트
    current = theTetrominoes[random][currentRotation];
    // 바뀐 회전값으로 사각형 생성
    draw();
}

const displayWidth = 4;
const displayIndex = 0;
let nextRandom = 0;

// 작게 보여줄 테트로미노 크기 지정
const smallTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* lTetromino */
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], /* zTetromino */
    [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tTetromino */
    [0, 1, displayWidth, displayWidth + 1], /* oTetromino */
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iTetromino */
]

// 다음에 나올 테트로미노 작게 보여주기
function displayPrev() {
    displaySquares.forEach(square => {
        square.classList.remove('block');
    });
    smallTetrominoes[nextRandom].forEach(idx => {
        displaySquares[displayIndex + idx].classList.add('block');
    });
}

// 테트로미노 멈추기
function freeze() {
    // 현재 테트로노미가 끝에 닿았거나 밑에 쌓인 테트로노미에 닿은 경우에 멈춤
    if (current.some(idx => squares[currentPos + idx + gridWidth].classList.contains('block3') || squares[currentPos + idx + gridWidth].classList.contains('block2'))) {
        // 현재 테트로미를 정지시키고 쌓음
        current.forEach(idx => squares[idx + currentPos].classList.add('block2'));
        // 랜덤값 업데이트
        random = nextRandom;
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        current = theTetrominoes[random][currentRotation];

        // 다음에 올 새로운 테트로노미를 위해 현재위치 초기화
        currentPos = 4;
        // 새 테트로노미 생성
        draw();
        // 다음에 올 테트로노미 업데이트
        displayPrev()
        // 게임오버될 경우
        gameOver();
        // 스코어 증가
        addScore();
    }
}


// 시작 버튼 이벤트
startBtn.addEventListener('click', () => {
    // timerId 가 있는 경우 멈추고 아닐 경우에 실행
    if (timerId) {
        startBtn.innerText = "START";
        clearInterval(timerId);
        clearInterval(playTimer);
        timerId = null;
    } else {
        startBtn.innerText = "STOP";
        draw();
        // 1초 간격으로 테트로노미가 밑으로 움직임
        timerId = setInterval(moveDown, 1000);
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        displayPrev();
        // 플레이 시간 카운트
        playTimer = setInterval(timeCount, 1000);
    }
});


// 게임 오버
function gameOver() {
    if (current.some(idx => squares[currentPos + idx].classList.contains('block2'))) {
        clearInterval(timerId);
        clearInterval(playTimer);
    }
}

// 스코어 갱신
function addScore() {
    // 현재 테트로노미의 인덱스가 그리드 범위 안에 있을 경우
    for (currentIndex = 0; currentIndex < 199; currentIndex += gridWidth) {
        // 현재 테트로노미가 있는 가로 줄 전체
        const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4, currentIndex + 5, currentIndex + 6, currentIndex + 7, currentIndex + 8, currentIndex + 9];
        // 쌓인 테트로노미들이 한 줄을 다 채울 경우 해당 줄을 지우고 점수와 라인수 증가
        if (row.every(idx => squares[idx].classList.contains('block2'))) {
            score += 10;
            lines += 1;
            scoreBoard.innerText = score;
            linesBoard.innerText = lines;
            row.forEach(idx => {
                squares[idx].classList.remove('block2') || squares[idx].classList.remove('block');
            });

            const squaresRemoved = squares.splice(currentIndex, gridWidth);
            squares = squaresRemoved.concat(squares);
            squares.forEach(cell => grid.appendChild(cell));
        }
    }
}


// 플레이 시간
function timeCount() {
    playSec++;
    playTime.innerText = `${playSec}sec`;
}

//  게임 초기화
function gameReset() {
    // 그리드 초기화
    squares.forEach(square => {
        if (square.classList.contains('block') || square.classList.contains('block2')) {
            square.classList.remove('block');
            square.classList.remove('block2');
        }
    });
    // 플레이 시간 초기화
    playSec = 0;
    playTime.innerText = `${playSec}sec`;
    clearInterval(timerId);
    clearInterval(playTimer);
    timerId = null;
    // 버튼 수정
    startBtn.innerText = "START";
    // 위치 초기화
    currentPos = 4;
    // 테트로노미 초기화
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
}

resetBtn.addEventListener('click', gameReset);