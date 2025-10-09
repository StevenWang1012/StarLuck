// 1. 手機端漢堡選單切換
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// 2. 新手專區Tab切換
const newbieTabs = document.querySelectorAll('#newbie-tabs button');
const newbieTabContents = document.querySelectorAll('.newbie-tab-content');
newbieTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 移除所有Tab的激活狀態
        newbieTabs.forEach(t => {
            t.classList.remove('border-secondary-cta', 'text-secondary-cta');
            t.classList.add('border-transparent', 'text-gray-500');
            t.setAttribute('aria-selected', 'false');
        });
        // 隱藏所有Tab內容
        newbieTabContents.forEach(content => content.classList.add('hidden'));
        
        // 激活當前Tab
        tab.classList.remove('border-transparent', 'text-gray-500');
        tab.classList.add('border-secondary-cta', 'text-secondary-cta');
        tab.setAttribute('aria-selected', 'true');
        // 顯示當前Tab內容
        const targetId = tab.getAttribute('data-tabs-target');
        document.querySelector(targetId).classList.remove('hidden');
    });
});

// 3. EVENT輪播功能
const carousel = document.getElementById('event-carousel').querySelector('.flex');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const indicators = document.querySelectorAll('#event-carousel + div button');
let currentIndex = 0;
const slideCount = carousel.children.length;

// 輪播切換函數
function goToSlide(index) {
    currentIndex = index;
    const translateValue = `translateX(-${currentIndex * 100}%)`;
    carousel.style.transform = translateValue;
    
    // 更新指示器狀態
    indicators.forEach((indicator, i) => {
        if (i === currentIndex) {
            indicator.classList.remove('bg-gray-300');
            indicator.classList.add('bg-secondary-cta');
        } else {
            indicator.classList.remove('bg-secondary-cta');
            indicator.classList.add('bg-gray-300');
        }
    });
}

// 前一張/後一張按鈕
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    goToSlide(currentIndex);
});
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slideCount;
    goToSlide(currentIndex);
});

// 指示器點擊
indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => goToSlide(i));
});

// 自動輪播（5秒一次）
let autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slideCount;
    goToSlide(currentIndex);
}, 5000);

// 滑鼠懸停時暫停自動輪播
carousel.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
// 滑鼠離開時恢復自動輪播
carousel.parentElement.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slideCount;
        goToSlide(currentIndex);
    }, 5000);
});

// 4. 返回頂部按鈕
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    // 滾動超過300px時顯示按鈕
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0');
        backToTopBtn.classList.add('opacity-100');
    } else {
        backToTopBtn.classList.remove('opacity-100');
        backToTopBtn.classList.add('opacity-0');
    }
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 5. 遊戲卡片點擊彈出模態框
const gameItems = document.querySelectorAll('.game-item');
gameItems.forEach(item => {
    item.addEventListener('click', () => {
        // 創建模態框
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-bold text-neutral-text">${item.querySelector('p').textContent}</h3>
                    <button class="close-modal text-gray-500 hover:text-gray-700">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
                <img src="${item.querySelector('img').src}" alt="${item.querySelector('p').textContent}" class="w-full h-48 object-cover rounded mb-4">
                <p class="text-neutral-text text-sm mb-4">遊戲介紹：${item.querySelector('p').textContent}是一款經典休閒遊戲，玩法簡單，獎勵豐厚！</p>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="bg-neutral-lightBg p-3 rounded-md text-center">
                        <img src="https://picsum.photos/id/15/100" alt="遊戲QR碼" class="w-24 h-auto mx-auto mb-2">
                        <p class="text-xs text-neutral-text">掃碼進入遊戲</p>
                    </div>
                    <a href="https://starluck-game.url" target="_blank" class="bg-secondary-cta text-white px-4 py-2 rounded-md hover:bg-secondary-cta/90 transition-colors text-center">
                        立即進入遊戲
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden'; // 禁止背景滾動
        
        // 關閉模態框
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        });
    });
});
