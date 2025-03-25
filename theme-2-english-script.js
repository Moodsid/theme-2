/**
 * Professional CV - Main Script
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
  setupDownloadButton(); // Setup download button
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

  // Rest of your navigation code remains the same...
  // Smooth scrolling, back to top button, etc.
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
  // This function stub is present in the original code
  // but implementation details aren't shown
}

/**
 * Translates all text content on the page to the selected language
 * @param {string} lang - Language code ('en' or 'ar')
 */
function translatePage(lang) {
  // Get all text-containing elements
  translateTextNodes(document.body, lang);
  translateAttributes(lang);
}

/**
 * Recursively translates text nodes within an element
 * @param {HTMLElement} element - The element to translate
 * @param {string} lang - Language code ('en' or 'ar')
 */
function translateTextNodes(element, lang) {
  // Skip script and style elements
  if (element.tagName === "SCRIPT" || element.tagName === "STYLE") {
    return;
  }

  // Process child nodes
  for (let i = 0; i < element.childNodes.length; i++) {
    const node = element.childNodes[i];

    // Text node
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      if (text) {
        // Find translation
        const translated = getTranslation(text, lang);
        if (translated !== text) {
          node.textContent = node.textContent.replace(text, translated);
        }
      }
    }
    // Element node - recurse
    else if (node.nodeType === Node.ELEMENT_NODE) {
      translateTextNodes(node, lang);
    }
  }
}

/**
 * Translates specific attributes (like placeholder, title, alt)
 * @param {string} lang - Language code ('en' or 'ar')
 */
function translateAttributes(lang) {
  // Translate various attributes
  const attributesToTranslate = ["placeholder", "title", "alt"];

  attributesToTranslate.forEach((attr) => {
    document.querySelectorAll(`[${attr}]`).forEach((el) => {
      const text = el.getAttribute(attr);
      const translated = getTranslation(text, lang);
      if (translated !== text) {
        el.setAttribute(attr, translated);
      }
    });
  });
}

/**
 * Gets translation for a given text
 * @param {string} text - Original text
 * @param {string} lang - Target language
 * @returns {string} - Translated text or original if no translation found
 */
function getTranslation(text, lang) {
  // If there is a direct match in the translations
  if (translations[lang] && translations[lang][text] !== undefined) {
    return translations[lang][text];
  }

  // Try to find a partial match for longer texts
  if (text.length > 20) {
    for (const key in translations[lang]) {
      if (text.includes(key)) {
        return text.replace(key, translations[lang][key]);
      }
    }
  }

  // Return original text if no translation found
  return text;
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
