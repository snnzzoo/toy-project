months = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

week = [
  'Sun',
  'Mon',
  'Tues',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
]

let releaseDate = new Date(2023, 0, 2, 18, 00);
console.log(releaseDate);

// const year = releaseDate.getFullYear();
// console.log(year);
// const month = releaseDate.getMonth();
// console.log(months[month]);
// const weekday = releaseDate.getDay();
// console.log(weekday);
// console.log(week[weekday]);
// const hour = releaseDate.getHours();
// console.log(hour);
// const minute = releaseDate.getMinutes();
// console.log(minute);
const boxContents = document.querySelectorAll('.box-content');
const releaseTime = releaseDate.getTime();
console.log(releaseTime);

function timeRemaining() {
  const now = new Date().getTime();
  const dif = releaseTime - now;
  // 하루 ms로 바꾸기
  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;
  let d = dif / day;
  d = Math.floor(d);
  let h = (dif % day) / hour;
  h = Math.floor(h);
  let m = (dif % hour) / minute;
  m = Math.floor(m);
  let s = (dif % minute) / 1000;
  s = Math.floor(s);
  console.log(d, h, m, s)

  const timeValues = [d, h, m, s];
  function format(boxContent) {
    if (boxContent < 10) {
      return (boxContent = `0${boxContent}`);
    }
    return boxContent;
  }

  boxContents.forEach(function (boxContent, index) {
    boxContent.innerText = format(timeValues[index]);
  });
}

let countDown = setInterval(timeRemaining, 1000);
// timeRemaining();


// 1s = 1000ms
// 1m = 60s
// 1hr = 60min
// 1d = 24hr
// 768864766