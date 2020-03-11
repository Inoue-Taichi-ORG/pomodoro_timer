const WORK_TIME = /*25 * 60*/3;
const BREAK_TIME = /*5 * 60*/1;
const TEA_TIME = 30 * 60;
const WORK_BREAK_SET = 4;
const CLOCK_MSEC = 1000;

var TIMER;
var TIME = 0;
var NOW_SET = 0;
var IS_WORKING = true;
var IS_IDOL = true;

function Init() {
    NOW_SET = 0;
    IS_WORKING = true;
    TIME = WORK_TIME;
    IS_IDOL = true;
    if (TIMER) {
        clearInterval(TIMER);
    }
    Count_Show(TIME);
    Button_Status_Setter(IS_IDOL);
    Title_Text_Setter(IS_WORKING,true);
}

function Start() {
    IS_IDOL = false;
    Button_Status_Setter(IS_IDOL);
    Title_Text_Setter(IS_WORKING);
    Timer_Setter(IS_WORKING);
}

function Clear() {
    Init();
}

function Click_Button() {
    if (IS_IDOL) {
        Start();
    }
    else {
        Clear();
    }
}

function Button_Status_Setter(is_idol) {
    const text              = is_idol ? "START"   : "CLEAR";
    const back_ground_color = is_idol ? "red"     : "green";
    const border_color      = is_idol ? "#ff7070" : "#308030";
    button_text.innerHTML   = text;

    const button = document.getElementById("button_circle");
    button.style.backgroundColor = back_ground_color;
    button.style.borderBottomColor = border_color;
}

function Timer_Setter(is_working) {
    if (is_working) {
        NOW_SET++;
        TIME = WORK_TIME;
    }
    else {
        if (NOW_SET >= WORK_BREAK_SET) {
            TIME = TEA_TIME;
            NOW_SET = 0;
        }
        else {
            TIME = BREAK_TIME;
        }
    }
    TIMER = setInterval(function () { Count_Down() }, CLOCK_MSEC);
}

function Count_Down() {
    Count_Show(TIME);
    TIME--;
    if (TIME < 0) {
        clearInterval(TIMER);
        Switch_Count();
    }
}

function Count_Show(time) {
    var minute = parseInt(time / 60);
    var second = parseInt(time % 60);
    minute_shower.innerHTML = minute;
    second_shower.innerHTML = second;
}

function Switch_Count() {
    IS_WORKING = !IS_WORKING;
    Title_Text_Setter(IS_WORKING);
    Timer_Setter(IS_WORKING);
}

function Title_Text_Setter(is_working, clicked_clear = false) {
    if (clicked_clear) {
        title_text.innerHTML = "ポモドーロタイマー";
        return;
    }
    const text = is_working ? "WORK TIME" : "BREAK TIME";
    title_text.innerHTML = text;
}

Init();