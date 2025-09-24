// إخفاء كل الصفحات في البداية ما عدا صفحة البداية ولوحة المتصدرين
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.quiz_box').classList.remove('activeQuiz');
    document.querySelector('.result_box').classList.remove('activeResult');
    const levelBox = document.querySelector('.level_box');
    if (levelBox) levelBox.style.display = 'none';
    document.querySelector('.start_btn').style.display = '';
});
const start_btn = document.querySelector(".start_btn button");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// زر البداية: يبدأ اللعبة فعلياً
start_btn.onclick = ()=>{
    document.querySelector('.quiz_box').classList.add('activeQuiz');
    document.querySelector('.start_btn').style.display = 'none';
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    currentLevel = 1;
    showQuetions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "الوقت المتبقي";
    if (next_btn) next_btn.classList.remove("show");
};

// لا يوجد أي تفاعل مع info_box بعد الآن

let timeValue = 60;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let currentLevel = 1; // 1:سهل 2:متوسط 3:صعب

const LEVELS = [
    { start: 0, end: 4, name: 'المستوى السهل', next: 'المستوى المتوسط' },
    { start: 5, end: 9, name: 'المستوى المتوسط', next: 'المستوى الصعب' },
    { start: 10, end: 14, name: 'المستوى الصعب', next: null }
];

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit"); // ازرار الاعادة والخروج


restart_quiz.onclick = ()=>{
    document.querySelector(".quiz_box").classList.add("activeQuiz");
    document.querySelector(".result_box").classList.remove("activeResult");
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    currentLevel = 1;
    showQuetions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "الوقت المتبقي";
    if (next_btn) next_btn.classList.remove("show");
};

quit_quiz.onclick = ()=>{
    document.querySelector('.start_btn').style.display = '';
    document.querySelector('.quiz_box').classList.remove('activeQuiz');
    document.querySelector('.result_box').classList.remove('activeResult');
};

const next_btn = document.querySelector("footer .next_btn");
// إخفاء زر التالي في البداية دائماً
if (next_btn) next_btn.classList.remove("show");
const bottom_ques_counter = document.querySelector("footer .total_que");


next_btn.onclick = ()=>{
    // نهاية مستوى؟
    let levelIdx = LEVELS.findIndex(lvl => que_count === lvl.end);
    if (levelIdx !== -1 && que_count !== questions.length - 1) {
        // نهاية مستوى (وليس نهاية كل الأسئلة)
        clearInterval(counter);
        clearInterval(counterLine);
        showLevelBox(levelIdx + 1);
        return;
    }
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuetions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "الوقت المتبقي";
    if (next_btn) next_btn.classList.remove("show");
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

// إنشاء نافذة المستوى إذا لم تكن موجودة
let level_box = document.querySelector('.level_box');
if (!level_box) {
    level_box = document.createElement('div');
    level_box.className = 'level_box';
    level_box.innerHTML = `
        <div class="info-title" id="level-title"></div>
        <div class="level-msg" id="level-msg"></div>
        <div class="buttons"><button id="startLevelBtn">استمرار</button></div>
    `;
    document.body.appendChild(level_box);
}
const startLevelBtn = level_box.querySelector('#startLevelBtn');

function showLevelBox(levelIdx) {
    quiz_box.classList.remove("activeQuiz");
    level_box.style.display = 'flex';
    level_box.classList.add('activeLevelBox');
    let title = level_box.querySelector('#level-title');
    let msg = level_box.querySelector('#level-msg');
    if (levelIdx === 1) {
        title.textContent = 'انتهيت من المستوى السهل';
        msg.textContent = 'أحسنت! الآن ستنتقل إلى المستوى المتوسط.';
    } else if (levelIdx === 2) {
        title.textContent = 'انتهيت من المستوى المتوسط';
        msg.textContent = 'رائع! الآن ستنتقل إلى المستوى الصعب.';
    } else if (levelIdx === 3) {
        title.textContent = 'انتهيت من المستوى الصعب';
        msg.textContent = 'لقد أنهيت جميع الأسئلة!';
    }
    startLevelBtn.onclick = () => {
        level_box.style.display = 'none';
        level_box.classList.remove('activeLevelBox'); // إزالة الصنف نهائياً
        quiz_box.classList.add("activeQuiz");
        que_count++;
        que_numb++;
        showQuetions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "الوقت المتبقي";
    if (next_btn) next_btn.classList.remove("show");
    };
}

function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + " . " + questions[index].question +'</span>';
    let option_tag = '';
    for (let i = 0; i < 4; i++) {
        option_tag += '<div class="option"><span>'+ questions[index].options[i] +'</span></div>';
    }
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    // عند عرض سؤال جديد، أظهر عداد السؤال دائماً (حتى لو كان مخفي)
    var bqc = document.querySelector("footer .total_que");
    if (bqc) bqc.style.display = '';
    const option = option_list.querySelectorAll(".option");
    for(let i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
    if (next_btn) next_btn.classList.remove("show");
    // تغيير نص زر التالي إلى "انهاء" في آخر سؤال
    if (next_btn) {
        if (index === questions.length - 1) {
            next_btn.textContent = "انهاء";
        } else {
            next_btn.textContent = "السؤال التالي";
        }
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length;
    
    if(userAns == correcAns){
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        // إذا كنا في وضع الجوال، أخفِ عداد السؤال
        var bqc = document.querySelector("footer .total_que");
        if (window.innerWidth <= 600 && bqc) {
            bqc.style.display = 'none';
        }
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Wrong Answer");

        for(let i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(let i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    if (next_btn) next_btn.classList.add("show");
}

let playerName = null;
function showResult(){
    // طلب اسم اللاعب مرة واحدة فقط عند نهاية اللعبة
    if (!playerName) {
        playerName = prompt("ادخل اسمك للمتصدرين:");
        if (!playerName) playerName = "لاعب مجهول";
        // إرسال الاسم والنتيجة إلى سكريبت الـ module
        window.dispatchEvent(new CustomEvent('saveScore', { detail: { playerName, score: userScore } }));
    }
    document.querySelector(".quiz_box").classList.remove("activeQuiz");
    document.querySelector(".result_box").classList.add("activeResult");
    const scoreText = document.querySelector(".result_box .score_text");
    if (userScore > 12){
        let scoreTag = '<span>مبروك لقد حصلت على  <p>'+ userScore +'</p> من <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 7){
        let scoreTag = '<span> جيد جدا لقد حصلت على <p>'+ userScore +'</p> من  <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 3){
        let scoreTag = '<span> جيد لقد حصلت على <p>'+ userScore +'</p> من  <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span> مع الاسف لقد حصلت على <p>'+ userScore +'</p> من  <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeText.textContent = "انتهى الوقت";
            // تعطيل جميع الخيارات فقط
            const allOptions = option_list.children.length;
            for(let i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");
            }
            // الانتقال للسؤال التالي بعد ثانية بدون احتساب نقاط
            setTimeout(() => {
                if(que_count < questions.length - 1){
                    que_count++;
                    que_numb++;
                    showQuetions(que_count);
                    queCounter(que_numb);
                    clearInterval(counter);
                    clearInterval(counterLine);
                    startTimer(timeValue);
                    startTimerLine(widthValue);
                    timeText.textContent = "الوقت المتبقي";
                    if (next_btn) next_btn.classList.remove("show");
                }else{
                    showResult();
                }
            }, 1000);
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 111);
    function timer(){
        time += 1;
        time_line.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}

function queCounter(index){
    let totalQueCounTag = '<span class="total_que"><p> السؤال </p><p>'+ index +'</p><p> من </p><p>'+ questions.length +'</p><p> سؤال </p></span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}

// إخفاء كل الصفحات في البداية ما عدا صفحة البداية ولوحة المتصدرين
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.quiz_box').classList.remove('activeQuiz');
    document.querySelector('.result_box').classList.remove('activeResult');
    // info_box لم تعد مستخدمة
});