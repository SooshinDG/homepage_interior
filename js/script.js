(() => {
  const mobileBreakpoint = 768;
  const toggleButton = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  const navLinks = nav ? nav.querySelectorAll("a") : [];

  const closeNav = () => {
    if (!toggleButton || !nav) {
      return;
    }
    toggleButton.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
    document.body.classList.remove("nav-open");
  };

  if (toggleButton && nav) {
    toggleButton.addEventListener("click", () => {
      const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
      toggleButton.setAttribute("aria-expanded", String(!isExpanded));
      nav.classList.toggle("open", !isExpanded);
      document.body.classList.toggle("nav-open", !isExpanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < mobileBreakpoint) {
          closeNav();
        }
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= mobileBreakpoint) {
        closeNav();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNav();
      }
    });
  }

  const currentYear = document.querySelector("[data-current-year]");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
})();
