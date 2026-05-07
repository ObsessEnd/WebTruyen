document.addEventListener('DOMContentLoaded', () => {
    // 1. Lấy Tên Thể Loại từ thanh địa chỉ (URL)
    const params = new URLSearchParams(window.location.search);
    const categoryType = params.get('type'); 

    const titleElement = document.getElementById('category-title');
    const container = document.getElementById('category-results');

    if (!categoryType) {
        titleElement.innerHTML = `<i class="fas fa-exclamation-triangle text-danger me-2"></i>Chưa chọn thể loại`;
        container.innerHTML = `<p class="text-muted">Vui lòng chọn một thể loại từ thanh menu.</p>`;
        return;
    }

    // 2. In tên thể loại ra tiêu đề
    titleElement.innerHTML = `<i class="fas fa-bookmark text-warning me-2"></i>Thể loại: <span class="text-primary">${categoryType}</span>`;
    document.title = `Thể loại ${categoryType} - Thiên Đạo`;

    // 3. LỌC TRUYỆN: Tìm các truyện có mảng categories chứa categoryType
    const stories = window.appDB;
    const filteredStories = stories.filter(story => 
        story.categories && story.categories.includes(categoryType)
    );

    // 4. In ra màn hình
    if (filteredStories.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">Chưa có truyện nào thuộc thể loại <strong>${categoryType}</strong>.</h5>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredStories.map(story => `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card h-100 border-0 shadow-sm transition-hover">
                <a href="story-detail.html?id=${story.id}">
                    <img src="${story.cover}" class="card-img-top" style="height: 250px; object-fit: cover;">
                </a>
                <div class="card-body p-3">
                    <h6 class="fw-bold text-truncate mb-1">
                        <a href="story-detail.html?id=${story.id}" class="text-decoration-none text-dark">${story.title}</a>
                    </h6>
                    <small class="text-muted"><i class="fas fa-user-pen me-1"></i>${story.author}</small>
                </div>
            </div>
        </div>
    `).join('');
});