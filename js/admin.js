const ALL_CATEGORIES = ["Tiên Hiệp", "Kiếm Hiệp", "Ngôn Tình", "Đam Mỹ", "Bách Hợp", "Quan Trường", "Võng Du", "Khoa Huyễn", "Hệ Thống", "Huyền Huyễn", "Dị Giới", "Dị Năng", "Quân Sự", "Lịch Sử", "Xuyên Không", "Xuyên Nhanh", "Trọng Sinh", "Trinh Thám", "Linh Dị", "Ngược", "Sắc", "Sủng", "Cung Đấu", "Nữ Cường", "Gia Đấu", "Đông Phương", "Đô Thị", "Điền Văn", "Mạt Thế", "Truyện Teen", "Nữ Phụ", "Light Novel", "Đoản Văn", "Hiện Đại", "Khác"];

document.addEventListener('DOMContentLoaded', () => {
    // Xử lý bật/tắt menu trên điện thoại
    const btnToggle = document.getElementById('btn-toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    // Tạo 1 lớp nền đen mờ
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    if (btnToggle && sidebar) {
        btnToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
            overlay.classList.toggle('show');
        });

        // Bấm ra ngoài (nền đen) để đóng menu
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
        });

        // Đóng menu trên mobile khi bấm chọn một Tab bất kỳ
        const navLinks = sidebar.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if(window.innerWidth < 768) {
                    sidebar.classList.remove('show');
                    overlay.classList.remove('show');
                }
            });
        });
    }
    // Xử lý Đăng xuất
    document.getElementById('btn-logout').addEventListener('click', () => {
        if(confirm('Bạn có chắc muốn đăng xuất?')) {
            localStorage.removeItem('IS_LOGGED_IN');
            window.location.href = 'login.html';
        }
    });

    // Đồng bộ lại Database từ data.js
    const btnSync = document.getElementById('btn-sync-data');
    if(btnSync) {
        btnSync.addEventListener('click', () => {
            let msg = "CẢNH BÁO!\n\nHành động này sẽ XÓA TOÀN BỘ dữ liệu lưu tạm trên trình duyệt và nạp lại bản gốc từ file data.js.\n\nBạn có chắc chắn muốn Đồng bộ không?";
            if(confirm(msg)) {
                localStorage.removeItem('STORIES_DB');
                window.location.reload();
            }
        });
    }

    // Render checkbox Thể loại
    const catContainer = document.getElementById('m-categories-container');
    if(catContainer) {
        catContainer.innerHTML = ALL_CATEGORIES.map(cat => `
            <div class="col-4 col-md-3">
                <div class="form-check">
                    <input class="form-check-input cat-checkbox" type="checkbox" value="${cat}" id="cat-${cat.replace(/\s+/g, '')}">
                    <label class="form-check-label small" for="cat-${cat.replace(/\s+/g, '')}">${cat}</label>
                </div>
            </div>
        `).join('');
    }

    // Vẽ Bảng và Biểu đồ
    renderAdminTable();
    renderStoryCharts();

    // Sự kiện tìm kiếm chương
    const searchInput = document.getElementById('search-chapter-input');
    if(searchInput) {
        searchInput.addEventListener('input', function(e) {
            const storyId = parseInt(document.getElementById('c-story-id').value);
            const story = window.appDB.find(s => s.id === storyId);
            if (story) renderChapterListSidebar(story, e.target.value);
        });
    }
});

// ==============================================================
// 1. QUẢN LÝ DANH SÁCH TRUYỆN
// ==============================================================
function renderAdminTable() {
    const stories = window.appDB;
    const tbody = document.getElementById('admin-table-body');
    if (!stories || stories.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">Chưa có dữ liệu.</td></tr>`;
        return;
    }

    const sortedStories = [...stories].sort((a, b) => b.id - a.id);
    tbody.innerHTML = sortedStories.map(story => `
        <tr>
            <td class="text-center fw-bold">${story.id}</td>
            <td><img src="${story.cover}" style="width: 40px; height: 60px; object-fit: cover;" class="rounded shadow-sm"></td>
            <td><div class="fw-bold text-primary">${story.title}</div>${story.isHot ? '<span class="badge bg-danger">HOT</span>' : ''}</td>
            <td>${story.author}</td>
            <td><span class="badge bg-info text-dark">${story.latestChapter}</span></td>
            <td><span class="badge ${story.status === 'Hoàn thành' ? 'bg-success' : 'bg-secondary'}">${story.status}</span></td>
            <td class="text-center">
                <button class="btn btn-sm btn-success me-1" onclick="openChapterModal(${story.id})" title="Quản lý chương"><i class="fas fa-list-ol"></i></button>
                <button class="btn btn-sm btn-warning me-1" onclick="openEditModal(${story.id})" title="Sửa truyện"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteStory(${story.id})" title="Xóa truyện"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function deleteStory(id) {
    if (confirm(`XÓA VĨNH VIỄN truyện ID: ${id}?`)) {
        let stories = window.appDB;
        stories = stories.filter(s => s.id !== id);
        saveDatabase(stories);
        renderAdminTable();
        
        const labelTotal = document.getElementById('stat-total-stories');
        if(labelTotal) labelTotal.innerText = stories.length;
    }
}

// ==============================================================
// 2. FORM THÊM & SỬA TRUYỆN
// ==============================================================
const storyModal = new bootstrap.Modal(document.getElementById('storyModal'));

function openAddModal() {
    document.getElementById('story-form').reset();
    document.getElementById('form-action').value = 'add';
    document.getElementById('storyModalTitle').innerText = 'Thêm Truyện Mới';
    document.getElementById('storyModalHeader').className = 'modal-header bg-success text-white';
    document.getElementById('m-chapter').readOnly = false;
    document.getElementById('m-chapter-help').classList.add('d-none');
    hidePreview();
    storyModal.show();
}

function openEditModal(id) {
    const story = window.appDB.find(s => s.id === id);
    if(!story) return;

    document.getElementById('form-action').value = 'edit';
    document.getElementById('form-story-id').value = id;
    document.getElementById('storyModalTitle').innerText = 'Chỉnh Sửa Truyện';
    document.getElementById('storyModalHeader').className = 'modal-header bg-warning text-dark';

    document.getElementById('m-title').value = story.title;
    document.getElementById('m-author').value = story.author;
    document.getElementById('m-cover').value = story.cover;
    document.getElementById('m-status').value = story.status;
    document.getElementById('m-hot').checked = story.isHot || false;
    document.getElementById('m-desc').value = story.description;
    
    document.getElementById('m-chapter').value = story.latestChapter;
    document.getElementById('m-chapter').readOnly = true;
    document.getElementById('m-chapter-help').classList.remove('d-none');

    if (story.cover && !story.cover.includes('placeholder.com')) showPreview(story.cover);
    else hidePreview();

    document.querySelectorAll('.cat-checkbox').forEach(cb => {
        cb.checked = (story.categories && story.categories.includes(cb.value));
    });

    storyModal.show();
}

document.getElementById('story-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let stories = window.appDB;
    const action = document.getElementById('form-action').value;
    const selectedCats = Array.from(document.querySelectorAll('.cat-checkbox:checked')).map(cb => cb.value);

    let authorVal = document.getElementById('m-author').value.trim() || "Không rõ";
    let coverVal = document.getElementById('m-cover').value.trim() || "https://via.placeholder.com/300x420/1a1a1a/ffffff?text=No+Cover";

    if (action === 'add') {
        const newId = stories.length > 0 ? Math.max(...stories.map(s => s.id)) + 1 : 1;
        stories.unshift({
            id: newId,
            title: document.getElementById('m-title').value.trim(),
            author: authorVal,
            cover: coverVal,
            categories: selectedCats.length > 0 ? selectedCats : ["Khác"],
            status: document.getElementById('m-status').value,
            latestChapter: parseInt(document.getElementById('m-chapter').value) || 0,
            isHot: document.getElementById('m-hot').checked,
            description: document.getElementById('m-desc').value.trim(),
            views: 0, votes: 0, updateTime: "Vừa xong",
            chapterList: [], comments: []
        });
    } else {
        const id = parseInt(document.getElementById('form-story-id').value);
        const index = stories.findIndex(s => s.id === id);
        if(index !== -1) {
            stories[index].title = document.getElementById('m-title').value.trim();
            stories[index].author = authorVal;
            stories[index].cover = coverVal;
            stories[index].categories = selectedCats.length > 0 ? selectedCats : ["Khác"];
            stories[index].status = document.getElementById('m-status').value;
            stories[index].isHot = document.getElementById('m-hot').checked;
            stories[index].description = document.getElementById('m-desc').value.trim();
        }
    }

    saveDatabase(stories);
    storyModal.hide();
    renderAdminTable();
    
    const labelTotal = document.getElementById('stat-total-stories');
    if(labelTotal) labelTotal.innerText = stories.length;
});

// ==============================================================
// 3. QUẢN LÝ CHƯƠNG
// ==============================================================
const chapterModal = new bootstrap.Modal(document.getElementById('chapterModal'));

function initChapterList(story) {
    if (!story.chapterList || !Array.isArray(story.chapterList)) {
        story.chapterList = [];
        for (let i = 1; i <= story.latestChapter; i++) {
            story.chapterList.push({ chapNum: i, subTitle: "", content: "", isVip: false, isHidden: false });
        }
    }
    return story;
}

function openChapterModal(id) {
    let stories = window.appDB;
    let storyIndex = stories.findIndex(s => s.id === id);
    if(storyIndex === -1) return;

    stories[storyIndex] = initChapterList(stories[storyIndex]);
    saveDatabase(stories);
    
    document.getElementById('c-story-id').value = id;
    document.getElementById('chap-modal-story-title').innerText = stories[storyIndex].title;
    document.getElementById('chapter-editor-area').style.display = 'none';
    document.getElementById('chapter-welcome-area').style.display = 'block';
    document.getElementById('search-chapter-input').value = "";

    renderChapterListSidebar(stories[storyIndex]);
    chapterModal.show();
}

function renderChapterListSidebar(story, searchTerm = "") {
    const container = document.getElementById('chapter-list-container');
    if (story.chapterList.length === 0) {
        container.innerHTML = '<div class="p-3 text-muted text-center">Chưa có chương nào.</div>';
        return;
    }

    let sortedChaps = [...story.chapterList].sort((a,b) => b.chapNum - a.chapNum);
    
    if (searchTerm.trim() !== "") {
        const term = searchTerm.toLowerCase().trim();
        const cleanNum = term.replace(/^(chương|chuong)\s*/i, '').trim();

        sortedChaps = sortedChaps.filter(chap => {
            const isExactNum = chap.chapNum.toString() === cleanNum;
            const isMatchSubTitle = chap.subTitle && chap.subTitle.toLowerCase().includes(term);
            return isExactNum || isMatchSubTitle;
        });
    }

    container.innerHTML = sortedChaps.map(chap => {
        let titleDisplay = `Chương ${chap.chapNum}` + (chap.subTitle ? ` - ${chap.subTitle}` : '');
        let badges = '';
        if(chap.isVip) badges += '<i class="fas fa-crown text-warning ms-2" title="VIP"></i>';
        if(chap.isHidden) badges += '<i class="fas fa-eye-slash text-danger ms-2" title="Đã ẩn"></i>';

        return `<div class="list-group-item chap-item" onclick="prepareEditChapter(${story.id}, ${chap.chapNum})">
                    <div class="fw-bold text-truncate">${titleDisplay} ${badges}</div>
                </div>`;
    }).join('');
}

function prepareAddChapter() {
    const id = parseInt(document.getElementById('c-story-id').value);
    const story = window.appDB.find(s => s.id === id);
    const nextNum = story.chapterList.length > 0 ? Math.max(...story.chapterList.map(c => c.chapNum)) + 1 : 1;

    document.getElementById('chapter-welcome-area').style.display = 'none';
    document.getElementById('chapter-editor-area').style.display = 'block';
    document.getElementById('editor-title').innerHTML = '<i class="fas fa-plus-circle text-success me-2"></i>Thêm Chương Mới';
    document.getElementById('chapter-form').reset();
    document.getElementById('c-action').value = 'add';
    document.getElementById('c-number').value = nextNum;
    document.getElementById('c-display-num').value = `Chương ${nextNum}`;
}

function prepareEditChapter(storyId, chapNum) {
    const story = window.appDB.find(s => s.id === storyId);
    const chap = story.chapterList.find(c => c.chapNum === chapNum);
    
    document.getElementById('chapter-welcome-area').style.display = 'none';
    document.getElementById('chapter-editor-area').style.display = 'block';
    document.getElementById('editor-title').innerHTML = '<i class="fas fa-edit text-warning me-2"></i>Chỉnh Sửa Chương';
    document.getElementById('c-action').value = 'edit';
    document.getElementById('c-number').value = chap.chapNum;
    document.getElementById('c-display-num').value = `Chương ${chap.chapNum}`;
    document.getElementById('c-subtitle').value = chap.subTitle || "";
    document.getElementById('c-vip').checked = chap.isVip || false;
    document.getElementById('c-hidden').checked = chap.isHidden || false;
    document.getElementById('c-content').value = chap.content || "";
}

document.getElementById('chapter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const storyId = parseInt(document.getElementById('c-story-id').value);
    const action = document.getElementById('c-action').value;
    const chapNum = parseInt(document.getElementById('c-number').value);
    
    let stories = window.appDB;
    let storyIndex = stories.findIndex(s => s.id === storyId);
    let story = stories[storyIndex];

    const chapData = {
        chapNum: chapNum,
        subTitle: document.getElementById('c-subtitle').value.trim(),
        isVip: document.getElementById('c-vip').checked,
        isHidden: document.getElementById('c-hidden').checked,
        content: document.getElementById('c-content').value.trim()
    };

    if (action === 'add') {
        story.chapterList.push(chapData);
        story.latestChapter = Math.max(...story.chapterList.map(c => c.chapNum));
        story.updateTime = "Vừa xong";
    } else {
        const chapIndex = story.chapterList.findIndex(c => c.chapNum === chapNum);
        if(chapIndex !== -1) story.chapterList[chapIndex] = chapData;
    }

    stories[storyIndex] = story;
    saveDatabase(stories);
    
    alert('Đã lưu chương thành công!');
    document.getElementById('chapter-form').reset();
    document.getElementById('chapter-editor-area').style.display = 'none';
    document.getElementById('chapter-welcome-area').style.display = 'block';
    
    const currentSearch = document.getElementById('search-chapter-input').value;
    renderChapterListSidebar(story, currentSearch);
    renderAdminTable(); 
});

// ==============================================================
// 4. XỬ LÝ ẢNH BÌA
// ==============================================================
const coverInput = document.getElementById('m-cover');
const coverFile = document.getElementById('m-cover-file');
const previewContainer = document.getElementById('m-cover-preview-container');
const previewImg = document.getElementById('m-cover-preview');

if (coverFile) {
    coverFile.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64String = event.target.result;
                coverInput.value = base64String;
                showPreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    });
}

if (coverInput) {
    coverInput.addEventListener('input', function() {
        if (this.value.trim() !== "") showPreview(this.value.trim());
        else hidePreview();
    });
}

document.getElementById('btn-remove-cover')?.addEventListener('click', function() {
    coverInput.value = "";
    coverFile.value = "";
    hidePreview();
});

function showPreview(src) {
    previewImg.src = src;
    previewContainer.classList.remove('d-none');
}
function hidePreview() {
    previewImg.src = "";
    previewContainer.classList.add('d-none');
}

// ==============================================================
// 5. CHUYỂN TAB VÀ VẼ BIỂU ĐỒ
// ==============================================================
window.switchTab = function(tabName) {
    document.getElementById('tab-dashboard').className = 'nav-link fw-bold px-3 py-2 text-dark';
    document.getElementById('tab-manage').className = 'nav-link fw-bold px-3 py-2 text-dark';
    document.getElementById(`tab-${tabName}`).className = 'nav-link active fw-bold px-3 py-2 text-white';

    if (tabName === 'dashboard') {
        document.getElementById('section-dashboard').classList.remove('d-none');
        document.getElementById('section-manage').classList.add('d-none');
    } else {
        document.getElementById('section-dashboard').classList.add('d-none');
        document.getElementById('section-manage').classList.remove('d-none');
    }
};
// ==============================================================
// 6. RENDER BIỂU ĐỒ CHART.JS (CÓ BẢO VỆ CHỐNG SẬP CODE HỆ THỐNG)
// ==============================================================
function renderStoryCharts() {
    // 1. Kiểm tra an toàn xem thư viện Chart.js đã tải xong hoàn toàn từ mạng chưa
    if (typeof Chart === 'undefined') {
        console.warn("Hệ thống cảnh báo: Thư viện Chart.js chưa tải xong hoặc bị chặn bởi mạng. Hệ thống tự động cô lập để giữ các nút bấm quản lý hoạt động bình thường!");
        return; // Thoát ra ngay lập tức, không cho phá hỏng code phía sau
    }

    // 2. Đảm bảo dữ liệu gốc luôn tồn tại, nếu chưa có thì nạp mảng rỗng làm lá chắn
    if (!window.appDB) {
        window.appDB = JSON.parse(localStorage.getItem('STORIES_DB')) || [];
    }

    const labelTotal = document.getElementById('stat-total-stories');
    if(labelTotal) labelTotal.innerText = window.appDB.length;

    // 3. Dùng bộ lọc try-catch để bao bọc quá trình vẽ đồ thị
    try {
        const commonOptions = { responsive: true, maintainAspectRatio: false };

        if (document.getElementById('chartViews')) {
            new Chart(document.getElementById('chartViews'), {
                type: 'line',
                data: {
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
                    datasets: [{ label: 'Lượt xem', data: [145000, 260000, 180000, 250000, 290000, 310000], borderColor: '#0d6efd', backgroundColor: 'rgba(13, 110, 253, 0.1)', tension: 0.4, fill: true }]
                }, options: commonOptions
            });
        }

        if (document.getElementById('chartCategories')) {
            new Chart(document.getElementById('chartCategories'), {
                type: 'doughnut',
                data: {
                    labels: ['Tiên Hiệp', 'Huyền Huyễn', 'Ngôn Tình', 'Khác'],
                    datasets: [{ data: [40, 30, 20, 10], backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#6c757d'], borderWidth: 0 }]
                }, options: commonOptions
            });
        }

        if (document.getElementById('chartComments')) {
            new Chart(document.getElementById('chartComments'), {
                type: 'bar',
                data: {
                    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
                    datasets: [{ label: 'Bình luận mới', data: [65, 54, 82, 81, 56, 120, 150], backgroundColor: '#ffc107', borderRadius: 4 }]
                }, options: commonOptions
            });
        }

        if (document.getElementById('chartUsers')) {
            new Chart(document.getElementById('chartUsers'), {
                type: 'line',
                data: {
                    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
                    datasets: [{ label: 'Đăng ký mới', data: [150, 255, 175, 178, 250, 420, 500], borderColor: '#dc3545', backgroundColor: 'transparent', tension: 0.1 }]
                }, options: commonOptions
            });
        }
    } catch (error) {
        console.error("Phát hiện lỗi cấu hình thông số Chart nhưng hệ thống đã xử lý cô lập thành công:", error);
    }
}