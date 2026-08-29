/* =========================================
   JARVIS / PORTFOLIO SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

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

        desktop: {
            k: "03 / AI / PYTHON",
            t: "JARVIS AI DESKTOP",
            d: "AI-powered Windows desktop assistant with voice interaction, memory, system monitoring and automation.",
            s: [
                "Python",
                "Windows",
                "Voice AI",
                "Automation"
            ],
            repo: "https://github.com/jalex00565-rgb/JARVIS-AI-Desktop"
        },

        localai: {
            k: "04 / PLANNED",
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
       ELEMENTS
    ========================================= */

    const loader = document.querySelector("#loader");
    const projectsContainer = document.querySelector(".projects");

    const modal = document.querySelector("#modal");
    const modalKicker = document.querySelector("#modalKicker");
    const modalTitle = document.querySelector("#modalTitle");
    const modalText = document.querySelector("#modalText");
    const modalStack = document.querySelector("#modalStack");
    const closeButton = document.querySelector("#close");

    const navLinks = document.querySelectorAll("header nav a");


    /* =========================================
       LOADER
    ========================================= */

    function hideLoader() {

        if (!loader) return;

        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        setTimeout(() => {
            if (loader && loader.parentNode) {
                loader.remove();
            }
        }, 600);
    }

    /* Never allow loader to remain stuck */

    setTimeout(hideLoader, 1800);


    /* =========================================
       PROJECT CARDS
    ========================================= */

    function createProjectCard(id, project, featured = false) {

        const article = document.createElement("article");

        article.className = featured
            ? "card featured"
            : "card";

        article.innerHTML = `
            <div class="card-top">
                <span>${project.k.split(" / ")[0]}</span>
                <span>${project.k.substring(project.k.indexOf("/") + 2)}</span>
            </div>

            <div class="icon">
                ${id === "jarvis" ? "◈" :
                  id === "soc" ? "⌁" :
                  id === "desktop" ? "◉" : "◎"}
            </div>

            <h3>${project.t}</h3>

            <p>${project.d}</p>

            <div class="tags">
                ${project.s.map(tag => `<b>${tag}</b>`).join("")}
            </div>

            <button
                class="details"
                type="button"
                data-project="${id}">
                VIEW PROJECT ↗
            </button>

            ${
                project.repo
                ? `
                <a
                    class="details"
                    href="${project.repo}"
                    target="_blank"
                    rel="noopener noreferrer">
                    GITHUB REPOSITORY ↗
                </a>
                `
                : ""
            }
        `;

        return article;
    }


    function renderProjects() {

        if (!projectsContainer) return;

        projectsContainer.innerHTML = "";

        projectsContainer.appendChild(
            createProjectCard("jarvis", projects.jarvis, true)
        );

        projectsContainer.appendChild(
            createProjectCard("soc", projects.soc)
        );

        projectsContainer.appendChild(
            createProjectCard("desktop", projects.desktop)
        );

        projectsContainer.appendChild(
            createProjectCard("localai", projects.localai)
        );
    }


    renderProjects();


    /* =========================================
       MODAL
    ========================================= */

    function openModal(projectId) {

        const project = projects[projectId];

        if (!project || !modal) return;

        if (modalKicker) {
            modalKicker.textContent = project.k;
        }

        if (modalTitle) {
            modalTitle.textContent = project.t;
        }

        if (modalText) {
            modalText.textContent = project.d;
        }

        if (modalStack) {

            modalStack.innerHTML = "";

            project.s.forEach(tag => {

                const span = document.createElement("span");

                span.textContent = tag;

                modalStack.appendChild(span);

            });


            if (project.repo) {

                const repoLink = document.createElement("a");

                repoLink.className = "repo-link";

                repoLink.href = project.repo;

                repoLink.target = "_blank";

                repoLink.rel = "noopener noreferrer";

                repoLink.textContent =
                    "VIEW GITHUB REPOSITORY ↗";

                modalStack.appendChild(repoLink);
            }
        }


        modal.classList.add("open");

        document.body.classList.add("modal-open");

        document.body.style.overflow = "hidden";
    }


    function closeModal() {

        if (!modal) return;

        modal.classList.remove("open");

        document.body.classList.remove("modal-open");

        document.body.style.overflow = "";
    }


    /* =========================================
       PROJECT BUTTON EVENTS
    ========================================= */

    document.addEventListener("click", event => {

        const button = event.target.closest(".details");

        if (!button) return;

        const projectId = button.dataset.project;

        if (!projectId) return;

        event.preventDefault();

        openModal(projectId);
    });


    /* =========================================
       CLOSE BUTTON
    ========================================= */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeModal
        );
    }


    /* =========================================
       CLICK OUTSIDE MODAL
    ========================================= */

    if (modal) {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                closeModal();
            }

        });
    }


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeModal();
        }

    });


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    function updateActiveNavigation() {

        const currentPosition =
            window.scrollY + 150;

        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            if (!href || !href.startsWith("#")) {
                return;
            }

            const target =
                document.querySelector(href);

            if (!target) return;

            const top = target.offsetTop;

            const bottom =
                top + target.offsetHeight;

            if (
                currentPosition >= top &&
                currentPosition < bottom
            ) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });
    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =========================================
       SMOOTH NAVIGATION
    ========================================= */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                !targetId.startsWith("#")
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       HERO PROJECT BUTTON
    ========================================= */

    document.querySelectorAll(
        'a[href="#projects"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const target =
                document.querySelector("#projects");

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

    document.querySelectorAll(
        'a[href="#contact"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const target =
                document.querySelector("#contact");

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       PAGE READY
    ========================================= */

    window.addEventListener("load", () => {

        hideLoader();

        updateActiveNavigation();

    });

});
