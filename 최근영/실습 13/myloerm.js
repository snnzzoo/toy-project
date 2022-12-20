const answer_list = [
    {
        title : "네카라쿠배당토",
        context : "Z세대가 가장 취업하고 싶어하는 IT기업들의 첫글자를 따서 만든 신조어로 네이버,카카오,라인,쿠팡,배달의민족,당근마켓,토스"
    },
    {
        title : "오히려 좋아",
        context : "안좋은 상황도 좋게 받아들이자는 뜻입니다. 진짜 힘든 상황에서 전화위복되어 좋다는 의미도 있지만 위기를 합리화 하기 위해서 사용"
    },
    {
        title : "갓생",
        context : "갓생살다'라는 표현을 많이 쓰는데요. '갓'과 '인생'을 합친 말로 부지런하고 열심히 사는 사람에게 쓰는 말"
    },
    {
        title : "삼귀다",
        context : "사귀기 전의 썸타는 단계라는 뜻입니다. 사귀다=4귀다->3귀다"
    },
    {
        title : "알잘딱깔센",
        context : "알아서 잘 딱깔끔하고 센스있게 의 줄임말입니다. 인기 스트리머에 의해서 시작된 유행어"
    },
    {
        title : "Whyrano",
        context : "왜이러냐의 사투리 표현인 와이라노를 영어로 적은 말"
    },
    {
        title : "머선129",
        context : "무슨일이야 의 경상도 사투리인 '머선 일이고?' 의 일이고를 숫자 129로 표현한 말"
    },
    {
        title : "사바사",
        context : "사람by사람 이라는 뜻으로 어떠한 상황에 대해서 사람마다 다르다라는 뜻"
    },
    {
        title : "저메추",
        context : "'저녁메뉴추천좀' 의 줄임말로 점메추도 있다"
    },
    {
        title : "억텐&억까",
        context : "억텐은 억지로 신난척, 억까는 억지로 디스(까다)하는 말을 뜻합니다. '억텐하지마~' '억까하지마~'"
    },
    {
        title : "크크루삥뽕",
        context : "ㅋㅋㅋ의 진화형으로 약올리는 용도로 쓰입니다. 특유의 억양때문에 들으면 조금 불쾌함"
    },
    {
        title : "킹받다",
        context : "열받다 -> (킹)받다로 요즘 유행하는 킹을 결합한 형태로 진짜 열받는다는 표현입니다. 'KG받네' 라고도 표현하며 '킹받드라슈' 로까지 변형"
    },
    {
        title : "군싹",
        context : "군침이 싹 도네 의 줄임말로 뽀로로 루피 짤과 함께 퍼지기 시작한 신조어"
    },
    {
        title : "힘숨찐",
        context : "'힘을 숨기고 있는 찐따' 의 줄임말로 겉으로는 찐따 같지만 실제로는 대단한 사람을 뜻"
    },
    {
        title : "졌잘싸",
        context : "졌지만 잘 싸웠다의 줄임말로 말그대로 졌음에도 최선을 다한 경우에 사용하는 말"
    },
    {
        title : "좋댓구알",
        context : "위와 같이 유튜브에서 파생된 유행어로 좋아요, 댓글, 구독, 알림설정을 요청할때 사용하는 말"
    },
    {
        title : "난죽택",
        context : "난 죽음을 택하겠다의 줄임말로 이것도 저것도 선택하기 난처할 때 사용하는 말"
    },
    {
        title : "~하면 그만이야",
        context : "태도와 행동이 일관되지 않거나 모순될 때 사용합니다. 최근 코인,주식 시장이 하락함에 따라 한 유저가 현 사태를 믿는 구석이 있는 것처럼 '응 폭락 더해봐' 라며 어그로를 끈 뒤 들어가보면 '자살하면 그만이야' 하는 식으로 유행이 시작"
    },
]

const textCnt = document.querySelector("#cnt");
const checkBtn = document.querySelector("#checkbtn");

checkBtn.addEventListener("click", function() {
    console.log(textCnt)
    for (i = 0; i<textCnt.textContent; i++) {
        // 랜덤 함수를 통해서 범위를 answer_list 값까지 제한하여 정수값을 출력한다.
        let nums = Math.floor(Math.random * answer_list.length);
        console.log(nums)
        // p element를 생성하여 그 안에 title 과 context를 집어넣는다.
        const p = document.createElement("p");
        p.innerText = answer_list[nums].title," : ", answer_list[nums].context;
        const textBox = document.querySelector("#text__box");
        textBox.appendChild(p);
    }
});