const userInput = {
  answerInput: document.getElementById("answerInput")
};

const buttons = {
  answerForm: document.getElementById("answerForm"),
  randomizeButton: document.getElementById("randomizeButton"),
  submitButton: document.querySelector("#answerForm button[type='submit']"),
  giveUpButton: document.getElementById("giveUpButton")
};

const displayed = {
  notesDisplay: document.getElementById("notesDisplay"),
  resultMessage: document.getElementById("resultMessage"),
  streakDisplay: document.getElementById("streakDisplay"),
  explanationMessage: document.getElementById("explanationMessage")
};

const answers = {
  correct: "Correct!",
  incorrect: "Incorrect!"
};

const errorMessages = {
  invalidSemitoneError: "Invalid semitone difference"
};

module.exports = {
  userInput,
  buttons,
  displayed,
  answers,
  errorMessages
};