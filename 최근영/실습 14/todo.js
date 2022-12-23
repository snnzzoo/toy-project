const container = document.querySelector("#container");
const submitText = document.querySelector("#submit_text");
const submitBtn = document.querySelector("#submit_btn");
const editBtn = document.querySelector("#edit_btn");

submitBtn.addEventListener("click", createElements);
editBtn.addEventListener("click", editComplete);

// 해야할 목록을 제출하는 함수
function createElements() {
    // 만약 값이 비었을 경우 입력하라는 알림
    if (submitText.value == "") {
        alert("해야할 일을 입력해 주세요.");
        submitText.focus();
    }
    else {
        // 리스트형태로 만들어주기 위해 요소들을 직접 생성함.
        const textForm = document.createElement("div");
        const textP = document.createElement("p");
        const createBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        const completeBtn = document.createElement("button");
        // 같은 class 속성으로 다루기 위해서 class 추가
        textForm.classList.add("text__form");
        textP.innerText = submitText.value;
        createBtn.innerText = "수정";
        deleteBtn.innerText = "삭제";
        completeBtn.innerText = "완료";
        // 각각의 버튼을 조작하기 위해서 id 값들을 부여함
        createBtn.setAttribute("id", "create_btn");
        // onclick event를 통해서 클릭한 버튼의 정보를 가져옴
        createBtn.setAttribute("onclick", "editForm(this)");
        deleteBtn.setAttribute("id", "delete_btn");
        deleteBtn.setAttribute("onclick", "deleteTodo(this)")
        completeBtn.setAttribute("id", "complete_btn");
        completeBtn.setAttribute("onclick", "finTodo(this)")
        textForm.append(textP, createBtn, completeBtn, deleteBtn);
        container.appendChild(textForm);
        submitText.value = "";
        submitText.focus();
    }
}

// 수정 버튼을 클릭할 경우 동작하는 방식
function editForm(event) {
    // 부모 요소에서 text 부분에 id 값으로 editing 이고 수정중인것을 명시해줌.
    event.parentElement.firstChild.setAttribute("id", "editing");
    // text부분의 변수를 가져와서 submitText 라는 입력값부분에 넣어준다.
    const editValue = event.parentElement.firstChild.innerText;
    submitText.value = editValue;
    // edit 버튼을 활성화하고 submit버튼을 숨김
    editBtn.style.display = "block";
    submitBtn.style.display = "none";
}

// edit가 완료되었을때 동작하는 함수
function editComplete() {
    // 만약 값이 비었을 경우 입력하라는 알림
    if (submitText.value == "") {
        alert("해야할 일을 입력해 주세요.");
        submitText.focus();
    }
    else {
        // 입력받은 수정값을 변수에 담아서
        const comText = submitText.value;
        // 앞서 editing이라고 수정중인 text에 값을 교체해주는 부분
        const editingText = document.querySelector("#editing");
        editingText.innerText = comText;
        // 수정이 완료되면 원래와 같이 id 값을 제거해준다.
        submitText.value = ""
        submitText.focus();
        editingText.removeAttribute("id");
        editBtn.style.display = "none";
        submitBtn.style.display = "block";
    }
}

// 할 일을 완료했을 경우 동작하는 함수
function finTodo(event) {
    // 위의 edit와 마찬가지로 text가 들어있는 값을 가져와서
    const finValue = event.parentElement.firstChild;
    // 만약 complete 라는 class가 있는 경우 button의 이름을 변경해주고 complete를 지워준다.
    if (finValue.classList.contains("complete")) {
        event.innerText = "완료";
        finValue.classList.toggle("complete");
    }
    // complete 라는 class 가 없는 경우 button의 이름을 취소로 변경해주고 complete를 지워준다.
    else {
        event.innerText = "취소";
        finValue.classList.toggle("complete");
    }
}

// 삭제할 할일 리스트의 정보를 가져와서 삭제하는 함수
function deleteTodo(event) {
    // 삭제 버튼을 눌렀을 경우 부모 요소를 가져와서
    const totalInfo = event.parentElement;
    // alert 창을 통해서 삭제할지 여부를 물어본 후
    result = confirm("삭제하시겠습니까?");
    // True 일 경우 삭제
    if (result) {
        totalInfo.remove();
    }
}