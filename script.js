/**
 * ===================================================================
 * APPSPHERE — NEXT-GEN JAVASCRIPT LOGIC & INTERACTIVITY
 * ===================================================================
 * Features:
 * - 3D Perspective Card Tilt with Specular Glare Physics
 * - Ambient Floating Particle Canvas with Mouse Parallax
 * - Animated Number Counters with IntersectionObserver
 * - Dynamic Apps Catalog Rendering, Fuzzy Search & Category Tabs
 * - Screenshot Lightbox with Keyboard Arrow Navigation
 * - GitHub Repositories Explorer with Interactive Star Persistence
 * - Scroll Progress Bar & Floating Dock with Circular Progress Ring
 * - Dark / Light Theme Persistence with Smooth Transition
 * - Global Shortcuts (Ctrl+K to Search, Esc to Close)
 * ===================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // State variables
  let activeCategory = "All";
  let searchQuery = "";
  let currentModalApp = null;
  let currentScreenshotIdx = 0;
  let currentScreenshotsList = [];

  // DOM Elements
  const appsGrid = document.getElementById("apps-grid");
  const emptyState = document.getElementById("empty-state");
  const categoryTabs = document.getElementById("category-tabs");
  const searchInput = document.getElementById("app-search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  const resultsCountText = document.getElementById("results-count-text");
  const resetFiltersBtn = document.getElementById("reset-filters-btn");
  const statAppsCount = document.getElementById("stat-apps-count");
  const statCategoriesCount = document.getElementById("stat-categories-count");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const siteHeader = document.getElementById("site-header");
  const scrollProgressBar = document.getElementById("scroll-progress-bar");
  const backToTopBtn = document.getElementById("back-to-top-btn");
  const dockProgressCircle = document.getElementById("dock-progress-circle");

  // Modals DOM Elements
  const appDetailModal = document.getElementById("app-detail-modal");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalBottomCloseBtn = document.getElementById("modal-bottom-close-btn");

  const guideModal = document.getElementById("guide-modal");
  const guideBackdrop = document.getElementById("guide-backdrop");
  const guideCloseBtn = document.getElementById("guide-close-btn");
  const guideGotItBtn = document.getElementById("guide-got-it-btn");
  const installGuideBtn = document.getElementById("install-guide-btn");
  const bannerGuideTrigger = document.getElementById("banner-guide-trigger");
  const footerGuideLink = document.getElementById("footer-guide-link");

  // Lightbox DOM Elements
  const lightboxViewer = document.getElementById("lightbox-viewer");
  const lightboxBackdrop = document.getElementById("lightbox-backdrop");
  const lightboxCloseBtn = document.getElementById("lightbox-close-btn");
  const lightboxImg = document.getElementById("lightbox-img");

  // Toast Container
  const toastContainer = document.getElementById("toast-container");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const headerNav = document.getElementById("header-nav");

  // Sync Dynamic Stats Count & Config
  if (typeof APPS_DATA !== "undefined" && statAppsCount) {
    statAppsCount.dataset.target = APPS_DATA.length;
    statAppsCount.textContent = APPS_DATA.length;
  }
  if (typeof APPS_DATA !== "undefined" && statCategoriesCount) {
    const categoryCount = new Set(APPS_DATA.map((app) => app.category || "General")).size;
    statCategoriesCount.dataset.target = categoryCount;
    statCategoriesCount.textContent = categoryCount;
  }

  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Repositories Data
  const REPOSITORIES = [
    { name: "carbanFootPrint", description: "A carbon awareness challenge app for tracking emissions and eco daily actions.", language: "Dart", color: "teal", license: "MIT License", updated: "Updated last month", stars: 15 },
    { name: "smart_management_web", description: "Modern business operations management and visibility web dashboard.", language: "JavaScript", color: "yellow", license: "MIT License", updated: "Updated last month", stars: 12 },
    { name: "tanuj_portfolio", description: "Clean modern portfolio showcase website with smooth responsive UI.", language: "HTML", color: "orange", license: "MIT License", updated: "Updated recently", stars: 31 },
    { name: "skillbridgeai", description: "Application for students to bridge skill gaps and connect with industry opportunities.", language: "Dart", color: "teal", license: "MIT License", updated: "Updated on Jun 25", stars: 18 },
    { name: "login_signup_clone", description: "Polished responsive web authentication screen collection with clean UX structure.", language: "HTML", color: "orange", license: "MIT License", updated: "Updated Sep 11", stars: 9 }
  ];

  /* --------------------------------------------------------------------------
     1. Ambient Particle Canvas Animation
     -------------------------------------------------------------------------- */
  const initAmbientCanvas = () => {
    const canvas = document.getElementById("ambient-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particleCount = Math.min(width > 768 ? 45 : 20, 60);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: i % 3 === 0 ? "rgba(0, 240, 255, " : i % 3 === 1 ? "rgba(99, 102, 241, " : "rgba(236, 72, 153, ",
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle mouse attraction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0 && dist < 150) {
          p.x += (dx / dist) * 0.3;
          p.y += (dy / dist) * 0.3;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color + "0.6)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  };

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) initAmbientCanvas();

  /* --------------------------------------------------------------------------
     2. 3D Perspective Card Tilt Physics
     -------------------------------------------------------------------------- */
  const apply3DTilt = (element, maxTilt = 10) => {
    if (!element) return;

    let bounds = null;

    const onMouseEnter = () => {
      bounds = element.getBoundingClientRect();
      element.style.transition = "transform 0.1s ease-out, box-shadow 0.25s ease";
    };

    const onMouseMove = (e) => {
      if (!bounds) bounds = element.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const xPct = (mouseX / bounds.width - 0.5) * 2; // -1 to 1
      const yPct = (mouseY / bounds.height - 0.5) * 2; // -1 to 1

      const rotateX = -yPct * maxTilt;
      const rotateY = xPct * maxTilt;

      element.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`;
    };

    const onMouseLeave = () => {
      element.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
      bounds = null;
    };

    element.addEventListener("mouseenter", onMouseEnter);
    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("mouseleave", onMouseLeave);
  };

  const heroDevice = document.getElementById("hero-tilt-device");
  if (heroDevice) apply3DTilt(heroDevice, 14);

  document.querySelectorAll(".tilt-card").forEach((el) => apply3DTilt(el, 6));

  /* --------------------------------------------------------------------------
     3. Scroll Reveal & Animated Number Counter
     -------------------------------------------------------------------------- */
  const initScrollObservers = () => {
    // 1. Reveal elements on scroll
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // 2. Count-Up Animation for Stat Values
    const countUpElements = document.querySelectorAll(".count-up");
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10) || 0;
            animateCountUp(el, target);
            countObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );

    countUpElements.forEach((el) => countObserver.observe(el));
  };

  const animateCountUp = (el, target, duration = 1400) => {
    let start = 0;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * (target - start) + start);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  initScrollObservers();

  /* --------------------------------------------------------------------------
     4. Theme Switcher (Dark / Light Mode)
     -------------------------------------------------------------------------- */
  const initTheme = () => {
    const savedTheme = localStorage.getItem("appsphere_theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("appsphere_theme", newTheme);
    showToast(`Switched to ${newTheme} mode`, "info");
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }
  initTheme();

  /* --------------------------------------------------------------------------
     5. Category Filter Tabs Generation
     -------------------------------------------------------------------------- */
  const renderCategoryTabs = () => {
    if (!categoryTabs || typeof APPS_DATA === "undefined") return;

    const categoryCounts = { All: APPS_DATA.length };
    APPS_DATA.forEach((app) => {
      const cat = app.category || "General";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    const categories = Object.keys(categoryCounts);

    categoryTabs.innerHTML = categories
      .map((cat) => {
        const isActive = cat === activeCategory;
        return `
        <button class="tab-btn ${isActive ? "active" : ""}" data-category="${cat}" role="tab" aria-selected="${isActive}">
          <span>${cat}</span>
          <span class="tab-count">${categoryCounts[cat]}</span>
        </button>
      `;
      })
      .join("");

    categoryTabs.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeCategory = btn.getAttribute("data-category");
        categoryTabs.querySelectorAll(".tab-btn").forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        filterAndRenderApps();
      });
    });
  };

  /* --------------------------------------------------------------------------
     6. App Cards Rendering & 3D Tilt Hook
     -------------------------------------------------------------------------- */
  const getFilteredApps = () => {
    if (typeof APPS_DATA === "undefined") return [];

    return APPS_DATA.filter((app) => {
      const matchesCategory = activeCategory === "All" || app.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const nameMatch = app.name.toLowerCase().includes(q);
      const taglineMatch = (app.tagline || "").toLowerCase().includes(q);
      const categoryMatch = (app.category || "").toLowerCase().includes(q);
      const descMatch = (app.description || "").toLowerCase().includes(q);
      const featuresMatch = (app.features || []).some((f) => f.toLowerCase().includes(q));

      return nameMatch || taglineMatch || categoryMatch || descMatch || featuresMatch;
    });
  };

  const createCardElement = (app, index) => {
    const card = document.createElement("article");
    card.className = "app-card reveal-on-scroll revealed";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View details for ${app.name}`);
    card.dataset.appId = app.id;
    card.style.animationDelay = `${index * 0.08}s`;

    const featuredBadgeHtml = app.featured
      ? `<div class="card-featured-badge"><i class="fa-solid fa-star"></i> Featured</div>`
      : "";

    const hasApk = app.apkUrl && app.apkUrl !== "#" && app.apkUrl.trim() !== "";
    const downloadHtml = hasApk
      ? `
      <a 
        href="${app.apkUrl}" 
        class="btn-primary card-download-trigger" 
        download
        data-app-name="${app.name}"
        data-app-apk="${app.apkUrl}"
        title="Direct APK Download"
      >
        <i class="fa-solid fa-download"></i>
        <span>Download APK</span>
      </a>
    `
      : "";

    const websiteHtml = app.websiteUrl
      ? `
      <a 
        href="${app.websiteUrl}" 
        class="btn-secondary card-website-trigger" 
        target="_blank" 
        rel="noopener noreferrer"
        title="Open Project Website"
      >
        <i class="fa-solid fa-globe"></i>
        <span>Website</span>
      </a>
    `
      : "";

    const githubHtml = (!hasApk && !app.websiteUrl && app.githubUrl)
      ? `
      <a 
        href="${app.githubUrl}" 
        class="btn-secondary card-github-trigger" 
        target="_blank" 
        rel="noopener noreferrer"
        title="View Source Code on GitHub"
      >
        <i class="fa-brands fa-github"></i>
        <span>Source</span>
      </a>
    `
      : "";

    card.innerHTML = `
      ${featuredBadgeHtml}
      <div>
        <div class="card-header-row">
          <img 
            src="${app.icon || 'assets/icons/ai-study-assist.svg'}" 
            alt="${app.name} icon" 
            class="card-app-icon" 
            loading="lazy"
            onerror="this.onerror=null;this.src='assets/icons/ai-study-assist.svg'"
          >
          <div class="card-title-group">
            <span class="card-category">${app.category}</span>
            <h3 class="card-app-name">${app.name}</h3>
          </div>
        </div>

        <p class="card-tagline">${app.tagline || ''}</p>

        <div class="card-specs">
          <span class="spec-chip"><i class="fa-solid fa-tag"></i> ${app.version || 'v1.0.0'}</span>
          <span class="spec-chip"><i class="fa-solid fa-hard-drive"></i> ${app.size || 'Mobile'}</span>
          <span class="spec-chip"><i class="fa-brands fa-android"></i> ${app.minAndroid || 'Android 8.0+'}</span>
        </div>
      </div>

      <div class="card-actions">
        ${downloadHtml}
        ${websiteHtml}
        ${githubHtml}
        <button 
          type="button"
          class="btn-secondary btn-icon-only card-view-details" 
          title="View Screenshots & Changelog"
          aria-label="View Details"
        >
          <i class="fa-solid fa-circle-info"></i>
        </button>
      </div>
    `;

    // Attach 3D Perspective Tilt on Card
    apply3DTilt(card, 8);

    // Click handler for modal / download
    card.addEventListener("click", (e) => {
      if (e.target.closest(".card-download-trigger")) {
        handleDownloadClick(app.name, app.apkUrl);
        return;
      }
      if (e.target.closest(".card-website-trigger") || e.target.closest(".card-github-trigger")) {
        return;
      }
      openAppModal(app);
    });

    card.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && e.target === card) {
        e.preventDefault();
        openAppModal(app);
      }
    });

    return card;
  };

  const filterAndRenderApps = () => {
    if (!appsGrid) return;

    const filtered = getFilteredApps();

    if (resultsCountText) {
      if (searchQuery.trim()) {
        resultsCountText.textContent = `Found ${filtered.length} ${filtered.length === 1 ? "app" : "apps"} matching "${searchQuery}"`;
      } else if (activeCategory !== "All") {
        resultsCountText.textContent = `Showing ${filtered.length} in ${activeCategory}`;
      } else {
        resultsCountText.textContent = `Showing all ${filtered.length} apps`;
      }
    }

    appsGrid.innerHTML = "";

    if (filtered.length === 0) {
      appsGrid.classList.add("hidden");
      if (emptyState) emptyState.classList.remove("hidden");
    } else {
      if (emptyState) emptyState.classList.add("hidden");
      appsGrid.classList.remove("hidden");

      filtered.forEach((app, idx) => {
        const cardEl = createCardElement(app, idx);
        appsGrid.appendChild(cardEl);
      });
    }
  };

  /* --------------------------------------------------------------------------
     7. Search Input & Global Keyboard Shortcuts
     -------------------------------------------------------------------------- */
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle("hidden", searchQuery.length === 0);
      }
      filterAndRenderApps();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        searchQuery = "";
        clearSearchBtn.classList.add("hidden");
        filterAndRenderApps();
        searchInput.focus();
      }
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      searchQuery = "";
      activeCategory = "All";
      if (clearSearchBtn) clearSearchBtn.classList.add("hidden");
      renderCategoryTabs();
      filterAndRenderApps();
    });
  }

  // Global Keyboard Shortcuts
  window.addEventListener("keydown", (e) => {
    // Ctrl+K or Cmd+K to search
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
        showToast("Search focused", "info");
      }
    }

    // Escape to close modals
    if (e.key === "Escape") {
      if (lightboxViewer && !lightboxViewer.classList.contains("hidden")) {
        closeLightbox();
      } else if (guideModal && !guideModal.classList.contains("hidden")) {
        closeGuideModal();
      } else if (appDetailModal && !appDetailModal.classList.contains("hidden")) {
        closeAppModal();
      }
    }

    // Arrow keys for screenshot navigation in Lightbox
    if (lightboxViewer && !lightboxViewer.classList.contains("hidden")) {
      if (e.key === "ArrowRight" && currentScreenshotsList.length > 0) {
        currentScreenshotIdx = (currentScreenshotIdx + 1) % currentScreenshotsList.length;
        lightboxImg.src = currentScreenshotsList[currentScreenshotIdx];
      } else if (e.key === "ArrowLeft" && currentScreenshotsList.length > 0) {
        currentScreenshotIdx = (currentScreenshotIdx - 1 + currentScreenshotsList.length) % currentScreenshotsList.length;
        lightboxImg.src = currentScreenshotsList[currentScreenshotIdx];
      }
    }
  });

  /* --------------------------------------------------------------------------
     8. App Detail Modal Logic
     -------------------------------------------------------------------------- */
  const openAppModal = (app) => {
    if (!appDetailModal) return;
    currentModalApp = app;
    currentScreenshotsList = app.screenshots || [];
    currentScreenshotIdx = 0;

    document.getElementById("modal-app-name").textContent = app.name;
    document.getElementById("modal-app-tagline").textContent = app.tagline || "";
    document.getElementById("modal-app-category").textContent = app.category || "General";
    document.getElementById("modal-app-version").textContent = app.version || "v1.0.0";
    document.getElementById("modal-app-description").textContent = app.description || app.tagline || "";

    const modalIcon = document.getElementById("modal-app-icon");
    if (modalIcon) {
      modalIcon.src = app.icon || "assets/icons/ai-study-assist.svg";
      modalIcon.alt = `${app.name} icon`;
    }

    const modalDownloadBtn = document.getElementById("modal-download-btn");
    const modalFooterDownloadBtn = document.getElementById("modal-footer-download-btn");
    const modalDownloadSize = document.getElementById("modal-download-size");
    const modalWebsiteBtn = document.getElementById("modal-website-btn");
    const modalFooterWebsiteBtn = document.getElementById("modal-footer-website-btn");
    const modalGithubBtn = document.getElementById("modal-github-btn");

    const hasApk = app.apkUrl && app.apkUrl !== "#" && app.apkUrl.trim() !== "";

    if (modalDownloadBtn) {
      if (hasApk) {
        modalDownloadBtn.href = app.apkUrl;
        modalDownloadBtn.classList.remove("hidden");
        modalDownloadBtn.onclick = () => handleDownloadClick(app.name, app.apkUrl);
      } else {
        modalDownloadBtn.classList.add("hidden");
      }
    }

    if (modalFooterDownloadBtn) {
      if (hasApk) {
        modalFooterDownloadBtn.href = app.apkUrl;
        modalFooterDownloadBtn.classList.remove("hidden");
        modalFooterDownloadBtn.onclick = () => handleDownloadClick(app.name, app.apkUrl);
      } else {
        modalFooterDownloadBtn.classList.add("hidden");
      }
    }

    if (modalDownloadSize) {
      modalDownloadSize.textContent = app.size || "";
      modalDownloadSize.classList.toggle("hidden", !hasApk);
    }

    if (modalWebsiteBtn) {
      if (app.websiteUrl) {
        modalWebsiteBtn.href = app.websiteUrl;
        modalWebsiteBtn.classList.remove("hidden");
      } else {
        modalWebsiteBtn.classList.add("hidden");
      }
    }

    if (modalFooterWebsiteBtn) {
      if (app.websiteUrl) {
        modalFooterWebsiteBtn.href = app.websiteUrl;
        modalFooterWebsiteBtn.classList.remove("hidden");
      } else {
        modalFooterWebsiteBtn.classList.add("hidden");
      }
    }

    if (modalGithubBtn) {
      if (app.githubUrl) {
        modalGithubBtn.href = app.githubUrl;
        modalGithubBtn.classList.remove("hidden");
      } else {
        modalGithubBtn.classList.add("hidden");
      }
    }

    document.getElementById("modal-meta-date").textContent = app.updatedDate || "Recent";
    document.getElementById("modal-meta-size").textContent = app.size || "Standard";
    document.getElementById("modal-meta-android").textContent = app.minAndroid || "Android 8.0+";

    // Screenshots Gallery
    const screenshotsTrack = document.getElementById("modal-screenshots-track");
    const screenshotsSection = document.getElementById("screenshots-section");
    if (screenshotsTrack) {
      screenshotsTrack.innerHTML = "";
      if (app.screenshots && app.screenshots.length > 0) {
        if (screenshotsSection) screenshotsSection.classList.remove("hidden");
        app.screenshots.forEach((imgUrl, idx) => {
          const item = document.createElement("div");
          item.className = "screenshot-item";
          item.title = "Click to enlarge";
          item.innerHTML = `
            <img 
              src="${imgUrl}" 
              alt="${app.name} screenshot ${idx + 1}" 
              loading="lazy"
              onerror="this.onerror=null;this.src='assets/screenshots/splash.png'"
            >
            <div class="screenshot-hover-overlay">
              <i class="fa-solid fa-magnifying-glass-plus"></i>
            </div>
          `;
          item.addEventListener("click", () => {
            currentScreenshotIdx = idx;
            openLightbox(imgUrl);
          });
          screenshotsTrack.appendChild(item);
        });
      } else {
        if (screenshotsSection) screenshotsSection.classList.add("hidden");
      }
    }

    // Features List
    const featuresList = document.getElementById("modal-features-list");
    if (featuresList) {
      featuresList.innerHTML = "";
      if (app.features && app.features.length > 0) {
        app.features.forEach((feat) => {
          const li = document.createElement("li");
          li.textContent = feat;
          featuresList.appendChild(li);
        });
      }
    }

    // Changelog List
    const changelogList = document.getElementById("modal-changelog-list");
    const changelogSection = document.getElementById("changelog-section");
    if (changelogList) {
      changelogList.innerHTML = "";
      if (app.changelog && app.changelog.length > 0) {
        if (changelogSection) changelogSection.classList.remove("hidden");
        app.changelog.forEach((ch) => {
          const li = document.createElement("li");
          li.textContent = ch;
          changelogList.appendChild(li);
        });
      } else {
        if (changelogSection) changelogSection.classList.add("hidden");
      }
    }

    appDetailModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };

  const closeAppModal = () => {
    if (!appDetailModal) return;
    appDetailModal.classList.add("hidden");
    currentModalApp = null;
    document.body.style.overflow = "";
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeAppModal);
  if (modalBottomCloseBtn) modalBottomCloseBtn.addEventListener("click", closeAppModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeAppModal);

  /* --------------------------------------------------------------------------
     9. APK Sideloading Guide Modal Logic
     -------------------------------------------------------------------------- */
  const openGuideModal = () => {
    if (!guideModal) return;
    guideModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };

  const closeGuideModal = () => {
    if (!guideModal) return;
    guideModal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  if (installGuideBtn) installGuideBtn.addEventListener("click", openGuideModal);
  if (bannerGuideTrigger) bannerGuideTrigger.addEventListener("click", openGuideModal);
  if (footerGuideLink) footerGuideLink.addEventListener("click", openGuideModal);
  if (guideCloseBtn) guideCloseBtn.addEventListener("click", closeGuideModal);
  if (guideGotItBtn) guideGotItBtn.addEventListener("click", closeGuideModal);
  if (guideBackdrop) guideBackdrop.addEventListener("click", closeGuideModal);

  /* --------------------------------------------------------------------------
     10. Lightbox Image Viewer Logic
     -------------------------------------------------------------------------- */
  const openLightbox = (imgSrc) => {
    if (!lightboxViewer || !lightboxImg) return;
    lightboxImg.src = imgSrc;
    lightboxViewer.classList.remove("hidden");
  };

  const closeLightbox = () => {
    if (!lightboxViewer) return;
    lightboxViewer.classList.add("hidden");
  };

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);

  /* --------------------------------------------------------------------------
     11. Toast Notifications & APK Download Simulation
     -------------------------------------------------------------------------- */
  const showToast = (message, type = "success") => {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    const iconClass =
      type === "success"
        ? "fa-solid fa-circle-check"
        : type === "info"
        ? "fa-solid fa-circle-info"
        : "fa-solid fa-bell";

    toast.innerHTML = `
      <i class="${iconClass}"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "toastSlideOut 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards";
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    }, 3800);
  };

  const initCookieConsent = () => {
    const banner = document.getElementById("cookie-banner");
    const acceptButton = document.getElementById("cookie-accept-btn");
    const rejectButton = document.getElementById("cookie-reject-btn");
    const settingsButton = document.getElementById("cookie-settings-trigger");
    if (!banner || !acceptButton || !rejectButton) return;

    const consentKey = "appsphere_cookie_consent";
    const readConsent = () => {
      try {
        const consent = JSON.parse(localStorage.getItem(consentKey) || "null");
        return consent && typeof consent.analytics === "boolean" ? consent : null;
      } catch (error) {
        console.error("Unable to read privacy preferences.", error);
        return null;
      }
    };
    const savedConsent = readConsent();
    const openPreferences = new URLSearchParams(window.location.search).get("cookies") === "1";
    banner.classList.toggle("hidden", savedConsent !== null && !openPreferences);

    window.AppSphereConsent = {
      hasAnalyticsConsent: () => readConsent()?.analytics === true
    };

    const saveConsent = (analytics) => {
      try {
        localStorage.setItem(consentKey, JSON.stringify({ analytics, savedAt: new Date().toISOString() }));
      } catch (error) {
        console.error("Unable to save privacy preferences.", error);
        showToast("Your privacy choice could not be saved in this browser.", "error");
        return;
      }
      banner.classList.add("hidden");
    };

    acceptButton.addEventListener("click", () => saveConsent(true));
    rejectButton.addEventListener("click", () => saveConsent(false));
    if (settingsButton) {
      settingsButton.addEventListener("click", () => {
        banner.classList.remove("hidden");
        acceptButton.focus();
      });
    }
    if (openPreferences) acceptButton.focus();
  };

  const handleDownloadClick = (appName, apkUrl) => {
    showToast(`Starting APK release download for "${appName}"...`, "success");
  };

  /* --------------------------------------------------------------------------
     12. Open Source Repositories Directory & Star State
     -------------------------------------------------------------------------- */
  const getStarredRepos = () => {
    try {
      return JSON.parse(localStorage.getItem("appsphere_starred_repos") || "[]");
    } catch {
      return [];
    }
  };

  const toggleStarRepo = (repoName) => {
    const starred = getStarredRepos();
    const idx = starred.indexOf(repoName);
    if (idx > -1) {
      starred.splice(idx, 1);
      showToast(`Removed star from ${repoName}`, "info");
    } else {
      starred.push(repoName);
      showToast(`Starred ${repoName}!`, "success");
    }
    localStorage.setItem("appsphere_starred_repos", JSON.stringify(starred));
    renderRepositories(document.getElementById("repository-search-input")?.value || "");
  };

  const renderRepositories = (query = "") => {
    const repositoryList = document.getElementById("repository-list");
    const repositoryEmpty = document.getElementById("repository-empty");
    const repositoryCount = document.getElementById("repository-count");
    if (!repositoryList) return;

    const starredRepos = getStarredRepos();
    const normalizedQuery = query.trim().toLowerCase();
    const filteredRepositories = REPOSITORIES.filter((repository) => {
      const searchableText = `${repository.name} ${repository.description || ""} ${repository.language || ""}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });

    repositoryList.innerHTML = filteredRepositories
      .map((repo) => {
        const isStarred = starredRepos.includes(repo.name);
        const currentStars = (repo.stars || 0) + (isStarred ? 1 : 0);

        return `
        <article class="repository-item">
          <div class="repository-main">
            <div class="repository-title-row">
              <a class="repository-name" href="https://github.com/Tanujdarokar/${repo.name}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
              <span class="repository-visibility">Public</span>
            </div>
            ${repo.description ? `<p class="repository-description">${repo.description}</p>` : ""}
            <div class="repository-meta">
              ${repo.language ? `<span><i class="language-dot ${repo.color}"></i> ${repo.language}</span>` : ""}
              ${repo.license ? `<span><i class="fa-solid fa-scale-balanced"></i> ${repo.license}</span>` : ""}
              <span><i class="fa-regular fa-clock"></i> ${repo.updated}</span>
            </div>
          </div>
          <button class="repository-star ${isStarred ? "starred" : ""}" type="button" data-repo="${repo.name}" aria-label="Star ${repo.name}">
            <i class="${isStarred ? "fa-solid" : "fa-regular"} fa-star"></i>
            <span>${currentStars}</span>
          </button>
        </article>
      `;
      })
      .join("");

    repositoryList.querySelectorAll(".repository-star").forEach((btn) => {
      btn.addEventListener("click", () => toggleStarRepo(btn.dataset.repo));
    });

    repositoryList.classList.toggle("hidden", filteredRepositories.length === 0);
    if (repositoryEmpty) repositoryEmpty.classList.toggle("hidden", filteredRepositories.length !== 0);
    if (repositoryCount) {
      repositoryCount.textContent = `${filteredRepositories.length} ${filteredRepositories.length === 1 ? "repository" : "repositories"}`;
    }
  };

  const repositorySearchInput = document.getElementById("repository-search-input");
  if (repositorySearchInput) {
    repositorySearchInput.addEventListener("input", (e) => renderRepositories(e.target.value));
  }

  /* --------------------------------------------------------------------------
     13. Auth Switcher (Login / Register Stage)
     -------------------------------------------------------------------------- */
  const authSwitch = document.getElementById("auth-switch");
  const authSwitchSlider = document.getElementById("auth-switch-slider");
  const authSwitchButtons = Array.from(document.querySelectorAll(".auth-switch-btn"));
  const authForms = {
    login: document.getElementById("login-form"),
    register: document.getElementById("register-form")
  };

  if (authSwitch && authSwitchSlider && authSwitchButtons.length) {
    const setAuthMode = (mode) => {
      const isRegister = mode === "register";
      authSwitchButtons.forEach((btn) => {
        const isActive = btn.dataset.authMode === mode;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      if (isRegister) {
        authSwitchSlider.style.transform = "translateX(100%)";
        if (authForms.login) authForms.login.classList.remove("active");
        if (authForms.register) authForms.register.classList.add("active");
      } else {
        authSwitchSlider.style.transform = "translateX(0%)";
        if (authForms.register) authForms.register.classList.remove("active");
        if (authForms.login) authForms.login.classList.add("active");
      }
    };

    authSwitchButtons.forEach((btn) => {
      btn.addEventListener("click", () => setAuthMode(btn.dataset.authMode));
    });

    if (authForms.login) {
      authForms.login.addEventListener("submit", (e) => {
        e.preventDefault();
        if (authForms.login.querySelector('[name="website"]').value) {
          showToast("Submission blocked.", "error");
          return;
        }
        showToast("This is a UI demo only; no account was created and no data was sent.", "info");
      });
    }

    if (authForms.register) {
      authForms.register.addEventListener("submit", (e) => {
        e.preventDefault();
        if (authForms.register.querySelector('[name="website"]').value) {
          showToast("Submission blocked.", "error");
          return;
        }
        showToast("This is a UI demo only; no account was created and no data was sent.", "info");
      });
    }
  }

  if (mobileMenuToggle && headerNav) {
    const closeMobileMenu = () => {
      headerNav.classList.remove("is-open");
      mobileMenuToggle.setAttribute("aria-expanded", "false");
      mobileMenuToggle.setAttribute("aria-label", "Open main navigation");
      mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    };

    mobileMenuToggle.addEventListener("click", () => {
      const isOpen = mobileMenuToggle.getAttribute("aria-expanded") !== "true";
      headerNav.classList.toggle("is-open", isOpen);
      mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
      mobileMenuToggle.setAttribute("aria-label", isOpen ? "Close main navigation" : "Open main navigation");
      mobileMenuToggle.innerHTML = `<i class="fa-solid fa-${isOpen ? "xmark" : "bars"}" aria-hidden="true"></i>`;
    });

    headerNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMobileMenu));
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMobileMenu();
    });
  }

  /* --------------------------------------------------------------------------
     14. Scroll Progress & Floating Dock
     -------------------------------------------------------------------------- */
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = maxScroll > 0 ? (scrollPos / maxScroll) * 100 : 0;

    // Header scroll background
    if (siteHeader) {
      siteHeader.classList.toggle("scrolled", scrollPos > 30);
    }

    // Scroll progress bar at top
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Back to top floating button
    if (backToTopBtn) {
      backToTopBtn.classList.toggle("visible", scrollPos > 300);

      if (dockProgressCircle) {
        const circumference = 2 * Math.PI * 18; // ~113.1
        const offset = circumference - (scrollPercent / 100) * circumference;
        dockProgressCircle.style.strokeDashoffset = offset;
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Initial renders
  initCookieConsent();
  renderRepositories();
  renderCategoryTabs();
  filterAndRenderApps();
});
