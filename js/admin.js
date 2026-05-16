// Danh sách 35 thể loại chuẩn
const ALL_CATEGORIES = ["Tiên Hiệp", "Kiếm Hiệp", "Ngôn Tình", "Đam Mỹ", "Bách Hợp", "Quan Trường", "Võng Du", "Khoa Huyễn", "Hệ Thống", "Huyền Huyễn", "Dị Giới", "Dị Năng", "Quân Sự", "Lịch Sử", "Xuyên Không", "Xuyên Nhanh", "Trọng Sinh", "Trinh Thám", "Linh Dị", "Ngược", "Sắc", "Sủng", "Cung Đấu", "Nữ Cường", "Gia Đấu", "Đông Phương", "Đô Thị", "Điền Văn", "Mạt Thế", "Truyện Teen", "Nữ Phụ", "Light Novel", "Đoản Văn", "Hiện Đại", "Khác"];

document.addEventListener('DOMContentLoaded', () => {
    
    // ĐĂNG XUẤT
    document.getElementById('btn-logout').addEventListener('click', () => {
        if(confirm('Bạn có chắc muốn đăng xuất?')) {
            localStorage.removeItem('IS_LOGGED_IN');
            window.location.href = 'login.html';
        }
    });

    // NÚT ĐỒNG BỘ DỮ LIỆU TỪ FILE GỐC (DATA.JS)
    const btnSync = document.getElementById('btn-sync-data');
    if(btnSync) {
        btnSync.addEventListener('click', () => {
            let msg = "CẢNH BÁO!\n\nHành động này sẽ XÓA TOÀN BỘ dữ liệu lưu tạm trên trình duyệt và nạp lại bản gốc từ file data.js.\n\nNếu bạn vừa thêm truyện mới mà chưa Copy code dán vào file data.js thì dữ liệu đó sẽ bị mất.\n\nBạn có chắc chắn muốn Đồng bộ không?";
            if(confirm(msg)) {
                localStorage.removeItem('STORIES_DB');
                window.location.reload();
            }
        });
    }

    // Render checkbox 35 thể loại
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

    renderAdminTable();

    // SỰ KIỆN TÌM KIẾM CHƯƠNG THÔNG MINH
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

    // MẶC ĐỊNH CHO TÁC GIẢ VÀ ẢNH NẾU BỎ TRỐNG
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
            chapterList: [],
            comments: []
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
});

// ==============================================================
// 3. QUẢN LÝ CHƯƠNG VÀ TÌM KIẾM
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

// RENDER DANH SÁCH CHƯƠNG (CÓ HỖ TRỢ LỌC THÔNG MINH)
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

    if (sortedChaps.length === 0) {
        container.innerHTML = '<div class="p-3 text-muted text-center">Không tìm thấy chương phù hợp.</div>';
        return;
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

// LƯU CHƯƠNG VÀO DATABASE
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