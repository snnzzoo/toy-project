const btns = document.querySelectorAll('button') // 모든 버튼
const oddsDisplay = document.querySelector('.odds') // 승률 디스플레이
const result = ['LOSE', 'DRAW', 'WIN'] // 결과를 array로 표현, 인덱스 이용
const resultDisplay = document.querySelector('.goodGame'); // 추가 기능 코드

let cnt = 0; // 경기 수
let numberOfMatches = 0; // 승률 책정에 필요한 경기 수
let numberOfWins = 0; // 승리 수
let numberOfDraws = 0;
let odds = 0; // 승률



// 어느 버튼이 눌리더라도, 결과는 랜덤이기 때문에
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function () {
    const answer = Math.floor(Math.random() * 3) // 0~2까지 숫자 3개 무작위 추출

    if (answer === 0) {
      document.querySelector('.game-result').innerHTML = result[0] // 패배 결과
      document.querySelector('.container').style.backgroundColor = 'red';
      document.querySelector('.container').style.color = 'black';

      numberOfMatches += 1;
      cnt += 1;
      odds = Math.round(numberOfWins / numberOfMatches * 100);

      document.querySelector('.matches').innerHTML = cnt;
      document.querySelector('.loses').innerHTML = numberOfMatches - numberOfWins;
      createLog(answer, odds)

    } else if (answer === 1) {
      document.querySelector('.game-result').innerHTML = result[1] // 무승부 결과
      document.querySelector('.container').style.backgroundColor = 'yellow';
      document.querySelector('.container').style.color = 'black';

      // numberOfMatches++; 무승부는 승률 책정되지 않는다
      cnt += 1;
      numberOfDraws += 1;

      document.querySelector('.matches').innerHTML = cnt;
      document.querySelector('.draw').innerHTML = numberOfDraws;
      createLog(answer)

    } else {
      document.querySelector('.game-result').innerHTML = result[2] // 승리 결과
      document.querySelector('.container').style.backgroundColor = 'blue';
      document.querySelector('.container').style.color = 'white';

      cnt += 1;
      numberOfMatches += 1;
      numberOfWins += 1;
      odds = Math.round(numberOfWins / numberOfMatches * 100);

      document.querySelector('.matches').innerHTML = cnt;
      document.querySelector('.wins').innerHTML = numberOfWins;
      createLog(answer, odds)
    }
  })
}

// 승패 여부 기록을 남기는 함수
function createLog(answer, odds) {
  const log = document.createElement('li');

  if (answer === 0) {
    log.innerHTML = 'LOSE';
    log.style.color = 'red';
    resultDisplay.appendChild(log);
    oddsDisplay.innerHTML = odds;
  } else if (answer === 1) {
    log.innerHTML = 'DRAW';
    log.style.color = 'black';
    resultDisplay.appendChild(log);
  } else {
    log.innerHTML = 'WIN';
    log.style.color = 'blue'
    resultDisplay.appendChild(log);
    oddsDisplay.innerHTML = odds;
  }
}