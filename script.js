// AP Super Speciality Dental Hospital

// Mobile Menu Toggle

const mobileMenuBtn = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Services Carousel

const servicesSlider = document.getElementById("servicesSlider");
const prevServicesBtn = document.getElementById("prevServices");
const nextServicesBtn = document.getElementById("nextServices");

if (servicesSlider && prevServicesBtn && nextServicesBtn) {
  const totalServices = servicesSlider.children.length;
  const GAP = 24; // gap-6

  let currentPosition = 0;

  // Step = one card width + gap, measured from the real card so the
  // track always lands exactly on a card boundary.
  const getCarouselConfig = () => {
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth < 1024;
    const visibleCards = isMobile ? 1 : isTablet ? 2 : 5;
    const cardWidth = servicesSlider.children[0].offsetWidth;

    return {
      scrollAmount: cardWidth + GAP,
      maxPosition: Math.max(0, totalServices - visibleCards),
      visibleCards: visibleCards,
    };
  };

  let carouselConfig = getCarouselConfig();
  let maxPosition = carouselConfig.maxPosition;

  const getScrollAmount = () => getCarouselConfig().scrollAmount;

  const updateCarouselPosition = () => {
    const newPosition = -(currentPosition * getScrollAmount());

    servicesSlider.style.transform = `translateX(${newPosition}px)`;
  };

  // Both arrows stay active — the track loops around at either end
  prevServicesBtn.style.cursor = "pointer";
  nextServicesBtn.style.cursor = "pointer";

  updateCarouselPosition();

  // At the first card, going back wraps to the last group
  prevServicesBtn.addEventListener("click", () => {
    currentPosition = currentPosition <= 0 ? maxPosition : currentPosition - 1;
    updateCarouselPosition();
  });

  // At the last card, going forward wraps to the first group
  nextServicesBtn.addEventListener("click", () => {
    currentPosition = currentPosition >= maxPosition ? 0 : currentPosition + 1;
    updateCarouselPosition();
  });

  window.addEventListener("resize", () => {
    carouselConfig = getCarouselConfig();
    maxPosition = carouselConfig.maxPosition;

    if (currentPosition > maxPosition) {
      currentPosition = maxPosition;
    }

    updateCarouselPosition();
  });
}

// Smooth scrolling for anchor links ("#" scrolls back to the top)

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    }

    // Close the mobile menu so it doesn't cover the target section
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }
  });
});
