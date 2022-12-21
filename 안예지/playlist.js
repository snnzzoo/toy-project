// *********** SELECT ITEMS ***********
const alert = document.querySelector('.alert');
const form = document.querySelector('.playlist-form');
const playlist = document.getElementById('playlist');
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.playlist-container')
const list = document.querySelector('.playlist-list')
const clearBtn = document.querySelector('.clear-btn')

// edit option
let editElement;
let editFlag = false;
let editID = "";
// *********** EVENT LISTENERS ***********
// submit form
form.addEventListener('submit', addItem)
// 모두 지우기
clearBtn.addEventListener('click', clearItems)
// 콜백함수 addItem를 따로 작성
function addItem(e) {
    // form의 기본 이벤트를 제거한다.
    e.preventDefault();
    //console.log(playlist.value);
    const value = playlist.value;
    // value가 있으면 참, 없으면 거짓
    if (value) {
        console.log('value is truthy')
    }
    // 무슨 의미지? unique id?
    const id = new Date().getTime().toString()
    // console.log(id);
    // 3가지 조건

    /* 빈 문자열이 아니고, 편집모드가 아닌 경우
    => 리스트에 아이템을 추가할 때 */
    if (value && !editFlag) {
        // console.log('add item to the list')
        const element = document.createElement('article');
        // add class
        element.classList.add('playlist-item');
        // add id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.insertAdjacentHTML('beforeend', `                    
        <p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <span class="material-symbols-outlined">
                    edit_note
                </span>
            </button>
            <button type="button" class="delete-btn">
                <span class="material-symbols-outlined">
                    remove
                </span>
            </button>
        </div>`);
        // append child
        list.appendChild(element);
        // display alert
        displayAlert('항목이 추가되었습니다.', 'success');
        // show container
        container.classList.add('show-container');
        // 새로고침하면 사라지니까 local storage 저장 필요
        // add to local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault()
    }
    // 빈 문자열이 아니고, 편집모드인 경우
    else if (value && editFlag) {
        console.log('editing')
    }
    // 그 밖의 경우
    else {
        // console.log('empty value')
        displayAlert('제목을 입력해주세요.', 'danger');


    }
}
// 알림창을 띄우는 경우
function displayAlert(text, action) {
    alert.textContent = text;
    // action 값이 danger인지 success인지에 따라 클래스를 다르게 줘야하므로
    alert.classList.add(`alert-${action}`);

    // 알림창 언제 없앨래?
    setTimeout(function () {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1000)
}
// 모두 삭제
function clearItems() {
    const items = document.querySelectorAll('.playlist-item');

    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        });
    }
    // 목록 초기화가 되면 item이 없으니 다시 안 보이게
    container.classList.remove('show-container')
    displayAlert('목록이 초기화되었습니다.', 'success')
    setBackToDefault();
    // localStorage.removeItem('list');
}
/* set back to default 폼을 초기화한다?
(편집 모드를 종료하고, 추가 버튼의 값도 초기화) */
function setBackToDefault() {
    // console.log('set back to default');
    playlist.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = '추가';
}
// *********** LOCAL STORAGE ***********
function addToLocalStorage(id, value) {
    console.log('added to local storage');
}
// *********** SETUP ITEMS ***********