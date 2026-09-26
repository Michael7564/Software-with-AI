// Not logged in? Bounce to login.
const currentUser = Parse.User.current();
if (!currentUser) {
  window.location.href = "login.html";
}

document.getElementById("navbar-user").textContent = currentUser.get("username");

document.getElementById("logout-btn").addEventListener("click", async () => {
  await Parse.User.logOut();
  window.location.href = "login.html";
});

const Note = Parse.Object.extend("Note");
let currentNotes = [];
let selectedId = null;

const notesList = document.getElementById("notes-list");
const notesStatus = document.getElementById("notes-status");
const notesCount = document.getElementById("notes-count");
const editorEmpty = document.getElementById("editor-empty");
const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("note-title");
const bodyInput = document.getElementById("note-body");
const formError = document.getElementById("form-error");
const deleteBtn = document.getElementById("delete-btn");

async function loadNotes() {
  notesStatus.textContent = "Loading…";
  notesStatus.classList.remove("hidden");
  try {
    const query = new Parse.Query(Note);
    query.equalTo("owner", currentUser);
    query.descending("updatedAt");
    currentNotes = await query.find();
    renderList();
  } catch (err) {
    notesStatus.textContent = err.message || "Could not load notes.";
  }
}

function renderList() {
  notesList.innerHTML = "";
  if (currentNotes.length === 0) {
    notesStatus.textContent = "No notes yet. Start one.";
    notesStatus.classList.remove("hidden");
    notesCount.classList.add("hidden");
    return;
  }
  notesStatus.classList.add("hidden");
  const n = currentNotes.length;
  notesCount.textContent = `${n} note${n === 1 ? "" : "s"}`;
  notesCount.classList.remove("hidden");

  currentNotes.forEach((note) => {
    const li = document.createElement("li");
    li.className = note.id === selectedId ? "active" : "";
    li.innerHTML = `
      <span class="notes-list-title">${escapeHtml(note.get("title") || "Untitled")}</span>
      <span class="notes-list-date">${note.get("updatedAt")?.toLocaleDateString() || ""}</span>
    `;
    li.addEventListener("click", () => selectNote(note));
    notesList.appendChild(li);
  });
}

function selectNote(note) {
  selectedId = note.id;
  titleInput.value = note.get("title") || "";
  bodyInput.value = note.get("body") || "";
  deleteBtn.classList.remove("hidden");
  showEditor();
  renderList();
}

function startNewNote() {
  selectedId = "new";
  titleInput.value = "";
  bodyInput.value = "";
  deleteBtn.classList.add("hidden");
  showEditor();
  renderList();
}

function showEditor() {
  editorEmpty.classList.add("hidden");
  noteForm.classList.remove("hidden");
  formError.classList.add("hidden");
  titleInput.focus();
}

document.getElementById("new-note-btn").addEventListener("click", startNewNote);

noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  formError.classList.add("hidden");
  try {
    let note;
    if (selectedId === "new") {
      note = new Note();
      note.setACL(new Parse.ACL(currentUser));
      note.set("owner", currentUser);
    } else {
      note = currentNotes.find((n) => n.id === selectedId);
    }
    note.set("title", titleInput.value);
    note.set("body", bodyInput.value);
    await note.save();
    await loadNotes();
    selectedId = note.id;
    deleteBtn.classList.remove("hidden");
    renderList();
  } catch (err) {
    formError.textContent = err.message || "Could not save the note.";
    formError.classList.remove("hidden");
  }
});

deleteBtn.addEventListener("click", async () => {
  const note = currentNotes.find((n) => n.id === selectedId);
  if (!note) return;
  if (!window.confirm("Delete this note? This can't be undone.")) return;
  try {
    await note.destroy();
    selectedId = null;
    noteForm.classList.add("hidden");
    editorEmpty.classList.remove("hidden");
    await loadNotes();
  } catch (err) {
    formError.textContent = err.message || "Could not delete the note.";
    formError.classList.remove("hidden");
  }
});

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

loadNotes();
