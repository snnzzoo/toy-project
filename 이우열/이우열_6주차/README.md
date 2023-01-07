# Promise9 팬 페이지

<br>

![index](README.assets/index.gif)

<br>

<br>

## 프로미스나인 팬 페이지 제작

참고 : [[한스케이크](http://hanscake.co.kr/)]

<br>

### Html, SCSS, Javascript 사용

#### scss를 css로 변형하는 명령어

```bash
$ npx sass --watch css/style.scss css/style.css
```

- `npx` : Node Package eXecute의 약자. 즉, 노드 패키지를 실행하라는 뜻
- `--watch` : 소스에 변형이 일어날 때마다 자동으로 컴파일을 시켜주는 명령어
- `css/style.scss css/style.css` : 'css폴더 안의 style.scss가 css폴더 안의 style.css파일로'라는 뜻

<br>

#### css 안에서 반복문을 사용하기 위해 scss 사용

```css
// scss
@for $i from 1 to 5{
  .tap#{$i}:hover .content#{$i}{
    display: block;
  }
}

// css
.tap1:hover .content1 {
  display: block;
}

.tap2:hover .content2 {
  display: block;
}

.tap3:hover .content3 {
  display: block;
}

.tap4:hover .content4 {
  display: block;
}
```

- 위와 같이 for문을 사용한 scss 코드는 아래의 css 코드로 변형됨

<br>

#### Javascript

```js
// 배너 움직임 함수
function moveBanner() {
  // 배너의 총 길이 안에서 돌 수 있도록 나머지로 처리
  bannerCounter %= banners.length;
  
  // 카운터에 의해 배너가 X축으로 이동
  banners.forEach((banner) => {
    banner.style.transform = `translateX(-${bannerCounter * 100}%)`;
  });
  
  // 시간을 3초 간격으로 배너가 움직이도록 설정
  setTimeout(moveBanner, 3000);
  
  // 배너를 한 칸 뒤로
  bannerCounter += 1;
}
```

- 두 개의 캐러셀을 메인 디자인으로 사용
- `setTimeout` 함수를 통해 시간 간격을 두고 함수를 실행

<br>

## 실패 (수정 사항)

- 자바스크립트 함수 실행 당시 시간 간격을 둔 경우에 배너가 이동한 뒤 시간을 초기화하여 추가로 시간이 지난 뒤 다음 함수가 실행되고자 했지만 고정된 시간이 계속 지나면 함수가 자동으로 실행됨
  - 1초가 지난 뒤 다음 버튼을 눌렀을 경우 3초가 추가로 지나야 자동으로 다음 배너로 이동해야 하지만 2초가 지나면 다음으로 넘어감.. 해결 필요