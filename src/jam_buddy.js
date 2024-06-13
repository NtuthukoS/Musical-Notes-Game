const {
  getRandomNote,
  validateNotes,
  generateUniqueNote,
  calculateNoteDifferences,
} = require("./helper_functions");

const { errorMessages } = require("./helper_objects");

class JamBuddy {
  constructor() {
    this.currentNotes = [];
  }

  setCurrentNotes(notes) {
    if (!validateNotes(notes)) {
      throw new Error(errorMessages.invalidNoteError);
    }

    if (notes[0] === notes[1]) {
      throw new Error(errorMessages.sameNoteError);
    }

    this.currentNotes = notes;
  }

  getCurrentNotes() {
    return this.currentNotes;
  }

  randomizeCurrentNotes() {
    let firstNote, secondNote;
    do {
      firstNote = getRandomNote();
      secondNote = generateUniqueNote(firstNote);
    } while (firstNote === secondNote);
    this.currentNotes = [firstNote, secondNote];
  }

  checkAnswer(semitoneDifference) {
    if (!Number.isInteger(semitoneDifference) || semitoneDifference < 0) {
      throw new Error(errorMessages.invalidSemitoneError);
    }
    const { clockwise, anticlockwise } = calculateNoteDifferences(
      ...this.currentNotes
    );

    return (
      semitoneDifference === clockwise || semitoneDifference === anticlockwise
    );
  }
}

module.exports = { JamBuddy };
