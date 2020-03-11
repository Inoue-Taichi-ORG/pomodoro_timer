const WORK_TIME = /*25 * 60*/3;
const BREAK_TIME = /*5 * 60*/1;
const TEA_TIME = 30 * 60;
const WORK_BREAK_SET = 4;
const CLOCK_MSEC = 1000;

var TIMER;
var TIME = 0;
var NOW_SET = 0;
var IS_WORKING = true;

function Init() {
    NOW_SET = 0;
    IS_WORKING = true;
    if (TIMER) {
        clearInterval(TIMER);
    }
    Title_Text_Setter(IS_WORKING);
    Timer_Setter(IS_WORKING);
}

function Clear() {
    NOW_SET = 0;
    IS_WORKING = true;
    if (TIMER) {
        clearInterval(TIMER);
    }
    TIME = 0;
    Title_Text_Setter(IS_WORKING, true)
    Count_Show(TIME);
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
    const time_status = is_working ? "WORK TIME" : "BREAK TIME";
    title_text.innerHTML = time_status;
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