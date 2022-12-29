// 탭 메뉴 전체 가져오기
const tabMenus = document.querySelectorAll('.tabs');
//  탭 메뉴 섹션 전체 가져오기
const tabSects = document.querySelectorAll('.tab-sect');

// 각각의 탭 메뉴에 클릭 이벤트 적용
tabMenus.forEach((tab, idx) => {
    // tab - 각각 탭 메뉴, idx -선택 탭 메뉴의 인덱스
    tab.addEventListener('click', function (e) {
        // 탭 메뉴 인덱스로 현재 선택된 탭 메뉴 섹션 찾아서 현재 섹션 지정
        let curSect = tabSects[idx];
        // 전체 탭 메뉴 섹션에 클래스 제거
        tabSects.forEach(function (sect) {
            sect.classList.remove('activate');
        });
        // 현재 선택된 탭 메뉴 섹션에 클래스 추가
        curSect.classList.add('activate');
    });
});
