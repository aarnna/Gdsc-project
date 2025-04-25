const form = document.getElementById('noteForm');
const notesList = document.getElementById('notesList');

const API_URL = 'URL';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' }
  });

  form.reset();
  loadNotes();
});

async function loadNotes() {
  const res = await fetch(API_URL);
  const notes = await res.json();
  notesList.innerHTML = '';
  notes.forEach(note => {
    const li = document.createElement('li');
    li.textContent = `${note.title}: ${note.content}`;
    notesList.appendChild(li);
  });
}

loadNotes();
