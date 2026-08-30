/* =========================================
   ALEX JACOB PORTFOLIO - FINAL SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       PROJECT DATA
    ========================================= */

    const projects = [

        {
            id: "jarvis",
            number: "01",
            category: "AI / PYTHON",
            title: "JARVIS AI",
            description:
                "Personal AI assistant built with Python, Streamlit and Gemini. Foundation for voice interaction, file analysis, memory and SOC assistance.",
            tags: ["Python", "Streamlit", "Gemini AI", "AI Assistant"],
            repo: "https://github.com/jalex00565-rgb/JarvisAI",
            icon: "◇"
        },

        {
            id: "raven",
            number: "02",
            category: "CYBERSECURITY",
            title: "RAVEN SOC",
            description:
                "A cybersecurity-focused SOC project for security monitoring, log analysis, detection and incident investigation.",
            tags: ["Python", "SOC", "Log Analysis", "Detection"],
            repo: "https://github.com/jalex00565-rgb/RAVEN",
            icon: "⌁"
        },

        {
            id: "desktop",
            number: "03",
            category: "AI / PYTHON",
            title: "JARVIS AI DESKTOP",
            description:
                "AI-powered Windows desktop assistant with voice interaction, memory, system monitoring and automation.",
            tags: ["Python", "Windows", "Voice AI", "Automation"],
            repo: "https://github.com/jalex00565-rgb/JARVIS-AI-Desktop",
            icon: "◎"
        },

        {
            id: "soc-analyzer",
            number: "04",
            category: "CYBERSECURITY",
            title: "SOC INCIDENT ANALYZER",
            description:
                "SOC Incident Analyzer for log analysis, incident detection, risk scoring and AI-assisted security analysis.",
            tags: ["Python", "AI", "Cybersecurity", "Log Analysis"],
            repo: "https://github.com/jalex00565-rgb/SOC-Incident-Analyzer",
            icon: "⌁"
        },

        {
            id: "local-ai",
            number: "05",
            category: "AI / SECURITY",
            title: "LOCAL AI SECURITY ASSISTANT",
            description:
                "A local AI security assistant using Ollama for private document analysis, cybersecurity knowledge and AI-assisted security workflows.",
            tags: ["Python", "Ollama", "Local AI", "Cybersecurity"],
            repo: "https://github.com/jalex00565-rgb/Local-AI-Security-Assistant",
            icon: "◎"
        },

        {
            id: "mini-soc",
            number: "06",
            category: "AI / SECURITY",
            title: "MINI SOC INCIDENT ANALYZER",
            description:
                "Security workflow for converting raw logs into detections, risk assessment, investigation context and incident reporting.",
            tags: ["Logs", "Detection", "Risk Analysis", "Incident Reporting"],
            repo: "https://github.com/jalex00565-rgb/Mini-SOC-Incident-Analyzer",
            icon: "◇"
        }

    ];


    /* =========================================
       ELEMENTS
    ========================================= */

    const loader = document.getElementById("loader");
    const container = document.querySelector(".projects");

    const modal = document.getElementById("modal");
    const modalKicker = document.getElementById("modalKicker");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");
    const modalStack = document.getElementById("modalStack");
    const closeButton = document.getElementById("close");


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

    /* Safety timeout */
    setTimeout(hideLoader, 1800);


    /* =========================================
       CREATE PROJECT CARD
    ========================================= */

    function createProjectCard(project, index) {

        const card = document.createElement("article");

        card.className =
            index === 0
                ? "card featured"
                : "card";


        const tagsHTML = project.tags
            .map(tag => `<span>${tag}</span>`)
            .join("");


        card.innerHTML = `

            <div class="card-top">

                <span>
                    ${project.number}
                </span>

                <span>
                    ${project.category}
                </span>

            </div>


            <div class="icon">
                ${project.icon}
            </div>


            <h3>
                ${project.title}
            </h3>


            <p>
                ${project.description}
            </p>


            <div class="tags">
                ${tagsHTML}
            </div>


            <div class="project-actions">

                <button
                    class="details project-details"
                    type="button"
                    data-project="${project.id}">
                    VIEW PROJECT ↗
                </button>


                <a
                    class="details github-link"
                    href="${project.repo}"
                    target="_blank"
                    rel="noopener noreferrer">
                    GITHUB REPOSITORY ↗
                </a>

            </div>

        `;


        return card;
    }


    /* =========================================
       RENDER PROJECTS
    ========================================= */

    function renderProjects() {

        if (!container) {
            console.error("Projects container not found.");
            return;
        }


        container.innerHTML = "";


        projects.forEach((project, index) => {

            container.appendChild(
                createProjectCard(project, index)
            );

        });

    }


    renderProjects();


    /* =========================================
       OPEN MODAL
    ========================================= */

    function openProject(id) {

        const project =
            projects.find(item => item.id === id);


        if (!project || !modal) {
            return;
        }


        if (modalKicker) {
            modalKicker.textContent =
                `${project.number} / ${project.category}`;
        }


        if (modalTitle) {
            modalTitle.textContent =
                project.title;
        }


        if (modalText) {
            modalText.textContent =
                project.description;
        }


        if (modalStack) {

            modalStack.innerHTML = "";


            project.tags.forEach(tag => {

                const tagElement =
                    document.createElement("span");

                tagElement.textContent = tag;

                modalStack.appendChild(tagElement);

            });


            /* GitHub link inside modal */

            const github =
                document.createElement("a");

            github.className = "repo-link";

            github.href = project.repo;

            github.target = "_blank";

            github.rel =
                "noopener noreferrer";

            github.textContent =
                "VIEW GITHUB REPOSITORY ↗";

            modalStack.appendChild(github);

        }


        modal.classList.add("open");

        document.body.classList.add("modal-open");

        document.body.style.overflow = "hidden";
    }


    /* =========================================
       CLOSE MODAL
    ========================================= */

    function closeProject() {

        if (!modal) return;

        modal.classList.remove("open");

        document.body.classList.remove("modal-open");

        document.body.style.overflow = "";

    }


    /* =========================================
       PROJECT BUTTON
    ========================================= */

    document.addEventListener("click", event => {

        const button =
            event.target.closest(".project-details");


        if (!button) {
            return;
        }


        const id =
            button.dataset.project;


        if (!id) {
            return;
        }


        event.preventDefault();

        openProject(id);

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
            event => {

                if (event.target === modal) {
                    closeProject();
                }

            }
        );

    }


    /* =========================================
       ESC KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeProject();
            }

        }
    );


    /* =========================================
       NAVIGATION
    ========================================= */

    const navLinks =
        document.querySelectorAll("header nav a");


    function updateNavigation() {

        const position =
            window.scrollY + 160;


        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");


            if (
                !href ||
                !href.startsWith("#")
            ) {
                return;
            }


            const section =
                document.querySelector(href);


            if (!section) {
                return;
            }


            const top =
                section.offsetTop;


            const bottom =
                top + section.offsetHeight;


            if (
                position >= top &&
                position < bottom
            ) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateNavigation,
        { passive: true }
    );


    updateNavigation();


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

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
        () => {

            hideLoader();

            updateNavigation();

        }
    );

});
