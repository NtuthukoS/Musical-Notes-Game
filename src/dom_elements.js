const displayed = {
  notesDisplay: document.getElementById("notesDisplay"),
  resultMessage: document.getElementById("resultMessage"),
};

const userInput = {
  answerInput: document.getElementById("answerInput"),
};



const buttons = {
  randomizeButton: document.getElementById("randomizeButton"),
  answerForm: document.getElementById("answerForm"),
  submitButton: document.querySelector('button[type="submit"]'),
};

const answers = {
  correct: "Correct! Well done.",
  incorrect: "Incorrect. Please try again.",
};

module.exports = { displayed, userInput, buttons, answers };