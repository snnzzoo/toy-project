const btns = document.querySelectorAll('button') // 모든 버튼
const result = ['LOSE', 'DRAW', 'WIN'] // 결과를 array로 표현, 인덱스 이용
// const RESULT_LOGS 추가 기능 변수

// 어느 버튼이 눌리더라도, 결과는 랜덤이기 때문에
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function () {
    const answer = Math.floor(Math.random() * 3) // 0~2까지 숫자 3개 무작위 추출

    if (answer === 0) {
      document.querySelector('.game-result').innerHTML = result[0] // 패배 결과
      document.querySelector('.container').style.backgroundColor = 'red';
      document.querySelector('.content').style.color = 'black';

      // const log = document.querySelector('.goodGame'); // 추가 기능 코드
      // log.append = `<li style='background-color: red'>${result[0]}</li>`
    } else if (answer === 1) {
      document.querySelector('.game-result').innerHTML = result[1] // 무승부 결과
      document.querySelector('.container').style.backgroundColor = 'yellow';
      document.querySelector('.content').style.color = 'black';
    } else {
      document.querySelector('.game-result').innerHTML = result[2] // 승리 결과
      document.querySelector('.container').style.backgroundColor = 'blue';
      document.querySelector('.content').style.color = 'white';
    }
  })
}