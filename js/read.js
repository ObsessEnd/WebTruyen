// ==========================================
// FILE: js/read.js (LOGIC ĐỌC TRUYỆN & CÀI ĐẶT)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. KHỞI TẠO CÀI ĐẶT TỪ LOCALSTORAGE TRƯỚC (Để không bị nháy màn hình)
    const body = document.getElementById('read-body');
    const content = document.getElementById('chapter-content');
    const fontSizeInput = document.getElementById('font-size-input');

    let currentTheme = localStorage.getItem('read_theme') || 'theme-light';
    let currentFontSize = parseInt(localStorage.getItem('read_font_size')) || 20;

    if (body) {
        body.classList.remove('theme-light', 'theme-dark', 'theme-sepia');
        body.classList.add(currentTheme);
    }
    if (content) content.style.fontSize = currentFontSize + 'px';
    if (fontSizeInput) fontSizeInput.value = currentFontSize;


    // 2. KHỞI TẠO DỮ LIỆU TRUYỆN
    const params = new URLSearchParams(window.location.search);
    const storyId = parseInt(params.get('id'));
    const currentChap = parseInt(params.get('chap'));
    const stories = window.appDB;

    const story = stories.find(s => s.id === storyId);
    const container = document.getElementById('read-container');

    // Kiểm tra lỗi nếu URL không hợp lệ
    if (!story || !currentChap || currentChap < 1 || currentChap > story.latestChapter) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-exclamation-triangle fa-4x text-danger mb-3"></i>
                <h3 class="text-danger fw-bold">Nội dung không tồn tại!</h3>
                <p>Đạo hữu đã đi nhầm vào một không gian sụp đổ.</p>
                <button onclick="window.history.back()" class="btn btn-primary mt-3"><i class="fas fa-arrow-left me-2"></i>Quay lại</button>
            </div>`;
        return;
    }

    // 3. GHI NHỚ LỊCH SỬ ĐỌC (Lưu thẳng vào máy)
    let readHistory = JSON.parse(localStorage.getItem(`read_history_${storyId}`)) || [];
    if (!readHistory.includes(currentChap)) {
        readHistory.push(currentChap);
        localStorage.setItem(`read_history_${storyId}`, JSON.stringify(readHistory));
    }

    // 4. LẤY DỮ LIỆU CỦA CHƯƠNG (TỪ ADMIN)
    let chapData = null;
    if (story.chapterList && Array.isArray(story.chapterList)) {
        chapData = story.chapterList.find(c => c.chapNum === currentChap);
    }

    // 5. RENDER TIÊU ĐỀ & BREADCRUMB
    let chapTitleDisplay = `Chương ${currentChap}`;
    if (chapData && chapData.subTitle) {
        chapTitleDisplay += ` - ${chapData.subTitle}`;
    }

    document.title = `${chapTitleDisplay} - ${story.title}`;
    
    const bcLink = document.getElementById('read-story-link');
    bcLink.innerText = story.title;
    bcLink.href = `story-detail.html?id=${storyId}`;
    
    document.getElementById('read-chap-bc').innerText = `Chương ${currentChap}`;
    document.getElementById('read-title').innerText = story.title;
    
    // Gắn icon VIP nếu có
    if (chapData && chapData.isVip) {
        document.getElementById('read-chap-title').innerHTML = `${chapTitleDisplay} <i class="fas fa-crown text-warning ms-2" title="Chương VIP"></i>`;
    } else {
        document.getElementById('read-chap-title').innerText = chapTitleDisplay;
    }

    document.getElementById('btn-list-top').href = `story-detail.html?id=${storyId}`;
    document.getElementById('btn-list-bot').href = `story-detail.html?id=${storyId}`;

    // 6. RENDER NỘI DUNG CHÍNH (ĐỒNG BỘ VỚI ADMIN)
    if (chapData && chapData.isHidden) {
        content.innerHTML = `
            <div class="text-center py-5 my-4 border rounded bg-light">
                <i class="fas fa-eye-slash fa-4x text-secondary mb-3 opacity-50"></i>
                <h4 class="text-secondary fw-bold">Chương này đã bị khóa/ẩn</h4>
                <p class="text-muted">Tác giả hoặc Quản trị viên đã tạm thời ẩn chương này.</p>
            </div>`;
            
    } else if (chapData && chapData.isVip) {
        content.innerHTML = `
            <div class="text-center py-5 my-4 border border-warning rounded" style="background-color: #fff9e6;">
                <i class="fas fa-crown fa-4x text-warning mb-3"></i>
                <h3 class="text-warning fw-bold">Chương VIP Đặc Quyền</h3>
                <p class="text-dark mb-4">Đạo hữu cần nạp thêm linh thạch để phá giải cấm chế của chương này.</p>
                <button class="btn btn-warning fw-bold text-dark shadow-sm px-4 py-2"><i class="fas fa-gem me-2"></i>Mở Khóa (100 Linh Thạch)</button>
            </div>`;
            
    } else if (chapData && chapData.content && chapData.content.trim() !== "") {
        // Có dữ liệu thật do Admin nhập
        let paragraphs = chapData.content.split('\n');
        content.innerHTML = paragraphs.map(p => {
            if(p.trim() === "") return ""; 
            return `<p class="mb-3">${p.trim()}</p>`;
        }).join('');
        
    } else {
        // Tạo Dummy Text nếu Admin chưa nhập
        let dummyContent = `
            <p class="mb-4 text-danger"><em>*Chú thích: Admin chưa cập nhật nội dung cho chương này. Dưới đây là nội dung mô phỏng.</em></p>
        `;
        for(let i = 0; i < 10; i++) {
            dummyContent += `<p class="mb-3">${story.description} ${story.description}</p>`;
        }
        content.innerHTML = dummyContent;
    }

    // 7. XỬ LÝ CHUYỂN TRANG
    const btnPrevTop = document.getElementById('btn-prev-top');
    const btnPrevBot = document.getElementById('btn-prev-bot');
    const btnNextTop = document.getElementById('btn-next-top');
    const btnNextBot = document.getElementById('btn-next-bot');

    function goToChap(chapNum) { window.location.href = `read.html?id=${storyId}&chap=${chapNum}`; }

    if (currentChap <= 1) {
        btnPrevTop.classList.add('disabled'); btnPrevBot.classList.add('disabled');
    } else {
        btnPrevTop.addEventListener('click', () => goToChap(currentChap - 1));
        btnPrevBot.addEventListener('click', () => goToChap(currentChap - 1));
    }

    if (currentChap >= story.latestChapter) {
        btnNextTop.classList.add('disabled'); btnNextBot.classList.add('disabled');
        btnNextTop.innerText = "Hết truyện"; btnNextBot.innerText = "Hết truyện";
    } else {
        btnNextTop.addEventListener('click', () => goToChap(currentChap + 1));
        btnNextBot.addEventListener('click', () => goToChap(currentChap + 1));
    }
});

// ==========================================
// HÀM HỖ TRỢ CÀI ĐẶT GIAO DIỆN TOÀN CỤC
// ==========================================

function changeTheme(themeClass) {
    const body = document.getElementById('read-body');
    if (body) {
        body.classList.remove('theme-light', 'theme-dark', 'theme-sepia');
        body.classList.add(themeClass);
        localStorage.setItem('read_theme', themeClass); 
    }
}

function changeFontSize(change) {
    let currentSize = parseInt(localStorage.getItem('read_font_size')) || 20;
    currentSize += change;
    applyAndSaveFontSize(currentSize);
}

function manualChangeFontSize(val) {
    applyAndSaveFontSize(parseInt(val));
}

function applyAndSaveFontSize(size) {
    if (!size || isNaN(size) || size < 14) size = 14;
    if (size > 40) size = 40;
    
    const content = document.getElementById('chapter-content');
    const sizeInput = document.getElementById('font-size-input');
    
    if (content) content.style.fontSize = size + 'px';
    if (sizeInput) sizeInput.value = size;
    
    localStorage.setItem('read_font_size', size);
}