const toggleBtn = document.getElementById("toggleServices");
const additional = document.getElementById("additional-services");

toggleBtn.addEventListener("click", () => {
  additional.classList.toggle("active");

  toggleBtn.textContent = additional.classList.contains("active")
    ? "Weniger anzeigen"
    : "Weitere Services anzeigen";
});


const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.testimonial-controls .prev');
const nextBtn = document.querySelector('.testimonial-controls .next');
const dotContainer = document.querySelector('.testimonial-dots');

let index = 0;
let interval;
let startX = 0;
let endX = 0;

// Dynamische Dots erzeugen
testimonials.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dot.dataset.index = i;
  if (i === 0) dot.classList.add('active');
  dotContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.testimonial-dots .dot');

// Anzeige aktualisieren
function showTestimonial(i) {
  testimonials.forEach(t => t.classList.remove('active'));
  testimonials[i].classList.add('active');

  dots.forEach(d => d.classList.remove('active'));
  dots[i].classList.add('active');
}

// Slide-Funktionen
function nextSlide() {
  index = (index + 1) % testimonials.length;
  showTestimonial(index);
}

function prevSlide() {
  index = (index - 1 + testimonials.length) % testimonials.length;
  showTestimonial(index);
}

// Button-Events
prevBtn.addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetInterval();
});

// Dot-Click Events
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    index = parseInt(dot.dataset.index);
    showTestimonial(index);
    resetInterval();
  });
});

// Auto-Wechsel
function startAutoSlide() {
  interval = setInterval(nextSlide, 5000);
}

function resetInterval() {
  clearInterval(interval);
  startAutoSlide();
}

// Touch (Swipe)
const slider = document.querySelector('.testimonial-slider');

slider.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', e => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  if (endX < startX - 50) {
    nextSlide();
    resetInterval();
  } else if (endX > startX + 50) {
    prevSlide();
    resetInterval();
  }
}

// Initialisierung
showTestimonial(index);
startAutoSlide();
