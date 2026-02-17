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

  const portfolioFilters = document.querySelectorAll("[data-portfolio-filter]");
  const portfolioCards = document.querySelectorAll("[data-portfolio-card]");
  const portfolioEmpty = document.querySelector("[data-portfolio-empty]");
  const portfolioModal = document.getElementById("portfolio-modal");

  if (portfolioFilters.length > 0 && portfolioCards.length > 0) {
    const modalTitle = portfolioModal ? portfolioModal.querySelector("[data-modal-title]") : null;
    const modalType = portfolioModal ? portfolioModal.querySelector("[data-modal-type]") : null;
    const modalDescription = portfolioModal ? portfolioModal.querySelector("[data-modal-description]") : null;
    const modalMaterials = portfolioModal ? portfolioModal.querySelector("[data-modal-materials]") : null;
    const modalDuration = portfolioModal ? portfolioModal.querySelector("[data-modal-duration]") : null;
    const modalImage = portfolioModal ? portfolioModal.querySelector("[data-modal-image]") : null;
    const modalCloseButton = portfolioModal ? portfolioModal.querySelector(".portfolio-modal-close") : null;
    const portfolioOpenButtons = document.querySelectorAll("[data-portfolio-open]");
    const modalCloseTargets = portfolioModal ? portfolioModal.querySelectorAll("[data-modal-close]") : [];

    let lastFocusedButton = null;

    const applyFilter = (filterValue) => {
      let visibleCount = 0;

      portfolioCards.forEach((card) => {
        const isVisible = filterValue === "all" || card.dataset.category === filterValue;
        card.hidden = !isVisible;
        if (isVisible) {
          visibleCount += 1;
        }
      });

      if (portfolioEmpty) {
        portfolioEmpty.hidden = visibleCount > 0;
      }
    };

    const setActiveFilter = (activeButton) => {
      portfolioFilters.forEach((button) => {
        const isActive = button === activeButton;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
    };

    portfolioFilters.forEach((button) => {
      button.addEventListener("click", () => {
        const filterValue = button.dataset.portfolioFilter;
        if (!filterValue) {
          return;
        }
        setActiveFilter(button);
        applyFilter(filterValue);
      });
    });

    const closeModal = () => {
      if (!portfolioModal || portfolioModal.hidden) {
        return;
      }
      portfolioModal.hidden = true;
      document.body.classList.remove("modal-open");
      if (lastFocusedButton) {
        lastFocusedButton.focus();
      }
    };

    const openModal = (card, triggerButton) => {
      if (
        !portfolioModal ||
        !modalTitle ||
        !modalType ||
        !modalDescription ||
        !modalMaterials ||
        !modalDuration ||
        !modalImage
      ) {
        return;
      }

      modalTitle.textContent = card.dataset.title || "";
      modalType.textContent = card.dataset.type || "";
      modalDescription.textContent = card.dataset.description || "";
      modalMaterials.textContent = card.dataset.materials || "";
      modalDuration.textContent = card.dataset.duration || "";
      modalImage.src = card.dataset.image || "";
      modalImage.alt = `${card.dataset.title || "시공 사례"} 상세 이미지`;

      lastFocusedButton = triggerButton;
      portfolioModal.hidden = false;
      document.body.classList.add("modal-open");
      if (modalCloseButton) {
        modalCloseButton.focus();
      }
    };

    portfolioOpenButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest("[data-portfolio-card]");
        if (!card || card.hidden) {
          return;
        }
        openModal(card, button);
      });
    });

    modalCloseTargets.forEach((target) => {
      target.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });

    applyFilter("all");
  }
})();
