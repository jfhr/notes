function onload() {
    for (let i = 0; i < localStorage.length; i++) {
        let text = localStorage.getItem(i);
        addNote(text, false);
    }
    
    let searchContainer = document.getElementById("search-container");
    searchContainer.addEventListener("input", oninputSearch);
    
    let newNote = document.getElementById("new-note");
    newNote.addEventListener("keydown", onkeydownNewNote);
}

function onkeydownNewNote(event) {
    if (event.ctrlKey && event.key === "Enter") {
        submitNote();
    }
}

function submitNote() {
    let text = document.getElementById("new-note").value;
    text = processNoteText(text);
    addNote(text, true);
    document.getElementById("new-note").value = "";
}

function addNote(text, save) {
    let element = document.createElement("li");
    element.innerHTML = text;
    element.classList.add("note", "center");
    document.getElementById("notes-list").appendChild(element);
    if (save) {
        saveNote(text);
    }
}

function saveNote(text) {
    let index = localStorage.length;
    localStorage.setItem(index, text);
}

function processNoteText(text) {
    text = text.replace(/\n/g, "<br>");
    return text;
}

function oninputSearch(event) {
    let query = document.getElementById("search").value.toLowerCase();
    filterNotes(query);
}

function filterNotes(query) {
    let listNode = document.getElementById("notes-list");
    for (let i of listNode.children) {
        if (i.innerText.toLowerCase().includes(query)) {
            i.style.display = "inherit";
        } else {
            i.style.display = "none";
        }
    }
}

document.addEventListener( "DOMContentLoaded", onload, false );
