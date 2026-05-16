// ==========================================
// FILE: js/read.js (LOGIC ĐỌC TRUYỆN, CÀI ĐẶT & HỆ THỐNG CẮM CỜ DÒNG TRÁI)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const body = document.getElementById('read-body');
    const contentBox = document.getElementById('chapter-content');
    const fontSizeInput = document.getElementById('font-size-input');

    // 1. ĐỌC CÀI ĐẶT GIAO DIỆN TỪ MÁY
    let currentTheme = localStorage.getItem('read_theme') || 'theme-light';
    let currentFontSize = parseInt(localStorage.getItem('read_font_size')) || 20;

    if (body) {
        body.classList.remove('theme-light', 'theme-dark', 'theme-sepia');
        body.classList.add(currentTheme);
    }
    if (contentBox) contentBox.style.fontSize = currentFontSize + 'px';
    if (fontSizeInput) fontSizeInput.value = currentFontSize;

    // 2. KHỞI TẠO DỮ LIỆU ĐƯỜNG DẪN
    const params = new URLSearchParams(window.location.search);
    const storyId = parseInt(params.get('id'));
    const currentChap = parseInt(params.get('chap'));
    const stories = window.appDB;

    const container = document.getElementById('read-container');
    const story = stories ? stories.find(s => s.id === storyId) : null;

    if (!story || !currentChap || currentChap < 1 || currentChap > story.latestChapter) {
        if(container) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-exclamation-triangle fa-4x text-danger mb-3"></i>
                    <h3 class="text-danger fw-bold">Nội dung không tồn tại!</h3>
                    <p>Đạo hữu đã đi nhầm vào một không gian sụp đổ.</p>
                    <button onclick="window.history.back()" class="btn btn-primary mt-3"><i class="fas fa-arrow-left me-2"></i>Quay lại</button>
                </div>`;
        }
        return;
    }

    // 3. LƯU LỊCH SỬ CHƯƠNG ĐÃ ĐỌC
    let readHistory = JSON.parse(localStorage.getItem(`read_history_${storyId}`)) || [];
    if (!readHistory.includes(currentChap)) {
        readHistory.push(currentChap);
        localStorage.setItem(`read_history_${storyId}`, JSON.stringify(readHistory));
    }

    let chapData = null;
    if (story.chapterList && Array.isArray(story.chapterList)) {
        chapData = story.chapterList.find(c => c.chapNum === currentChap);
    }

    // 4. HIỂN THỊ TIÊU ĐỀ
    let chapTitleDisplay = `Chương ${currentChap}`;
    if (chapData && chapData.subTitle) chapTitleDisplay += ` - ${chapData.subTitle}`;

    document.title = `${chapTitleDisplay} - ${story.title}`;
    
    const bcLink = document.getElementById('read-story-link');
    if (bcLink) {
        bcLink.innerText = story.title;
        bcLink.href = `story-detail.html?id=${storyId}`;
    }
    
    document.getElementById('read-chap-bc').innerText = `Chương ${currentChap}`;
    document.getElementById('read-title').innerText = story.title;
    
    if (chapData && chapData.isVip) {
        document.getElementById('read-chap-title').innerHTML = `${chapTitleDisplay} <i class="fas fa-crown text-warning ms-2" title="Chương VIP"></i>`;
    } else {
        document.getElementById('read-chap-title').innerText = chapTitleDisplay;
    }

    const btnListTop = document.getElementById('btn-list-top');
    const btnListBot = document.getElementById('btn-list-bot');
    if (btnListTop) btnListTop.href = `story-detail.html?id=${storyId}`;
    if (btnListBot) btnListBot.href = `story-detail.html?id=${storyId}`;

    // 5. ĐỔ VĂN BẢN TRUYỆN (Bọc cấu trúc cột Cờ bên trái rời khỏi chữ)
    if (chapData && chapData.isHidden) {
        contentBox.innerHTML = `<div class="text-center py-5 border rounded bg-light"><h4 class="text-secondary fw-bold">Chương bị khóa</h4></div>`;
    } else if (chapData && chapData.isVip) {
        contentBox.innerHTML = `<div class="text-center py-5 border border-warning rounded" style="background-color: #fff9e6;"><h3 class="text-warning fw-bold">Chương VIP Đặc Quyền</h3></div>`;
    } else if (chapData && chapData.content && chapData.content.trim() !== "") {
        let paragraphs = chapData.content.split('\n');
        contentBox.innerHTML = paragraphs.map((p, index) => {
            if(p.trim() === "") return ""; 
            return `
                <div class="chap-line-wrapper">
                    <div class="line-bookmark-zone">
                        <i class="far fa-bookmark bookmark-btn-trigger" data-line="${index}"></i>
                    </div>
                    <p class="chap-line" id="line-${index}">${p.trim()}</p>
                </div>`;
        }).join('');
    } else {
        let dummyContent = `<p class="mb-4 text-danger"><em>*Chú thích: Admin chưa cập nhật nội dung cho chương này.</em></p>`;
        for(let i = 1; i <= 10; i++) {
            dummyContent += `
                <div class="chap-line-wrapper">
                    <div class="line-bookmark-zone">
                        <i class="far fa-bookmark bookmark-btn-trigger" data-line="${i}"></i>
                    </div>
                    <p class="chap-line" id="line-${i}">${story.description} ${story.description}</p>
                </div>`;
        }
        contentBox.innerHTML = dummyContent;
    }

    // 6. ĐIỀU HƯỚNG CHUYỂN CHƯƠNG
    const btnPrevTop = document.getElementById('btn-prev-top');
    const btnPrevBot = document.getElementById('btn-prev-bot');
    const btnNextTop = document.getElementById('btn-next-top');
    const btnNextBot = document.getElementById('btn-next-bot');

    function goToChap(chapNum) { window.location.href = `read.html?id=${storyId}&chap=${chapNum}`; }

    if (currentChap <= 1) {
        if(btnPrevTop) btnPrevTop.classList.add('disabled'); 
        if(btnPrevBot) btnPrevBot.classList.add('disabled');
    } else {
        if(btnPrevTop) btnPrevTop.addEventListener('click', () => goToChap(currentChap - 1));
        if(btnPrevBot) btnPrevBot.addEventListener('click', () => goToChap(currentChap - 1));
    }

    if (currentChap >= story.latestChapter) {
        if(btnNextTop) { btnNextTop.classList.add('disabled'); btnNextTop.innerText = "Hết truyện"; }
        if(btnNextBot) { btnNextBot.classList.add('disabled'); btnNextBot.innerText = "Hết truyện"; }
    } else {
        if(btnNextTop) btnNextTop.addEventListener('click', () => goToChap(currentChap + 1));
        if(btnNextBot) btnNextBot.addEventListener('click', () => goToChap(currentChap + 1));
    }

 
 // ==============================================================
    // 7. LOGIC GẬP/MỞ BẢNG ĐIỀU KHIỂN ĐEN (TỐI ƯU HIỂN THỊ TAB DỌC TRÁI)
    // ==============================================================
    const btnToggle = document.getElementById('btn-toggle-menu');
    const menuContent = document.getElementById('reading-menu-content');
    const toggleIcon = document.getElementById('toggle-menu-icon');
    const stickyMenuWrapper = document.getElementById('sticky-reading-menu');

    if (btnToggle && menuContent && stickyMenuWrapper) {
        btnToggle.addEventListener('click', () => {
            menuContent.classList.toggle('d-none'); // Ẩn/hiện khối đen
            
            if (menuContent.classList.contains('d-none')) {
                // KHI MENU BỊ ẨN: Biến thành dải dọc chứa icon bánh răng vàng nổi bật
                toggleIcon.className = 'fas fa-cog text-warning fs-5'; 
                stickyMenuWrapper.classList.add('menu-hidden-state'); 
            } else {
                // KHI MENU MỞ LẠI: Trả về nút lưỡi ngang giữa màn hình ban đầu
                toggleIcon.className = 'fas fa-chevron-up text-light'; 
                stickyMenuWrapper.classList.remove('menu-hidden-state');  
            }
        });
    }
// ==============================================================
// 8. LOGIC BOOKMARK: BẤM NÚT CỜ -> CHẠM DÒNG CHỮ ĐỂ LƯU & TỰ ĐỘNG CUỘN ĐẾN DÒNG
// ==============================================================
const btnManualBookmark = document.getElementById('btn-manual-bookmark');
const bookmarkKey = 'BOOKMARK_STORY_' + storyId;
let isBookmarkMode = false; 

// Hàm tô đỏ lá cờ ở rìa và làm ĐẬM dòng chữ được lưu
function applyFlagToLine(lineIndex) {
    // 1. Reset toàn bộ cờ về rỗng (ẩn đi)
    document.querySelectorAll('.bookmark-btn-trigger').forEach(btn => {
        btn.className = 'far fa-bookmark bookmark-btn-trigger'; 
    });
    
    // 2. Xóa trạng thái chữ đậm của các dòng khác trước đó
    document.querySelectorAll('.chap-line').forEach(p => {
        p.classList.remove('fw-bold'); 
    });
    
    // 3. Cắm cờ đỏ đặc vào dòng mới được chọn
    const targetBtn = document.querySelector(`.bookmark-btn-trigger[data-line="${lineIndex}"]`);
    if (targetBtn) {
        targetBtn.className = 'fas fa-bookmark bookmark-btn-trigger has-flag'; 
    }
    
    // 4. Ép dòng chữ được chọn hóa ĐẬM lên
    const targetLine = document.getElementById(`line-${lineIndex}`);
    if (targetLine) {
        targetLine.classList.add('fw-bold'); 
    }
}

if (contentBox && btnManualBookmark) {
    const savedData = JSON.parse(localStorage.getItem(bookmarkKey));
    
    // Khởi tạo khi vào trang: Nếu có dữ liệu cũ, tự cắm cờ đỏ và làm đậm dòng đó ngay
    if (savedData && savedData.chap === currentChap) {
        btnManualBookmark.innerHTML = '<i class="fas fa-bookmark text-danger fs-5" id="bookmark-icon"></i>';
        setTimeout(() => applyFlagToLine(savedData.lineIndex || 0), 150);
    }

    // BƯỚC A: BẬT CHẾ ĐỘ ĐÁNH DẤU KHI BẤM ICON CỜ TRÊN MENU ĐEN
    btnManualBookmark.addEventListener('click', (e) => {
        e.stopPropagation(); 
        isBookmarkMode = !isBookmarkMode; 
        
        if (isBookmarkMode) {
            if (body) body.classList.add('bookmark-mode-active');
            btnManualBookmark.innerHTML = '<i class="fas fa-times text-danger fs-5"></i>'; 
            
            // Tự động gập menu cài đặt lên cho thoáng màn hình để chọn dòng chữ
            if (menuContent && !menuContent.classList.contains('d-none') && btnToggle) {
                btnToggle.click(); 
            }
        } else {
            if (body) body.classList.remove('bookmark-mode-active');
            btnManualBookmark.innerHTML = '<i class="far fa-bookmark text-warning fs-5" id="bookmark-icon"></i>';
        }
    });

    // BƯỚC B: ĐỘC GIẢ CHẠM THẲNG VÀO NGUYÊN DÒNG CHỮ ĐỂ CẮM CỜ
    contentBox.addEventListener('click', (e) => {
        if (!isBookmarkMode) return; 
        
        const targetWrapper = e.target.closest('.chap-line-wrapper');
        if (targetWrapper) {
            const flagBtn = targetWrapper.querySelector('.bookmark-btn-trigger');
            if (flagBtn) {
                const lineIndex = parseInt(flagBtn.getAttribute('data-line'));
                
                // Tiến hành lưu thông số vào máy
                localStorage.setItem(bookmarkKey, JSON.stringify({ 
                    chap: currentChap, 
                    scrollPos: window.scrollY, 
                    lineIndex: lineIndex 
                }));
                
                // Vẽ lại cờ và làm đậm dòng chữ
                applyFlagToLine(lineIndex);
                
                // Tự động tắt chế độ chọn dòng, đưa web về trạng thái đọc bình thường
                isBookmarkMode = false;
                if (body) body.classList.remove('bookmark-mode-active');
                btnManualBookmark.innerHTML = '<i class="fas fa-bookmark text-danger fs-5" id="bookmark-icon"></i>';
            }
        }
    });
} // <-- ĐÃ VÁ LỖI: Thêm dấu đóng ngoặc nhọn này để sửa lỗi đứng vòng xoay loading!

// BƯỚC C: TỰ ĐỘNG PHÓNG THẲNG TỚI DÒNG ĐÃ MARK KHI TẢI TRANG
setTimeout(() => {
    const savedData = JSON.parse(localStorage.getItem(bookmarkKey));
    if (savedData && savedData.chap === currentChap) {
        const targetLine = document.getElementById(`line-${savedData.lineIndex}`);
        if (targetLine) {
            targetLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (savedData.scrollPos > 0) {
            window.scrollTo({ top: savedData.scrollPos, behavior: 'smooth' });
        }
    }
}, 600); 

// BƯỚC D: TỰ ĐỘNG CẬP NHẬT TỌA ĐỘ CUỘN MÀN HÌNH KHI LƯỚT ĐỌC
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const savedData = JSON.parse(localStorage.getItem(bookmarkKey));
        const currentLineIndex = savedData ? savedData.lineIndex : 0;
        localStorage.setItem(bookmarkKey, JSON.stringify({ 
            chap: currentChap, 
            scrollPos: window.scrollY, 
            lineIndex: currentLineIndex 
        }));
    }, 500);
});
}); // Đóng sự kiện DOMContentLoaded chính của trang web
// ==============================================================
// THAY ĐỔI THEME VÀ CỠ CHỮ TOÀN CỤC
window.changeTheme = function(themeClass) {
    const body = document.getElementById('read-body');
    if (body) {
        body.classList.remove('theme-light', 'theme-dark', 'theme-sepia');
        body.classList.add(themeClass);
        localStorage.setItem('read_theme', themeClass); 
    }
};

window.changeFontSize = function(change) {
    let currentSize = parseInt(localStorage.getItem('read_font_size')) || 20;
    currentSize += change;
    applyAndSaveFontSize(currentSize);
};

window.manualChangeFontSize = function(val) {
    applyAndSaveFontSize(parseInt(val));
};

function applyAndSaveFontSize(size) {
    if (!size || isNaN(size) || size < 14) size = 14;
    if (size > 40) size = 40;
    
    const content = document.getElementById('chapter-content');
    const sizeInput = document.getElementById('font-size-input');
    
    if (content) content.style.fontSize = size + 'px';
    if (sizeInput) sizeInput.value = size;
    
    localStorage.setItem('read_font_size', size);
}