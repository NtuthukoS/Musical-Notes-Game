const { JamBuddy } = require("./jam_buddy");
const { updateJamBuddy } = require("./app_helper");
const { displayed, userInput, buttons, answers } = require("./dom_elements");

const buddy = new JamBuddy();

function displayNotes(buddy) {
  const notesDisplay = displayed.notesDisplay;
  const currentNotes = buddy.getCurrentNotes();
  notesDisplay.textContent = `Current Notes: ${currentNotes[0]} and ${currentNotes[1]}`;
}

function displayResult(isCorrect, callback) {
  const resultMessage = document.getElementById("resultMessage");

  if (isCorrect) {
    resultMessage.textContent = answers.correct;
  } else {
    resultMessage.textContent = answers.incorrect;
  }
  setTimeout(() => {
    clearResultMessage();
  }, 3000);
}

function clearResultMessage() {
  const resultMessage = document.getElementById("resultMessage");
  resultMessage.textContent = "";

  const answerInput = document.getElementById("answerInput");
  answerInput.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const answerForm = buttons.answerForm;
  answerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const answerInput = userInput.answerInput;
    const userAnswer = parseInt(answerInput.value, 10);
    let isCorrect;
    try {
      updateJamBuddy(buddy);
      isCorrect = buddy.checkAnswer(userAnswer);
      displayResult(isCorrect, () => {
        const submitButton = buttons.submitButton;
        const randomizeButton = buttons.randomizeButton;
        randomizeButton.disabled = true;
        submitButton.disabled = true;
      });
    } catch (error) {
      const resultMessage = displayed.resultMessage;
      resultMessage.textContent = error.message;
    }
  });

  const randomizeButton = buttons.randomizeButton;
  randomizeButton.addEventListener("click", () => {
    buddy.randomizeCurrentNotes();
    displayNotes(buddy);
    clearResultMessage();
  });

  buddy.randomizeCurrentNotes();
  displayNotes(buddy);
});

module.exports = { displayNotes, displayResult, clearResultMessage };
