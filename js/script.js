AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

async function loadVideos() {
    const container = document.getElementById("portfolio-grid");

    try {
        const response = await fetch("data/videoData.json");
        if (!response.ok) throw new Error("Ошибка загрузки файла данных");

        const projects = await response.json();
        projects.sort((a, b) => a.order - b.order);

        let htmlContent = '';

        projects.forEach((project, index) => {
            const delay = index < 3 ? index * 100 : 0;
            const category = project.category.toLowerCase();
            let filterCategory = 'shorts';

            if (category.includes("shorts")) {
                filterCategory = 'shorts';
            } 
            else if (category.includes('моушн')) {
                filterCategory = 'motion';
            }

            htmlContent += `
                <div class="col-12 col-md-6 col-xl-4 portfolio-item"
                     data-category="${filterCategory}" 
                     data-aos="fade-up" 
                     data-aos-delay="${delay}">
                    <a href="${project.videoPath}" target="_blank" class="text-decoration-none portfolio-link group d-block h-100">
                        <div class="spotlight-card p-3 h-100 d-flex flex-column">
                            <div class="mb-3 overflow-hidden position-relative rounded-2 shadow-sm video-cover" 
                                 style="background-color: #212529;">
                                <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-20 transition-all"></div>
                                <div class="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center z-1">
                                    <div class="bg-white bg-opacity-90 rounded-circle d-flex align-items-center justify-content-center shadow-lg" 
                                         style="width: 60px; height: 60px;">
                                        <i class="bi bi-play-fill fs-3 text-dark ms-1"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-auto pt-2">
                                <h4 class="h5 mb-1 text-white fw-bold">${project.name}</h4>
                                <span class="text-accent small text-uppercase fw-semibold ls-1">${project.category}</span>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        });

        container.innerHTML = htmlContent;

        initFilters();

        if (typeof AOS !== 'undefined') AOS.refresh();

    } catch (error) {
        console.error('Не удалось загрузить портфолио:', error);
        container.innerHTML = `<div class="col-12 text-center text-danger py-5">Ошибка загрузки видео</div>`;
    }
}

function initFilters() {
    const buttons = document.querySelectorAll('.btn-select');
    const items = document.querySelectorAll('.portfolio-item');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            items.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
            if (typeof AOS !== 'undefined') {
                setTimeout(() => AOS.refresh(), 50);
            }
        });
    });
}

function createStars(count = 100) {
    const container = document.body;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(star);
    }
}

createStars();
loadVideos();