const errorMessages = {
  invalidNoteError: "Invalid note provided",
  invalidSemitoneError:
    "Invalid input. It should be a positive integer between 1 and 11.",
  sameNoteError: "Cannot set two of the same notes.",
};

const musicNotes = [
  "A",
  ["A#", "Bb"],
  "B",
  "C",
  ["C#", "Db"],
  "D",
  ["D#", "Eb"],
  "E",
  "F",
  ["F#", "Gb"],
  "G",
  ["G#", "Ab"],
];

const noteToIndex = {};
musicNotes.forEach((note, index) => {
  if (Array.isArray(note)) {
    note.forEach((n) => (noteToIndex[n] = index));
  } else {
    noteToIndex[note] = index;
  }
});

module.exports = { errorMessages, musicNotes, noteToIndex };
