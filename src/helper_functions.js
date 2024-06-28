const { errorMessages, musicNotes, noteToIndex } = require("./helper_objects");

function calculateNoteDifferences(note1, note2) {
  const note1Index = noteToIndex[note1];
  const note2Index = noteToIndex[note2];
  const notesLength = musicNotes.length;

  if (note1Index === note2Index) {
    return { clockwise: 0, anticlockwise: 0 };
  }

  const clockwise = (note2Index - note1Index + notesLength) % notesLength;
  const anticlockwise = (notesLength - clockwise) % notesLength;

  return { clockwise, anticlockwise };
}

function getRandomNote() {
  const flatNotes = Object.keys(noteToIndex);
  if (flatNotes.length === 0) {
    throw new Error(errorMessages.emptyArrayError);
  }
  const randomIndex = Math.floor(Math.random() * flatNotes.length);
  return flatNotes[randomIndex];
}

function validateNotes(notes) {
  return notes.every((note) => noteToIndex.hasOwnProperty(note));
}

function generateUniqueNote(note1) {
  const flatNotes = Object.keys(noteToIndex);
  if (flatNotes.length < 2) {
    throw new Error(errorMessages.uniqueNoteError);
  }

  let note2;
  do {
    note2 = getRandomNote();
  } while (note2 === note1);

  return note2;
}

module.exports = {
  calculateNoteDifferences,
  getRandomNote,
  validateNotes,
  generateUniqueNote,
};
