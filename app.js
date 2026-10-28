const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');
const empty = document.getElementById('empty');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
  list.innerHTML = '';
  empty.style.display = tasks.length ? 'none' : 'block';

  tasks.forEach((task, i) => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');

    const text = document.createElement('span');
    text.className = 'text';
    text.textContent = task.text;
    text.addEventListener('click', () => {
      tasks[i].done = !tasks[i].done;
      save();
      render();
    });

    const del = document.createElement('button');
    del.className = 'del';
    del.textContent = '\u00d7';
    del.addEventListener('click', () => {
      tasks.splice(i, 1);
      save();
      render();
    });

    li.appendChild(text);
    li.appendChild(del);
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  tasks.push({ text: value, done: false });
  input.value = '';
  save();
  render();
});

render();
