// Quiz Data
const quizData = [
  {
    question: "What is the main cause of climate change?",
    options: ["Natural cycles", "Human activities", "Solar flares"],
    answer: "Human activities",
  },
  {
    question: "Which gas is primarily responsible for global warming?",
    options: ["Oxygen", "Carbon dioxide", "Nitrogen"],
    answer: "Carbon dioxide",
  },
  {
    question: "What is the primary source of renewable energy?",
    options: ["Coal", "Solar power", "Natural gas"],
    answer: "Solar power",
  },
  {
    question: "Which activity contributes the most to deforestation?",
    options: ["Farming", "Logging", "Urbanization"],
    answer: "Logging",
  },
  {
    question: "What is the Paris Agreement?",
    options: [
      "A treaty to reduce nuclear weapons",
      "A global agreement to combat climate change",
      "A trade agreement between countries",
    ],
    answer: "A global agreement to combat climate change",
  },
];

// DOM Elements
const quizContainer = document.getElementById("quiz-questions");
const submitButton = document.getElementById("submit-quiz");
const quizResult = document.getElementById("quiz-result");
const progressBar = document.getElementById("progress-bar");
const leaderboardList = document.getElementById("leaderboard-list");

// Variables
let selectedOptions = [];
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// Display Quiz Questions
quizData.forEach((question, index) => {
  const questionElement = document.createElement("div");
  questionElement.classList.add("quiz-question");
  questionElement.innerHTML = `
    <h3>${index + 1}. ${question.question}</h3>
    ${question.options
      .map(
        (option) => `
      <button class="quiz-option" data-question="${index}" data-option="${option}">
        ${option}
      </button>
    `
      )
      .join("")}
  `;
  quizContainer.appendChild(questionElement);
});

// Handle Option Selection
quizContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("quiz-option")) {
    const questionIndex = event.target.getAttribute("data-question");
    const selectedOption = event.target.getAttribute("data-option");

    // Deselect all options for this question
    document
      .querySelectorAll(`.quiz-option[data-question="${questionIndex}"]`)
      .forEach((option) => option.classList.remove("selected"));

    // Select the
