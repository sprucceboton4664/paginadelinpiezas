let posts = JSON.parse(localStorage.getItem('forum-posts')) || [];

function addPost(post) {
  posts.unshift(post);
  localStorage.setItem('forum-posts', JSON.stringify(posts));
  displayPosts();
}

function displayPosts(filter = 'all') {
  const container = document.getElementById('posts-container');
  container.innerHTML = '';

  const filteredPosts = filter === 'all' ? 
    posts : 
    posts.filter(post => post.category === filter);

  filteredPosts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.className = 'post-card';
    postElement.innerHTML = `
      <div class="post-header">
        <h3>${post.title}</h3>
        <span class="post-category">${getCategoryLabel(post.category)}</span>
      </div>
      <div class="post-content">
        <p>${post.content}</p>
      </div>
      <div class="post-footer">
        <div class="post-date">${new Date(post.date).toLocaleDateString()}</div>
        <div class="post-reactions">
          <button onclick="likePost('${post.id}')">
            👍 ${post.likes || 0}
          </button>
          <button onclick="savePost('${post.id}')">
            🔖 Guardar
          </button>
        </div>
      </div>
    `;
    container.appendChild(postElement);
  });
}

function getCategoryLabel(category) {
  const labels = {
    tips: 'Tip de Limpieza',
    reviews: 'Reseña',
    experiences: 'Experiencia'
  };
  return labels[category] || category;
}

function likePost(postId) {
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex !== -1) {
    posts[postIndex].likes = (posts[postIndex].likes || 0) + 1;
    localStorage.setItem('forum-posts', JSON.stringify(posts));
    displayPosts();
  }
}

function savePost(postId) {
  alert('Post guardado en favoritos');
  // Implement save functionality
}

// Event Listeners
document.getElementById('post-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const newPost = {
    id: Date.now().toString(),
    title: document.getElementById('post-title').value,
    category: document.getElementById('post-category').value,
    content: document.getElementById('post-content').value,
    date: new Date(),
    likes: 0
  };

  addPost(newPost);
  e.target.reset();
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    displayPosts(e.target.dataset.filter);
  });
});

// Initial display
displayPosts();
