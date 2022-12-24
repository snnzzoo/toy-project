// button 클릭 시, article.collapse 태그의 클래스에 'show' 토글
// 'show'가 추가된 article은 css에 의해 .body 부분이 나타나게 됨
const moreBtns = document.querySelectorAll('.more-btn')
const collapseTags = document.querySelectorAll('.collapse')

moreBtns.forEach(function (moreBtn) {
  moreBtn.addEventListener('click', function (event) {
    // 클릭한 버튼의 innerText를 + ↔ - 변경
    event.target.innerText = event.target.innerText == '+' ? '-' : '+'

    // 해당 article의 클래스에 'show' 토글
    event.target.parentNode.parentNode.classList.toggle('show');

    // 다른 버튼의 innerText는 모두 +로 변경
    for (let btn of moreBtns) {
      if (btn != event.target) {
        btn.innerText = '+'
      }
    }

    // 다른 article의 클래스에는 'show' 삭제
    for (let tag of collapseTags) {
      if (tag != event.target.parentNode.parentNode) {
        tag.classList.remove('show')
      }
    }
  })
})