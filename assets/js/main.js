// 漢堡選單
const burger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) burger.addEventListener('click', ()=> navLinks.classList.toggle('open'));

// 簡單 Tab：透過 data-tab & ?tab= 參數控制
function applyTabs(scopeSelector){
  const scope = document.querySelector(scopeSelector);
  if(!scope) return;
  const tabs = scope.querySelectorAll('[data-tab]');
  const params = new URLSearchParams(location.search);
  const current = params.get('tab') || tabs[0]?.dataset.tab;
  tabs.forEach(t=>{
    t.classList.toggle('active', t.dataset.tab===current);
    const target = scope.querySelector(`[data-panel="${t.dataset.tab}"]`);
    if (target) target.style.display = (t.dataset.tab===current)? 'grid':'none';
    t.addEventListener('click', ()=>{
      const p = new URLSearchParams(location.search);
      p.set('tab', t.dataset.tab);
      const url = `${location.pathname}?${p.toString()}${location.hash}`;
      history.replaceState({}, '', url);
      tabs.forEach(x=>x.classList.toggle('active', x===t));
      scope.querySelectorAll('[data-panel]').forEach(panel=>{
        panel.style.display = (panel.dataset.panel===t.dataset.tab)? 'grid':'none';
      });
    });
  });
}

// 在需要的頁面呼叫（見各頁 HTML 末端的 inline script）
