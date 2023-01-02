// 메뉴 리스트에 메뉴를 추가해주는 함수
const addMenu = function (menu, menuList) {
  content = `
  <article class="menu">
    <img class="menu-image" src="${menu['image']}"
      alt="메뉴이미지">
    <div>
      <div class="menu-title">
        <h5>${menu['name']}</h5>
        <p class="price">${menu['price'].toLocaleString()}원</p>
      </div>
      <div class="menu-text">
        <p>${menu['description']}</p>
      </div>
    </div>
  </article>
  `
  menuList.insertAdjacentHTML('beforeend', content)
}



// 첫 화면에는 '전체 메뉴'가 보이게 모든 메뉴 데이터 DOM 추가
const menuList = document.querySelector('#menu-list')
const menus = JSON.parse(JSON.stringify(data))

for (let key in menus) {
  for (let menu of menus[key]) {
    addMenu(menu, menuList)
  }
}



// 카테고리 탭 클릭 시, 해당 탭의 클래스에 active 추가 / 해당하는 메뉴 데이터 DOM 추가
const tabs = document.querySelectorAll('.category')

tabs.forEach(function (tab) {
  tab.addEventListener('click', function (event) {
    // 모든 탭의 클래스에 active 제거
    for (let item of tabs) {
      item.classList.remove('active')
    }

    // 클릭한 탭의 클래스에만 active 추가
    event.currentTarget.classList.add('active')

    // 모든 메뉴 삭제
    while (menuList.firstChild) {
      menuList.removeChild(menuList.firstChild)
    }

    // 클릭한 탭에 해당하는 메뉴들만 DOM 추가
    category = event.currentTarget.innerText
    if (category === '전체메뉴') {
      for (let key in menus) {
        for (let menu of menus[key]) {
          addMenu(menu, menuList)
        }
      }
    } else {
      for (let menu of menus[category]) {
        addMenu(menu, menuList)
      }
    }
  })
})