/**
 * ===================================================================
 * FLUTTER HUB — CORE JAVASCRIPT LOGIC
 * ===================================================================
 * Handles dynamic rendering, search & category filtering, modal dialogs,
 * screenshot gallery lightbox, theme toggling, and user interactions.
 * ===================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // State variables
  let activeCategory = "All";
  let searchQuery = "";
  let currentModalApp = null;

  // DOM Elements
  const appsGrid = document.getElementById("apps-grid");
  const emptyState = document.getElementById("empty-state");
  const categoryTabs = document.getElementById("category-tabs");
  const searchInput = document.getElementById("app-search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  const resultsCountText = document.getElementById("results-count-text");
  const resetFiltersBtn = document.getElementById("reset-filters-btn");
  const statAppsCount = document.getElementById("stat-apps-count");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const siteHeader = document.getElementById("site-header");
  const backToTopBtn = document.getElementById("back-to-top-btn");

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

  const REPOSITORIES = [
    { name: "smart_management_web", language: "JavaScript", color: "yellow", updated: "Updated last week" },
    { name: "tanuj_portfolio", description: "This is my portfolio", language: "HTML", color: "orange", updated: "Updated last week" },
    { name: "mini_erp_crm", language: "TypeScript", color: "blue", updated: "Updated last month" },
    { name: "Todo-list-react", language: "JavaScript", color: "yellow", updated: "Updated on Aug 7" },
    { name: "Tanujdarokar", updated: "Updated on Jul 9" },
    { name: "skillbridgeai", description: "This application is build for Student to overcome the skill build industry and student to get the job", language: "Dart", color: "teal", license: "MIT License", updated: "Updated on Jun 25" },
    { name: "carbanFootPrint", description: "This is a Carbon Foot print Awareness Challenge", language: "Dart", color: "teal", updated: "Updated on Jun 21" }
  ];

  /* --------------------------------------------------------------------------
     1. Theme Switcher (Dark / Light Mode)
     -------------------------------------------------------------------------- */
  const initTheme = () => {
    const savedTheme = localStorage.getItem("flutterhub_theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      // Default to dark mode or system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("flutterhub_theme", newTheme);
    showToast(`Switched to ${newTheme} theme`, "info");
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }
  initTheme();

  /* --------------------------------------------------------------------------
     2. Initialize Author & Site Config
     -------------------------------------------------------------------------- */
  const initSiteConfig = () => {
    if (typeof SITE_CONFIG !== "undefined") {
      const authorNameEl = document.getElementById("footer-author-name");
      const authorBioEl = document.getElementById("footer-author-bio");
      const ghHeaderEl = document.getElementById("github-header-link");
      const ghFooterEl = document.getElementById("footer-gh-link");
      const liFooterEl = document.getElementById("footer-li-link");
      const twFooterEl = document.getElementById("footer-tw-link");
      const mailFooterEl = document.getElementById("footer-mail-link");

      if (authorNameEl && SITE_CONFIG.authorName) authorNameEl.textContent = SITE_CONFIG.authorName;
      if (authorBioEl && SITE_CONFIG.authorBio) authorBioEl.textContent = SITE_CONFIG.authorBio;
      if (ghHeaderEl && SITE_CONFIG.githubUrl) ghHeaderEl.href = SITE_CONFIG.githubUrl;
      if (ghFooterEl && SITE_CONFIG.githubUrl) ghFooterEl.href = SITE_CONFIG.githubUrl;
      if (liFooterEl && SITE_CONFIG.linkedinUrl) liFooterEl.href = SITE_CONFIG.linkedinUrl;
      if (twFooterEl && SITE_CONFIG.twitterUrl) twFooterEl.href = SITE_CONFIG.twitterUrl;
      if (mailFooterEl && SITE_CONFIG.email) mailFooterEl.href = `mailto:${SITE_CONFIG.email}`;
    }

    // Set stats count
    if (statAppsCount && typeof APPS_DATA !== "undefined") {
      statAppsCount.textContent = APPS_DATA.length;
    }
  };
  initSiteConfig();

  /* --------------------------------------------------------------------------
     3. Category Filter Tabs Generation
     -------------------------------------------------------------------------- */
  const renderCategoryTabs = () => {
    if (!categoryTabs || typeof APPS_DATA === "undefined") return;

    // Collect distinct categories with counts
    const categoryCounts = { All: APPS_DATA.length };
    APPS_DATA.forEach(app => {
      const cat = app.category || "General";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    const categories = Object.keys(categoryCounts);

    categoryTabs.innerHTML = categories.map(cat => {
      const isActive = cat === activeCategory;
      return `
        <button class="tab-btn ${isActive ? 'active' : ''}" data-category="${cat}" role="tab" aria-selected="${isActive}">
          <span>${cat}</span>
          <span class="tab-count">${categoryCounts[cat]}</span>
        </button>
      `;
    }).join("");

    // Add click listeners to tabs
    categoryTabs.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        activeCategory = btn.getAttribute("data-category");
        categoryTabs.querySelectorAll(".tab-btn").forEach(b => {
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
     4. App Cards Rendering & Filtering Logic
     -------------------------------------------------------------------------- */
  const getFilteredApps = () => {
    if (typeof APPS_DATA === "undefined") return [];

    return APPS_DATA.filter(app => {
      const matchesCategory = (activeCategory === "All") || (app.category === activeCategory);
      
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const nameMatch = app.name.toLowerCase().includes(q);
      const taglineMatch = app.tagline.toLowerCase().includes(q);
      const categoryMatch = app.category.toLowerCase().includes(q);
      const descMatch = (app.description || "").toLowerCase().includes(q);
      const featuresMatch = (app.features || []).some(f => f.toLowerCase().includes(q));

      return nameMatch || taglineMatch || categoryMatch || descMatch || featuresMatch;
    });
  };

  const createCardElement = (app) => {
    const card = document.createElement("article");
    card.className = "app-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View details for ${app.name}`);
    card.dataset.appId = app.id;

    const featuredBadgeHtml = app.featured 
      ? `<div class="card-featured-badge"><i class="fa-solid fa-star"></i> Featured</div>` 
      : "";

    card.innerHTML = `
      ${featuredBadgeHtml}
      <div>
        <div class="card-header-row">
          <img 
            src="${app.icon}" 
            alt="${app.name} icon" 
            class="card-app-icon" 
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80'"
          >
          <div class="card-title-group">
            <span class="card-category">${app.category}</span>
            <h3 class="card-app-name">${app.name}</h3>
          </div>
        </div>

        <p class="card-tagline">${app.tagline}</p>

        <div class="card-specs">
          <span class="spec-chip"><i class="fa-solid fa-tag"></i> ${app.version}</span>
          <span class="spec-chip"><i class="fa-solid fa-hard-drive"></i> ${app.size}</span>
          <span class="spec-chip"><i class="fa-brands fa-android"></i> ${app.minAndroid}</span>
        </div>
      </div>

      <div class="card-actions">
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
        <button 
          class="btn-secondary btn-icon-only card-view-details" 
          title="View Screenshots & Changelog"
          aria-label="View Details"
        >
          <i class="fa-solid fa-circle-info"></i>
        </button>
      </div>
    `;

    // Click whole card or Details button to open detail modal
    card.addEventListener("click", (e) => {
      // If user clicked the download link directly, trigger download toast and don't open modal
      if (e.target.closest(".card-download-trigger")) {
        const dlBtn = e.target.closest(".card-download-trigger");
        handleDownloadClick(app.name, app.apkUrl);
        return;
      }
      openAppModal(app);
    });

    // Support keyboard Enter/Space to open modal
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openAppModal(app);
      }
    });

    return card;
  };

  const filterAndRenderApps = () => {
    if (!appsGrid) return;

    const filtered = getFilteredApps();

    // Update results meta text
    if (resultsCountText) {
      if (searchQuery.trim()) {
        resultsCountText.textContent = `Found ${filtered.length} ${filtered.length === 1 ? 'app' : 'apps'} matching "${searchQuery}"`;
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

      filtered.forEach(app => {
        const cardEl = createCardElement(app);
        appsGrid.appendChild(cardEl);
      });
    }
  };

  /* --------------------------------------------------------------------------
     5. Search Input Handling
     -------------------------------------------------------------------------- */
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        if (searchQuery.length > 0) {
          clearSearchBtn.classList.remove("hidden");
        } else {
          clearSearchBtn.classList.add("hidden");
        }
      }
      filterAndRenderApps();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      searchQuery = "";
      clearSearchBtn.classList.add("hidden");
      filterAndRenderApps();
      if (searchInput) searchInput.focus();
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

  /* --------------------------------------------------------------------------
     6. App Detail Modal Logic
     -------------------------------------------------------------------------- */
  const openAppModal = (app) => {
    if (!appDetailModal) return;
    currentModalApp = app;

    // Populate modal contents
    document.getElementById("modal-app-name").textContent = app.name;
    document.getElementById("modal-app-tagline").textContent = app.tagline;
    document.getElementById("modal-app-category").textContent = app.category;
    document.getElementById("modal-app-version").textContent = app.version;
    document.getElementById("modal-app-description").textContent = app.description || app.tagline;

    const modalIcon = document.getElementById("modal-app-icon");
    if (modalIcon) {
      modalIcon.src = app.icon;
      modalIcon.alt = `${app.name} icon`;
    }

    // Download buttons
    const modalDownloadBtn = document.getElementById("modal-download-btn");
    const modalFooterDownloadBtn = document.getElementById("modal-footer-download-btn");
    const modalDownloadSize = document.getElementById("modal-download-size");

    if (modalDownloadBtn) {
      modalDownloadBtn.href = app.apkUrl;
      modalDownloadBtn.onclick = () => handleDownloadClick(app.name, app.apkUrl);
    }
    if (modalFooterDownloadBtn) {
      modalFooterDownloadBtn.href = app.apkUrl;
      modalFooterDownloadBtn.onclick = () => handleDownloadClick(app.name, app.apkUrl);
    }
    if (modalDownloadSize) {
      modalDownloadSize.textContent = app.size || "";
    }

    // GitHub repository link
    const modalGithubBtn = document.getElementById("modal-github-btn");
    if (modalGithubBtn) {
      if (app.githubUrl) {
        modalGithubBtn.href = app.githubUrl;
        modalGithubBtn.classList.remove("hidden");
      } else {
        modalGithubBtn.classList.add("hidden");
      }
    }

    // Metadata specs
    document.getElementById("modal-meta-date").textContent = app.updatedDate || "Recent";
    document.getElementById("modal-meta-size").textContent = app.size || "Unknown";
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
              onerror="this.src='https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80'"
            >
            <div class="screenshot-hover-overlay">
              <i class="fa-solid fa-magnifying-glass-plus"></i>
            </div>
          `;
          item.addEventListener("click", () => openLightbox(imgUrl));
          screenshotsTrack.appendChild(item);
        });
      } else {
        if (screenshotsSection) screenshotsSection.classList.add("hidden");
      }
    }

    // Key Features list
    const featuresList = document.getElementById("modal-features-list");
    if (featuresList) {
      featuresList.innerHTML = "";
      if (app.features && app.features.length > 0) {
        app.features.forEach(feat => {
          const li = document.createElement("li");
          li.textContent = feat;
          featuresList.appendChild(li);
        });
      }
    }

    // Changelog list
    const changelogList = document.getElementById("modal-changelog-list");
    const changelogSection = document.getElementById("changelog-section");
    if (changelogList) {
      changelogList.innerHTML = "";
      if (app.changelog && app.changelog.length > 0) {
        if (changelogSection) changelogSection.classList.remove("hidden");
        app.changelog.forEach(ch => {
          const li = document.createElement("li");
          li.textContent = ch;
          changelogList.appendChild(li);
        });
      } else {
        if (changelogSection) changelogSection.classList.add("hidden");
      }
    }

    // Show modal & prevent background scroll
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
     7. APK Sideloading Guide Modal Logic
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
     8. Lightbox Image Viewer Logic
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
     9. Global Escape Key Listener
     -------------------------------------------------------------------------- */
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightboxViewer && !lightboxViewer.classList.contains("hidden")) {
        closeLightbox();
      } else if (guideModal && !guideModal.classList.contains("hidden")) {
        closeGuideModal();
      } else if (appDetailModal && !appDetailModal.classList.contains("hidden")) {
        closeAppModal();
      }
    }
  });

  /* --------------------------------------------------------------------------
     10. Toast Notification Helper
     -------------------------------------------------------------------------- */
  const showToast = (message, type = "success") => {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    const iconClass = type === "success" 
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
      toast.style.animation = "toastSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards";
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3500);
  };

  const handleDownloadClick = (appName, apkUrl) => {
    showToast(`Starting APK download for ${appName}...`, "success");
  };

  /* --------------------------------------------------------------------------
     11. Repository Directory
     -------------------------------------------------------------------------- */
  const renderRepositories = (query = "") => {
    const repositoryList = document.getElementById("repository-list");
    const repositoryEmpty = document.getElementById("repository-empty");
    const repositoryCount = document.getElementById("repository-count");
    if (!repositoryList) return;

    const normalizedQuery = query.trim().toLowerCase();
    const filteredRepositories = REPOSITORIES.filter(repository => {
      const searchableText = `${repository.name} ${repository.description || ""} ${repository.language || ""}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });

    repositoryList.innerHTML = filteredRepositories.map(repository => `
      <article class="repository-item">
        <div class="repository-main">
          <div class="repository-title-row">
            <a class="repository-name" href="https://github.com" target="_blank" rel="noopener noreferrer">${repository.name}</a>
            <span class="repository-visibility">Public</span>
          </div>
          ${repository.description ? `<p class="repository-description">${repository.description}</p>` : ""}
          <div class="repository-meta">
            ${repository.language ? `<span><i class="language-dot ${repository.color}"></i>${repository.language}</span>` : ""}
            ${repository.license ? `<span><i class="fa-solid fa-scale-balanced"></i>${repository.license}</span>` : ""}
            <span>${repository.updated}</span>
          </div>
        </div>
        <button class="repository-star" type="button" aria-label="Star ${repository.name}">
          <i class="fa-regular fa-star"></i>
          <span>Star</span>
        </button>
      </article>
    `).join("");

    repositoryList.classList.toggle("hidden", filteredRepositories.length === 0);
    repositoryEmpty.classList.toggle("hidden", filteredRepositories.length !== 0);
    repositoryCount.textContent = `${filteredRepositories.length} ${filteredRepositories.length === 1 ? "repository" : "repositories"}`;
  };

  const repositorySearchInput = document.getElementById("repository-search-input");
  if (repositorySearchInput) {
    repositorySearchInput.addEventListener("input", event => renderRepositories(event.target.value));
  }

    /* --------------------------------------------------------------------------
      12. Header Scroll Shadow & Back-to-Top Button
     -------------------------------------------------------------------------- */
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    if (siteHeader) {
      if (scrollPos > 30) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Initial render
  renderRepositories();
  renderCategoryTabs();
  filterAndRenderApps();
});
