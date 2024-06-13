const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const { JamBuddy } = require("../src/jam_buddy");

const indexHTML = fs.readFileSync(
  path.resolve(__dirname, "../index.html"),
  "utf-8"
);
const { window } = new JSDOM(indexHTML);
global.document = window.document;
const {
  userInput,
  buttons,
  displayed,
  answers,
} = require("../src/dom_elements");
const { displayNotes } = require("../src/app");
const { calculateNoteDifferences } = require("../src/helper_functions");
const { errorMessages } = require("../src/helper_objects");

describe("App Event Listener Tests", () => {
  let buddy, setNotes;

  beforeEach(() => {
    buddy = new JamBuddy();
    buddy.setCurrentNotes(["C", "D#"]);
    setNotes = buddy.getCurrentNotes();
    displayNotes(buddy);
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it("should display correct result message when the answer form is submitted with correct answer", () => {
    const correctAnswer = calculateNoteDifferences(
      setNotes[0],
      setNotes[1]
    ).clockwise;
    userInput.answerInput.value = correctAnswer;
    buttons.answerForm.dispatchEvent(new window.Event("submit"));
    expect(displayed.resultMessage.textContent).toBe(answers.correct);
  });

  it("should display incorrect result message when the answer form is submitted with incorrect answer", () => {
    const correctAnswer = calculateNoteDifferences(
      setNotes[0],
      setNotes[1]
    ).anticlockwise;
    userInput.answerInput.value = correctAnswer + 1;
    buttons.answerForm.dispatchEvent(new window.Event("submit"));
    expect(displayed.resultMessage.textContent).toBe(answers.incorrect);
  });

  it("should update the notes displayed correctly when randomize button is clicked", () => {
    const notesDisplay = displayed.notesDisplay.textContent;
    buttons.randomizeButton.click();
    expect(displayed.notesDisplay.textContent).not.toBe(notesDisplay);
  });

  it("should disable all buttons when the randomize button is clicked", () => {
    const randomizeButton = buttons.randomizeButton;
    randomizeButton.click();

    const answerForm = buttons.answerForm;
    answerForm.dispatchEvent(new window.Event("submit"));

    const interval = setInterval(() => {
      if (randomizeButton.disabled && buttons.submitButton.disabled) {
        clearInterval(interval);

        expect(randomizeButton.disabled).toBe(true);
        expect(buttons.submitButton.disabled).toBe(true);
      }
    }, 100);

    jasmine.clock().tick(1000);
  });

  it("should make result message disappear atleast after 3 seconds", () => {
    userInput.answerInput.value = "5";
    buttons.answerForm.dispatchEvent(new window.Event("submit"));
    jasmine.clock().tick(3000);
    expect(displayed.resultMessage.textContent).toBe("");
  });

  it("should throw error when answer is outside the valid range", () => {
    userInput.answerInput.value = "-1";
    buttons.answerForm.dispatchEvent(new window.Event("submit"));
    expect(displayed.resultMessage.textContent).toBe(
      errorMessages.invalidSemitoneError
    );
  });
});
