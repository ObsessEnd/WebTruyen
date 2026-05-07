document.addEventListener('DOMContentLoaded', () => {
    const stories = window.appDB; 

    // 1. Render Banner (Truyện HOT)
    const hotStories = stories.filter(s => s.isHot);
    document.getElementById('banner-container').innerHTML = hotStories.map(story => `
        <div class="swiper-slide">
            <div class="banner-slide-content text-white p-5 rounded" style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('${story.cover}'); background-size: cover; background-position: center;">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <h1 class="fw-bold text-warning">${story.title}</h1>
                        <p class="d-none d-md-block">${story.description.substring(0, 150)}...</p>
                        <a href="story-detail.html?id=${story.id}" class="btn btn-danger rounded-pill px-4 fw-bold">ĐỌC NGAY</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Khởi tạo Swiper (Slider)
        new Swiper('.bannerSwiper', { 
            loop: true, 
            autoplay: { delay: 4000, disableOnInteraction: false }, 
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            // THÊM 2 DÒNG NÀY ĐỂ FIX LỖI NÚT BẤM:
            observer: true,       
            observeParents: true  
        });
    // 2. Render Truyện HOT (Khu vực dưới Banner)
    document.getElementById('featured-stories').innerHTML = hotStories.slice(0, 4).map(story => `
        <div class="col-6 col-lg-3">
            <div class="card h-100 border-0 shadow-sm transition-hover">
                <a href="story-detail.html?id=${story.id}"><img src="${story.cover}" class="card-img-top" style="height: 250px; object-fit: cover;"></a>
                <div class="card-body p-3">
                    <h6 class="fw-bold text-truncate mb-1"><a href="story-detail.html?id=${story.id}" class="text-decoration-none text-dark">${story.title}</a></h6>
                    <span class="badge bg-light text-primary border small">${story.categories[0]}</span>
                </div>
            </div>
        </div>
    `).join('');

    // 3. Render Mới Cập Nhật
    document.getElementById('recent-updates').innerHTML = stories.slice(0, 6).map(story => `
        <a href="story-detail.html?id=${story.id}" class="list-group-item list-group-item-action p-3 border-0 border-bottom">
            <div class="d-flex justify-content-between align-items-center">
                <div><h6 class="mb-0 fw-bold text-primary">${story.title}</h6><small class="text-muted">${story.author}</small></div>
                <div class="text-end"><span class="badge bg-info text-dark">Chương ${story.latestChapter}</span><br><small class="text-muted">${story.updateTime}</small></div>
            </div>
        </a>
    `).join('');

    // 4. Render Bảng Xếp Hạng
    const sorted = [...stories].sort((a, b) => b.views - a.views).slice(0, 5);
    document.getElementById('top-views').innerHTML = sorted.map(story => `
        <li class="list-group-item d-flex justify-content-between align-items-center border-0 border-bottom py-3">
            <div class="fw-bold text-truncate" style="max-width: 70%;"><a href="story-detail.html?id=${story.id}" class="text-decoration-none text-dark">${story.title}</a></div>
            <span class="badge bg-danger rounded-pill"><i class="fas fa-eye me-1"></i>${(story.views / 1000).toFixed(0)}k</span>
        </li>
    `).join('');
});