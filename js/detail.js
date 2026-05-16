// ==========================================
// FILE: js/detail.js (XỬ LÝ TRANG CHI TIẾT TRUYỆN + BÌNH LUẬN & TỔNG SAO)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const storyId = parseInt(params.get('id'));
    const stories = window.appDB;

    let storyIndex = stories.findIndex(s => s.id === storyId);
    let story = stories[storyIndex];
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

    // 1. TÍNH TOÁN THỐNG KÊ TỔNG SAO VÀ TỔNG BÌNH LUẬN
    let comments = story.comments || [];
    let totalComments = comments.length;
    let avgRating = 5.0; // Mặc định là 5 sao nếu chưa có ai đánh giá

    if (totalComments > 0) {
        let sum = comments.reduce((acc, cmt) => acc + cmt.rating, 0);
        avgRating = (sum / totalComments).toFixed(1); // Lấy 1 chữ số thập phân (VD: 4.5)
    }

    // Vẽ biểu tượng sao cho phần điểm trung bình (Hỗ trợ nửa sao)
    let avgStarsHTML = '';
    let intAvg = Math.floor(avgRating);
    for (let i = 1; i <= 5; i++) {
        if (i <= intAvg) {
            avgStarsHTML += '<i class="fas fa-star"></i> ';
        } else if (i === intAvg + 1 && avgRating % 1 >= 0.5) {
            avgStarsHTML += '<i class="fas fa-star-half-alt"></i> ';
        } else {
            avgStarsHTML += '<i class="far fa-star"></i> ';
        }
    }

    // 2. Breadcrumb & Title
    const firstCategory = (story.categories && story.categories.length > 0) ? story.categories[0] : 'Khác';
    const catLink = document.getElementById('detail-category-link');
    if(catLink) {
        catLink.innerText = firstCategory;
        catLink.href = `the-loai.html?type=${encodeURIComponent(firstCategory)}`;
    }
    const bcTitle = document.getElementById('detail-title-bc');
    if(bcTitle) bcTitle.innerText = story.title;
    document.title = `${story.title} - Thiên Đạo`;

    const categoriesHTML = (story.categories && Array.isArray(story.categories)) 
        ? story.categories.map(cat => `<a href="the-loai.html?type=${encodeURIComponent(cat)}" class="badge bg-light text-primary border text-decoration-none me-1 mb-1 transition-hover">${cat}</a>`).join('')
        : `<span class="badge bg-light text-secondary border">Chưa phân loại</span>`;

    // ==========================================
    // 3. IN NỘI DUNG RA GIAO DIỆN
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
                    <li class="mb-2"><i class="fas fa-eye text-muted w-20px"></i> <strong>Lượt xem:</strong> ${(story.views / 1000).toFixed(1)}k</li>
                    
                    <li class="mb-2"><i class="fas fa-star text-warning w-20px"></i> <strong>Đánh giá:</strong> <span class="text-danger fw-bold fs-5">${avgRating}</span>/5 <span class="text-muted">(Từ ${totalComments} lượt bình luận)</span></li>
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

        <div class="mb-5">
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
                <div class="row g-2" id="chapter-list-grid"></div>
            </div>
        </div>

        <div class="mb-5">
            <h4 class="fw-bold border-bottom pb-2 mb-4"><i class="fas fa-comments text-primary me-2"></i>Bình Luận & Đánh Giá</h4>

            <div class="row bg-white p-4 rounded border mb-4 shadow-sm align-items-center mx-0">
                <div class="col-md-4 text-center border-end mb-3 mb-md-0">
                    <h1 class="display-3 fw-bold text-warning mb-0">${avgRating}</h1>
                    <div class="text-warning fs-5 mb-2">${avgStarsHTML}</div>
                    <div class="text-muted fw-bold"><i class="fas fa-comment-dots me-1"></i>Tổng: ${totalComments} bình luận</div>
                </div>
                <div class="col-md-8 ps-md-4">
                    <h5 class="fw-bold text-primary mb-2"><i class="fas fa-trophy text-warning me-2"></i>Top Đánh Giá Nổi Bật</h5>
                    <p class="text-secondary mb-0" style="line-height: 1.6;">Bộ truyện <strong>${story.title}</strong> hiện đang giữ điểm số ấn tượng <strong>${avgRating}/5</strong> sao từ cộng đồng. Đây là một trong những tác phẩm được thảo luận sôi nổi nhất. Các đạo hữu hãy để lại cảm nhận của riêng mình để giúp những người đi sau có thêm góc nhìn nhé!</p>
                </div>
            </div>

            <div class="bg-light p-4 rounded border mb-4 shadow-sm">
                <div class="mb-3">
                    <label class="fw-bold mb-2">Đánh giá sao cho truyện:</label>
                    <div id="star-rating" class="text-warning fs-4" style="cursor: pointer;">
                        <i class="fas fa-star" data-val="1"></i>
                        <i class="fas fa-star" data-val="2"></i>
                        <i class="fas fa-star" data-val="3"></i>
                        <i class="fas fa-star" data-val="4"></i>
                        <i class="fas fa-star" data-val="5"></i>
                    </div>
                    <input type="hidden" id="rating-val" value="5">
                </div>
                
                <div class="row g-3">
                    <div class="col-md-4">
                        <input type="text" id="cmt-name" class="form-control border-secondary" placeholder="Tên Đạo Hữu (Bắt buộc)">
                    </div>
                    <div class="col-md-12">
                        <textarea id="cmt-text" class="form-control border-secondary" rows="3" placeholder="Nhập bình luận hoặc cảm nhận của bạn về bộ truyện này..."></textarea>
                    </div>
                    <div class="col-md-12 text-end">
                        <button class="btn btn-success fw-bold px-4" id="btn-submit-cmt"><i class="fas fa-paper-plane me-2"></i>Gửi Đánh Giá</button>
                    </div>
                </div>
            </div>

            <div id="comments-list-container" class="bg-white rounded border p-3 shadow-sm">
            </div>
        </div>
    `;

    // ==========================================
    // 4. XỬ LÝ NHẢY CHƯƠNG NHANH
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
    jumpInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') goToChapter(); });

    // ==========================================
    // 5. RENDER DANH SÁCH CHƯƠNG KÈM LỊCH SỬ
    // ==========================================
    const chapGrid = document.getElementById('chapter-list-grid');
    let chapHTML = '';
    let readHistory = JSON.parse(localStorage.getItem(`read_history_${storyId}`)) || [];

    for (let i = 1; i <= story.latestChapter; i++) {
        let isRead = readHistory.includes(i);
        let bgClass = isRead ? 'bg-warning text-dark border-warning fw-bold shadow-sm' : 'bg-light text-dark';
        let checkIcon = isRead ? '<i class="fas fa-check text-danger me-1"></i>' : '';

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

        if (isHidden) {
            chapHTML += `
                <div class="col-6 col-md-4 col-lg-3">
                    <div class="p-2 border rounded bg-secondary text-white opacity-50 text-truncate" title="Chương này đã bị khóa">
                        <i class="fas fa-eye-slash me-1"></i> ${chapDisplay}
                    </div>
                </div>`;
        } else {
            chapHTML += `
                <div class="col-6 col-md-4 col-lg-3">
                    <a href="read.html?id=${story.id}&chap=${i}" class="text-decoration-none d-block p-2 border rounded ${bgClass} transition-hover text-truncate" title="${chapDisplay}">
                        ${checkIcon} ${chapDisplay} ${badges}
                    </a>
                </div>`;
        }
    }
    chapGrid.innerHTML = chapHTML;

    // ==========================================
    // 6. XỬ LÝ CLICK ĐÁNH GIÁ (RATING)
    // ==========================================
    const stars = document.querySelectorAll('#star-rating i');
    const ratingValInput = document.getElementById('rating-val');

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const val = parseInt(this.getAttribute('data-val'));
            ratingValInput.value = val;
            
            stars.forEach(s => {
                if(parseInt(s.getAttribute('data-val')) <= val) {
                    s.classList.remove('far'); 
                    s.classList.add('fas');    
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });

    // ==========================================
    // 7. XỬ LÝ HIỂN THỊ VÀ GỬI BÌNH LUẬN
    // ==========================================
    function renderComments() {
        const cmtBox = document.getElementById('comments-list-container');
        if (comments.length === 0) {
            cmtBox.innerHTML = '<div class="text-center text-muted py-4"><i class="fas fa-comment-slash fa-3x mb-3 opacity-25"></i><br>Chưa có đánh giá nào. Hãy là đạo hữu đầu tiên để lại dấu chân!</div>';
            return;
        }

        cmtBox.innerHTML = comments.map(cmt => {
            let starsHTML = '';
            for(let i = 1; i <= 5; i++) {
                starsHTML += i <= cmt.rating 
                    ? '<i class="fas fa-star text-warning"></i> ' 
                    : '<i class="far fa-star text-warning"></i> ';
            }
            let avatarChar = cmt.name.charAt(0).toUpperCase();

            return `
                <div class="d-flex mb-3 pb-3 border-bottom">
                    <div class="me-3">
                        <div class="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center shadow-sm" style="width: 50px; height: 50px; font-size: 22px; font-weight: bold;">
                            ${avatarChar}
                        </div>
                    </div>
                    <div class="flex-fill">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <h6 class="fw-bold mb-0 text-dark">${cmt.name}</h6>
                            <small class="text-muted"><i class="far fa-clock me-1"></i>${cmt.date}</small>
                        </div>
                        <div class="mb-2" style="font-size: 13px;">${starsHTML}</div>
                        <p class="mb-0 text-secondary" style="line-height: 1.6;">${cmt.text}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Gửi Bình Luận
    document.getElementById('btn-submit-cmt').addEventListener('click', () => {
        const nameInput = document.getElementById('cmt-name');
        const textInput = document.getElementById('cmt-text');
        const name = nameInput.value.trim();
        const text = textInput.value.trim();
        const rating = parseInt(ratingValInput.value);

        if (!name || !text) {
            alert("Đạo hữu vui lòng nhập đầy đủ tên và nội dung bình luận nhé!");
            return;
        }

        if (!story.comments) story.comments = [];

        const now = new Date();
        const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()} - ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

        story.comments.unshift({
            name: name,
            text: text,
            rating: rating,
            date: timeStr
        });

        // Lưu vào máy
        let allStories = window.appDB;
        allStories[storyIndex] = story;
        saveDatabase(allStories);

        alert("Cảm ơn Đạo hữu đã để lại đánh giá!");
        
        // TẢI LẠI TRANG: Để cập nhật đồng bộ tổng số bình luận và trung bình sao ở mọi nơi!
        window.location.reload();
    });

    renderComments();
});