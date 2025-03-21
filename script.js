// Pledge Button
document.getElementById("pledge-button").addEventListener("click", function () {
  alert("Thank you for taking the pledge! Every action counts.");
});

// Rotate Earth Animation
const earth = document.querySelector(".earth img");
let rotation = 0;

function rotateEarth() {
  rotation += 1;
  earth.style.transform = `rotate(${rotation}deg)`;
  requestAnimationFrame(rotateEarth);
}

rotateEarth();

// Contact Form Submission
document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Send data to Formspree
  fetch("https://formspree.io/f/mqapearb", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  })
    .then((response) => {
      if (response.ok) {
        // Display a confirmation message
        const formMessage = document.getElementById("form-message");
        formMessage.textContent = `Thank you, ${name}! Your message has been sent.`;
        formMessage.style.color = "#00796b";

        // Clear the form
        document.getElementById("contact-form").reset();
      } else {
        throw new Error("Form submission failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      const formMessage = document.getElementById("form-message");
      formMessage.textContent = "Oops! Something went wrong. Please try again.";
      formMessage.style.color = "#ff0000";
    });
});

// Newsletter Subscription
document.getElementById("newsletter-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("newsletter-email").value;
  const newsletterMessage = document.getElementById("newsletter-message");
  newsletterMessage.textContent = `Thank you for subscribing, ${email}!`;
  newsletterMessage.style.color = "#00796b";
  document.getElementById("newsletter-form").reset();
});

// Scroll-to-Top Button
const scrollToTopButton = document.getElementById("scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
});

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

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

// DOM Elements for Quiz
const quizContainer = document.getElementById("quiz-questions");
const submitButton = document.getElementById("submit-quiz");
const quizResult = document.getElementById("quiz-result");
const progressBar = document.getElementById("progress-bar");
const leaderboardList = document.getElementById("leaderboard-list");

// Variables for Quiz
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

    // Select the clicked option
    event.target.classList.add("selected");

    // Save the selected option
    selectedOptions[questionIndex] = selectedOption;

    // Update progress bar
    updateProgressBar();
  }
});

// Update Progress Bar
function updateProgressBar() {
  const answeredQuestions = selectedOptions.filter((option) => option !== undefined).length;
  const progress = (answeredQuestions / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Handle Quiz Submission
submitButton.addEventListener("click", () => {
  let score = 0;
  quizData.forEach((question, index) => {
    if (selectedOptions[index] === question.answer) {
      score++;
    }
  });

  quizResult.textContent = `You scored ${score} out of ${quizData.length}!`;
  quizResult.style.color = score === quizData.length ? "#00796b" : "#ff0000";

  if (score > 0) {
    updateLeaderboard(score);
  }
});

// Update Leaderboard
function updateLeaderboard(score) {
  const name = prompt("Congratulations! Enter your name to save your score:");
  if (name) {
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score); // Sort by score (descending)
    leaderboard = leaderboard.slice(0, 5); // Keep only the top 5 scores
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    displayLeaderboard();
  }
}

// Display Leaderboard
function displayLeaderboard() {
  leaderboardList.innerHTML = leaderboard
    .map(
      (entry, index) => `
      <li>${index + 1}. ${entry.name} - ${entry.score}/${quizData.length}</li>
    `
    )
    .join("");
}

// Display the leaderboard when the page loads
displayLeaderboard();
