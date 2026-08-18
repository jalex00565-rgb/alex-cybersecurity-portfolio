/* =========================================
   PROJECT DATA
========================================= */

const projects = {
  jarvis: {
    k: "01 / AI / PYTHON",
    t: "JARVIS AI",
    d: "A working personal AI assistant built with Python, Streamlit and Gemini. The system is being extended toward voice interaction, file analysis, memory and SOC assistance.",
    s: [
      "Python",
      "Streamlit",
      "Gemini AI",
      "AI Assistant"
    ],
    repo: "https://github.com/jalex00565-rgb/JarvisAI"
  },

  soc: {
    k: "02 / CYBERSECURITY",
    t: "MINI SOC INCIDENT ANALYZER",
    d: "A security-analysis workflow that converts raw logs into detections, risk assessment, investigation context and incident reporting — the core workflow of a practical SOC tool.",
    s: [
      "Log Analysis",
      "Detection",
      "Risk Scoring",
      "Incident Reporting"
    ],
    repo: "https://github.com/jalex00565-rgb/SOC-Incident-Analyzer"
  },

  localai: {
    k: "03 / PLANNED",
    t: "LOCAL AI SECURITY ASSISTANT",
    d: "An offline AI layer planned for document analysis and a cybersecurity knowledge base, with the long-term goal of integrating it into the Jarvis ecosystem.",
    s: [
      "Ollama",
      "LLM",
      "Offline AI",
      "Security Knowledge Base"
    ]
  }
};


/* =========================================
   MODAL ELEMENTS
========================================= */

const modal = document.querySelector("#modal");
const modalKicker = document.querySelector("#modalKicker");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const modalStack = document.querySelector("#modalStack");
const closeButton = document.querySelector("#close");


/* =========================================
   OPEN PROJECT MODAL
========================================= */

document.querySelectorAll(".details").forEach(button => {

  button.addEventListener("click", () => {

    const projectId = button.dataset.project;
    const project = projects[projectId];

    if (!project) {
      console.error("Project not found:", projectId);
      return;
    }

    modalKicker.textContent = project.k;
    modalTitle.textContent = project.t;
    modalText.textContent = project.d;

    modalStack.innerHTML = "";

    /* Project technology tags */

    project.s.forEach(tag => {

      const span = document.createElement("span");
      span.textContent = tag;

      modalStack.appendChild(span);

    });


    /* GitHub repository */

    if (project.repo) {

      const repoLink = document.createElement("a");

      repoLink.className = "repo-link";
      repoLink.href = project.repo;
      repoLink.target = "_blank";
      repoLink.rel = "noopener noreferrer";
      repoLink.textContent = "VIEW GITHUB REPOSITORY ↗";

      modalStack.appendChild(repoLink);

    }


    /* Open modal */

    modal.classList.add("open");

    document.body.classList.add("modal-open");

  });

});


/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

  modal.classList.remove("open");

  document.body.classList.remove("modal-open");

}


/* Close button */

if (closeButton) {

  closeButton.addEventListener("click", closeModal);

}


/* Click outside modal */

modal.addEventListener("click", event => {

  if (event.target === modal) {

    closeModal();

  }

});


/* ESC key */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeModal();

  }

});


/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

  const loader = document.querySelector("#loader");

  if (!loader) return;

  setTimeout(() => {

    loader.style.opacity = "0";

    setTimeout(() => {

      loader.remove();

    }, 650);

  }, 900);

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const navLinks = document.querySelectorAll("header nav a");


function updateActiveNavigation() {

  const currentPosition = window.scrollY + 150;

  navLinks.forEach(link => {

    const target = document.querySelector(
      link.getAttribute("href")
    );

    if (!target) return;

    const top = target.offsetTop;
    const bottom = top + target.offsetHeight;

    if (
      currentPosition >= top &&
      currentPosition < bottom
    ) {

      link.classList.add("active");

      link.style.color = "#75f5b4";

    } else {

      link.classList.remove("active");

      link.style.color = "";

    }

  });

}


window.addEventListener(
  "scroll",
  updateActiveNavigation,
  { passive: true }
);

window.addEventListener(
  "load",
  updateActiveNavigation
);


/* =========================================
   SMOOTH NAVIGATION
========================================= */

navLinks.forEach(link => {

  link.addEventListener("click", event => {

    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* =========================================
   PROJECT BUTTON SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href="#projects"]').forEach(link => {

  link.addEventListener("click", event => {

    const target = document.querySelector("#projects");

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* =========================================
   CONTACT BUTTON
========================================= */

document.querySelectorAll('a[href="#contact"]').forEach(link => {

  link.addEventListener("click", event => {

    const target = document.querySelector("#contact");

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* =========================================
   PREVENT MODAL SCROLL
========================================= */

const observer = new MutationObserver(() => {

  if (modal.classList.contains("open")) {

    document.body.style.overflow = "hidden";

  } else {

    document.body.style.overflow = "";

  }

});

observer.observe(modal, {
  attributes: true,
  attributeFilter: ["class"]
});
