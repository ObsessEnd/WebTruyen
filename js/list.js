document.addEventListener('DOMContentLoaded', () => {
    const stories = window.appDB; 
    const container = document.getElementById('all-stories-container');
    const countLabel = document.getElementById('total-count');

    if (!container || !stories) return;

    // Hiển thị tổng số truyện
    countLabel.innerText = stories.length;

    // Render danh sách
    container.innerHTML = stories.map(story => `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card h-100 border-0 shadow-sm transition-hover">
                <a href="story-detail.html?id=${story.id}">
                    <img src="${story.cover}" class="card-img-top" style="height: 280px; object-fit: cover;">
                </a>
                <div class="card-body p-3">
                    <h6 class="fw-bold text-truncate mb-1">
                        <a href="story-detail.html?id=${story.id}" class="text-decoration-none text-dark">${story.title}</a>
                    </h6>
                    <p class="text-muted small mb-2"><i class="fas fa-user-pen me-1"></i>${story.author}</p>
                    <div class="d-flex flex-wrap gap-1 mb-2">
                        ${story.categories ? story.categories.slice(0, 2).map(cat => `<span class="badge bg-light text-primary border">${cat}</span>`).join('') : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
});