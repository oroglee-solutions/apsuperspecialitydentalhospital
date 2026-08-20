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

/* New branch popup - disabled
// New branch popup: opens 2s after load, closes on the X, on Escape,
// or on a click anywhere outside the card

const branchModal = document.getElementById("branchModal");

if (branchModal) {
  const branchModalCard = branchModal.querySelector(".branch-modal__card");
  const branchModalClose = document.getElementById("branchModalClose");
  const OPEN_DELAY = 2000;
  const FADE = 350; // must match the CSS transition

  const openBranchModal = () => {
    branchModal.classList.remove("hidden");
    branchModal.classList.add("flex");

    // paint one frame at opacity 0 so the fade has somewhere to start
    requestAnimationFrame(() => {
      requestAnimationFrame(() => branchModal.classList.add("is-open"));
    });

    document.body.style.overflow = "hidden";
  };

  const closeBranchModal = () => {
    branchModal.classList.remove("is-open");
    document.body.style.overflow = "";

    setTimeout(() => {
      branchModal.classList.add("hidden");
      branchModal.classList.remove("flex");
    }, FADE);
  };

  // the hero pill and location chips carry this message permanently, so the
  // popup only needs to fire once per browsing session
  const SEEN_KEY = "apBranchPopupSeen";
  let alreadySeen = false;

  try {
    alreadySeen = sessionStorage.getItem(SEEN_KEY) === "1";
  } catch (e) {
    // private mode with storage disabled - just show it
  }

  if (!alreadySeen) {
    setTimeout(() => {
      openBranchModal();
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch (e) {}
    }, OPEN_DELAY);
  }

  branchModalClose.addEventListener("click", closeBranchModal);

  // a click anywhere that is not inside the card dismisses it, so the
  // Maps and Call links inside stay usable
  branchModal.addEventListener("click", (e) => {
    if (!branchModalCard.contains(e.target)) {
      closeBranchModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && branchModal.classList.contains("is-open")) {
      closeBranchModal();
    }
  });
}
*/

// Stat counters: count up once, the first time the box scrolls into view

const counters = document.querySelectorAll("[data-count-to]");

if (counters.length) {
  const DURATION = 1400;

  const runCounter = (el) => {
    const target = parseFloat(el.dataset.countTo);
    const decimals = (el.dataset.countTo.split(".")[1] || "").length;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / DURATION, 1);
      // ease-out so it decelerates into the final number
      const eased = 1 - Math.pow(1 - progress, 3);

      el.textContent = (target * eased).toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach((el) => (el.textContent = el.dataset.countTo));
  }
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
