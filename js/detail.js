// ==========================================
// FILE: js/detail.js (XỬ LÝ TRANG CHI TIẾT TRUYỆN)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const storyId = parseInt(params.get('id'));
    const stories = window.appDB;

    const story = stories.find(s => s.id === storyId);
    const container = document.getElementById('detail-content');

    if (!story) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-book-dead fa-4x text-muted mb-3"></i>
                <h3 class="text-muted fw-bold">Không tìm thấy truyện!</h3>
                <a href="index.html" class="btn btn-primary mt-3">Về Trang Chủ</a>
            </div>`;
        return;
    }

    // 1. Breadcrumb & Title
    const firstCategory = (story.categories && story.categories.length > 0) ? story.categories[0] : 'Khác';
    document.getElementById('detail-category-link').innerText = firstCategory;
    document.getElementById('detail-category-link').href = `the-loai.html?type=${encodeURIComponent(firstCategory)}`;
    document.getElementById('detail-title-bc').innerText = story.title;
    document.title = `${story.title} - Thiên Đạo`;

    // Thẻ Badge Thể loại
    const categoriesHTML = (story.categories && Array.isArray(story.categories)) 
        ? story.categories.map(cat => `<a href="the-loai.html?type=${encodeURIComponent(cat)}" class="badge bg-light text-primary border text-decoration-none me-1 mb-1 transition-hover">${cat}</a>`).join('')
        : `<span class="badge bg-light text-secondary border">Chưa phân loại</span>`;

    // ==========================================
    // 2. IN NỘI DUNG RA GIAO DIỆN
    // ==========================================
    container.innerHTML = `
        <div class="row g-4 mb-5">
            <div class="col-md-4 col-lg-3 text-center">
                <img src="${story.cover}" alt="${story.title}" class="img-fluid rounded shadow w-100 mb-3" style="max-height: 400px; object-fit: cover;">
            </div>
            <div class="col-md-8 col-lg-9">
                <h2 class="fw-bold text-primary mb-3">${story.title}</h2>
                <ul class="list-unstyled mb-4">
                    <li class="mb-2"><i class="fas fa-user-pen text-muted w-20px"></i> <strong>Tác giả:</strong> ${story.author}</li>
                    <li class="mb-2"><i class="fas fa-tags text-muted w-20px"></i> <strong>Thể loại:</strong> ${categoriesHTML}</li>
                    <li class="mb-2"><i class="fas fa-layer-group text-muted w-20px"></i> <strong>Số chương:</strong> <span class="text-danger fw-bold">${story.latestChapter}</span></li>
                    <li class="mb-2"><i class="fas fa-info-circle text-muted w-20px"></i> <strong>Tình trạng:</strong> <span class="badge ${story.status === 'Hoàn thành' ? 'bg-success' : 'bg-info text-dark'}">${story.status}</span></li>
                    <li class="mb-2"><i class="fas fa-eye text-muted w-20px"></i> <strong>Lượt xem:</strong> ${(story.views / 1000).toFixed(0)}k</li>
                </ul>

                <div class="d-flex gap-2 mb-4">
                    <a href="read.html?id=${story.id}&chap=1" class="btn btn-primary px-4 fw-bold"><i class="fas fa-book-open me-2"></i>Đọc Từ Đầu</a>
                    <a href="read.html?id=${story.id}&chap=${story.latestChapter}" class="btn btn-outline-danger px-4 fw-bold"><i class="fas fa-step-forward me-2"></i>Chương Mới Nhất</a>
                </div>
            </div>
        </div>

        <div class="mb-5">
            <h4 class="fw-bold border-bottom pb-2 mb-3"><i class="fas fa-align-left text-primary me-2"></i>Tóm Tắt</h4>
            <p class="text-justify" style="line-height: 1.8;">${story.description}</p>
        </div>

        <div>
            <div class="row align-items-center border-bottom pb-2 mb-3">
                <div class="col-md-6 mb-2 mb-md-0">
                    <h4 class="fw-bold mb-0"><i class="fas fa-list text-primary me-2"></i>Danh Sách Chương</h4>
                </div>
                <div class="col-md-6 text-md-end">
                    <div class="input-group input-group-sm" style="max-width: 250px; margin-left: auto;">
                        <span class="input-group-text bg-white"><i class="fas fa-location-arrow text-muted"></i></span>
                        <input type="number" id="jump-chap-input" class="form-control" placeholder="Nhập số chương..." min="1" max="${story.latestChapter}">
                        <button class="btn btn-primary fw-bold" id="btn-jump-chap">Tới luôn</button>
                    </div>
                </div>
            </div>
            
            <div class="border rounded p-3 bg-white shadow-sm custom-scrollbar" style="max-height: 400px; overflow-y: auto;">
                <div class="row g-2" id="chapter-list-grid">
                    </div>
            </div>
        </div>
    `;

    // ==========================================
    // 3. XỬ LÝ SỰ KIỆN NÚT "TỚI LUÔN"
    // ==========================================
    const jumpBtn = document.getElementById('btn-jump-chap');
    const jumpInput = document.getElementById('jump-chap-input');

    function goToChapter() {
        const chapNum = parseInt(jumpInput.value);
        if (!chapNum || chapNum < 1 || chapNum > story.latestChapter) {
            alert(`Vui lòng nhập số chương từ 1 đến ${story.latestChapter}`);
            return;
        }
        window.location.href = `read.html?id=${story.id}&chap=${chapNum}`;
    }

    jumpBtn.addEventListener('click', goToChapter);
    jumpInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') goToChapter();
    });

    // ==========================================
    // 4. RENDER DANH SÁCH CHƯƠNG KÈM LỊCH SỬ ĐỌC
    // ==========================================
 // ==========================================
    // 4. RENDER DANH SÁCH CHƯƠNG KÈM LỊCH SỬ ĐỌC VÀ DỮ LIỆU TỪ ADMIN
    // ==========================================
    const chapGrid = document.getElementById('chapter-list-grid');
    let chapHTML = '';
    
    // Đọc lịch sử
    let readHistory = JSON.parse(localStorage.getItem(`read_history_${storyId}`)) || [];

    for (let i = 1; i <= story.latestChapter; i++) {
        let isRead = readHistory.includes(i);
        let bgClass = isRead ? 'bg-warning text-dark border-warning fw-bold shadow-sm' : 'bg-light text-dark';
        let checkIcon = isRead ? '<i class="fas fa-check text-danger me-1"></i>' : '';

        // TÌM XEM ADMIN CÓ CÀI TÊN PHỤ HOẶC VIP KHÔNG
        let chapDisplay = `Chương ${i}`;
        let badges = '';
        let isHidden = false;

        if (story.chapterList && Array.isArray(story.chapterList)) {
            let chapData = story.chapterList.find(c => c.chapNum === i);
            if (chapData) {
                if (chapData.subTitle) chapDisplay += ` - ${chapData.subTitle}`;
                if (chapData.isVip) badges += '<i class="fas fa-crown text-warning ms-1" title="VIP"></i>';
                if (chapData.isHidden) isHidden = true;
            }
        }

        // Nếu Admin cài Ẩn chương thì làm mờ không cho bấm
        if (isHidden) {
            chapHTML += `
                <div class="col-6 col-md-4 col-lg-3">
                    <div class="p-2 border rounded bg-secondary text-white opacity-50 text-truncate" title="Chương này đã bị khóa">
                        <i class="fas fa-eye-slash me-1"></i> ${chapDisplay}
                    </div>
                </div>
            `;
        } else {
            chapHTML += `
                <div class="col-6 col-md-4 col-lg-3">
                    <a href="read.html?id=${story.id}&chap=${i}" class="text-decoration-none d-block p-2 border rounded ${bgClass} transition-hover text-truncate" title="${chapDisplay}">
                        ${checkIcon} ${chapDisplay} ${badges}
                    </a>
                </div>
            `;
        }
    }
    chapGrid.innerHTML = chapHTML;
});