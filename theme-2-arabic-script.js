/**
 * Professional CV - Arabic RTL Script
 * Handles animations, interactions, and theme/language switching
 */

document.addEventListener("DOMContentLoaded", () => {
  setupPage();
});

/**
 * Main setup function that initializes all page functionality
 */
function setupPage() {
  setupNavigation();
  setupAnimations();
  setupThemeSwitching();
  setupLanguageSwitching();
  setupControlNavbar();
  setupDownloadButton();

  // Enable RTL specific enhancements
  enhanceRTLFeatures();
}

/**
 * Sets up mobile and desktop navigation
 */
function setupNavigation() {
  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const sideNav = document.querySelector(".side-nav");

  if (mobileNavToggle && sideNav) {
    mobileNavToggle.addEventListener("click", () => {
      sideNav.classList.toggle("active");
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        if (sideNav.classList.contains("active")) {
          sideNav.classList.remove("active");
        }
      });
    });
  }
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const navHeight = document.querySelector("nav")
        ? document.querySelector("nav").offsetHeight
        : 0;
      const offset = navHeight;

      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: "smooth",
      });
    }
  });
});

// Back to Top Button
const backToTopBtn = document.getElementById("backToTopBtn");
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/**
 * Sets up animations using IntersectionObserver
 */
function setupAnimations() {
  // Timeline animations
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.25 }
  );

  document.querySelectorAll(".timeline-item").forEach((item) => {
    timelineObserver.observe(item);
  });

  // Skill bar animations
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll(".skill-progress");
          skillBars.forEach((bar) => {
            const width = bar.getAttribute("data-width") + "%";
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".skill-category").forEach((category) => {
    skillObserver.observe(category);
  });
}

/**
 * Sets up theme switching functionality
 */
function setupThemeSwitching() {
  const darkThemeBtn = document.getElementById("darkThemeBtn");
  const lightThemeBtn = document.getElementById("lightThemeBtn");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Check if user has previously set a theme preference
  const savedTheme = localStorage.getItem("theme");

  // Initialize theme based on saved preference or system preference
  if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add("dark-theme");
    setActiveTheme(true);
  } else {
    document.body.classList.remove("dark-theme");
    setActiveTheme(false);
  }

  // Dark theme button
  darkThemeBtn.addEventListener("click", () => {
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
    setActiveTheme(true);
  });

  // Light theme button
  lightThemeBtn.addEventListener("click", () => {
    document.body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
    setActiveTheme(false);
  });

  // Helper function to set active theme button
  function setActiveTheme(isDark) {
    if (isDark) {
      darkThemeBtn.classList.add("active");
      lightThemeBtn.classList.remove("active");
    } else {
      lightThemeBtn.classList.add("active");
      darkThemeBtn.classList.remove("active");
    }
  }
}

/**
 * Sets up language switching functionality
 */
function setupLanguageSwitching() {
  const englishBtn = document.getElementById("englishBtn");
  const arabicBtn = document.getElementById("arabicBtn");

  // English language button
  if (englishBtn) {
    englishBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  // Arabic language button - already active in this file, but keep for completeness
  if (arabicBtn) {
    arabicBtn.addEventListener("click", () => {
      // No action needed as we're already on the Arabic page
    });
  }
}

/**
 * Sets up the control navbar responsiveness
 */
function setupControlNavbar() {
  const controlNavbar = document.querySelector(".control-navbar");

  // Set horizontal layout directly based on current window width
  // without animations
  if (window.innerWidth > 768) {
    controlNavbar.classList.add("horizontal");
  } else {
    controlNavbar.classList.remove("horizontal");
  }

  // Add event listener for window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      controlNavbar.classList.add("horizontal");
    } else {
      controlNavbar.classList.remove("horizontal");
    }
  });
}

/**
 * Sets up the download CV button functionality
 */
function setupDownloadButton() {
  const downloadBtn = document.getElementById("downloadCvBtn");

  if (downloadBtn) {
    // Add click tracking and visual feedback
    downloadBtn.addEventListener("click", function () {
      console.log("CV download initiated");

      // Add visual feedback with icon animation
      const icon = downloadBtn.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-beat");
        icon.classList.add("fa-bounce");

        // Reset animation after a moment
        setTimeout(() => {
          icon.classList.remove("fa-bounce");
          icon.classList.add("fa-beat");
        }, 2000);
      }
    });
  }
}

/**
 * Apply RTL-specific enhancements
 */
function enhanceRTLFeatures() {
  // Ensure proper scrollbar position for RTL
  document.querySelectorAll(".side-nav nav").forEach((navElement) => {
    navElement.style.direction = "rtl";
    navElement.style.scrollbarWidth = "thin";
  });

  // Ensure all progress bars flow correctly in RTL
  document.querySelectorAll(".skill-progress").forEach((bar) => {
    bar.style.cssFloat = "right";
  });

  // Ensure proper text alignment for RTL in sections that might need it
  document
    .querySelectorAll(
      ".experience-description, .education-description, .about-text p"
    )
    .forEach((textElement) => {
      textElement.style.textAlign = "right";
    });

  // Set font size slightly larger for better Arabic readability
  document.body.style.fontSize = "1.05em";
}

/**
 * Arabic Date Formatting (can be extended as needed)
 * @param {Date} date - Date to format
 * @returns {string} - Formatted date in Arabic style
 */
function formatArabicDate(date) {
  const arabicMonths = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  return `${date.getDate()} ${
    arabicMonths[date.getMonth()]
  } ${date.getFullYear()}`;
}

/**
 * Convert Western numerals to Arabic numerals if needed
 * @param {string} str - String containing numbers
 * @returns {string} - String with Arabic numerals
 */
function convertToArabicNumerals(str) {
  const numeralMap = {
    0: "٠",
    1: "١",
    2: "٢",
    3: "٣",
    4: "٤",
    5: "٥",
    6: "٦",
    7: "٧",
    8: "٨",
    9: "٩",
  };

  return str.replace(/[0-9]/g, (match) => numeralMap[match]);
}

// Enable the functions below if you want to convert all numerals on the page to Arabic
/*
  function convertAllNumeralsOnPage() {
    const textNodes = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    
    while (node = walk.nextNode()) {
      if (node.parentElement.tagName !== 'SCRIPT' && node.parentElement.tagName !== 'STYLE') {
        textNodes.push(node);
      }
    }
    
    textNodes.forEach(textNode => {
      if (/[0-9]/.test(textNode.nodeValue)) {
        textNode.nodeValue = convertToArabicNumerals(textNode.nodeValue);
      }
    });
  }
  
  // Uncomment to automatically convert all numerals to Arabic
  // document.addEventListener('DOMContentLoaded', convertAllNumeralsOnPage);
  */
