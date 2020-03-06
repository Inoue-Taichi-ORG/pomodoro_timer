const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;
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
    Timer_Setter(IS_WORKING);
}

function Clear() {
    NOW_SET = 0;
    IS_WORKING = true;
    if (TIMER) {
        clearInterval(TIMER);
    }
    TIME = 0;
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
    Timer_Setter(IS_WORKING);
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