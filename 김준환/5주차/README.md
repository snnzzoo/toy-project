# 뱀게임🐍

## 필요한 js메서드
- querySelector()
- addEventListener()
- setInterval()
- keyCodes
- pop()
- push()
- Array.prototype.unshift()
- classList.contains()
- classList.add()
- classList.remove()

### setInterval
```javascript
const timerId = setInterval(func|code[, delay, param1, param2,...])
```
두 번째 인수로 전달받은 시간만큼 반복하여 func을 실행시킨다.

### keyCodes
> 키보드의 문자 및 기능을 특정 코드로 정해놓은 것
https://blog.outsider.ne.kr/322

### Array.prototype.unshift
```javascript
const arr = [1, 2]

// 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 length 값을 반환한다.
let result = arr.unshift(3,4)
console.log(result) //4

//unshift 메서드는 원본 배열을 직접 변경한다.
console.log(arr) //[3, 4, 1, 2]
```
배열의 맨 앞에 추가하여 배열을 변경시켜준다. 또한 그 값은 추가된 배열의 전체 길이이다.

### element.classList
element의 클래스 목록 접근 => css class 변경 가능

- contain
- add
- remove


<br>
<br>

---

### level 쉬움
![](https://velog.velcdn.com/images/hvvany/post/991de121-cef8-4720-b886-eead1f487f4d/image.gif)

### level 어려움
![](https://velog.velcdn.com/images/hvvany/post/40fd0698-acc3-404c-b3e6-77de1204a5b9/image.gif)