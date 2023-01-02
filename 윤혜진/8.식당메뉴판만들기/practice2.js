const filterBtnList = document.querySelector('#filter-btn-list')
const totCategories = JSON.parse(JSON.stringify(categories))
const menuList = document.querySelector('#menu-list')
const menus = JSON.parse(JSON.stringify(data))



// '필터 버튼들'을 화면에 보여주는 함수
const displayFilterBtns = function () {
  const filterBtns = totCategories.map(function (category) {
    content = `
      <button class="filter-btn" type="button" data-category=${category.name}>
        <img src=${category.image} alt="">
        ${category.name}
      </button>
      `
    return content
  })
  filterBtnList.innerHTML = filterBtns.join('\n')

  // '필터 버튼'을 클릭할 경우
  const btnTags = filterBtnList.querySelectorAll('.filter-btn')
  whenClickFilterBtn(btnTags)
}



// '메뉴'를 화면에 보여주는 함수
const displayMenuItems = function (menuItems) {
  const items = menuItems.map(function (item) {
    content = `
      <article class="menu">
        <img class="menu-image" src=${item.image} alt="메뉴이미지">
        <div>
          <div class="menu-title">
            <h5>${item.name}</h5>
            <p class="price">${item.price.toLocaleString()}원</p>
          </div>
          <div class="menu-text">
            <p>
              ${item.description}
            </p>
          </div>
        </div>
      </article>
      `
    return content
  })
  menuList.innerHTML = items.join('\n')
}



// '필터 버튼' 클릭 시, 해당 버튼의 클래스에 active 추가 / 해당하는 메뉴 데이터 DOM 추가
const whenClickFilterBtn = function (btnTags) {
  btnTags.forEach(function (btnTag) {
    btnTag.addEventListener('click', function (event) {
      // 모든 버튼의 클래스에 active 제거
      for (let btn of btnTags) {
        btn.classList.remove('active')
      }

      // 클릭한 버튼의 클래스에만 active 추가
      event.currentTarget.classList.add('active')

      // 클릭한 버튼에 해당하는 메뉴들만 DOM 추가
      category = event.currentTarget.dataset.category
      const filterMenus = menus.filter(function (menu) {
        return menu.category === category
      })

      if (category === '전체메뉴') {
        displayMenuItems(menus)
      } else {
        displayMenuItems(filterMenus)
      }
    })
  })
}


// 로딩 화면에 '필터 버튼들'과 '전체 메뉴'가 보이게 DOM 추가
window.addEventListener('DOMContentLoaded', function () {
  displayFilterBtns()
  displayMenuItems(menus)
})