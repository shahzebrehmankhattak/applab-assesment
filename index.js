
/* Grid SLIDER */
let slideIndex = 0;
const slider = document.getElementById("gridSlider");

setInterval(() => {
  slideIndex++;
  if (slideIndex > 1) slideIndex = 0;

  slider.style.transform = `translateY(-${slideIndex * 600}px)`;
}, 3000);


/* LEFT MOVING LINE */
const line = document.getElementById("line");
const features = document.querySelectorAll(".wrapper-1-feature");

let lineIndex = 0;

function moveLine() {
  const currentFeature = features[lineIndex];

  const text = currentFeature.querySelector(".feature-text");

  const featureTop = currentFeature.offsetTop;

  const textHeight = text.offsetHeight;

  line.style.top = featureTop + textHeight + 12 + "px";

  line.style.animation = "none";
  void line.offsetWidth;
  line.style.animation = "loadingLine 2s linear forwards";

  lineIndex++;

  if (lineIndex >= features.length) {
    lineIndex = 0;
  }
}

moveLine();

setInterval(moveLine, 3000);

// 

const wrapper3 = document.querySelector(".wrapper-3");
const wrapper3Inner = document.querySelector(".wrapper-3-inner");
const content = document.querySelector(".content");
const buttons = document.querySelector(".wrapper-3-btns");
const mockup = document.querySelector(".mockup img");

let isActive = false;
let currentScale = 1;
let currentY = 0;
let currentWidth = 1758;

const BASE_WIDTH = 1758;

const observer = new IntersectionObserver(
  ([entry]) => (isActive = entry.isIntersecting),
  { threshold: 0.2 }
);

observer.observe(wrapper3);

function animate() {
  if (isActive) {
    const rect = wrapper3.getBoundingClientRect();

    const progress = Math.min(
      Math.max(1 - rect.top / window.innerHeight, 0),
      1
    );

    const maxScale = Math.min(
      1.15,
      window.innerWidth / BASE_WIDTH + 0.05
    );

    // SCALE
    const targetScale = Math.min(
      1 + progress * 0.18,
      maxScale
    );
    currentScale += (targetScale - currentScale) * 0.08;

    // WIDTH
    const targetWidth =
      BASE_WIDTH + progress * (window.innerWidth - BASE_WIDTH);
    currentWidth += (targetWidth - currentWidth) * 0.08;

    // Y movement
    const targetY = -progress * 50;
    currentY += (targetY - currentY) * 0.08;

    wrapper3Inner.style.width = `${currentWidth}px`;
    wrapper3Inner.style.transform = `scale(${currentScale})`;
    content.style.transform = `translateY(${currentY}px)`;

    // ✅ Buttons appear from behind mockup
    let zoomStart = 0.3;

    let appearProgress = (progress - zoomStart) / (1 - zoomStart);
    appearProgress = Math.min(Math.max(appearProgress, 0), 1);

    buttons.style.opacity = appearProgress;

    // Buttons move upward when appearing
    buttons.style.transform = `translateY(${(1 - appearProgress) * 60}px)`;

    buttons.style.pointerEvents =
      appearProgress > 0.1 ? "auto" : "none";

    // Mockup animation
    mockup.style.transform = `
      translateY(${currentY * 0.6}px)
      scale(${1 + progress * 0.05})
    `;
  }

  requestAnimationFrame(animate);
}

animate();

// 

const track = document.getElementById("sliderTrack");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dots");

const slides = document.querySelectorAll(".wrapper-4-slide");

let index = 0;
const totalSlides = document.querySelectorAll(".wrapper-4-slide").length;

/* CREATE DOTS */
for (let i = 0; i < totalSlides; i++) {
  let dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    index = i;
    updateSlider();
  });

  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dots span");

updateSlider();

/* UPDATE SLIDER */
function updateSlider() {
  track.style.transform = `translateX(-${index * 70}%)`;

  // Update dots
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");

  // Update card backgrounds
  slides.forEach((slide, i) => {
    const card = slide.querySelector(".card");
    const img = card.querySelector("img");
    if (i === index) {
      card.classList.add("active");
      card.classList.remove("inactive");
      img.classList.remove("img-box-orange");
    } else {
      card.classList.remove("active");
      card.classList.add("inactive");
      img.classList.add("img-box-orange");
    }
  });
}

nextBtn.addEventListener("click", () => {
  index += 1;

  if (index >= totalSlides) index = 0;

  updateSlider();
});


const wrapper3Observer = new IntersectionObserver(
  ([entry]) => (isActive = entry.isIntersecting),
  { threshold: 0.2 }
);

wrapper3Observer.observe(wrapper3);

const wrapper5 = document.querySelector(".wrapper-5-row-card");

const wrapper5Observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      wrapper5.classList.add("show");
      wrapper5Observer.unobserve(wrapper5);
    }
  },
  {
    root: null,
    rootMargin: "-0% 0px -0% 0px"
  }
);

wrapper5Observer.observe(wrapper5);

// 

const wrapper6Track = document.getElementById("wrapper6Track");
const wrapper6Next = document.getElementById("wrapper6Next");
const wrapper6Prev = document.getElementById("wrapper6Prev");

let wrapper6Index = 0;
const wrapper6CardsToShow = 3;
const wrapper6TotalCards = document.querySelectorAll(
  ".wrapper-6-slider-card-item"
).length;

const wrapper6MaxIndex = wrapper6TotalCards - wrapper6CardsToShow;

wrapper6Next.addEventListener("click", () => {
  if (wrapper6Index < wrapper6MaxIndex) {
    wrapper6Index++;
    updateWrapper6Slider();
  }
});

wrapper6Prev.addEventListener("click", () => {
  if (wrapper6Index > 0) {
    wrapper6Index--;
    updateWrapper6Slider();
  }
});

function updateWrapper6Slider() {
  const moveAmount = wrapper6Index * (100 / wrapper6CardsToShow);
  wrapper6Track.style.transform = `translateX(-${moveAmount}%)`;
}

// read more button

function myFunction() {
  var dots = document.getElementById("readmoredots");
  var moreText = document.getElementById("moretext");
  var btnText = document.getElementById("readMore");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

const wrapper7Track = document.getElementById("wrapper7Track");
const wrapper7Prev = document.getElementById("wrapper7Prev");
const wrapper7Next = document.getElementById("wrapper7Next");

const wrapper7Slides = document.querySelectorAll(".wrapper-7-col-2-slide");
let wrapper7Index = 0;

wrapper7Next.addEventListener("click", () => {
  wrapper7Index++;
  if (wrapper7Index >= wrapper7Slides.length) {
    wrapper7Index = 0;
  }
  updateWrapper7Slider();
});

wrapper7Prev.addEventListener("click", () => {
  wrapper7Index--;
  if (wrapper7Index < 0) {
    wrapper7Index = wrapper7Slides.length - 1;
  }
  updateWrapper7Slider();
});

function updateWrapper7Slider() {
  wrapper7Track.style.transform = `translateX(-${wrapper7Index * 100}%)`;
}

const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const logo = document.querySelector(".logo-img");
const person = document.querySelector(".person-img");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
    logo.src = "./assets/logo-scroll-up.png";
    person.src = "./assets/PersonArmsSpread-gray.png";
  } else {
    navbar.classList.remove("scrolled");
    logo.src = "./assets/logo-white.png";
    person.src = "./assets/PersonArmsSpread.png";
  }
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  hamburger.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 992) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  }
});