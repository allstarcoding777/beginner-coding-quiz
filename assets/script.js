//selecting required elements
const start_btn = document.querySelector(".start-button");
const rules_box = document.querySelector(".rules-box");
const quit_btn = document.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".continue");
const quiz_box = document.querySelector(".quiz-box");
const result_box = document.querySelector(".result-box");
const option_list = document.querySelector(".option-list");
const time_line = document.querySelector("header .time-line");
const timeLeftText = document.querySelector(".timer .time-left-text");
const timerSeconds = document.querySelector(".timer .timer-sec");

rules_box.classList.add("hidden")
start_btn.onclick = function() {
  hideStartBtn()
}

function hideStartBtn() {
  start_btn.classList.add("hidden")
  rules_box.classList.toggle("hidden")
}

quiz_box.classList.add("hidden")
continue_btn.onclick = function () {
  startQuiz()
}

function startQuiz() {
  rules_box.classList.add("hidden")
  quiz_box.classList.toggle("hidden")
}



