/* =========================================
   ALEX JACOB — CYBERSECURITY × AI PORTFOLIO
   DYNAMIC GITHUB PROJECT SYSTEM
========================================= */


/* =========================================
   GITHUB CONFIGURATION
========================================= */

const GITHUB_USERNAME = "jalex00565-rgb";

const PORTFOLIO_REPOSITORY = "alex-cybersecurity-portfolio";

const GITHUB_API =
  `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;


/* =========================================
   PROJECT OVERRIDES
   These give important projects better
   titles, descriptions and technology tags.
========================================= */

const projectOverrides = {

  "JarvisAI": {
    k: "AI / PYTHON",
    t: "JARVIS AI",
    d: "Personal AI assistant built with Python, Streamlit and Gemini. Foundation for voice interaction, file analysis, memory and SOC assistance.",
    s: [
      "Python",
      "Streamlit",
      "Gemini AI",
      "AI Assistant"
    ],
    icon: "◈"
  },

  "SOC-Incident-Analyzer": {
    k: "CYBERSECURITY",
    t: "MINI SOC INCIDENT ANALYZER",
    d: "Security workflow for converting raw logs into detections, risk assessment, investigation context and incident reporting.",
    s: [
      "Logs",
      "Detection",
      "Risk Analysis",
      "Incident Reporting"
    ],
    icon: "⌁"
  },

  "JARVIS-AI-Desktop": {
    k: "AI / PYTHON",
    t: "JARVIS AI DESKTOP",
    d: "AI-powered Windows desktop assistant with voice interaction, memory, system monitoring and automation.",
    s: [
      "Python",
      "Windows",
      "Voice AI",
      "Automation"
    ],
    icon: "◉"
  }

};


/* =========================================
   PROJECT DATA
========================================= */

const projects = {};


/* =========================================
   GENERATE PROJECT ID
========================================= */

function createProjectId(name) {

  return "github_" +
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_");

}


/* =========================================
   FORMAT REPOSITORY NAME
========================================= */

function formatProjectTitle(name) {

  return name
    .replace(/[-_]+/g, " ")
    .replace(/\bai\b/gi, "AI")
    .replace(/\bsoc\b/gi, "SOC")
    .replace(/\bapi\b/gi, "API")
    .replace(/\bui\b/gi, "UI")
    .replace(/\bllm\b/gi, "LLM")
    .replace(/\bpython\b/gi, "Python")
    .replace(/\bwindows\b/gi, "Windows")
    .replace(/\bdesktop\b/gi, "Desktop")
    .replace(/\bsecurity\b/gi, "Security")
    .replace(/\bcybersecurity\b/gi, "Cybersecurity")
    .replace(/\b\w/g, char => char.toUpperCase());

}


/* =========================================
   DETERMINE PROJECT CATEGORY
========================================= */

function determineCategory(repo) {

  const text = (
    `${repo.name} ${repo.description || ""} ${repo.language || ""}`
  ).toLowerCase();


  if (
    text.includes("security") ||
    text.includes("cyber") ||
    text.includes("soc") ||
    text.includes("threat") ||
    text.includes("malware") ||
    text.includes("incident")
  ) {

    return "CYBERSECURITY";

  }


  if (
    text.includes("ai") ||
    text.includes("llm") ||
    text.includes("assistant") ||
    text.includes("machine learning") ||
    text.includes("gemini") ||
    text.includes("openai")
  ) {

    return "AI / PYTHON";

  }


  if (
    repo.language &&
    repo.language.toLowerCase() === "python"
  ) {

    return "PYTHON / DEVELOPMENT";

  }


  return "PROJECT";


}


/* =========================================
   DETERMINE PROJECT ICON
========================================= */

function determineIcon(repo) {

  const text = (
    `${repo.name} ${repo.description || ""}`
  ).toLowerCase();


  if (
    text.includes("security") ||
    text.includes("soc") ||
    text.includes("cyber")
  ) {

    return "⌁";

  }


  if (
    text.includes("ai") ||
    text.includes("assistant") ||
    text.includes("llm")
  ) {

    return "◈";

  }


  if (
    repo.language &&
    repo.language.toLowerCase() === "python"
  ) {

    return "◇";

  }


  return "○";

}


/* =========================================
   GENERATE TECHNOLOGY TAGS
========================================= */

function generateTechnologyTags(repo) {

  const tags = [];


  if (repo.language) {

    tags.push(repo.language);

  }


  const text = (
    `${repo.name} ${repo.description || ""}`
  ).toLowerCase();


  const possibleTechnologies = [

    {
      keyword: "streamlit",
      label: "Streamlit"
    },

    {
      keyword: "gemini",
      label: "Gemini AI"
    },

    {
      keyword: "openai",
      label: "OpenAI"
    },

    {
      keyword: "ollama",
      label: "Ollama"
    },

    {
      keyword: "llm",
      label: "LLM"
    },

    {
      keyword: "nmap",
      label: "Nmap"
    },

    {
      keyword: "burp",
      label: "Burp Suite"
    },

    {
      keyword: "nuclei",
      label: "Nuclei"
    },

    {
      keyword: "gobuster",
      label: "Gobuster"
    },

    {
      keyword: "wireshark",
      label: "Wireshark"
    },

    {
      keyword: "windows",
      label: "Windows"
    },

    {
      keyword: "linux",
      label: "Linux"
    },

    {
      keyword: "docker",
      label: "Docker"
    },

    {
      keyword: "flask",
      label: "Flask"
    },

    {
      keyword: "django",
      label: "Django"
    }

  ];


  possibleTechnologies.forEach(item => {

    if (
      text.includes(item.keyword) &&
      !tags.includes(item.label)
    ) {

      tags.push(item.label);

    }

  });


  if (tags.length === 0) {

    tags.push("GitHub Project");

  }


  return tags.slice(0, 5);

}


/* =========================================
   ADD GITHUB REPOSITORY TO PROJECT DATA
========================================= */

function registerGitHubRepository(repo) {

  const projectId = createProjectId(repo.name);

  const override = projectOverrides[repo.name];


  projects[projectId] = {

    k: override
      ? override.k
      : determineCategory(repo),

    t: override
      ? override.t
      : formatProjectTitle(repo.name),

    d: override
      ? override.d
      : (
        repo.description ||
        "A practical project developed as part of my cybersecurity, AI and software development work."
      ),

    s: override
      ? override.s
      : generateTechnologyTags(repo),

    repo: repo.html_url,

    icon: override
      ? override.icon
      : determineIcon(repo),

    githubData: repo

  };


  return projectId;

}


/* =========================================
   PROJECT CARD CREATION
========================================= */

function createProjectCard(project, index) {

  const card = document.createElement("article");

  card.className = "card";

  if (index === 0) {

    card.classList.add("featured");

  }


  const top = document.createElement("div");

  top.className = "card-top";


  const number = document.createElement("span");

  number.textContent =
    String(index + 1).padStart(2, "0");


  const status = document.createElement("span");

  status.textContent =
    project.githubData
      ? "GITHUB"
      : "PROJECT";


  top.appendChild(number);

  top.appendChild(status);


  const icon = document.createElement("div");

  icon.className = "icon";

  icon.textContent = project.icon || "○";


  const title = document.createElement("h3");

  title.textContent = project.t;


  const description = document.createElement("p");

  description.textContent = project.d;


  const tags = document.createElement("div");

  tags.className = "tags";


  project.s.forEach(tag => {

    const tagElement = document.createElement("b");

    tagElement.textContent = tag;

    tags.appendChild(tagElement);

  });


  const details = document.createElement("button");

  details.className = "details";

  details.type = "button";

  details.dataset.project =
    Object.keys(projects).find(
      key => projects[key] === project
    );

  details.textContent = "VIEW PROJECT ↗";


  card.appendChild(top);

  card.appendChild(icon);

  card.appendChild(title);

  card.appendChild(description);

  card.appendChild(tags);

  card.appendChild(details);


  return card;

}


/* =========================================
   LOCAL PLANNED PROJECT
========================================= */

function registerPlannedProject() {

  projects.localai = {

    k: "PLANNED",

    t: "LOCAL AI SECURITY ASSISTANT",

    d: "Offline AI layer planned for document analysis and a cybersecurity knowledge base, with future integration into the Jarvis ecosystem.",

    s: [
      "Ollama",
      "LLM",
      "Offline AI",
      "Security Knowledge Base"
    ],

    icon: "◎",

    planned: true

  };

}


/* =========================================
   RENDER PROJECTS
========================================= */

function renderProjects() {

  const projectsContainer =
    document.querySelector(".projects");


  if (!projectsContainer) {

    console.error(
      "Projects container (.projects) not found."
    );

    return;

  }


  projectsContainer.innerHTML = "";


  const projectEntries =
    Object.entries(projects);


  projectEntries.forEach(
    ([projectId, project], index) => {

      const card =
        createProjectCard(project, index);


      const button =
        card.querySelector(".details");


      if (button) {

        button.dataset.project = projectId;

      }


      projectsContainer.appendChild(card);

    }
  );


  updateProjectCount(projectEntries.length);

}


/* =========================================
   UPDATE HERO PROJECT COUNT
========================================= */

function updateProjectCount(count) {

  const textNodes =
    document.querySelectorAll(
      ".hero-stats span"
    );


  textNodes.forEach(node => {

    const text =
      node.textContent.toLowerCase();


    if (
      text.includes("project") ||
      text.includes("active")
    ) {

      node.textContent =
        `${String(count).padStart(2, "0")} PROJECTS`;

    }

  });

}


/* =========================================
   LOAD GITHUB REPOSITORIES
========================================= */

async function loadGitHubProjects() {

  try {

    const response =
      await fetch(GITHUB_API, {
        headers: {
          "Accept":
            "application/vnd.github+json"
        }
      });


    if (!response.ok) {

      throw new Error(
        `GitHub API error: ${response.status}`
      );

    }


    const repositories =
      await response.json();


    if (!Array.isArray(repositories)) {

      throw new Error(
        "Invalid GitHub API response."
      );

    }


    repositories
      .filter(repo => {

        return (
          !repo.fork &&
          repo.name !== PORTFOLIO_REPOSITORY &&
          !repo.archived
        );

      })
      .reverse()
      .forEach(repo => {

        registerGitHubRepository(repo);

      });


    renderProjects();


    console.log(
      `GitHub Projects Loaded: ${repositories.length}`
    );


  } catch (error) {

    console.error(
      "Unable to load GitHub projects:",
      error
    );


    /* If GitHub API fails, still show
       the important existing projects. */

    renderProjects();

  }

}


/* =========================================
   MODAL ELEMENTS
========================================= */

let modal;

let modalKicker;

let modalTitle;

let modalText;

let modalStack;

let closeButton;


/* =========================================
   INITIALIZE MODAL ELEMENTS
========================================= */

function initializeModalElements() {

  modal =
    document.querySelector("#modal");

  modalKicker =
    document.querySelector("#modalKicker");

  modalTitle =
    document.querySelector("#modalTitle");

  modalText =
    document.querySelector("#modalText");

  modalStack =
    document.querySelector("#modalStack");

  closeButton =
    document.querySelector("#close");

}


/* =========================================
   OPEN PROJECT MODAL
========================================= */

function openProjectModal(projectId) {

  const project =
    projects[projectId];


  if (!project) {

    console.error(
      "Project not found:",
      projectId
    );

    return;

  }


  if (modalKicker) {

    modalKicker.textContent =
      project.k;

  }


  if (modalTitle) {

    modalTitle.textContent =
      project.t;

  }


  if (modalText) {

    modalText.textContent =
      project.d;

  }


  if (modalStack) {

    modalStack.innerHTML = "";


    project.s.forEach(tag => {

      const span =
        document.createElement("span");

      span.textContent = tag;

      modalStack.appendChild(span);

    });


    if (project.repo) {

      const repoLink =
        document.createElement("a");


      repoLink.className =
        "repo-link";


      repoLink.href =
        project.repo;


      repoLink.target =
        "_blank";


      repoLink.rel =
        "noopener noreferrer";


      repoLink.textContent =
        "VIEW GITHUB REPOSITORY ↗";


      modalStack.appendChild(
        repoLink
      );

    }

  }


  if (modal) {

    modal.classList.add("open");

    document.body.classList.add(
      "modal-open"
    );

    document.body.style.overflow =
      "hidden";

  }

}


/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

  if (!modal) return;


  modal.classList.remove("open");

  document.body.classList.remove(
    "modal-open"
  );

  document.body.style.overflow = "";

}


/* =========================================
   PROJECT MODAL CLICK HANDLER
   Event delegation is used because
   project cards are dynamically created.
========================================= */

function initializeProjectButtons() {

  const projectsContainer =
    document.querySelector(".projects");


  if (!projectsContainer) return;


  projectsContainer.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(".details");


      if (!button) return;


      const projectId =
        button.dataset.project;


      openProjectModal(projectId);

    }
  );

}


/* =========================================
   MODAL EVENTS
========================================= */

function initializeModalEvents() {

  if (closeButton) {

    closeButton.addEventListener(
      "click",
      closeModal
    );

  }


  if (modal) {

    modal.addEventListener(
      "click",
      event => {

        if (
          event.target === modal
        ) {

          closeModal();

        }

      }
    );

  }


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeModal();

      }

    }
  );

}


/* =========================================
   LOADER
========================================= */

function initializeLoader() {

  const loader =
    document.querySelector("#loader");


  if (!loader) return;


  setTimeout(() => {

    loader.style.opacity = "0";


    setTimeout(() => {

      loader.remove();

    }, 650);

  }, 900);

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

function initializeNavigation() {

  const navLinks =
    document.querySelectorAll(
      "header nav a"
    );


  function updateActiveNavigation() {

    const currentPosition =
      window.scrollY + 150;


    navLinks.forEach(link => {

      const href =
        link.getAttribute("href");


      if (
        !href ||
        !href.startsWith("#")
      ) {

        return;

      }


      const target =
        document.querySelector(href);


      if (!target) return;


      const top =
        target.offsetTop;


      const bottom =
        top + target.offsetHeight;


      if (
        currentPosition >= top &&
        currentPosition < bottom
      ) {

        link.classList.add(
          "active"
        );

        link.style.color =
          "#75f5b4";

      } else {

        link.classList.remove(
          "active"
        );

        link.style.color = "";

      }

    });

  }


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
      passive: true
    }
  );


  updateActiveNavigation();


  navLinks.forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          !targetId.startsWith("#")
        ) {

          return;

        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });

}


/* =========================================
   PROJECT LINK SMOOTH SCROLL
========================================= */

function initializeProjectNavigation() {

  document
    .querySelectorAll(
      'a[href="#projects"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const target =
            document.querySelector(
              "#projects"
            );


          if (!target) return;


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });

}


/* =========================================
   CONTACT BUTTON
========================================= */

function initializeContactNavigation() {

  document
    .querySelectorAll(
      'a[href="#contact"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const target =
            document.querySelector(
              "#contact"
            );


          if (!target) return;


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });

}


/* =========================================
   PREVENT MODAL SCROLL
========================================= */

function initializeModalScrollObserver() {

  if (!modal) return;


  const observer =
    new MutationObserver(() => {

      if (
        modal.classList.contains(
          "open"
        )
      ) {

        document.body.style.overflow =
          "hidden";

      } else {

        document.body.style.overflow =
          "";

      }

    });


  observer.observe(modal, {

    attributes: true,

    attributeFilter: [
      "class"
    ]

  });

}


/* =========================================
   INITIALIZE APPLICATION
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    /* Modal */

    initializeModalElements();

    initializeModalEvents();

    initializeProjectButtons();

    initializeModalScrollObserver();


    /* Navigation */

    initializeNavigation();

    initializeProjectNavigation();

    initializeContactNavigation();


    /* Loader */

    initializeLoader();


    /* Planned project */

    registerPlannedProject();


    /*
       Load all public GitHub projects.
       New repositories will appear here
       automatically after the website
       is refreshed.
    */

    await loadGitHubProjects();

  }
);
