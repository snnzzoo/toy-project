<div align="center">

# 4주차 과제 제출

## Lorem Ipsum 만들기 ⭐️

<br>

![Lorem Ipsum 움짤](../4%EC%A3%BC%EC%B0%A8_LoremIpsum/LoremIpsum.gif)

<br>
전체 코드는 파일을 통해 확인해주세요!

js 코드는 아래에!
<br>
<br>

</div>

```js
// js

// 단어가 저장된 리스트
const text = [
  `가가시`,
  `가가호호`,
  `가각`,
  `가각본`,
  `가간`,
  `가다니`,
  `가닥`,
  `가개`,
  `가게`,
  `가기`,
  `가까이`,
  `가난`,
  `가님`,
  `가다귀`,
  `가대기`,
  `가두리`,
  `가디기`,
  `가라지`,
  `가라치`,
  `가락`,
  `가락지`,
  `가랑비`,
  `가랑이`,
  `가랑잎`,
  `가래`,
  `가래떡`,
  `가래침`,
  `가랫날`,
  `가랫대`,
  `가랫밥`,
  `가랫장`,
  `가랭이`,
  `가로`,
  `가로결`,
  `가뢰`,
  `가루`,
  `가루이`,
  `가르마`,
  `가름`,
  `가르침`,
  `가르새`,
  `가름둑`,
  `가리`,
  `가리기`,
  `가리온`,
  `가리질`,
  `가리찜`,
  `가리치`,
  `가림꼴`,
  `가림단`,
  `가림담`,
  `가림새`,
  `가림빛`,
  `가림자`,
  `가림집`,
  `가마`,
  `가마니`,
  `가마괴`,
  `가마목`,
  `가마등`,
  `가마치`,
  `가마채`,
  `가마통`,
  `가마티`,
  `가말`,
  `가맛목`,
  `가맛전`,
  `가망`,
  `가망굿`,
  `가멸`,
  `가모티`,
  `가무락`,
  `가무치`,
  `가문비`,
  `가물`,
  `가물음`,
  `가물철`,
  `가물치`,
  `가뭄`,
  `가미`,
  `가방`,
  `가베`,
  `가보`,
  `가비차`,
  `가빠`,
  `가사리`,
  `가살`,
  `가새`,
  `가스리`,
  `가스새`,
  `가슴`,
  `가시`,
  `가싀엄`,
  `가시리`,
  `가시눈`,
  `가시박`,
  `가심`,
  `가야미`,
  `가야지`,
  `가열`
];

// form = 단어의 개수를 받는 폼
const form = document.querySelector(".lorem-form");
// amount = 단어의 개수 입력받는 input
const amount = document.getElementById("amount");
// 결과로 나오는 단어(들)
const result = document.querySelector(".lorem-text");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  // parseInt로 string을 int로 바꿔줌
  const value = parseInt(amount.value);
  // const random = Math.floor(Math.random() * text.length);

  // 100 이하의 양수가 아닌 경우
  if (isNaN(value) || value <= 0 || value > 100) {
    result.innerHTML = `<p class="result">100 이하의 양수를 적어주세요! 🤬</p>`;
  }
  // 100 이하의 양수인 경우
  else {
    let tempText = text.slice(0, value);
    tempText = tempText
      .map(function(item) {
        return `<p class="result">${item}</p>`;
      })
      .join("");
    result.innerHTML = tempText;
  }
});
```
