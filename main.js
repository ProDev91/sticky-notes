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
    const newNote = createNoteElement("div", "note")
    const noteContainer = createNoteElement("div", "note-container")
    const mainNotes = document.getElementById("main_notes");

    addNoteClickEvents(noteHeaderContainer, noteIconContainer, noteHeader, rightResizer, bottomResizer)

    noteHeaderContainer.appendChild(noteHeader);
    noteIconContainer.appendChild(noteIcon);
    noteTextContainer.appendChild(noteText);
    newNote.append(noteHeaderContainer, noteIconContainer, noteTextContainer, rightResizer, bottomResizer);
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

function addNoteClickEvents(header, icon, input, rightResizer, bottomResizer) {
    header.addEventListener("click", enableHeader)
    header.addEventListener("keypress", disableHeader)
    input.addEventListener("blur", disableHeader)
    icon.addEventListener("click", showNoteSettings)
    rightResizer.addEventListener("mousedown", initDrag)
    bottomResizer.addEventListener("mousedown", initDrag)
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

  function doDrag(e) {
    element.style.width = startWidth + e.clientX - startX + "px";
    element.style.height = startHeight + e.clientY - startY + "px";
  }

  function stopDrag() {
    document.documentElement.removeEventListener("mousemove", doDrag, false);
    document.documentElement.removeEventListener("mouseup", stopDrag, false);
  }






// function initResizeElement() {
//     var popups = document.getElementsByClassName("popup");
//     var element = null;
//     var startX, startY, startWidth, startHeight;
  
//     for (var i = 0; i < popups.length; i++) {
//       var p = popups[i];
  
//       var right = document.createElement("div");
//       right.className = "resizer-right";
//       p.appendChild(right);
//       right.addEventListener("mousedown", initDrag, false);
//       right.parentPopup = p;
  
//       var bottom = document.createElement("div");
//       bottom.className = "resizer-bottom";
//       p.appendChild(bottom);
//       bottom.addEventListener("mousedown", initDrag, false);
//       bottom.parentPopup = p;
  
//       var both = document.createElement("div");
//       both.className = "resizer-both";
//       p.appendChild(both);
//       both.addEventListener("mousedown", initDrag, false);
//       both.parentPopup = p;
//     }
  
//     function initDrag(e) {
//       element = this.parentPopup;
  
//       startX = e.clientX;
//       startY = e.clientY;
//       startWidth = parseInt(
//         document.defaultView.getComputedStyle(element).width,
//         10
//       );
//       startHeight = parseInt(
//         document.defaultView.getComputedStyle(element).height,
//         10
//       );
//       document.documentElement.addEventListener("mousemove", doDrag, false);
//       document.documentElement.addEventListener("mouseup", stopDrag, false);
//     }
  
//     function doDrag(e) {
//       element.style.width = startWidth + e.clientX - startX + "px";
//       element.style.height = startHeight + e.clientY - startY + "px";
//     }
  
//     function stopDrag() {
//       document.documentElement.removeEventListener("mousemove", doDrag, false);
//       document.documentElement.removeEventListener("mouseup", stopDrag, false);
//     }
//   }
  