document.addEventListener('DOMContentLoaded', function () {
  initApp();
}, false);

function initApp() {
  document.getElementById("create-note-btn").addEventListener("click", createNote);
}

function createNote(e) {
  const noteHeader = createNoteElement("input");
  const noteIcon = createNoteElement("i");
  const noteText = createNoteElement("textarea");
  const noteIconContainer = createNoteElement("div", "note-icon");
  const noteHeaderContainer = createNoteElement("div", "note-header");
  const noteTextContainer = createNoteElement("div", "note-text");
  const rightResizer = createNoteElement("div", "right-resize");
  const bottomResizer = createNoteElement("div", "bottom-resize");
  const cornerResizer = createNoteElement("div", "corner-resize")
  const topResizeger = createNoteElement("div", "top-drag");
  const newNote = createNoteElement("div", "note");
  const noteContainer = createNoteElement("div", "note-container");
  const mainNotes = document.getElementById("main_notes");
  const settingsMenu = createNoteElement("div", "note-settings", "hide");
  const colorOptions = createNoteElement("div", "color-options");
  const colorRed = createNoteElement("div", "color-option", "color-option_red");
  const colorYellow = createNoteElement("div", "color-option", "color-option_yellow");
  const colorBlue = createNoteElement("div", "color-option", "color-option_blue");
  const colorGreen = createNoteElement("div", "color-option", "color-option_green");
  const deleteBtn = createNoteElement("div", "delete-btn");
  const deleteBtnText = document.createTextNode("Delete")
  addNoteClickEvents(noteContainer, noteHeaderContainer, noteIconContainer, noteHeader, colorRed, colorYellow, colorBlue, colorGreen, deleteBtn)
  e.pointerType == "mouse" ? addDesktopClickEvents(rightResizer, bottomResizer, cornerResizer, topResizeger) : addMobileClickEvents(rightResizer, bottomResizer, cornerResizer, topResizeger)
  deleteBtn.appendChild(deleteBtnText);
  noteHeaderContainer.appendChild(noteHeader);
  noteIconContainer.appendChild(noteIcon);
  noteTextContainer.appendChild(noteText);
  colorOptions.append(colorRed, colorYellow, colorBlue, colorGreen)
  settingsMenu.append(colorOptions, deleteBtn)
  newNote.append(noteHeaderContainer, noteIconContainer, noteTextContainer, rightResizer, bottomResizer, cornerResizer, settingsMenu);
  noteContainer.append(newNote, topResizeger);
  mainNotes.appendChild(noteContainer);


}

function createNoteElement(elementType, className, classNameTwo) {
  const element = document.createElement(elementType)
  elementType === "input" ? (element.disabled = true, element.value = "Untitled") : false;
  elementType === "i" ? element.classList.add('fa-solid', 'fa-ellipsis-vertical') : false;
  className !== undefined ? element.classList.add(className) : false;
  classNameTwo !== undefined ? element.classList.add(classNameTwo) : false;
  return element;
}

function addNoteClickEvents(noteContainer, header, icon, input, colorRed, colorYellow, colorBlue, colorGreen, deleteBtn) {
  noteContainer.addEventListener("click", makeActive)
  header.addEventListener("click", enableHeader)
  header.addEventListener("keypress", disableHeader)
  input.addEventListener("blur", disableHeader)
  icon.addEventListener("click", showNoteSettings)
  colorRed.addEventListener("click", changeColor)
  colorYellow.addEventListener("click", changeColor)
  colorBlue.addEventListener("click", changeColor)
  colorGreen.addEventListener("click", changeColor)
  deleteBtn.addEventListener("click", deleteNote)
}

function addDesktopClickEvents(rightResizer, bottomResizer, cornerResizer, topResizeger) {
  bottomResizer.addEventListener("mousedown", initResize)
  rightResizer.addEventListener("mousedown", initResize)
  cornerResizer.addEventListener("mousedown", initResize)
  topResizeger.addEventListener("mousedown", initMove)
}

function addMobileClickEvents(rightResizer, bottomResizer, cornerResizer, topResizeger) {
  bottomResizer.addEventListener("touchstart", initResize)
  rightResizer.addEventListener("touchstart", initResize)
  cornerResizer.addEventListener("touchstart", initResize)
  topResizeger.addEventListener("touchstart", initMove)
}

function makeActive() {
  document.querySelector(".active-note") !== null ? document.querySelector(".active-note").classList.remove("active-note") : null;
  this.classList.add("active-note")
}

function enableHeader(event) {
  event.target.disabled = false;
  event.target.select();
}

function disableHeader(event) {
  event.type == "blur" || event.key === "Enter" ? event.target.disabled = true : false;
}

function showNoteSettings() {
  let settings = document.getElementsByClassName('note-settings')
  for (let i = 0; i < settings.length; i++) {
    if (this.parentElement.querySelector('.note-settings') != settings[i]) {
      settings[i].classList.add("hide")
    }
  }

  this.parentElement.querySelector('.note-settings').classList.contains("hide") ? this.parentElement.querySelector('.note-settings').classList.remove('hide') : this.parentElement.querySelector('.note-settings').classList.add('hide');
}

function initResize(e) {
  element = this.className;
  parentElement = this.parentElement;

  startWidth = parseInt(
    document.defaultView.getComputedStyle(parentElement).width,
    10
  );

  startHeight = parseInt(
    document.defaultView.getComputedStyle(parentElement).height,
    10
  );

  if (e.type == "mousedown") {
    startX = e.clientX
    startY = e.clientY

    document.documentElement.addEventListener("mousemove", doResize, false);
    document.documentElement.addEventListener("mouseup", stopResize, false);
  } else {
    startX = e.touches[0].clientX
    startY = e.touches[0].clientY

    document.documentElement.addEventListener("touchmove", doResizeMobile, false);
    document.documentElement.addEventListener("touchend", stopResizeMobile, false);
  }
}

function doResize(e) {
  if (element == 'right-resize') {
    parentElement.style.width = startWidth + e.clientX - startX + "px";
  } else if (element == 'bottom-resize') {
    parentElement.style.height = startHeight + e.clientY - startY + "px";
  } else {
    parentElement.style.width = startWidth + e.clientX - startX + "px";
    parentElement.style.height = startHeight + e.clientY - startY + "px";
  }
}

function doResizeMobile(e) {
  if (element == 'right-resize') {
    parentElement.style.width = startWidth + e.touches[0].clientX - startX + "px";
  } else if (element == 'bottom-resize') {
    parentElement.style.height = startHeight + e.touches[0].clientY - startY + "px";
  } else {
    parentElement.style.width = startWidth + e.touches[0].clientX - startX + "px";
    parentElement.style.height = startHeight + e.touches[0].clientY - startY + "px";
  }
}

function stopResize() {
  document.documentElement.removeEventListener("mousemove", doResize, false);
  document.documentElement.removeEventListener("mouseup", stopResize, false);
}

function stopResizeMobile() {
  document.documentElement.removeEventListener("touchmove", doResizeMobile, false);
  document.documentElement.removeEventListener("touchend", stopResizeMobile, false);
}

function initMove(e) {
  parentElement = this.parentElement;

  startTop = parseInt(
    document.defaultView.getComputedStyle(parentElement).top,
    10
  );

  startLeft = parseInt(
    document.defaultView.getComputedStyle(parentElement).left,
    10
  );

  if (e.type == "mousedown") {
    startX = e.clientX
    startY = e.clientY

    document.documentElement.addEventListener("mousemove", doMove, false);
    document.documentElement.addEventListener("mouseup", stopMove, false);
  } else {
    startX = e.touches[0].clientX
    startY = e.touches[0].clientY

    document.documentElement.addEventListener("touchmove", doMoveMobile, false);
    document.documentElement.addEventListener("touchend", stopMoveMobile, false);
  }
}

function doMove(e) {
  parentElement.style.left = startLeft + e.clientX - startX + "px";
  parentElement.style.top = startTop + e.clientY - startY + "px";
  parentElement.querySelector('.top-drag').style.cursor = 'grabbing';
  parentElement.classList.add('moving');
}

function doMoveMobile(e) {
  parentElement.style.left = startLeft + e.touches[0].clientX - startX + "px";
  parentElement.style.top = startTop + e.touches[0].clientY - startY + "px";
}


function stopMove() {
  document.documentElement.removeEventListener("mousemove", doMove, false);
  document.documentElement.removeEventListener("mouseup", stopMove, false);
  parentElement.querySelector('.top-drag').style.cursor = 'grab';
  parentElement.classList.remove('moving');
}

function stopMoveMobile() {
  document.documentElement.removeEventListener("touchmove", doMoveMobile, false);
  document.documentElement.removeEventListener("touchend", stopMoveMobile, false);
}

function changeColor() {
  const note = this.parentElement.parentElement.parentElement
  const backgroundColor = getComputedStyle(this).backgroundColor
  note.style.backgroundColor = backgroundColor;
  note.querySelector(".note-settings").classList.add("hide")
}

function deleteNote() {
  this.parentElement.parentElement.parentElement.remove()
}