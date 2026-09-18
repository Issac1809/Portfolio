const backgrounds = [
  "background_images/BG1.jpg",
  "background_images/BG2.jpg",
  "background_images/BG3.jpg",
  "background_images/BG4.jpg",
  "background_images/BG5.jpg"
];

let backgroundIndex = 0;
let activeBackground = 1;

const bg1 = document.getElementById("bg1");
const bg2 = document.getElementById("bg2");
const navToggle = document.querySelector(".nav-toggle");
const navPanel = document.getElementById("navPanel");
const navLinks = [...document.querySelectorAll(".nav-link")];
const stlcStages = [...document.querySelectorAll(".stlc-stage")];
let activeStageIndex = 0;
let autoplayTimer = null;
let resumeAutoplayTimer = null;

function preloadBackgrounds() {
  backgrounds.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function changeBackground() {
  const next = backgrounds[backgroundIndex];

  if (activeBackground === 1) {
    bg2.style.backgroundImage = `url(${next})`;
    bg2.style.opacity = "1";
    bg1.style.opacity = "0";
    activeBackground = 2;
  } else {
    bg1.style.backgroundImage = `url(${next})`;
    bg1.style.opacity = "1";
    bg2.style.opacity = "0";
    activeBackground = 1;
  }

  backgroundIndex = (backgroundIndex + 1) % backgrounds.length;
}

function setActiveStage(nextIndex, userInitiated = false) {
  if (!stlcStages.length) return;

  activeStageIndex = (nextIndex + stlcStages.length) % stlcStages.length;

  stlcStages.forEach((stage, index) => {
    const isActive = index === activeStageIndex;
    stage.classList.toggle("is-active", isActive);
    stage.setAttribute("aria-pressed", String(isActive));
  });

  if (userInitiated) {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }

    if (resumeAutoplayTimer) {
      clearTimeout(resumeAutoplayTimer);
    }

    resumeAutoplayTimer = setTimeout(() => {
      startAutoplay();
    }, 1600);
  }
}

function startAutoplay() {
  if (!stlcStages.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  if (autoplayTimer) {
    clearInterval(autoplayTimer);
  }

  autoplayTimer = setInterval(() => {
    setActiveStage(activeStageIndex + 1);
  }, 2600);
}

function showSection(section) {
  const target = document.getElementById(section);
  if (!target) return;

  const header = document.querySelector(".site-header");
  const headerOffset = header ? header.offsetHeight + 18 : 0;
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth"
  });

  if (window.innerWidth <= 960 && navPanel.classList.contains("is-open")) {
    navPanel.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
}

function bindNav() {
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const sectionId = link.getAttribute("href").replace("#", "");
      showSection(sectionId);
    });
  });
}

function bindMailLinks() {
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = link.getAttribute("href");
    });
  });
}

function updateActiveNav() {
  const sections = [...document.querySelectorAll("main section[id]")];

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const isActive = rect.top <= 170 && rect.bottom >= 170;
    const targetLink = document.querySelector(`.nav-link[href="#${section.id}"]`);

    if (targetLink) {
      targetLink.classList.toggle("is-active", isActive);
    }
  });
}

function setupProjectModal() {
  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("project-modal-title");
  const modalBody = document.getElementById("project-modal-body");
  const closeButton = document.getElementById("project-modal-close");
  const projectButtons = [...document.querySelectorAll(".project-link")];

  if (!modal || !modalTitle || !modalBody || !closeButton) return;

  const projectDetails = {
    "execution-plus": {
      title: "Execution+",
      content: `
        <p><strong>Category:</strong> Transmission Foundation Design / QA Engineering</p>
        <p><strong>Testing Focus:</strong> Manual Testing + Test Automation</p>
        <p>QA validation for transmission foundation design workflows, including Excel-based imports, geotechnical mapping, foundation rules, and drilled-shaft/foundation calculations.</p>
        <ul>
          <li>Functional testing</li>
          <li>Regression testing</li>
          <li>Test case design and execution</li>
          <li>Excel import validation</li>
          <li>Geotechnical mapping validation</li>
          <li>Foundation rule validation</li>
          <li>Drilled-shaft and foundation scenario validation</li>
          <li>Defect reporting and tracking</li>
          <li>Automation validation where applicable</li>
        </ul>
        <div class="modal-tags">
          <span>Java</span>
          <span>Selenium</span>
          <span>Jira</span>
          <span>Xray</span>
          <span>CI/CD</span>
          <span>Excel</span>
        </div>
      `
    },
    "quest-agent": {
      title: "Quest Agent",
      content: `
        <p><strong>Category:</strong> AI-Powered QA / RAG Assistant</p>
        <p><strong>Testing Focus:</strong> AI Testing + Functional Testing + UAT</p>
        <p>Validated an AI-powered RAG assistant designed to retrieve and provide information from Knowledge Items and Quality Issues.</p>
        <ul>
          <li>Prompt validation</li>
          <li>Response validation</li>
          <li>RAG response testing</li>
          <li>Source reference validation</li>
          <li>Knowledge Item validation</li>
          <li>Quality Issue validation</li>
          <li>Power BI deep-link validation</li>
          <li>Functional testing</li>
          <li>UAT support</li>
          <li>Negative and edge-case testing</li>
        </ul>
        <div class="modal-tags">
          <span>AI / RAG</span>
          <span>Prompt Testing</span>
          <span>UAT</span>
          <span>Web Testing</span>
          <span>Validation</span>
        </div>
      `
    },
    "system-design-agent": {
      title: "System Design Agent",
      content: `
        <p><strong>Category:</strong> AI-Powered Application</p>
        <p><strong>Testing Focus:</strong> AI Testing + Functional Testing + UAT</p>
        <p>Testing and validation of an AI-driven system design application.</p>
        <ul>
          <li>Functional validation</li>
          <li>AI response validation</li>
          <li>Prompt validation</li>
          <li>Edge-case testing</li>
          <li>UAT validation</li>
          <li>Regression testing</li>
        </ul>
      `
    },
    "pwr-resource-hub": {
      title: "PWR Resource Hub Agent",
      content: `
        <p><strong>Category:</strong> AI-Powered Resource / Knowledge Application</p>
        <p><strong>Testing Focus:</strong> AI Testing + Functional Testing</p>
        <p>Ongoing QA validation of the PWR Resource Hub Agent.</p>
        <ul>
          <li>Functional testing</li>
          <li>AI response validation</li>
          <li>Data and content validation</li>
          <li>Prompt validation</li>
          <li>Regression testing</li>
          <li>UAT support where applicable</li>
        </ul>
      `
    },
    "nia": {
      title: "NIA",
      content: `
        <p><strong>Category:</strong> Software Quality Engineering</p>
        <p><strong>Testing Focus:</strong> Manual Testing + Automation</p>
        <p>Quality engineering work covering manual and automation validation across core testing activities.</p>
        <ul>
          <li>Manual testing</li>
          <li>Automation support</li>
          <li>Test execution</li>
          <li>Defect handling</li>
          <li>Validation coverage</li>
        </ul>
      `
    },
    "cdp": {
      title: "CDP",
      content: `
        <p><strong>Category:</strong> Software Quality Engineering</p>
        <p><strong>Testing Focus:</strong> Manual Testing + Automation</p>
        <p>Software quality engineering work focused on structured validation and automation support.</p>
        <ul>
          <li>Functional validation</li>
          <li>Regression planning</li>
          <li>Automation coverage</li>
          <li>Issue validation</li>
          <li>Testing workflow support</li>
        </ul>
      `
    },
    "ogc-checklist": {
      title: "OGC Checklist Centralization",
      content: `
        <p><strong>Category:</strong> QA Engineering</p>
        <p><strong>Testing Focus:</strong> Functional Testing + Web Testing</p>
        <p>QA work focused on checklist centralization and workflow validation for a web-facing quality process.</p>
        <ul>
          <li>Functional testing</li>
          <li>Web validation</li>
          <li>Process validation</li>
          <li>Test coverage review</li>
          <li>Quality workflow validation</li>
        </ul>
      `
    }
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  projectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const projectKey = button.getAttribute("data-project");
      const project = projectDetails[projectKey];

      if (!project) return;

      modalTitle.textContent = project.title;
      modalBody.innerHTML = project.content;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

function setupMobileMenu() {
  if (!navToggle || !navPanel) return;

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navPanel.classList.toggle("is-open");
  });

  navPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navPanel.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

preloadBackgrounds();
changeBackground();
setInterval(changeBackground, 5000);

if (stlcStages.length) {
  stlcStages.forEach((stage, index) => {
    stage.addEventListener("click", () => {
      setActiveStage(index, true);
    });
  });

  setActiveStage(0);
  startAutoplay();
}

bindNav();
bindMailLinks();
setupProjectModal();
setupMobileMenu();
window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("load", updateActiveNav);