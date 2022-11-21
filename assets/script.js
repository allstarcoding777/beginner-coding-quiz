//selecting required elements
const start_btn = document.querySelector(".start-button");
const rules_box = document.querySelector(".rules-box");
const quit_btns = document.querySelectorAll(".quit");
const continue_btn = document.querySelector(".continue");
const quiz_box = document.querySelector(".quiz-box");
const result_box = document.querySelector(".result-box");
const option_list = document.querySelector(".option-list");
const time_line = document.querySelector("header .time-line");
const timeLeftText = document.querySelector(".timer .time-left-text");
const timerSeconds = document.querySelector(".timer .timer-sec");
const footer = document.querySelector("footer");
const question_box = document.querySelector(".questions");
const restart_btn = document.querySelector(".restart");
const next_button = document.querySelector(".next-button");

var option_selected = false;
var correct_answers = 0;
const questions = [
  {
    question: "What does CSS stand for",
    options: [
      "Cascading Style Sheet",
      "Cascading Super Style",
      "Computer Style Setup",
      "Computer Style Syntax",
    ],
    correct_option: 1,
  },
  {
    question: "What does HTML stand for",
    options: [
      "Hyper Text Markup Language",
      "Hyper Text Preprocessor",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language",
    ],
    correct_option: 1,
  },
  {
    question: "Where in the HTML file should you link the CSS stylesheet?",
    answer: "in the head",
    options: [
      "in the head",
      "in the middle",
      "at the end",
      "in the body",
    ],
    correct_option: 1,
  },
  {
    question: "What element does the p tag represent in HTML?",
    answer: "paragraph",
    options: [
      "paragraph",
      "page",
      "php",
      "png",
    ],
    correct_option: 1,
  },
  {
    question: "What does CSS do?",
    options: [
      "adds style to a webpage",
      "makes a webpage interactive",
      "makes classes",
      "is the foundation of a webpage",
    ],
    correct_option: 1,
  },
];
var current_question = 1;
function nextQuestion() {
  var question_statement = question_box.querySelector(".questions span");
  var question_options = question_box.querySelector(".option-list");
  // question_options.appe;
  // Setting the question statement
  question_statement.innerHTML = `Q.${current_question} ${
    questions[current_question - 1].question
  }`;

  // // Setting the question options
  const options = questions[current_question - 1].options.map((opt, index) => {
    const option_div = document.createElement("div");
    option_div.classList.add("option");
    if (index === questions[current_question - 1].correct_option - 1) {
      option_div.classList.add("correct");
    }
    const option_span = document.createElement("span");
    // Setting the option text
    option_span.innerHTML = opt;
    // Appending text into option
    option_div.appendChild(option_span);

    // binding the onclick event
    option_div.onclick = function () {
      if (!option_selected) {
        if (index === questions[current_question - 1].correct_option - 1) {
          option_div.appendChild(getAnswerIcon(true));
          correct_answers++;
        } else {
          option_div.appendChild(getAnswerIcon(false));
          document.querySelector(".correct").appendChild(getAnswerIcon(true));
          secondsLeft -= 5;
        }
        option_selected = !option_selected;
      }
    };
    return option_div;
  });
  while (question_options.replaceChildren(...options));
}

next_button.onclick = function () {
  if (current_question === questions.length) {
    showResult();
    return;
  }
  if (!option_selected) {
    alert("Select an option first");
    return;
  }
  current_question++;
  option_selected = false;
  nextQuestion();
};

function showResult() {
  quiz_box.classList.add("hidden");
  result_box.classList.toggle("hidden");

  const score_box = document.querySelector(".score-text");

  const text = document.createTextNode(
    `Your Score: ${correct_answers} out of ${questions.length}`
  );
  score_box.appendChild(text);
}

result_box.classList.add("hidden");
footer.classList.add("hidden");

rules_box.classList.add("hidden");
start_btn.onclick = function () {
  hideStartBtn();
};

function hideStartBtn() {
  start_btn.classList.add("hidden");
  rules_box.classList.toggle("hidden");
}

quiz_box.classList.add("hidden");
continue_btn.onclick = function () {
  startQuiz();
  setTime();
};

function startQuiz() {
  rules_box.classList.add("hidden");
  quiz_box.classList.toggle("hidden");
  nextQuestion();
}

function getAnswerIcon(iconType) {
  var icon = document.createElement("i");
  var iconDiv = document.createElement("div");
  if (iconType) {
    icon.className = "fas fa-check";
    iconDiv.className = "icon tick";
  } else {
    icon.className = "fas fa-times";
    iconDiv.className = "icon cross";
  }
  iconDiv.appendChild(icon);
  return iconDiv;
}

// Selects element by class
var timeEl = document.querySelector(".timer-sec");

var secondsLeft = 90;
var timerInterval;
timeEl.textContent = secondsLeft + " seconds ";
function setTime() {
  // Sets interval in variable
  timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds ";

    if (secondsLeft <= 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      showResult();
    }
  }, 1000);
}

restart_btn.onclick = function () {
  reset();
  result_box.classList.toggle("hidden");
  hideStartBtn();
};

quit_btns.forEach((quit_btn) => {
  quit_btn.onclick = function () {
    reset();
    menuReset(quit_btn);
    clearInterval(timerInterval);
  };
});

// Helper Functions

function reset() {
  current_question = 1;
  correct_answers = 0;
  secondsLeft = 90;
}

function menuReset(quit_btn) {
  if (quit_btn.parentElement.parentElement.className === "rules-box") {
    rules_box.classList.toggle("hidden");
  } else {
    result_box.classList.toggle("hidden");
  }
  start_btn.classList.toggle("hidden");
}
