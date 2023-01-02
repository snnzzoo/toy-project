// todo 입력 폼
const form = document.querySelector('.todo-form');

// todo 등록 인풋창
const inputTxt = document.querySelector(".input-txt");

// submit 버튼
const btnSubmit = document.querySelector('.btn-submit');

// todo-list 영역
const todoArea = document.querySelector('.todo-area');

// todo-list
const todoList = document.querySelector('.todo-list');

// todo 아이템
const todoCont = document.querySelectorAll('.todo-cont');

// todo 수정 버튼
let btnChks = document.querySelectorAll('.btn-chk');
// todo 삭제 버튼
let btnDels = document.querySelectorAll('.btn-del');


// todo 생성
function createTodo(e) {
    e.preventDefault();
    // 빈칸이면 등록안되게 막기. 스페이스 한칸이라도 trim으로 빈칸처리되어 등록안되게 함
    if (inputTxt.value.trim() === "") return;
    // 현재 입력된 todo 값
    const inputValue = inputTxt.value;

    // 폼 submit 시 todo-list 에 추가할 마크업
    const todoMarkup = `
        <li>
            <p class="todo-cont">${inputValue}</p>
                <div class="btn-area">
                    <button type="button" class="btn-chk"><span class="material-symbols-outlined">
                        done
                        </span></button>
                    <button type="button" class="btn-del"><span class="material-symbols-outlined">
                        delete
                        </span></button>
                </div>
        </li>
    `;
    // todo-list 상단에 새로 들어오는 todo 추가
    todoList.insertAdjacentHTML("afterbegin", todoMarkup);

    // todo 등록 후 인풋 창 초기화, focus
    inputTxt.value = "";
    inputTxt.focus();

    // todo 수정 버튼 추가된 것 포함
    btnChks = document.querySelectorAll('.btn-chk');
    // todo 삭제 버튼  추가된 것 포함
    btnDels = document.querySelectorAll('.btn-del');

    // todo 체크
    btnChks.forEach(chk => {
        chk.addEventListener('click', function (e) {
            // 선택한 타겟에서 가장 가까운 부모요소 li 찾아서 지정
            const target = e.target.closest('li');
            // 선택된 타겟에 토글로 체크 
            target.classList.toggle('chk');
        })
    });

    //  todo 삭제
    btnDels.forEach(del => {
        del.addEventListener('click', function (e) {
            // 선택한 타겟에서 가장 가까운 부모요소 li 찾아서 지정
            const target = e.target.closest('li');
            // todo-list 에서 클릭된 타겟 삭제
            todoList.removeChild(target);
        });
    })
}

// todo 폼에 submit에 TODO 생성 이벤트 설정
form.addEventListener('submit', createTodo);

