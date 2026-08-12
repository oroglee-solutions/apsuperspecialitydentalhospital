lucide.createIcons();

const API_URL = "https://oroglee.com/server/getlistofcitiesandlocations";

// DESKTOP

const citySelect = document.getElementById("citySelect");
const locationSelect = document.getElementById("locationSelect");
const searchBtn = document.getElementById("searchBtn");

// MOBILE

const citySelectMobile = document.getElementById("citySelectMobile");
const locationSelectMobile = document.getElementById("locationSelectMobile");
const searchBtnMobile = document.getElementById("searchBtnMobile");

// STATE

let citiesAndLocations = [];

// CITY

let selectedCity =
  localStorage.getItem("selectedCity") &&
  localStorage.getItem("selectedCity") !== ""
    ? localStorage.getItem("selectedCity")
    : "Hyderabad";

// LOCATION

let selectedLocation =
  localStorage.getItem("selectedLocation") &&
  localStorage.getItem("selectedLocation") !== ""
    ? localStorage.getItem("selectedLocation")
    : "All locations";

// LOAD

window.addEventListener("load", async () => {
  await getCitiesAndLocations();
});

// API

async function getCitiesAndLocations() {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    citiesAndLocations = data.citiesAndLocations || [];

    loadCities();

    setCityAndLocations(selectedCity);
  } catch (error) {
    console.log(error);

    selectedCity = "Hyderabad";

    selectedLocation = "All locations";
  }
}

// LOAD CITIES

function loadCities() {
  // CLEAR

  if (citySelect) citySelect.innerHTML = "";

  if (citySelectMobile) citySelectMobile.innerHTML = "";

  // LOAD

  citiesAndLocations.forEach((cityData) => {
    // DESKTOP

    if (citySelect) {
      const option = document.createElement("option");

      option.value = cityData.city;

      option.innerText = cityData.city;

      citySelect.appendChild(option);
    }

    // MOBILE

    if (citySelectMobile) {
      const mobileOption = document.createElement("option");

      mobileOption.value = cityData.city;

      mobileOption.innerText = cityData.city;

      citySelectMobile.appendChild(mobileOption);
    }
  });

  // RESTORE CITY

  if (citySelect) {
    citySelect.value = selectedCity;
  }

  if (citySelectMobile) {
    citySelectMobile.value = selectedCity;
  }
}

// SET CITY

function setCityAndLocations(city) {
  let cityObject = citiesAndLocations.find(
    (item) => item.city.toLowerCase() === city.toLowerCase(),
  );

  // FALLBACK

  if (!cityObject) {
    cityObject = citiesAndLocations.find(
      (item) => item.city.toLowerCase() === "hyderabad",
    );

    selectedCity = "Hyderabad";
  } else {
    selectedCity = cityObject.city;
  }

  // UPDATE SELECTS

  if (citySelect) {
    citySelect.value = selectedCity;
  }

  if (citySelectMobile) {
    citySelectMobile.value = selectedCity;
  }

  // LOAD LOCATIONS

  loadLocations(cityObject);
}

// LOAD LOCATIONS

function loadLocations(cityObject) {
  // CLEAR

  if (locationSelect) {
    locationSelect.innerHTML = "";
  }

  if (locationSelectMobile) {
    locationSelectMobile.innerHTML = "";
  }

  // DEFAULT OPTION

  const createDefaultOption = () => {
    const option = document.createElement("option");

    option.value = "All locations";

    option.innerText = "All locations";

    return option;
  };

  // DESKTOP

  if (locationSelect) {
    locationSelect.appendChild(createDefaultOption());
  }

  // MOBILE

  if (locationSelectMobile) {
    locationSelectMobile.appendChild(createDefaultOption());
  }

  // LOCATIONS

  cityObject.locations.forEach((location) => {
    // DESKTOP

    if (locationSelect) {
      const option = document.createElement("option");

      option.value = location;

      option.innerText = location;

      locationSelect.appendChild(option);
    }

    // MOBILE

    if (locationSelectMobile) {
      const mobileOption = document.createElement("option");

      mobileOption.value = location;

      mobileOption.innerText = location;

      locationSelectMobile.appendChild(mobileOption);
    }
  });

  // RESTORE LOCATION

  if (selectedLocation && cityObject.locations.includes(selectedLocation)) {
    if (locationSelect) {
      locationSelect.value = selectedLocation;
    }

    if (locationSelectMobile) {
      locationSelectMobile.value = selectedLocation;
    }
  } else {
    selectedLocation = "All locations";

    if (locationSelect) {
      locationSelect.value = "All locations";
    }

    if (locationSelectMobile) {
      locationSelectMobile.value = "All locations";
    }
  }
}

// CITY CHANGE DESKTOP

if (citySelect) {
  citySelect.addEventListener("change", (e) => {
    selectedCity = e.target.value;

    selectedLocation = "All locations";

    setCityAndLocations(selectedCity);
  });
}

// CITY CHANGE MOBILE

if (citySelectMobile) {
  citySelectMobile.addEventListener("change", (e) => {
    selectedCity = e.target.value;

    selectedLocation = "All locations";

    setCityAndLocations(selectedCity);
  });
}

// LOCATION CHANGE DESKTOP

if (locationSelect) {
  locationSelect.addEventListener("change", (e) => {
    selectedLocation = e.target.value;
  });
}

// LOCATION CHANGE MOBILE

if (locationSelectMobile) {
  locationSelectMobile.addEventListener("change", (e) => {
    selectedLocation = e.target.value;
  });
}

// SEARCH

function handleSearch() {
  localStorage.setItem("selectedCity", selectedCity);

  localStorage.setItem("selectedLocation", selectedLocation);

  window.location.href = "https://oroglee.com/clinics";
}

// DESKTOP SEARCH

if (searchBtn) {
  searchBtn.addEventListener("click", handleSearch);
}

// MOBILE SEARCH

if (searchBtnMobile) {
  searchBtnMobile.addEventListener("click", handleSearch);
}

// BOOK NOW

function booknowaction() {
  localStorage.removeItem("selectedCity");

  localStorage.removeItem("selectedLocation");

  window.location.href = "https://oroglee.com/clinics";
}

// SCROLL

function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: "smooth",
  });
}

// Mobile Menu

const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

const reveals = document.querySelectorAll(".reveal-up");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

reveals.forEach((el) => observer.observe(el));

const faqBtns = document.querySelectorAll(".faq-btn");

faqBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const content = item.querySelector(".faq-content");
    const icon = item.querySelector(".faq-icon i");

    const isOpen = content.style.maxHeight;

    document.querySelectorAll(".faq-content").forEach((el) => {
      el.style.maxHeight = null;
    });

    document.querySelectorAll(".faq-icon i").forEach((i) => {
      i.classList.remove("fa-minus");
      i.classList.add("fa-plus");
    });

    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
      icon.classList.remove("fa-plus");
      icon.classList.add("fa-minus");
    }
  });
});

const slider = document.getElementById("testimonialSlider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const cards = slider.children;
console.log(cards);

let currentIndex = 0;

// UPDATE BUTTON VISIBILITY
function updateButtons() {
  // LEFT BUTTON
  if (currentIndex === 0) {
    prevBtn.classList.add("opacity-0", "pointer-events-none");
  } else {
    prevBtn.classList.remove("opacity-0", "pointer-events-none");
  }

  // RIGHT BUTTON
  if (currentIndex === cards.length - 1) {
    nextBtn.classList.add("opacity-0", "pointer-events-none");
  } else {
    nextBtn.classList.remove("opacity-0", "pointer-events-none");
  }
}

// NEXT BUTTON
nextBtn.addEventListener("click", () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;

    slider.scrollTo({
      left: cards[currentIndex].offsetLeft,
      behavior: "smooth",
    });

    updateButtons();
  }
});

// PREVIOUS BUTTON
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;

    slider.scrollTo({
      left: cards[currentIndex].offsetLeft,
      behavior: "smooth",
    });

    updateButtons();
  }
});

// TOUCH / MANUAL SCROLL SUPPORT
slider.addEventListener("scroll", () => {
  let scrollPosition = slider.scrollLeft;

  for (let i = 0; i < cards.length; i++) {
    if (
      scrollPosition >= cards[i].offsetLeft - 50 &&
      scrollPosition < cards[i].offsetLeft + 50
    ) {
      currentIndex = i;
      updateButtons();
    }
  }
});

function updateButtons() {
  // LEFT BUTTON
  if (currentIndex === 0) {
    prevBtn.classList.add("opacity-40", "cursor-not-allowed", "text-gray-400");

    prevBtn.classList.remove("opacity-100", "cursor-pointer", "text-gray-700");
  } else {
    prevBtn.classList.remove(
      "opacity-40",
      "cursor-not-allowed",
      "text-gray-400",
    );

    prevBtn.classList.add("opacity-100", "cursor-pointer", "text-gray-700");
  }

  // RIGHT BUTTON
  if (currentIndex === cards.length - 1) {
    nextBtn.classList.add("opacity-40", "cursor-not-allowed", "text-gray-400");

    nextBtn.classList.remove("opacity-100", "cursor-pointer", "text-gray-700");
  } else {
    nextBtn.classList.remove(
      "opacity-40",
      "cursor-not-allowed",
      "text-gray-400",
    );

    nextBtn.classList.add("opacity-100", "cursor-pointer", "text-gray-700");
  }
}

// INITIAL STATE
updateButtons();

// cities section

const CITIES = [
  {
    name: "Hyderabad",
    count: "80+",
    desc: "Across key areas of Hyderabad, committed to quality and patient care.",
  },
  {
    name: "Mumbai",
    count: "45+",
    desc: "Spread across Mumbai's key neighbourhoods, focused on trusted dental care.",
  },
  {
    name: "Delhi NCR",
    count: "90+",
    desc: "Serving Delhi NCR with verified dental practices across all major zones.",
  },
  {
    name: "Bengaluru",
    count: "75+",
    desc: "Connecting Bengaluru residents to top-rated dental clinics near them.",
  },
  {
    name: "Chennai",
    count: "55+",
    desc: "Serving Chennai with trusted dental practices across key neighbourhoods and localities.",
  },
];

const DURATION = 3000; // ms

let current = 0;
let isPaused = false;
let startTime = null;
let pausedAt = 0; // progress % when paused
let rafId = null;

// DOM refs
const leftPanel = document.getElementById("left-panel");
const progressBar = document.getElementById("progress-bar");
const dotNav = document.getElementById("dot-nav");
const pauseBadge = document.getElementById("pause-badge");
const heroCityName = document.getElementById("hero-city-name");
const cityTag = document.getElementById("city-tag");
const cityCount = document.getElementById("city-count");
const cityDesc = document.getElementById("city-desc");
//  const ctaText = document.getElementById("cta-text");
// const searchCity = document.getElementById("search-city");

// Build dots
CITIES.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.addEventListener("click", () => goTo(i));
  dotNav.appendChild(dot);
});

function getDots() {
  return dotNav.querySelectorAll(".dot");
}

function updateText(city) {
  // Re-trigger fade animation by cloning trick
   [heroCityName, cityTag, cityCount, cityDesc].forEach((el) => {
     el.classList.remove("fade-in");
     void el.offsetWidth; // reflow to restart animation
     el.classList.add("fade-in");
   });

  heroCityName.textContent = city.name;
  cityTag.textContent = city.name;
  cityCount.textContent = city.count;
  cityDesc.textContent = city.desc;
  //  ctaText.textContent = "Explore Clinics in " + city.name;
  // searchCity.textContent = city.name;
}

function goTo(idx) {
  if (idx === current) return;

  // Deactivate current slide & dot
  document.getElementById("slide-" + current).classList.remove("active");
  getDots()[current].classList.remove("active");

  current = idx;

  // Activate new slide & dot
  document.getElementById("slide-" + current).classList.add("active");
  getDots()[current].classList.add("active");

  updateText(CITIES[current]);

  // Reset progress
  progressBar.style.width = "0%";
  startTime = null;
  pausedAt = 0;

  if (!isPaused) {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  }
}

function tick(now) {
  if (!startTime) startTime = now - (pausedAt / 100) * DURATION;

  const elapsed = now - startTime;
  const pct = Math.min((elapsed / DURATION) * 100, 100);
  progressBar.style.width = pct + "%";
  //  console.log("elapsed time with pct", elapsed, pct)
  if (elapsed >= DURATION) {
    goTo((current + 1) % CITIES.length);
    return; // goTo restarts the RAF
  }

  rafId = requestAnimationFrame(tick);
}

// Hover: pause / resume
leftPanel.addEventListener("mouseenter", () => {
  isPaused = true;
  pausedAt = parseFloat(progressBar.style.width) || 0;
  cancelAnimationFrame(rafId);
  pauseBadge.classList.remove("hidden");
  pauseBadge.classList.add("flex");
});

leftPanel.addEventListener("mouseleave", () => {
  isPaused = false;
  startTime = null; // will be recalculated from pausedAt
  pauseBadge.classList.add("hidden");
  pauseBadge.classList.remove("flex");
  rafId = requestAnimationFrame(tick);
});

// Kick off
rafId = requestAnimationFrame(tick);
console.log("Initial time where animation start", rafId);

function navigatetotheclinics() {
  localStorage.removeItem("selectedCity");
  localStorage.removeItem("selectedLocation");

  window.location.href = "https://oroglee.com/clinics";
}
