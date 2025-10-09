// 1. 手机端汉堡菜单切换（需求1.15）
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// 2. 新手专区Tab切换（需求1.39）
const newbieTabs = document.querySelectorAll('#newbie-tabs button');
const newbieTabContents = document.querySelectorAll('.newbie-tab-content');
newbieTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 移除所有Tab的激活状态
        newbieTabs.forEach(t => {
            t.classList.remove('border-secondary-cta', 'text-secondary-cta');
            t.classList.add('border-transparent', 'text-gray-500');
            t.setAttribute('aria-selected', 'false');
        });
        // 隐藏所有Tab内容
        newbieTabContents.forEach(content => content.classList.add('hidden'));
        
        // 激活当前Tab
        tab.classList.remove('border-transparent', 'text-gray-500');
        tab.classList.add('border-secondary-cta', 'text-secondary-cta');
        tab.setAttribute('aria-selected', 'true');
        // 显示当前Tab内容
        const targetId = tab.getAttribute('data-tabs-target');
        document.querySelector(targetId).classList.remove('hidden');
    });
});

// 3. EVENT轮播功能（需求1.150、1.151）
const carousel = document.getElementById('event-carousel').querySelector('.flex');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const indicators = document.querySelectorAll('#event-carousel + div button');
let currentIndex = 0;
const slideCount = carousel.children.length;

// 轮播切换函数
function goToSlide(index) {
    currentIndex = index;
    const translateValue = `translateX(-${currentIndex * 100}%)`;
    carousel.style.transform = translateValue;
    
    // 更新指示器状态
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

// 前一张/后一张按钮
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    goToSlide(currentIndex);
});
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slideCount;
    goToSlide(currentIndex);
});

// 指示器点击
indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => goToSlide(i));
});

// 自动轮播（5秒一次，需求1.151）
let autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slideCount;
    goToSlide(currentIndex);
}, 5000);

// 鼠标悬停时暂停自动轮播
carousel.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
// 鼠标离开时恢复自动轮播
carousel.parentElement.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slideCount;
        goToSlide(currentIndex);
    }, 5000);
});

// 4. 返回顶部按钮（需求1.189）
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    // 滚动超过300px时显示按钮
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

// 5. 游戏卡片点击弹出模态框（需求1.27、1.30）
const gameItems = document.querySelectorAll('.game-item');
gameItems.forEach(item =>
