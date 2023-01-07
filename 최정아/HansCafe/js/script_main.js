//1.approach영역
//이벤트를 불러오는 메소드
// 어떤 이벤트? 스크롤 이벤트와 윈도우 사이즈를 리사이즈할때 다음과 같은 함수가 실행됨
// 이벤트 헨들러를 적음.
// 변수 var = 값이 비어있는 그릇
// scrollPos(변수이름)에는  초기값을 0으로 둠
// scrollTop의 위치값이 변수 scrollPos에 대입이됨
// fix라는 함수를 호출함
// if 조건문, 변수 scrollPos에 스크롤의 위치값이 1250보다 크면 다음과 같은 함수를 실행
// .fix .text에 addClass가 포지션이 fix가 되고 Y축으로 센터에 위치하도록 만든것이
// onclass였는데 그게 아닐겨우, onclass가 remove class가 되어라
$(window).on("scroll resize", function () {
  var scrollPos = 0;
  scrollPos = $(document).scrollTop();
  fix();

  function fix() {
    if (scrollPos > 1250) {
      $(".fix .text").addClass("on");
    } else {
      $(".fix .text").removeClass("on");
    }
    if (scrollPos > 2700) {
      $(".fix .text").removeClass("on");
    }
  }
});
