/* ══════════════════════════════════════════════════
   MACCIN BELDAD — PORTFOLIO SCRIPT
══════════════════════════════════════════════════ */

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8Do7NAxvRscmkSnkbZyuQnHD8NfcoBY0",
  authDomain: "macxportfolio.firebaseapp.com",
  projectId: "macxportfolio",
  storageBucket: "macxportfolio.firebasestorage.app",
  messagingSenderId: "435791768169",
  appId: "1:435791768169:web:dc825c68c4990b0b4dd0f8",
  measurementId: "G-9LQEZEXFXQ",
  databaseURL: "https://macxportfolio-default-rtdb.firebaseio.com"
};

let database = null;
if (typeof firebase !== 'undefined') {
  try {
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
  } catch (err) {
    console.error("Firebase initialization failed:", err);
  }
}

/* ── 1. CURSOR GLOW ──────────────────────────────── */
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

/* ── 2. PARTICLE CANVAS ──────────────────────────── */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x  = Math.random() * canvas.width;
    this.y  = Math.random() * canvas.height;
    this.r  = Math.random() * 1.5 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.5 + 0.2;
    this.color = Math.random() > 0.5 ? '139,92,246' : '34,211,238';
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  // Draw connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(139,92,246,${0.05 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animParticles);
}
animParticles();

/* ── 3. NAV SCROLL ───────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

/* ── 4. HAMBURGER MENU ───────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ── 5. TYPED TEXT ───────────────────────────────── */
const roles = [
  'Web Developer',
  'Frontend Builder',
  'PHP Developer',
  'UI Designer',
  'Full-Stack Builder'
];
let rIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  const current = roles[rIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    typedEl.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; setTimeout(typeLoop, 300); return; }
  }
  setTimeout(typeLoop, deleting ? 60 : 90);
}
typeLoop();

/* ── 6. COUNTER ANIMATION ────────────────────────── */
function animCounter(el) {
  if (el.animInterval) clearInterval(el.animInterval);
  const target = parseInt(el.dataset.target) || 0;
  if (target === 0) { el.textContent = 0; return; }
  let count = 0;
  const step = Math.max(1, Math.floor(target / 40));
  el.animInterval = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count;
    if (count >= target) clearInterval(el.animInterval);
  }, 40);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(animCounter);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

/* ── 7. SKILL BAR ANIMATION ──────────────────────── */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

/* ── 8. SCROLL REVEAL ────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

// Add reveal classes to elements
[
  ...document.querySelectorAll('.info-card'),
  ...document.querySelectorAll('.skill-category'),
  ...document.querySelectorAll('.project-card'),
  ...document.querySelectorAll('.rating-form-container'),
  ...document.querySelectorAll('.contact-item'),
  ...document.querySelectorAll('.section-header'),
].forEach((el, i) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ── 9. CONTACT FORM ─────────────────────────────── */
const form        = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();
  
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmailInput').value;
  const subject = document.getElementById('contactSubject').value;
  const message = document.getElementById('contactMessage').value;
  
  const emailBody = `Hi Maccin,\n\n${message}\n\nBest regards,\n${name}\nEmail: ${email}`;
  
  const mailtoUrl = `mailto:maccinbeldad07@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  
  // Open default email client
  window.location.href = mailtoUrl;
  
  // Show status feedback
  formSuccess.style.display = 'block';
  formSuccess.style.color = 'var(--green)';
  formSuccess.textContent = '✅ Opening your email client to send the message...';
  form.reset();
  setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
});

/* ── 10. ACTIVE NAV LINK HIGHLIGHT ───────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinkEls.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--accent-3)'
      : '';
    a.style.background = a.getAttribute('href') === `#${current}`
      ? 'rgba(139,92,246,0.1)'
      : '';
  });
}, { passive: true });

/* ── 11. SMOOTH PARALLAX ON HERO ─────────────────── */
window.addEventListener('scroll', () => {
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && window.scrollY < window.innerHeight) {
    heroVisual.style.transform = `translateY(${window.scrollY * 0.08}px)`;
  }
}, { passive: true });

/* ── 12. INTERACTIVE RATING FORM ─────────────────── */
const stars = document.querySelectorAll('.star-rating .star');
const ratingValueInput = document.getElementById('ratingValue');

stars.forEach(star => {
  star.addEventListener('mouseover', function() {
    const value = parseInt(this.getAttribute('data-value'));
    stars.forEach(s => {
      if (parseInt(s.getAttribute('data-value')) <= value) {
        s.classList.add('hovered');
      } else {
        s.classList.remove('hovered');
      }
    });
  });
  
  star.addEventListener('mouseout', function() {
    stars.forEach(s => s.classList.remove('hovered'));
  });
  
  star.addEventListener('click', function() {
    const value = parseInt(this.getAttribute('data-value'));
    ratingValueInput.value = value;
    stars.forEach(s => {
      if (parseInt(s.getAttribute('data-value')) <= value) {
        s.classList.add('selected');
      } else {
        s.classList.remove('selected');
      }
    });
  });
});

const ratingForm = document.getElementById('ratingForm');
const ratingSuccess = document.getElementById('ratingSuccess');

if (ratingForm) {
  ratingForm.addEventListener('submit', e => {
    e.preventDefault();
    const rating = ratingValueInput.value;
    if (rating == 0) {
      alert("Please select a star rating!");
      return;
    }
    const name = document.getElementById('ratingName').value;
    const project = document.getElementById('ratingProject').value;
    const message = document.getElementById('ratingMessage').value;
    
    const subject = `New Portfolio Rating from ${name}`;
    const emailBody = `Hi Maccin,\n\nI just rated your work on ${project}!\nRating: ${rating} out of 5 Stars\n\nFeedback:\n${message}\n\nBest regards,\n${name}`;
    
    if (database) {
      // 1. Push the full feedback to a 'ratings' list in Firebase
      const ratingsRef = database.ref('ratings');
      ratingsRef.push({
        name: name,
        project: project,
        rating: rating,
        message: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });

      // 2. Update happy clients counter if 4 or 5 stars
      if (rating >= 4) {
        const counterRef = database.ref('stats/happyClients');
        counterRef.set(firebase.database.ServerValue.increment(1));
      }
    }

    ratingSuccess.style.display = 'block';
    ratingSuccess.style.color = 'var(--green)';
    ratingForm.reset();
    ratingValueInput.value = 0;
    stars.forEach(s => s.classList.remove('selected'));
    
    setTimeout(() => { ratingSuccess.style.display = 'none'; }, 5000);
  });
}

// Function to listen to the Happy Clients counter from Firebase
function listenToHappyClientsCounter() {
  if (database) {
    const counterRef = database.ref('stats/happyClients');
    counterRef.on('value', (snapshot) => {
      const count = snapshot.val() || 0;
      const happyClientsEl = document.getElementById('happyClientsNum');
      if (happyClientsEl) {
        happyClientsEl.setAttribute('data-target', count);
        if (typeof animCounter === 'function') {
          animCounter(happyClientsEl);
        } else {
          happyClientsEl.textContent = count;
        }
      }
    });
  }
}

// Admin Controls Logic
const adminMenu = document.getElementById('adminMenu');
const resetHappyClientsBtn = document.getElementById('resetHappyClientsBtn');
const toggleRatingsSectionBtn = document.getElementById('toggleRatingsSectionBtn');
const testimonialsSection = document.getElementById('testimonials');
const testimonialsNav = document.querySelector('a[href="#testimonials"]');

if (resetHappyClientsBtn) {
  resetHappyClientsBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to reset your Happy Clients counter?")) {
      if (database) {
        database.ref('stats/happyClients').set(0);
        database.ref('ratings').remove();
      }
      adminMenu.classList.add('hidden');
    }
  });
}

if (toggleRatingsSectionBtn && testimonialsSection) {
  toggleRatingsSectionBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to toggle the visibility of the Client Ratings section?")) {
      const isHidden = testimonialsSection.style.display === 'none';
      
      if (isHidden) {
        testimonialsSection.style.display = '';
        if(testimonialsNav) testimonialsNav.parentElement.style.display = '';
        localStorage.setItem('hideRatingsSection', 'false');
      } else {
        testimonialsSection.style.display = 'none';
        if(testimonialsNav) testimonialsNav.parentElement.style.display = 'none';
        localStorage.setItem('hideRatingsSection', 'true');
      }
      adminMenu.classList.add('hidden');
    }
  });
}

// Secret Admin Unlock Logic
const footerCopy = document.querySelector('.footer-copy');
const adminControls = document.querySelector('.admin-controls');

if (footerCopy && adminControls) {
  footerCopy.addEventListener('dblclick', () => {
    if (localStorage.getItem('isAdminUnlocked') === 'true') {
      adminMenu.classList.toggle('hidden');
    } else {
      let pw = prompt("Enter Admin Password:");
      if (pw === "maccin") {
        localStorage.setItem('isAdminUnlocked', 'true');
        adminControls.classList.add('unlocked');
        adminMenu.classList.remove('hidden');
        alert("Admin Mode Unlocked! You can now manage settings and delete reviews.");
      } else if (pw !== null) {
        alert("Incorrect password.");
      }
    }
  });
  
  // Or via URL parameter ?admin=true
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('admin') === 'true') {
    localStorage.setItem('isAdminUnlocked', 'true');
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
  listenToHappyClientsCounter();
  
  // Hide ratings section if saved
  if (localStorage.getItem('hideRatingsSection') === 'true' && testimonialsSection) {
    testimonialsSection.style.display = 'none';
    if(testimonialsNav) testimonialsNav.parentElement.style.display = 'none';
  }
  
// Show admin controls if unlocked
  if (localStorage.getItem('isAdminUnlocked') === 'true' && adminControls) {
    adminControls.classList.add('unlocked');
  }
});

/* ── REVIEWS MODAL LOGIC ─────────────────────────── */
const happyClientsStatBtn = document.getElementById('happyClientsStatBtn');
const reviewsModal = document.getElementById('reviewsModal');
const reviewsModalClose = document.getElementById('reviewsModalClose');
const reviewsContainer = document.getElementById('reviewsContainer');

if (happyClientsStatBtn && reviewsModal && reviewsModalClose) {
  // Open modal
  happyClientsStatBtn.addEventListener('click', () => {
    reviewsModal.classList.remove('hidden');
    loadReviews();
  });

  // Close modal via button
  reviewsModalClose.addEventListener('click', () => {
    reviewsModal.classList.add('hidden');
  });

  // Close modal via clicking outside
  reviewsModal.addEventListener('click', (e) => {
    if (e.target === reviewsModal) {
      reviewsModal.classList.add('hidden');
    }
  });
}

function loadReviews() {
  if (!database) {
    reviewsContainer.innerHTML = '<div class="reviews-empty">Database not connected.</div>';
    return;
  }
  
  reviewsContainer.innerHTML = '<div class="reviews-loading">Loading reviews...</div>';
  
  const ratingsRef = database.ref('ratings');
  // Fetch once
  ratingsRef.once('value').then((snapshot) => {
    if (!snapshot.exists()) {
      reviewsContainer.innerHTML = '<div class="reviews-empty">No reviews yet. Be the first!</div>';
      return;
    }
    
    let reviewsHtml = '';
    const ratings = [];
    snapshot.forEach(child => {
      ratings.push({ ...child.val(), key: child.key });
    });
    
    // Sort newest first
    ratings.reverse();
    
    // Filter to only 4 and 5 star reviews
    const highRatings = ratings.filter(r => r.rating >= 4);
    
    if (highRatings.length === 0) {
      reviewsContainer.innerHTML = '<div class="reviews-empty">No high ratings yet!</div>';
      return;
    }
    
    const isAdmin = localStorage.getItem('isAdminUnlocked') === 'true';

    highRatings.forEach(review => {
      let stars = '';
      for (let i = 0; i < 5; i++) {
        stars += i < review.rating ? '★' : '☆';
      }
      
      const deleteBtn = isAdmin ? `<button class="review-delete-btn" data-key="${review.key}" title="Delete this review">🗑️</button>` : '';

      reviewsHtml += `
        <div class="review-item">
          <div class="review-item-header">
            <div>
              <span class="review-item-name">${review.name || 'Anonymous'}</span>
              <span class="review-item-project">${review.project || 'Project'}</span>
            </div>
            ${deleteBtn}
          </div>
          <div class="review-item-stars">${stars}</div>
          <p class="review-item-message">"${review.message || 'Great experience!'}"</p>
        </div>
      `;
    });
    
    reviewsContainer.innerHTML = reviewsHtml;
  }).catch((error) => {
    reviewsContainer.innerHTML = `<div class="reviews-empty">Failed to load reviews.</div>`;
    console.error(error);
  });
}

// Handle delete review clicks
if (reviewsContainer) {
  reviewsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('review-delete-btn')) {
      const key = e.target.getAttribute('data-key');
      if (confirm("Are you sure you want to delete this review?")) {
        e.target.textContent = "⏳";
        if (database) {
          // Delete from Firebase
          database.ref('ratings/' + key).remove().then(() => {
            // Decrement happy clients counter
            const counterRef = database.ref('stats/happyClients');
            counterRef.once('value').then(snap => {
              const currentCount = snap.val() || 0;
              if (currentCount > 0) {
                counterRef.set(currentCount - 1);
              }
            });
            // Reload reviews modal
            loadReviews();
          });
        }
      }
    }
  });
}

