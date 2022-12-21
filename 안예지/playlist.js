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
clearBtn.addEventListener('click', clearItems);
// load items
window.addEventListener('DOMContentLoaded', setupItems);
const deleteBtn = document.querySelector('.delete-btn');
// console.log(deleteBtn);
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
        // // console.log('add item to the list')
        // const element = document.createElement('article');
        // // add class
        // element.classList.add('playlist-item');
        // // add id
        // const attr = document.createAttribute('data-id');
        // attr.value = id;
        // element.setAttributeNode(attr);
        // element.insertAdjacentHTML('beforeend', `                    
        // <p class="title">${value}</p>
        // <div class="btn-container">
        //     <button type="button" class="edit-btn">
        //         <span class="material-symbols-outlined">
        //             edit_note
        //         </span>
        //     </button>
        //     <button type="button" class="delete-btn">
        //         <span class="material-symbols-outlined">
        //             remove
        //         </span>
        //     </button>
        // </div>`);
        // const deleteBtn = element.querySelector('.delete-btn')
        // const editBtn = element.querySelector('.edit-btn');
        // deleteBtn.addEventListener('click', deleteItem);
        // editBtn.addEventListener('click', editItem);

        // // append child
        // list.appendChild(element);
        /* ==========요기까지 createListItem 함수로 대체========= */
        createListItem(id, value)
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
        // console.log('editing')
        editElement.innerHTML = value;
        displayAlert('값이 편집되었습니다.', 'success');
        // edit local storage
        editLocalStorage(editID, value);
        setBackToDefault();
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
    localStorage.removeItem('list');
}
// delete function
function deleteItem(e) {
    // console.log('item deleted');
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length === 0) {
        container.classList.remove('show-container');
    }
    displayAlert('항목이 삭제되었습니다', 'danger');
    setBackToDefault();
    // remove from local storage
    removeFromLocalStorage(id);
}
// edit function
function editItem(e) {
    // console.log('edit item');
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    playlist.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = '완료';

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
    // const playlist = { id: id, value: value };
    // 매개변수와 키의 이름이 같으면 생략해도 된다.(?)
    // 아마도 함수의 특징인가?
    // const playlist = { identify: id, value: value };
    const playlist = { id, value };
    // console.log(playlist);
    let items = getLocalStorage();
    console.log(items);
    // console.log('added to local storage');
    items.push(playlist);
    localStorage.setItem('list', JSON.stringify(items));

}
function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function (item) {
        // 뭔 뜻일까? item.id !== id
        if (item.id !== id) {
            return item
        }
    });
    localStorage.setItem('list', JSON.stringify(items));
}
function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function (item) {
        if (items.id === id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list', JSON.stringify(items));
}
function getLocalStorage() {
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}
// localStorage API
// setItem
// getItem
// removeItem
// save as strings
// localStorage.setItem('오렌지', JSON.stringify(['item', 'item2']));
// const oranges = JSON.parse(localStorage.getItem('orange'));
// console.log("oranges");
// localStorage.removeItem("오렌지");

// *********** SETUP ITEMS ***********
function setupItems() {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach(function (item) {
            createListItem(item.id, item.value)
        })
        container.classList.add('show-container')
    }
}

function createListItem(id, value) {
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
    const deleteBtn = element.querySelector('.delete-btn')
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);

    // append child
    list.appendChild(element);
}