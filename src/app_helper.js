function updateJamBuddy(buddy){
    const noteMessage = document.getElementById("notesDisplay").textContent.split(" ");
    const notes = [noteMessage[2],noteMessage[4]]
    buddy.setCurrentNotes(notes)
}

module.exports = {updateJamBuddy}