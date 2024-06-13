const { errorMessages, musicNotes, noteToIndex } = require("../src/helper_objects");
const { generateUniqueNote } = require("../src/helper_functions");
const { JamBuddy } = require("../src/jam_buddy");

describe("JamBuddy", () => {
  let buddy;
  const sampleNotes = ["C", "D#"];
  const sampleNotesWithFlat = ["C", "Eb"];

  beforeEach(() => {
    buddy = new JamBuddy();
  });

  describe("randomizeCurrentNotes method", () => {
    it("should assign the value of currentNotes with 2 valid random notes.", () => {
      buddy.randomizeCurrentNotes();
      expect(buddy.currentNotes.length).toBe(2);
      expect(
        buddy.currentNotes.every(note => Object.keys(noteToIndex).includes(note))
      ).toBe(true);
    });
  });

  describe("setCurrentNotes", () => {
    it("should set the current notes to the provided valid notes", () => {
      buddy.setCurrentNotes(sampleNotes);
      expect(buddy.getCurrentNotes()).toEqual(sampleNotes);
    });

    it("should throw an error when invalid notes are provided", () => {
      expect(() => buddy.setCurrentNotes(["B#", "D#"])).toThrowError(
        errorMessages.invalidNoteError
      );
    });

    it("should throw an error when trying to set two identical notes", () => {
      spyOn(console, "error");
      const identicalNotes = ["C", "C"];
      expect(() => buddy.setCurrentNotes(identicalNotes)).toThrowError(
        errorMessages.sameNoteError
      );
    });
  });

  describe("checkAnswer", () => {
    it("should throw an error for an invalid semitone difference", () => {
      buddy.setCurrentNotes(sampleNotes);

      expect(() => buddy.checkAnswer(-3)).toThrowError(
        errorMessages.invalidSemitoneError
      );

      expect(() => buddy.checkAnswer(3.5)).toThrowError(
        errorMessages.invalidSemitoneError
      );

      expect(() => buddy.checkAnswer("invalid")).toThrowError(
        errorMessages.invalidSemitoneError
      );
    });

    it("should return true for a correct answer in the clockwise direction", () => {
      buddy.setCurrentNotes(sampleNotes);
      expect(buddy.checkAnswer(3)).toBe(true);
    });

    it("should return true for a correct answer in the anticlockwise direction", () => {
      buddy.setCurrentNotes(sampleNotes);
      expect(buddy.checkAnswer(9)).toBe(true);
    });

    it("should return false for an incorrect answer in the clockwise direction", () => {
      buddy.setCurrentNotes(sampleNotes);
      expect(buddy.checkAnswer(5)).toBe(false);
    });

    it("should return false for an incorrect answer in the anticlockwise direction", () => {
      buddy.setCurrentNotes(sampleNotes);
      expect(buddy.checkAnswer(8)).toBe(false);
    });

    it("should return false for an incorrect answer in the anticlockwise direction for notes with flats", () => {
      buddy.setCurrentNotes(sampleNotesWithFlat);
      expect(buddy.checkAnswer(2)).toBe(false);
    });

    it("should return true for a correct answer in the anticlockwise direction for notes with flats", () => {
      buddy.setCurrentNotes(sampleNotesWithFlat);
      expect(buddy.checkAnswer(9)).toBe(true);
    });

    it("should return false for an incorrect answer in the clockwise direction for notes with flats", () => {
      buddy.setCurrentNotes(sampleNotesWithFlat);
      expect(buddy.checkAnswer(4)).toBe(false);
    });

    it("should return true for a correct answer in the clockwise direction for notes with flats", () => {
      buddy.setCurrentNotes(sampleNotesWithFlat);
      expect(buddy.checkAnswer(3)).toBe(true);
    });

  });

  describe("generateUniqueNote", () => {
    it("should generate a note different from the provided note", () => {
      const uniqueNote = generateUniqueNote("A");
      expect(Object.keys(noteToIndex)).toContain(uniqueNote);
    });
  });
});
