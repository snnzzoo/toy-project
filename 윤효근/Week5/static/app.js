document.addEventListener('DOMContentLoaded', () => {
    // TODO: we can also get the grid size from user
    const GRID_WIDTH = 10
    const GRID_HEIGHT = 20
    const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT

    const grid = createGrid();
    let squares = Array.from(grid.querySelectorAll('div'))
    const startBtn = document.querySelector('.button')
    const hamburgerBtn = document.querySelector('.toggler')
    const menu = document.querySelector('.menu')
    const span = document.getElementsByClassName('close')[0]
    const scoreDisplay = document.querySelector('.score-display')
    const linesDisplay = document.querySelector('.lines-score')
    const levelDisplay = document.querySelector('.level')
    let currentIndex = 0
    let currentRotation = 0
    const width = 10
    let score = 0
    let lines = 0
    let timerId
    let nextRandom = 0
    let level = 1
    const colors = [
        'url(static/blue_block.png)',
        'url(static/pink_block.png)',
        'url(static/purple_block.png)',
        'url(static/peach_block.png)',
        'url(static/yellow_block.png)'
    ]


    function createGrid() {
        // div 생성 (테트리스 게임 판)
        let grid = document.querySelector(".grid")
        for (let i = 0; i < GRID_SIZE; i++) {
            let gridElement = document.createElement("div")
            grid.appendChild(gridElement)
        }

        // 바닥 생성
        for (let i = 0; i < GRID_WIDTH; i++) {
            let gridElement = document.createElement("div")
            gridElement.setAttribute("class", "block3")
            grid.appendChild(gridElement)
        }

        let previousGrid = document.querySelector(".previous-grid")
        // Since 16 is the max grid size in which all the Tetrominoes
        // can fit in we create one here
        for (let i = 0; i < 16; i++) {
            let gridElement = document.createElement("div")
            previousGrid.appendChild(gridElement);
        }
        return grid;
    }


    //키배정
    function control(e) {
        if (e.keyCode === 39)
            moveright()
        else if (e.keyCode === 38)
            rotate()
        else if (e.keyCode === 37)
            moveleft()
        else if (e.keyCode === 40)
            moveDown()
        else if (e.keyCode === 32)
            moveDownFast()
    }

    // 아래 방향키를 눌렀을때 계속 내려가게 설정
    document.addEventListener('keydown', control)

    //블럭 설정
    const lTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
        [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
    ]

    const zTetromino = [
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
    ]

    const tTetromino = [
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
    ]

    const iTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    //블럭 랜덤 생성 하기
    let random = Math.floor(Math.random() * theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]


    //move the Tetromino moveDown
    let currentPosition = 4

    //블럭 그리기
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('block')
            squares[currentPosition + index].style.backgroundImage = colors[random]
        })
    }

    //블럭 지우기
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('block')
            squares[currentPosition + index].style.backgroundImage = 'none'
        })
    }

    //블럭 움직임
    function moveDown() {
        undraw()
        currentPosition = currentPosition += width
        draw()
        freeze()
    }

    function moveDownFast() {
        let fwidth = width * 3
        undraw()
        currentPosition = currentPosition += fwidth
        draw()
        freeze()
    }

    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            displayShape()
        }
    })

    //왼쪽 이동 및 이동시 출돌 방지
    function moveright() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        if (!isAtRightEdge) currentPosition += 1
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
            currentPosition -= 1
        }
        draw()
    }

    //오른쪽 이동 및 이동시 충돌 방지
    function moveleft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!isAtLeftEdge) currentPosition -= 1
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
            currentPosition += 1
        }
        draw()
    }

    //모양 고정
    function freeze() {
        // 블럭이 고정 될시(바닥 또는 블럭에 )
        if (current.some(index => squares[currentPosition + index + width].classList.contains('block3') || squares[currentPosition + index + width].classList.contains('block2'))) {
            // 움직이지않는 블럭으로 변경
            current.forEach(index => squares[index + currentPosition].classList.add('block2'))
            // 새 블럭을 생성하기
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }

    freeze()

    //블럭 회전
    function rotate() {
        undraw()
        currentRotation++
        if (currentRotation === current.length) {
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }

    //게임 오버
    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
            scoreDisplay.innerHTML = 'end'
            clearInterval(timerId)
        }
    }

    //다음에 생성될 블럭 보여주기
    const displayWidth = 4
    const displaySquares = document.querySelectorAll('.previous-grid div')
    let displayIndex = 0
    timerId = null

    const smallTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* lTetromino */
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], /* zTetromino */
        [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tTetromino */
        [0, 1, displayWidth, displayWidth + 1], /* oTetromino */
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iTetromino */
    ]

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('block')
            square.style.backgroundImage = 'none'
        })
        smallTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('block')
            displaySquares[displayIndex + index].style.backgroundImage = colors[nextRandom]
        })
    }

    //점수 추가, 레벨 증가
    function addScore() {
        for (currentIndex = 0; currentIndex < GRID_SIZE; currentIndex += GRID_WIDTH) {
            //줄 설정
            const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4, currentIndex + 5, currentIndex + 6, currentIndex + 7, currentIndex + 8, currentIndex + 9]
            //만약 모든 줄에 블럭이 있을시
            if (row.every(index => squares[index].classList.contains('block2'))) {
                score += 10
                lines += 1
                levelDisplay.innerHTML = level
                scoreDisplay.innerHTML = score
                linesDisplay.innerHTML = lines
                //점수를 추가하고 그 줄 없애기
                row.forEach(index => {
                    squares[index].style.backgroundImage = 'none'
                    squares[index].classList.remove('block2') || squares[index].classList.remove('block')

                })
                //줄 땡기기
                const squaresRemoved = squares.splice(currentIndex, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }

        }
        // 만약 점수가 레벨 *100 보다 크면
        if (score > level * 100) {
            // 시간 간격 초기화
            clearInterval(timerId)
            // 떨어지는 간격 다시 설정
            timerId = setInterval(moveDown, 1010 - level * 10)
            // 점수가 0일때 레벨이 이상해지는 현상 방지
            if (score !== 0)
                // 점수가 0이 아닐때만 점수 / 100 으로 레벨 설정
                if (Math.floor(score / 100) < 1)
                    // 소수점을 제거한 값이 1 이하이면 레벨을 1로 고정
                    level = 1
                else
                    level = Math.floor(score / 100)
            else
                level = 1
        }
    }

    //Styling eventListeners
    hamburgerBtn.addEventListener('click', () => {
        menu.style.display = 'flex'
    })
    span.addEventListener('click', () => {
        menu.style.display = 'none'
    })

})