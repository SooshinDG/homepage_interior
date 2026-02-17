(() => {
  document.documentElement.classList.add("js-enabled");

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLabel = navToggle ? navToggle.querySelector(".sr-only") : null;

  const updateHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  const setMenuOpen = (isOpen) => {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    siteNav.classList.toggle("is-open", isOpen);
    if (navLabel) {
      navLabel.textContent = isOpen ? "메뉴 닫기" : "메뉴 열기";
    }
  };

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!expanded);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("click", (event) => {
      const isClickInsideHeader = header && header.contains(event.target);
      if (!isClickInsideHeader) {
        setMenuOpen(false);
      }
    });

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const closeMenuForDesktop = () => {
      if (mediaQuery.matches) {
        setMenuOpen(false);
      }
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", closeMenuForDesktop);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(closeMenuForDesktop);
    }
  }

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
})();
