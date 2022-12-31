// DOMcontent가 load 될 경우 함수 실행
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const doodler = document.createElement("div");
    // doodler의 초기 왼쪽 공간 설정
    let doodlerLeftSpace = 50;
    // doddler의 시작 위치 설정
    let startPoint = 150
    let doodlerBottomSpace = startPoint;
    // 게임이 종료됐는지 판단하는 논리값
    let isGameOver = false;
    // 표시할 블록 갯수 설정
    let platformCount = 5;
    // 생성되는 블록을 리스트로 관리
    let platforms = [];
    // 점프중인지 판단
    let isJumping = true;
    // 왼쪽으로 가는 중인지
    let isGoingLeft = false;
    // 오른쪽으로 가는중인지
    let isGoingRight = false;
    // 올라가는지 내려가는지 왼쪽으로 가는지 오른쪽으로 가는중인지 판단하는 값들
    let upTimerId;
    let downTimerId;
    let leftTimerId;
    let rightTimerId;
    // 점수
    let score = 0;

    // Doodler 생성하는 함수
    function createDoodler() {
        doodler.classList.add("doodler");
        // 생성된 platform들의 리스트에서 처음값을 뽑아서 시작 위치를 잡아준다.
        doodlerLeftSpace = platforms[0].left;
        // 잡아준 시작위치를 doodler에 넣어준다.
        doodler.style.left = doodlerLeftSpace + "px";
        // 처음 생성된 doodler의 bottom은 초기값으로 설정된 startpoint를 가져오게된다.
        doodler.style.bottom = doodlerBottomSpace + "px";
        container.appendChild(doodler)
    }

    // Platform class 생성
    class Platform {
        // 객체 생성자 역할 ()안의 값은 인자로 들어오는 값
        constructor(newPlatBottom) {
            // 생성된 객체의 bottom 값은 인자로 들어온 값
            this.bottom = newPlatBottom;
            // 315라는 너비는 전체너비 - 185를 뺀 값으로 함 두들의 너비 + 양옆 끝부분에 블록이 안가도록
            this.left = Math.random() * 315;
            // div라는 요소를 만들어서 Platform 이라는 객체에 visual 이라는 변수에 넣어줌
            this.visual = document.createElement("div");

            // visual 변수생성해서 this.visual 을 넣어줌 (div)
            const visual = this.visual
            // visual에 platform class 추가
            visual.classList.add("platform");
            // visual의 style에 this.left 와 this.bottom의 값을 넣어서 블록들을 생성해줌.
            visual.style.left = this.left + "px";
            visual.style.bottom = this.bottom + "px";
            container.appendChild(visual)
        }
    }

    // platform(블록)이 움직이는 동작방식
    function movePlatforms() {
        // BottomSpace값들이 움직일때마다 갱신됨으로 200을 기준으로 설정해줌
        if (doodlerBottomSpace > 200) {
            // platforms라는 리스트를 각각 반복분 돌림
            platforms.forEach(platform => {
                platform.bottom -= 4;
                // movePlatforms에서 사용할 visual 변수선언 하여 platform들의 visual 값을 넣어줌
                let visual = platform.visual;
                // visual의 bottom 값들을 계속 업데이트 해줌 새로운 변수를 만들었기 때문에
                visual.style.bottom = platform.bottom + "px";

                // platform의 bottom 값이 10 이하 아래로 내려갔을경우 => 화면에서 안보일정도로
                if (platform.bottom < 10) {
                    // firstPlatform 이라는 변수에 platforms 리스트의 젤 처음 값의 visual 을 넣어주고class를 제거하여 블록이 삭제되는 효과를 준다.
                    let firstPlatform = platforms[0].visual
                    firstPlatform.classList.remove('platform')
                    // 리스트에서도 shift를 통해 값을 제거
                    platforms.shift()
                    // 블록이 없어질때마다 score값 기록
                    score++;
                    // 없어진 블록을 채우기위해 새로운 Platform 생성(container 높이가 600 이기때문에 600 값을 넣어서 위에서 생성되게함)
                    let newPlatform = new Platform(600)
                    // 만든 platform을 platforms 리스트에 넣어서 유지시켜준다.
                    platforms.push(newPlatform)
                }
            })
        }
    }

    // platform 생성
    function createPlatforms() {
        // 내가 설정한 platformCount 만큼 반복문 시행한다. 초기 화면구성을 위해서
        for (let i = 0; i < platformCount; i++) {
            // container 높이를 600으로 설정하여 그 비율에 맞게 platform의 간격을 설정
            let platformGap = 600 / platformCount;
            // i값이 변화함에 따라서 bottom을 설정되게 함.
            let newPlatBottom = 100 + (i * platformGap);
            // class 생성했던 Platform을 통해 만들어준다.
            let newPlatform = new Platform(newPlatBottom);
            // 리스트에 만들어진 platform을 넣는다.
            platforms.push(newPlatform);
        }
    }

    // 위로 튀어오르는 함수
    function jump() {
        // 내려가는 함수가 실행중인경우 취소
        clearInterval(downTimerId);
        // 점프중인 것을 나타냄
        isJumping = true;
        // 올라가는 값을 Interval을 통해서 반복설정
        upTimerId = setInterval(function () {
            // doodler를 bottom space기준으로 20씩 값을 더해간다
            doodlerBottomSpace += 20
            // 더해진 값을 style bottom 에 적용하여 점프하는 것 처럼 보이게해준다.
            doodler.style.bottom = doodlerBottomSpace + "px";
            // 시작점 + 200 값을 넘을 경우 아래로 떨어지게 설정
            if (doodlerBottomSpace > startPoint + 200) {
                fall()
            }
        }, 30)
    }

    // 떨어지는 함수
    function fall() {
        // 마찬가지로 올라가는 함수를 취소해준다.
        clearInterval(upTimerId)
        // 점프가 아닌것을 나타냄
        isJumping = false;
        // 떨어지는 값을 Interval 을 통해 설정
        downTimerId = setInterval(function () {
            // doodler가 bottom space 기준으로 5씩 감소하고
            doodlerBottomSpace -= 5
            // style에서 그 적용된 값들을 넣어줘서 떨어지는 것처럼 보이게한다.
            doodler.style.bottom = doodlerBottomSpace + "px";
            // 만약 height 0~600사이를 벗어나 바닥에 닿을 경우 게임 종료
            if (doodlerBottomSpace <= 0) {
                gameOver();
            }
            // platforms 리스트 각각 반복문과 조건문을 통해서 위치가 유효한지 판단하고 값이 true인 경우 jump 함수와 startpoint를 변경해준다.
            platforms.forEach(platform => {
                if (
                    // doodler 의 위치가 platform 사이에 존재하는지 확인
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= platform.bottom + 15) &&
                    // doodler 의 좌우 범위가 platform 에 존재하는지 확인
                    ((doodlerLeftSpace + 60) >= platform.left) &&
                    (doodlerLeftSpace <= (platform.left + 85)) &&
                    !isJumping
                ) {
                    startPoint = doodlerBottomSpace
                    jump();
                }
            })
        }, 20)
    }


    // 게임 종료
    function gameOver() {
        // gameover인 값을 true로 변경
        isGameOver = true;
        // 모든 추가됐던 값들을 제거해준다. => 백지상태로
        while (container.firstChild) {
            container.removeChild(container.firstChild)
        }
        // replay라는 버튼을 생헝하는 구조
        const replay = document.createElement("img");
        replay.classList.add("replay");
        replay.setAttribute("src", "./replay.png");
        // relpay 버튼을 클릭할 경우 새로고침
        replay.setAttribute("onclick", "location.reload()")
        // 백지상태의 container에 score와 replay를 추가함.
        container.innerHTML = score;
        container.appendChild(replay);
        // 실행됐던 모든 함수들을 종료시킴.
        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
    }

    // 키보드로 조작가능하게 control 함수 생성
    function control(e) {
        // 왼쪽 화살표
        if (e.key === "ArrowLeft") {
            moveLeft()
        }
        // 오른쪽 화살표
        else if (e.key == "ArrowRight") {
            moveRight()
        }
        // 위쪽 화살표
        else if (e.key == "ArrowUp") {
            moveStraight()
        }
    }

    // 왼쪽움직이는 함수
    function moveLeft() {
        // 오른쪽으로 가는 함수가 실행되어있으면 종료
        if (isGoingRight) {
            clearInterval(rightTimerId);
            isGoingRight = false;
        }
        isGoingLeft = true;
        leftTimerId = setInterval(function () {
            if (doodlerLeftSpace >= 0) {
                doodlerLeftSpace -= 5;
                doodler.style.left = doodlerLeftSpace + "px";
            }
            // 왼쪽으로 갈곳이 없고 화면밖으로 나갈경우 오른쪽 움직이는 함수 실행.
            else {
                moveRight();
            }
        }, 20)
    }

    // 오른쪽으로 움직이는 함수
    function moveRight() {
        // 왼쪽으로 가는 함수가 실행되고있을 경우 종료
        if (isGoingLeft) {
            clearInterval(leftTimerId);
            isGoingLeft = false;
        }
        isGoingRight = true;
        rightTimerId = setInterval(function () {
            if (doodlerLeftSpace <= 440) {
                doodlerLeftSpace += 5;
                doodler.style.left = doodlerLeftSpace + "px";
            }
            else {
                moveLeft();
            }
        }, 20)
    }

    // 정지하는 함수
    function moveStraight() {
        isGoingRight = false;
        isGoingLeft = false;
        clearInterval(rightTimerId);
        clearInterval(leftTimerId);
        // 모든 행동을 정지시킴
    }

    // 시작함수
    function start() {
        if (!isGameOver) {
            // 모든 함수들 실행
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms, 20)
            jump()
            // 키보드로 키입력받는 값을 가져옴
            document.addEventListener("keyup", control)
        }
    }
    start()
})