// ===== Shared site behavior: nav active state, WhatsApp links, mobile menu, visitor counter =====

function setActiveNav(){
  const current = document.body.getAttribute('data-page');
  document.querySelectorAll('nav.links a[data-nav]').forEach(a=>{
    if(a.getAttribute('data-nav') === current){
      a.classList.add('active');
    }
  });
}

function openWhatsApp(customMessage){
  const phone = '2349017468095';
  const defaultMsg = "Hello Customer Care, I need assistance with Hello Premium services. Please guide me to the right service.";
  const message = encodeURIComponent(customMessage || defaultMsg);
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

function wireWhatsAppButtons(){
  document.querySelectorAll('[data-wa]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const msg = el.getAttribute('data-wa-message') || null;
      openWhatsApp(msg);
    });
  });
}

function wireMobileMenu(){
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('nav.links');
  if(!toggle || !links) return;
  toggle.addEventListener('click', ()=>{
    links.classList.toggle('mobile-open');
  });
}

const COUNTER_KEY = 'global_visitor_count';

async function initVisitorCounter(){
  const mainEl = document.getElementById('visitorCount');
  const footEl = document.getElementById('footerVisitorCount');
  try{
    let current = 0;
    try{
      const res = await window.storage.get(COUNTER_KEY, true);
      current = res ? parseInt(res.value, 10) || 0 : 0;
    }catch(e){
      current = 0;
    }
    if(!sessionStorage.getItem('hp_counted')){
      current += 1;
      await window.storage.set(COUNTER_KEY, String(current), true);
      sessionStorage.setItem('hp_counted', '1');
    }
    if(mainEl) mainEl.textContent = current.toLocaleString();
    if(footEl) footEl.textContent = 'Visitors: ' + current.toLocaleString();
  }catch(err){
    if(mainEl) mainEl.textContent = '—';
    if(footEl) footEl.textContent = 'Visitors: —';
    console.error('Visitor counter error:', err);
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  setActiveNav();
  wireWhatsAppButtons();
  wireMobileMenu();
  if(document.getElementById('visitorCount') || document.getElementById('footerVisitorCount')){
    initVisitorCounter();
  }
});
