const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

slides.forEach(function(slide, index) {
  console.log(slide)
  slide.style.left = `${index * 100}%`;
});

let counter = 0;
prevBtn.addEventListener('click', function() {
  counter--;
  carousel();
});
nextBtn.addEventListener('click', function() {
  counter++;
  carousel();
});

function carousel() {
  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`
  });
}