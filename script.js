// AP Super Speciality Dental Hospital

// Mobile Menu Toggle

const mobileMenuBtn = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Services: show the first three, reveal the rest on demand

const toggleServicesBtn = document.getElementById("toggleServices");
const toggleServicesLabel = document.getElementById("toggleServicesLabel");

if (toggleServicesBtn && toggleServicesLabel) {
  const extraCards = Array.from(document.querySelectorAll(".service-extra"));
  const STAGGER = 60; // ms between neighbouring cards
  const DURATION = 500; // must match the CSS transition
  let animating = false;

  const expand = () => {
    // take the cards out of display:none first, then let the browser paint
    // one frame at opacity 0 so the transition has a starting point
    extraCards.forEach((card) => card.classList.remove("hidden"));

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        extraCards.forEach((card, i) => {
          card.style.transitionDelay = i * STAGGER + "ms";
          card.classList.add("is-visible");
        });
      });
    });

    const total = DURATION + STAGGER * (extraCards.length - 1);
    setTimeout(() => {
      extraCards.forEach((card) => (card.style.transitionDelay = ""));
      animating = false;
    }, total);
  };

  const collapse = () => {
    // fade out in reverse so the list closes from the bottom up
    extraCards.forEach((card, i) => {
      card.style.transitionDelay = (extraCards.length - 1 - i) * STAGGER + "ms";
      card.classList.remove("is-visible");
    });

    const total = DURATION + STAGGER * (extraCards.length - 1);
    setTimeout(() => {
      extraCards.forEach((card) => {
        card.classList.add("hidden");
        card.style.transitionDelay = "";
      });
      animating = false;
    }, total);

    // ease back up to the section instead of letting the page jump
    document.getElementById("services").scrollIntoView({ behavior: "smooth" });
  };

  toggleServicesBtn.addEventListener("click", () => {
    if (animating) return;
    animating = true;

    const expanded = toggleServicesBtn.getAttribute("aria-expanded") === "true";

    toggleServicesBtn.setAttribute("aria-expanded", String(!expanded));
    toggleServicesLabel.textContent = expanded ? "Show More" : "Show Less";

    if (expanded) {
      collapse();
    } else {
      expand();
    }
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
