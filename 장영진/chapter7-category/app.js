const categories = document.querySelectorAll('.category-title');
const allCategoryPosts = document.querySelectorAll('.all');

for (let i = 0; i < categories.length; i++) {
  categories[i].addEventListener('click', filterPosts.bind(this, categories[i]));
}

function filterPosts(item) {
  changeActivePosition(item);
  for (let i = 0; i < allCategoryPosts.length; i++) {
    if (allCategoryPosts[i].classList.contains(item.attributes.id.value)) {
      allCategoryPosts[i].style.display = "block";
    } else {
      allCategoryPosts[i].style.display = "none";
    }
  }
}

function changeActivePosition(activeItem) {
  for (let i = 0; i < categories.length; i++) {
    categories[i].classList.remove('active');
  }
  activeItem.classList.add('active');
};