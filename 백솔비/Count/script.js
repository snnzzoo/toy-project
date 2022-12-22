const days = document.querySelector('.days__count');
const hours = document.querySelector('.hours__count');
const mins = document.querySelector('.mins__count');
const secs = document.querySelector('.secs__count');

function countDown() {
  // 현재 시간과 디데이 구할 시간
  const now = new Date();
  const deadline = new Date(2022, 11, 28, 11, 00, 00);

  // 남은 시간 계산
  const diffTime = Math.abs(deadline - now);

  const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
  const diffHours = Math.floor((diffTime / (1000 * 3600)) % 24);
  const diffMins = Math.floor((diffTime / (1000 * 60)) % 60);
  const diffSeconds = Math.floor((diffTime / 1000) % 60);

  // html에 현재 남은 시간 표시
  days.innerHTML = formatTime(diffDays);
  hours.innerHTML = formatTime(diffHours);
  mins.innerHTML = formatTime(diffMins);
  secs.innerHTML = formatTime(diffSeconds);
}

// 10 이하의 수일 경우 01, 02 이런식으로 포멧
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

countDown();

// 초마다 시간 변화
setInterval(countDown, 1000);
