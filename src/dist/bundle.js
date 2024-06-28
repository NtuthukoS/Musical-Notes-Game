/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { JamBuddy } = __webpack_require__(/*! ./jam_buddy */ \"./src/jam_buddy.js\");\nconst { updateJamBuddy } = __webpack_require__(/*! ./app_helper */ \"./src/app_helper.js\");\nconst { displayed, userInput, buttons, answers } = __webpack_require__(/*! ./dom_elements */ \"./src/dom_elements.js\");\nconst { musicNotes } = __webpack_require__(/*! ./helper_objects */ \"./src/helper_objects.js\");\nconst { calculateNoteDifferences } = __webpack_require__(/*! ./helper_functions */ \"./src/helper_functions.js\");\n\nconst buddy = new JamBuddy();\nlet streak = 0;\nconst resultMessage = document.getElementById(\"resultMessage\");\n\nfunction displayNotes(buddy) {\n  const notesDisplay = displayed.notesDisplay;\n  const currentNotes = buddy.getCurrentNotes();\n  notesDisplay.textContent = `Current Notes: ${currentNotes[0]} and ${currentNotes[1]}`;\n}\n\nfunction displayResult(isCorrect) {\n  if (isCorrect) {\n    resultMessage.textContent = answers.correct;\n    buttons.submitButton.disabled = true;\n    streak++;\n    updateStreakDisplay();\n  } else {\n    resultMessage.textContent = answers.incorrect;\n    streak = 0;\n    updateStreakDisplay();\n  }\n\n  updateStreakDisplay();\n\n  setTimeout(() => {\n    clearResultMessage();\n  }, 3000);\n}\n\nfunction displayExplanation() {\n  const explanationMessage = document.getElementById(\"explanationMessage\");\n  const currentNotes = buddy.getCurrentNotes();\n  const correctAnswers = calculateNoteDifferences(currentNotes[0], currentNotes[1]);\n  \n  const harmonicNotes = [\n    \"A/Bb\", \"A#\", \"B\", \"C\", \"C#/Db\", \"D\", \"D#/Eb\", \"E\", \"F\", \"F#/Gb\", \"G\", \"G#/Ab\"\n  ];\n\n  const formattedNotes = harmonicNotes.map(note => {\n    const seperatedNotes = note.split(\"/\");\n\n    if (seperatedNotes.includes(currentNotes[0]) || seperatedNotes.includes(currentNotes[1])) {\n      return `<b>${seperatedNotes.join(\"/\")}</b>`;\n    }\n    return note;\n  }).join(\", \");\n\n  explanationMessage.innerHTML = `Explanation - These are the notes in their order: ${formattedNotes}. The notes are <b>${currentNotes[0]}</b> and <b>${currentNotes[1]}</b>. The correct semitone difference is <b>${correctAnswers.anticlockwise}</b> in the clockwise direction & <b>${correctAnswers.clockwise}</b> in the anti-clockwise.`;\n}\n\nfunction clearResultMessage() {\n  resultMessage.textContent = \"\";\n  const answerInput = document.getElementById(\"answerInput\");\n  answerInput.value = \"\";\n}\n\nfunction clearExplanationMessage(){\n  displayed.explanationMessage.textContent = \"\";\n}\n\nfunction updateStreakDisplay() {\n  const streakDisplay = document.getElementById(\"streakDisplay\");\n  streakDisplay.textContent = `Streak: ${streak}`;\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const answerForm = buttons.answerForm;\n  answerForm.addEventListener(\"submit\", (event) => {\n    event.preventDefault();\n    const answerInput = userInput.answerInput;\n    const userAnswer = parseInt(answerInput.value, 10);\n    let isCorrect;\n    try {\n      updateJamBuddy(buddy);\n      isCorrect = buddy.checkAnswer(userAnswer);\n      displayResult(isCorrect, () => {\n        const submitButton = buttons.submitButton;\n        const randomizeButton = buttons.randomizeButton;\n        randomizeButton.disabled = true;\n        submitButton.disabled = true;\n      });\n    } catch (error) {\n      const resultMessage = displayed.resultMessage;\n      resultMessage.textContent = error.message;\n    }\n  });\n\n  const randomizeButton = buttons.randomizeButton;\n  randomizeButton.addEventListener(\"click\", () => {\n    buddy.randomizeCurrentNotes();\n    displayNotes(buddy);\n    buttons.submitButton.disabled = false;\n    clearResultMessage();\n    clearExplanationMessage();\n  });\n\n  const giveUpButton = document.getElementById(\"giveUpButton\");\n  giveUpButton.addEventListener(\"click\", () => {\n    displayExplanation();\n    streak = 0;\n    buttons.submitButton.disabled = true;\n    updateStreakDisplay();\n  });\n\n  buddy.randomizeCurrentNotes();\n  displayNotes(buddy);\n});\n\nmodule.exports = {\n  displayNotes,\n  displayResult,\n  clearResultMessage,\n  displayExplanation,\n  updateStreakDisplay,\n};\n\n\n//# sourceURL=webpack://semitone-difference-basic-algorithm-scripting/./src/app.js?");

/***/ }),

/***/ "./src/app_helper.js":
/*!***************************!*\
  !*** ./src/app_helper.js ***!
  \***************************/
/***/ ((module) => {

eval("function updateJamBuddy(buddy){\n    const noteMessage = document.getElementById(\"notesDisplay\").textContent.split(\" \");\n    const notes = [noteMessage[2],noteMessage[4]]\n    buddy.setCurrentNotes(notes)\n}\n\nmodule.exports = {updateJamBuddy}\n\n//# sourceURL=webpack://semitone-difference-basic-algorithm-scripting/./src/app_helper.js?");

/***/ }),

/***/ "./src/dom_elements.js":
/*!*****************************!*\
  !*** ./src/dom_elements.js ***!
  \*****************************/
/***/ ((module) => {

eval("const userInput = {\n  answerInput: document.getElementById(\"answerInput\")\n};\n\nconst buttons = {\n  answerForm: document.getElementById(\"answerForm\"),\n  randomizeButton: document.getElementById(\"randomizeButton\"),\n  submitButton: document.querySelector(\"#answerForm button[type='submit']\"),\n  giveUpButton: document.getElementById(\"giveUpButton\")\n};\n\nconst displayed = {\n  notesDisplay: document.getElementById(\"notesDisplay\"),\n  resultMessage: document.getElementById(\"resultMessage\"),\n  streakDisplay: document.getElementById(\"streakDisplay\"),\n  explanationMessage: document.getElementById(\"explanationMessage\")\n};\n\nconst answers = {\n  correct: \"Correct!\",\n  incorrect: \"Incorrect!\"\n};\n\nconst errorMessages = {\n  invalidSemitoneError: \"Invalid semitone difference\"\n};\n\nmodule.exports = {\n  userInput,\n  buttons,\n  displayed,\n  answers,\n  errorMessages\n};\n\n//# sourceURL=webpack://semitone-difference-basic-algorithm-scripting/./src/dom_elements.js?");

/***/ }),

/***/ "./src/helper_functions.js":
/*!*********************************!*\
  !*** ./src/helper_functions.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { errorMessages, musicNotes, noteToIndex } = __webpack_require__(/*! ./helper_objects */ \"./src/helper_objects.js\");\n\nfunction calculateNoteDifferences(note1, note2) {\n  const note1Index = noteToIndex[note1];\n  const note2Index = noteToIndex[note2];\n  const notesLength = musicNotes.length;\n\n  if (note1Index === note2Index) {\n    return { clockwise: 0, anticlockwise: 0 };\n  }\n\n  const clockwise = (note2Index - note1Index + notesLength) % notesLength;\n  const anticlockwise = (notesLength - clockwise) % notesLength;\n\n  return { clockwise, anticlockwise };\n}\n\nfunction getRandomNote() {\n  const flatNotes = Object.keys(noteToIndex);\n  if (flatNotes.length === 0) {\n    throw new Error(errorMessages.emptyArrayError);\n  }\n  const randomIndex = Math.floor(Math.random() * flatNotes.length);\n  return flatNotes[randomIndex];\n}\n\nfunction validateNotes(notes) {\n  return notes.every(note => noteToIndex.hasOwnProperty(note));\n}\n\nfunction generateUniqueNote(note1) {\n  const flatNotes = Object.keys(noteToIndex);\n  if (flatNotes.length < 2) {\n    throw new Error(errorMessages.uniqueNoteError);\n  }\n\n  let note2;\n  do {\n    note2 = getRandomNote();\n  } while (note2 === note1);\n\n  return note2;\n}\n\nmodule.exports = {\n  calculateNoteDifferences,\n  getRandomNote,\n  validateNotes,\n  generateUniqueNote,\n};\n\n\n\n//# sourceURL=webpack://semitone-difference-basic-algorithm-scripting/./src/helper_functions.js?");

/***/ }),

/***/ "./src/helper_objects.js":
/*!*******************************!*\
  !*** ./src/helper_objects.js ***!
  \*******************************/
/***/ ((module) => {

eval("const errorMessages = {\n  invalidNoteError: \"Invalid note provided\",\n  invalidSemitoneError: \"Invalid input. It should be a positive integer between 1 and 11.\",\n  sameNoteError: \"Cannot set two of the same notes.\",\n};\n\nconst musicNotes = [\n  \"A\",\n  [\"A#\", \"Bb\"],\n  \"B\",\n  \"C\",\n  [\"C#\", \"Db\"],\n  \"D\",\n  [\"D#\", \"Eb\"],\n  \"E\",\n  \"F\",\n  [\"F#\", \"Gb\"],\n  \"G\",\n  [\"G#\", \"Ab\"],\n];\n\nconst noteToIndex = {};\nmusicNotes.forEach((note, index) => {\n  if (Array.isArray(note)) {\n    note.forEach(n => noteToIndex[n] = index);\n  } else {\n    noteToIndex[note] = index;\n  }\n});\n\nmodule.exports = { errorMessages, musicNotes, noteToIndex };\n\n\n//# sourceURL=webpack://semitone-difference-basic-algorithm-scripting/./src/helper_objects.js?");

/***/ }),

/***/ "./src/jam_buddy.js":
/*!**************************!*\
  !*** ./src/jam_buddy.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  getRandomNote,\n  validateNotes,\n  generateUniqueNote,\n  calculateNoteDifferences,\n} = __webpack_require__(/*! ./helper_functions */ \"./src/helper_functions.js\");\n\nconst { errorMessages } = __webpack_require__(/*! ./helper_objects */ \"./src/helper_objects.js\");\n\nclass JamBuddy {\n  constructor() {\n    this.currentNotes = [];\n  }\n\n  setCurrentNotes(notes) {\n    if (!validateNotes(notes)) {\n      throw new Error(errorMessages.invalidNoteError);\n    }\n\n    if (notes[0] === notes[1]) {\n      throw new Error(errorMessages.sameNoteError);\n    }\n\n    this.currentNotes = notes;\n  }\n\n  getCurrentNotes() {\n    return this.currentNotes;\n  }\n\n  randomizeCurrentNotes() {\n    let firstNote, secondNote;\n    do {\n      firstNote = getRandomNote();\n      secondNote = generateUniqueNote(firstNote);\n    } while (firstNote === secondNote);\n    this.currentNotes = [firstNote, secondNote];\n  }\n\n  checkAnswer(semitoneDifference) {\n    if (!Number.isInteger(semitoneDifference) || semitoneDifference < 0) {\n      throw new Error(errorMessages.invalidSemitoneError);\n    }\n    const { clockwise, anticlockwise } = calculateNoteDifferences(\n      ...this.currentNotes\n    );\n\n    return (\n      semitoneDifference === clockwise || semitoneDifference === anticlockwise\n    );\n  }\n}\n\nmodule.exports = { JamBuddy };\n\n\n//# sourceURL=webpack://semitone-difference-basic-algorithm-scripting/./src/jam_buddy.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;