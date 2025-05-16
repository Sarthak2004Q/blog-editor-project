const API = '/api/blogs'; // ✅ RELATIVE path, no full URL

const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const tagsInput = document.getElementById('tags');
const autosaveMsg = document.getElementById('autosave-msg');

let autoSaveTimer;

async function saveDraft() {
  const blog = {
    title: titleInput.value,
    content: contentInput.value,
    tags: tagsInput.value
  };

  const res = await fetch(`${API}/save-draft`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blog)
  });
  const data = await res.json();
  displayBlogs();
  alert("Draft Saved!");
}

async function publishBlog() {
  const blog = {
    title: titleInput.value,
    content: contentInput.value,
    tags: tagsInput.value
  };

  const res = await fetch(`${API}/publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blog)
  });
  const data = await res.json();
  displayBlogs();
  alert("Published!");
}

async function displayBlogs() {
  const res = await fetch(API);
  const blogs = await res.json();

  const publishedDiv = document.getElementById('published-list');
  const draftDiv = document.getElementById('draft-list');
  publishedDiv.innerHTML = '';
  draftDiv.innerHTML = '';

  blogs.forEach(blog => {
    const div = document.createElement('div');
    div.className = 'blog-item';
    div.innerHTML = `
      <h3>${blog.title}</h3>
      <p class="meta">Tags: ${blog.tags.join(', ')}</p>
      <p>${blog.content.substring(0, 100)}...</p>
    `;
    blog.status === 'published' ? publishedDiv.appendChild(div) : draftDiv.appendChild(div);
  });
}

function autoSave() {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    if (titleInput.value || contentInput.value || tagsInput.value) {
      saveDraft();
      autosaveMsg.textContent = 'Auto-saved!';
      setTimeout(() => (autosaveMsg.textContent = ''), 2000);
    }
  }, 5000);
}

titleInput.addEventListener('input', autoSave);
contentInput.addEventListener('input', autoSave);
tagsInput.addEventListener('input', autoSave);

window.onload = displayBlogs;
