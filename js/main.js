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

    const formData = new FormData(bookingForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let jsonRes = await response.json();
        if (response.status == 200) {
            const successMsg = document.querySelector('.form-success');
            if (successMsg) {
              successMsg.classList.add('show');
              setTimeout(() => successMsg.classList.remove('show'), 5000);
            }
            bookingForm.reset();
        } else {
            console.error(jsonRes);
            alert("Something went wrong while sending email.");
        }
    })
    .catch(error => {
        console.error(error);
        alert("Something went wrong!");
    })
    .finally(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // After email logic, open WhatsApp
        const name = object['Full Name'] || '';
        const phone = object['Phone Number'] || '';
        const pickup = object['Pickup City'] || '';
        const drop = object['Drop City'] || '';
        const date = object['Travel Date'] || '';
        const returnDate = object['Return Date'] || '';
        const passengers = object['Passengers'] || '';
        const vehicle = object['Vehicle Preference'] || '';
        const tripType = object['Trip Type'] || '';
        const notes = object['Special Requirements'] || '';

        const formatDate = (dateStr) => {
          if (!dateStr) return '';
          const [year, month, day] = dateStr.split('-');
          return `${day}/${month}/${year}`;
        };

        let msg = `Hi! I'd like to book a cab.\n\n`;
        if (name) msg += `Name: ${name}\n`;
        if (phone) msg += `Phone: ${phone}\n`;
        if (pickup) msg += `Pickup: ${pickup}\n`;
        if (drop) msg += `Drop: ${drop}\n`;
        if (date) msg += `Date: ${formatDate(date)}\n`;
        if (returnDate) msg += `Return Date: ${formatDate(returnDate)}\n`;
        if (tripType) msg += `Trip Type: ${tripType}\n`;
        if (passengers) msg += `Passengers: ${passengers}\n`;
        if (vehicle) msg += `Vehicle: ${vehicle}\n`;
        if (notes) msg += `Notes: ${notes}\n`;

        const waUrl = `https://wa.me/919581773271?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');
    });
  });
}

// ── NEWSLETTER FORM ──
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(newsletterForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Subscribing...';
    submitBtn.disabled = true;

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let jsonRes = await response.json();
        if (response.status == 200) {
            const successMsg = document.getElementById('newsletterSuccess');
            if (successMsg) {
              successMsg.style.display = 'block';
              setTimeout(() => successMsg.style.display = 'none', 5000);
            }
            newsletterForm.reset();
        } else {
            console.error(jsonRes);
            alert("Something went wrong!");
        }
    })
    .catch(error => {
        console.error(error);
        alert("Something went wrong!");
    })
    .finally(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
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
