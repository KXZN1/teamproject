// Mobile menu
const toggleBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggleBtn){
  toggleBtn.addEventListener('click', ()=> nav.classList.toggle('open'));
}

// Simple slider
const slides = document.querySelectorAll('.slide');
let idx = 0;
function showSlide(i){
  slides.forEach(s=>s && s.classList.remove('active'));
  if (slides.length){ slides[i % slides.length].classList.add('active'); }
}
if (slides.length){
  showSlide(0);
  setInterval(()=>{ idx = (idx+1)%slides.length; showSlide(idx); }, 4000);
}

// Reveal on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if (entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  })
},{threshold: .2});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Smooth anchor scroll for same-page links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const target = document.querySelector(a.getAttribute('href'));
    if (target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// Reservation form (reserve.html)
const form = document.querySelector('#reserve-form');
if (form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    // Simple validation
    const required = ['name','email','phone','date','device'];
    const missing = required.filter(k=>!String(data[k]||'').trim());
    if (missing.length){
      alert('입력되지 않은 항목이 있습니다: ' + missing.join(', '));
      return;
    }
    // Save to localStorage as demo (replace with real backend later)
    const reservations = JSON.parse(localStorage.getItem('xr_reservations')||'[]');
    reservations.push({...data, createdAt: new Date().toISOString()});
    localStorage.setItem('xr_reservations', JSON.stringify(reservations));
    form.reset();
    const modal = document.getElementById('success-modal');
    if (modal){ modal.showModal(); }
  });
}

// close modal
document.querySelectorAll('[data-close-modal]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    btn.closest('dialog')?.close();
  });
});
