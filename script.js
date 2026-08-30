/* =========================================
   PORTFOLIO SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

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

    const loader = document.getElementById("loader");
    const projectsContainer = document.querySelector(".projects");

    const modal = document.getElementById("modal");
    const modalKicker = document.getElementById("modalKicker");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");
    const modalStack = document.getElementById("modalStack");
    const closeButton = document.getElementById("close");

    const navLinks = document.querySelectorAll("header nav a");


    /* =========================================
       LOADER
    ========================================= */

    function hideLoader() {

        if (!loader) return;

        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        setTimeout(function () {

            if (loader && loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }

        }, 600);
    }


    /* Failsafe: loader cannot stay forever */

    setTimeout(hideLoader, 2000);


    /* =========================================
       PROJECT ICON
    ========================================= */

    function getProjectIcon(id) {

        if (id === "jarvis") {
            return "◈";
        }

        if (id === "soc") {
            return "⌁";
        }

        if (id === "desktop") {
            return "◉";
        }

        return "◎";
    }


    /* =========================================
       CREATE PROJECT CARD
    ========================================= */

    function createProjectCard(id, project, featured) {

        const article = document.createElement("article");

        article.className = featured
            ? "card featured"
            : "card";


        const parts = project.k.split(" / ");

        const number = parts[0];

        const category = parts.slice(1).join(" / ");


        article.innerHTML = `

            <div class="card-top">
                <span>${number}</span>
                <span>${category}</span>
            </div>

            <div class="icon">
                ${getProjectIcon(id)}
            </div>

            <h3>
                ${project.t}
            </h3>

            <p>
                ${project.d}
            </p>

            <div class="tags">

                ${project.s.map(function (tag) {
                    return `<b>${tag}</b>`;
                }).join("")}

            </div>

            <button
                class="details project-details"
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


    /* =========================================
       RENDER PROJECTS
    ========================================= */

    function renderProjects() {

        if (!projectsContainer) {
            console.error("Projects container not found.");
            return;
        }

        projectsContainer.innerHTML = "";


        projectsContainer.appendChild(
            createProjectCard(
                "jarvis",
                projects.jarvis,
                true
            )
        );


        projectsContainer.appendChild(
            createProjectCard(
                "soc",
                projects.soc,
                false
            )
        );


        projectsContainer.appendChild(
            createProjectCard(
                "desktop",
                projects.desktop,
                false
            )
        );


        projectsContainer.appendChild(
            createProjectCard(
                "localai",
                projects.localai,
                false
            )
        );
    }


    renderProjects();


    /* =========================================
       OPEN PROJECT MODAL
    ========================================= */

    function openProject(projectId) {

        const project = projects[projectId];

        if (!project) {
            console.error(
                "Project not found:",
                projectId
            );
            return;
        }


        if (!modal) {
            console.error(
                "Modal element not found in index.html."
            );
            return;
        }


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


            project.s.forEach(function (tag) {

                const span =
                    document.createElement("span");

                span.textContent = tag;

                modalStack.appendChild(span);

            });


            if (project.repo) {

                const repo =
                    document.createElement("a");

                repo.className = "repo-link";

                repo.href = project.repo;

                repo.target = "_blank";

                repo.rel =
                    "noopener noreferrer";

                repo.textContent =
                    "VIEW GITHUB REPOSITORY ↗";

                modalStack.appendChild(repo);
            }

        }


        modal.classList.add("open");

        document.body.classList.add("modal-open");

        document.body.style.overflow = "hidden";
    }


    /* =========================================
       CLOSE PROJECT MODAL
    ========================================= */

    function closeProject() {

        if (!modal) return;

        modal.classList.remove("open");

        document.body.classList.remove("modal-open");

        document.body.style.overflow = "";
    }


    /* =========================================
       PROJECT BUTTON CLICK
    ========================================= */

    document.addEventListener("click", function (event) {

        const button =
            event.target.closest(".project-details");


        if (!button) {
            return;
        }


        const projectId =
            button.getAttribute("data-project");


        if (!projectId) {
            return;
        }


        event.preventDefault();

        openProject(projectId);

    });


    /* =========================================
       CLOSE BUTTON
    ========================================= */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeProject
        );

    }


    /* =========================================
       CLICK OUTSIDE MODAL
    ========================================= */

    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {
                    closeProject();
                }

            }
        );

    }


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {
                closeProject();
            }

        }
    );


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    function updateActiveNavigation() {

        const currentPosition =
            window.scrollY + 150;


        navLinks.forEach(function (link) {

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


            if (!target) {
                return;
            }


            const top =
                target.offsetTop;


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

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

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


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =========================================
       PAGE LOAD
    ========================================= */

    window.addEventListener(
        "load",
        function () {

            hideLoader();

            updateActiveNavigation();

        }
    );

});
