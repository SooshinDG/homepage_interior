"use strict";

(function initMobileNav() {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");

  if (!menuButton || !nav) {
    return;
  }

  const closeNav = () => {
    menuButton.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    nav.classList.toggle("is-open", !isExpanded);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.closest(".site-header")) {
      return;
    }
    closeNav();
  });
})();
