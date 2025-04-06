document.getElementById("toggleServices")?.addEventListener("click", function () {
  const desktopSection = document.getElementById("additional-services");
  const mobileSection = document.getElementById("mobileAdditional");

  // Umschalten beider Bereiche
  const isActive = desktopSection?.classList.contains("active") || mobileSection?.classList.contains("active");

  // Beide schließen oder öffnen
  [desktopSection, mobileSection].forEach(section => {
    if (section) section.classList.toggle("active");
  });

  // Button-Text je nach aktuellem Zustand
  this.innerText = isActive
    ? "Weitere Services anzeigen"
    : "Weniger Services anzeigen";
});



const sliderTrack = document.querySelector('.testimonial-slider-track');
const testimonials = document.querySelectorAll('.testimonial');
const dotContainer = document.querySelector('.testimonial-dots');

let index = 0;
let interval;
let startX = 0;
let endX = 0;

// Dots generieren
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
  index = i;
  const offset = -i * 100;
  sliderTrack.style.transform = `translateX(${offset}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[i].classList.add('active');
}

// Slide vor/zurück
function nextSlide() {
  index = (index + 1) % testimonials.length;
  showTestimonial(index);
}
function prevSlide() {
  index = (index - 1 + testimonials.length) % testimonials.length;
  showTestimonial(index);
}

// Auto-Slide starten
function startAutoSlide() {
  interval = setInterval(nextSlide, 5000);
}
function resetInterval() {
  clearInterval(interval);
  startAutoSlide();
}

// Dots klickbar machen
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    index = parseInt(dot.dataset.index);
    showTestimonial(index);
    resetInterval();
  });
});

// Touch für Swipe
const sliderWrapper = document.querySelector('.testimonial-slider-wrapper');

sliderWrapper.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});
sliderWrapper.addEventListener('touchend', e => {
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

window.addEventListener("resize", () => {
  showTestimonial(index); // neu berechnen
});

// Initialisieren
showTestimonial(index);
startAutoSlide();



