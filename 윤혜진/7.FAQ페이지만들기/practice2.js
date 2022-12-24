// button 클릭 시, article.question 태그의 클래스에 'show-text' 토글
const questions = document.querySelectorAll('.question')

questions.forEach(function (question) {
  const btn = question.querySelector('.question-btn')

  btn.addEventListener('click', function () {
    // 해당 article의 클래스에 'show-text' 토글
    question.classList.toggle('show-text')

    // 다른 article의 클래스에는 'show-text' 삭제
    questions.forEach(function (q) {
      if (q !== question) {
        q.classList.remove('show-text')
      }
    })
  })
})