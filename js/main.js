// ── NAVBAR SCROLL ──
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 60);
});

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu?.classList.toggle('open');
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
  });
});

// ── ACTIVE NAV LINK ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ── BACK TO TOP ──
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── BOOKING FORM ──
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('#fullName')?.value || '';
    const phone = this.querySelector('#phone')?.value || '';
    const pickup = this.querySelector('#pickupCity')?.value || '';
    const drop = this.querySelector('#dropCity')?.value || '';
    const date = this.querySelector('#travelDate')?.value || '';
    const returnDate = this.querySelector('#returnDate')?.value || '';
    const passengers = this.querySelector('#passengers')?.value || '';
    const vehicle = this.querySelector('#vehiclePref')?.value || '';
    const tripType = this.querySelector('#tripType')?.value || '';
    const notes = this.querySelector('#specialReq')?.value || '';

    let msg = `Hi! I'd like to book a cab.\n`;
    msg += `Name: ${name}\n`;
    msg += `Phone: ${phone}\n`;
    msg += `Pickup: ${pickup}\n`;
    msg += `Drop: ${drop}\n`;
    msg += `Date: ${date}\n`;
    if (returnDate) msg += `Return Date: ${returnDate}\n`;
    msg += `Passengers: ${passengers}\n`;
    if (tripType) msg += `Trip Type: ${tripType}\n`;
    if (vehicle) msg += `Vehicle: ${vehicle}\n`;
    if (notes) msg += `Notes: ${notes}\n`;

    const waUrl = `https://wa.me/919581773271?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');

    const successMsg = document.querySelector('.form-success');
    if (successMsg) {
      successMsg.classList.add('show');
      setTimeout(() => successMsg.classList.remove('show'), 5000);
    }
  });
}

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
