const allBtn = document.querySelectorAll('.tab-button');
const allContent = document.querySelectorAll('.tab-content');

for (let i = 0; i < allBtn.length; i++) {
  allBtn[i].addEventListener('click', function () {
    for (let i = 0; i < allBtn.length; i++) {
      allBtn[i].classList.remove('orange');
    }

    for (let i = 0; i < allContent.length; i++) {
      allContent[i].classList.remove('show');
    }

    allBtn[i].classList.add('orange');
    allContent[i].classList.add('show');
  })
}
