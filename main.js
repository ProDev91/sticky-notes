document.addEventListener('DOMContentLoaded', function(){ 
    initApp();
}, false);

function initApp() {
    document.getElementById("create-note-btn").addEventListener("click", createNote);
}

function createNote() {    
    const noteHeader = createNoteElement("input")
    const noteIcon = createNoteElement("i")
    const noteText = createNoteElement("textarea")
    const noteIconContainer = createNoteElement("div", "note-icon")
    const noteHeaderContainer = createNoteElement("div", "note-header")
    const noteTextContainer = createNoteElement("div", "note-text")
    const rightResizer = createNoteElement("div", "right-resize")
    const bottomResizer = createNoteElement("div", "bottom-resize")
    const topDragger = createNoteElement("div", "top-drag")
    const newNote = createNoteElement("div", "note")
    const noteContainer = createNoteElement("div", "note-container")
    const mainNotes = document.getElementById("main_notes");

    addNoteClickEvents(noteHeaderContainer, noteIconContainer, noteHeader, rightResizer, bottomResizer, topDragger)

    noteHeaderContainer.appendChild(noteHeader);
    noteIconContainer.appendChild(noteIcon);
    noteTextContainer.appendChild(noteText);
    newNote.append(noteHeaderContainer, noteIconContainer, noteTextContainer, rightResizer, bottomResizer, topDragger);
    noteContainer.appendChild(newNote);
    mainNotes.appendChild(noteContainer);

    
}

function createNoteElement(elementType, className) {
    const element = document.createElement(elementType)
    elementType === "input" ? (element.disabled = true, element.value = "Untitled") : false;
    elementType === "i" ? element.classList.add('fa-solid', 'fa-ellipsis-vertical') : false;
    className !== undefined ? element.classList.add(className) : false;
    return element;
}

function addNoteClickEvents(header, icon, input, rightResizer, bottomResizer, topDragger) {
    header.addEventListener("click", enableHeader)
    header.addEventListener("keypress", disableHeader)
    input.addEventListener("blur", disableHeader)
    icon.addEventListener("click", showNoteSettings)
    rightResizer.addEventListener("mousedown", initDrag)
    bottomResizer.addEventListener("mousedown", initDrag)
    topDragger.addEventListener("mousedown", initMove)
}

function enableHeader(event) {
    event.target.disabled = false; 
    event.target.select();
}

function disableHeader(event) {
    event.type == "blur" || event.key === "Enter" ? event.target.disabled = true : false;
}

function showNoteSettings() {
    console.log('Icon')
}

function initDrag(e) {
    element = this.parentElement;

    startX = e.clientX;
    startY = e.clientY;

    startWidth = parseInt(
      document.defaultView.getComputedStyle(element).width,
      10
    );

    startHeight = parseInt(
      document.defaultView.getComputedStyle(element).height,
      10
    );

    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
  }

  function initMove(e) {
    const element = null;
  }

  function doDrag(e) {
    element.style.width = startWidth + e.clientX - startX + "px";
    element.style.height = startHeight + e.clientY - startY + "px";
  }

  function stopDrag() {
    document.documentElement.removeEventListener("mousemove", doDrag, false);
    document.documentElement.removeEventListener("mouseup", stopDrag, false);
  }

  function initMove(e) {
    element = this.parentElement;

    startX = e.clientX;
    startY = e.clientY;

    document.documentElement.addEventListener("mousemove", random, false);
    document.documentElement.addEventListener("mouseup", stopRandom, false);
  }

  function random(e) {
    element.style.left = e.clientX - startX + "px";
    element.style.top = e.clientY - startY + "px";
    element.querySelector('.top-drag').style.cursor = 'grabbing';

  }

  function stopRandom() {
    document.documentElement.removeEventListener("mousemove", random, false);
    document.documentElement.removeEventListener("mouseup", stopRandom, false);
    element.querySelector('.top-drag').style.cursor = 'grab';
    console.log('sdas')
  }