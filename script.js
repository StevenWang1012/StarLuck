// script.js

// --- 1. 導航欄功能 ---
// 這個函數會在動態載入導航欄後被調用
function initHeaderFunctions() {
    // 漢堡選單切換
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}


// --- 2. 頁面加載完成後執行的通用功能 ---
document.addEventListener('DOMContentLoaded', function() {

    // --- A. 新手專區 Tab 切換功能 ---
    const tabs = document.querySelectorAll('#newbie-tabs button');
    if (tabs.length > 0) { // 確保在新手專區頁面才執行
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // 移除所有按鈕的活躍狀態
                tabs.forEach(t => {
                    t.classList.remove('border-secondary-cta', 'text-secondary-cta');
                    t.classList.add('border-transparent', 'text-gray-500');
                });
                
                // 添加當前按鈕的活躍狀態
                tab.classList.remove('border-transparent', 'text-gray-500');
                tab.classList.add('border-secondary-cta', 'text-secondary-cta');
                
                // 隱藏所有內容
                document.querySelectorAll('.newbie-tab-content').forEach(content => {
                    content.classList.add('hidden');
                });
                
                // 顯示對應內容
                const target = tab.getAttribute('data-tabs-target');
                document.querySelector(target).classList.remove('hidden');
            });
        });
    }


    // --- B. 常見問題展開/收起功能 ---
    const faqButtons = document.querySelectorAll('#customer button');
    if (faqButtons.length > 0) { // 確保在客服中心頁面才執行
        faqButtons.forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                content.classList.toggle('hidden');
                
                const icon = button.querySelector('i');
                if (content.classList.contains('hidden')) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                } else {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            });
        });
    }


    // --- C. 返回頂部按鈕功能 ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('opacity-0');
                backToTopBtn.classList.add('opacity-100');
            } else {
                backToTopBtn.classList.remove('opacity-100');
                backToTopBtn.classList.add('opacity-0');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- D. 首頁活動輪播功能 ---
    const carousel = document.getElementById('event-carousel');
    if (carousel) { // 確保在首頁才執行
        let currentSlide = 0;
        const slides = carousel.querySelector('.flex');
        const slideCount = slides.children.length;
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const indicators = document.querySelectorAll('#event .flex.justify-center button');

        function updateCarousel() {
            const slideWidth = -100 * currentSlide;
            slides.style.transform = `translateX(${slideWidth}%)`;
            
            // 更新指示器
            indicators.forEach((ind, index) => {
                if (index === currentSlide) {
                    ind.classList.remove('bg-gray-300');
                    ind.classList.add('bg-secondary-cta');
                } else {
                    ind.classList.remove('bg-secondary-cta');
                    ind.classList.add('bg-gray-300');
                }
            });
        }

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateCarousel();
        });

        indicators.forEach((ind, index) => {
            ind.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });

        // 自動輪播
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateCarousel();
        }, 5000);
    }
});
