document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    
    // Hàm loại bỏ dấu tiếng Việt
    function removeAccents(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    // Lấy tham số
    const qKeyword = params.get('keyword') ? removeAccents(params.get('keyword')) : '';
    const qSort = params.get('sort') || 'new'; // 'new', 'views', 'az'
    const qStatus = params.get('status') || '';
    const qChap = params.get('chap') || 'all'; // 'all', '0-100', '100-500', '500-999999'
    const qCats = params.get('cats') ? params.get('cats').split(',') : [];

    let stories = window.appDB;

    // --- BƯỚC 1: LỌC TRUYỆN ---
    let filteredStories = stories.filter(story => {
        // 1. Lọc Từ khóa (Tìm trong Tên HOẶC Tác giả)
        if (qKeyword) {
            const matchTitle = removeAccents(story.title).includes(qKeyword);
            const matchAuthor = removeAccents(story.author).includes(qKeyword);
            if (!matchTitle && !matchAuthor) return false;
        }
        
        // 2. Lọc Tình trạng
        if (qStatus && story.status !== qStatus) return false;

        // 3. Lọc Số chương
        if (qChap !== 'all') {
            const [min, max] = qChap.split('-').map(Number);
            if (story.latestChapter < min || story.latestChapter > max) return false;
        }

        // 4. Lọc Thể loại (Chứa ÍT NHẤT 1 thể loại được chọn)
        if (qCats.length > 0 && qCats[0] !== "") {
            const hasCategory = qCats.some(cat => story.categories && story.categories.includes(cat));
            if (!hasCategory) return false;
        }

        return true;
    });

    // --- BƯỚC 2: SẮP XẾP KẾT QUẢ ---
    if (qSort === 'new') {
        filteredStories.sort((a, b) => b.id - a.id); // Mới nhất (ID lớn) lên đầu
    } else if (qSort === 'views') {
        filteredStories.sort((a, b) => b.views - a.views); // Nhiều view nhất
    } else if (qSort === 'az') {
        filteredStories.sort((a, b) => a.title.localeCompare(b.title)); // Tên A-Z
    }

    // --- BƯỚC 3: IN RA MÀN HÌNH ---
    document.getElementById('total-count').innerText = filteredStories.length;
    const container = document.getElementById('all-stories-container');

    if (filteredStories.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search-minus fa-4x text-muted mb-3"></i>
                <h4 class="text-muted fw-bold">Không tìm thấy chân lý!</h4>
                <p class="text-muted">Đạo hữu vui lòng nới lỏng điều kiện tìm kiếm và thử lại.</p>
                <a href="index.html" class="btn btn-outline-primary mt-3">Về Trang Chủ</a>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredStories.map(story => `
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
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <span class="badge bg-light text-primary border">Chương ${story.latestChapter}</span>
                        <span class="badge ${story.status === 'Hoàn thành' ? 'bg-success' : 'bg-info text-dark'}">${story.status}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
});