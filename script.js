document.addEventListener("DOMContentLoaded", () => {

    const GITHUB_USERNAME = "jalex00565-rgb";

    const GITHUB_API =
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

    const projectsContainer = document.querySelector(".projects");
    const loader = document.getElementById("loader");

    const modal = document.getElementById("modal");
    const closeButton = document.getElementById("close");
    const modalKicker = document.getElementById("modalKicker");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");
    const modalStack = document.getElementById("modalStack");


    /* =====================================================
       PROJECT CONFIGURATION
    ===================================================== */

    const PROJECT_CONFIG = {

        "jarvisai": {
            title: "JARVIS AI",
            category: "AI / PYTHON",
            description:
                "A personal AI assistant built with Python, Streamlit and Gemini, with support for AI interaction, automation and future security-focused capabilities.",
            technologies: [
                "Python",
                "Streamlit",
                "Gemini AI",
                "AI Assistant"
            ]
        },

        "raven-soc": {
            title: "RAVEN SOC",
            category: "CYBERSECURITY",
            description:
                "A cybersecurity-focused SOC project for security monitoring, log analysis, detection and incident investigation.",
            technologies: [
                "Python",
                "SOC",
                "Log Analysis",
                "Detection"
            ]
        },

        "jarvis-ai-desktop": {
            title: "JARVIS AI DESKTOP",
            category: "AI / PYTHON",
            description:
                "AI-powered Windows desktop assistant with voice interaction, memory, system monitoring and automation.",
            technologies: [
                "Python",
                "Windows",
                "Voice AI",
                "Automation"
            ]
        },

        "soc-incident-analyzer": {
            title: "SOC INCIDENT ANALYZER",
            category: "CYBERSECURITY",
            description:
                "SOC Incident Analyzer for log analysis, incident detection, risk scoring and AI-assisted security analysis.",
            technologies: [
                "Python",
                "AI",
                "Cybersecurity",
                "Log Analysis"
            ]
        },

        "local-ai-security-assistant": {
            title: "LOCAL AI SECURITY ASSISTANT",
            category: "AI / SECURITY",
            description:
                "A local AI security assistant powered by Ollama for private document analysis, cybersecurity knowledge and AI-assisted security workflows.",
            technologies: [
                "Python",
                "Ollama",
                "Local AI",
                "Cybersecurity"
            ]
        }

    };


    /* =====================================================
       PROJECT ORDER
    ===================================================== */

    const PROJECT_ORDER = [
        "jarvisai",
        "raven-soc",
        "jarvis-ai-desktop",
        "soc-incident-analyzer",
        "local-ai-security-assistant"
    ];


    let githubRepositories = [];


    /* =====================================================
       NORMALIZE NAME
    ===================================================== */

    function normalize(value) {

        return String(value || "")
            .toLowerCase()
            .trim()
            .replace(/[_\s]+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-");

    }


    /* =====================================================
       GET PROJECT CONFIG
    ===================================================== */

    function getConfig(repo) {

        const repoName = normalize(repo.name);

        /*
         * Direct repository-name matching.
         */

        if (PROJECT_CONFIG[repoName]) {
            return PROJECT_CONFIG[repoName];
        }


        /*
         * Additional aliases.
         */

        const aliases = {

            "jarvis-ai": "jarvisai",

            "jarvis": "jarvisai",

            "raven": "raven-soc",

            "jarvisdesktop": "jarvis-ai-desktop",

            "jarvis-ai-desktop": "jarvis-ai-desktop",

            "socincidentanalyzer": "soc-incident-analyzer",

            "local-ai": "local-ai-security-assistant",

            "local-ai-security": "local-ai-security-assistant",

            "ollama": "local-ai-security-assistant"

        };


        if (aliases[repoName]) {

            return PROJECT_CONFIG[
                aliases[repoName]
            ];

        }


        /*
         * Check repository description for Ollama.
         */

        const description =
            normalize(repo.description);


        if (
            description.includes("ollama") ||
            description.includes("local-ai")
        ) {

            return PROJECT_CONFIG[
                "local-ai-security-assistant"
            ];

        }


        return null;

    }


    /* =====================================================
       HIDE UNWANTED REPOSITORIES
    ===================================================== */

    function shouldHide(repo) {

        const name = normalize(repo.name);


        /*
         * Hide portfolio repository.
         */

        if (
            name === "alex-cybersecurity-portfolio"
        ) {

            return true;

        }


        /*
         * Hide music backend.
         */

        if (
            name.includes("music-app-backend") ||
            name.includes("music-backend") ||
            (
                name.includes("music") &&
                name.includes("backend")
            )
        ) {

            return true;

        }


        /*
         * Hide forks.
         */

        if (repo.fork) {
            return true;
        }


        /*
         * Hide archived repositories.
         */

        if (repo.archived) {
            return true;
        }


        return false;

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       PROJECT ICON
    ===================================================== */

    function getIcon(category) {

        if (
            category.includes("CYBER") ||
            category.includes("SECURITY")
        ) {

            return "⌁";

        }


        if (
            category.includes("AI")
        ) {

            return "◇";

        }


        return "◎";

    }


    /* =====================================================
       CREATE PROJECT CARD
    ===================================================== */

    function createCard(repo, config, index) {

        const card =
            document.createElement("article");

        card.className =
            "project-card";


        card.dataset.repo =
            repo.name;


        const tags =
            config.technologies
                .map(technology => `
                    <span class="project-tag">
                        ${escapeHTML(technology)}
                    </span>
                `)
                .join("");


        card.innerHTML = `

            <div class="project-top">

                <span class="project-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <span class="project-category">
                    ${escapeHTML(config.category)}
                </span>

            </div>


            <div class="project-icon">
                ${getIcon(config.category)}
            </div>


            <h3>
                ${escapeHTML(config.title)}
            </h3>


            <p>
                ${escapeHTML(config.description)}
            </p>


            <div class="project-tags">
                ${tags}
            </div>


            <div class="project-actions">

                <button
                    type="button"
                    class="view-project"
                    data-repo="${escapeHTML(repo.name)}">

                    VIEW PROJECT ↗

                </button>


                <a
                    class="github-project"
                    href="${escapeHTML(repo.html_url)}"
                    target="_blank"
                    rel="noopener noreferrer">

                    GITHUB ↗

                </a>

            </div>

        `;


        return card;

    }


    /* =====================================================
       LOAD GITHUB PROJECTS
    ===================================================== */

    async function loadProjects() {

        if (!projectsContainer) {
            return;
        }


        projectsContainer.innerHTML = `

            <div class="github-loading">
                CONNECTING TO GITHUB...
            </div>

        `;


        try {

            const response =
                await fetch(
                    GITHUB_API,
                    {
                        cache: "no-store",
                        headers: {
                            "Accept":
                                "application/vnd.github+json"
                        }
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `GitHub API Error: ${response.status}`
                );

            }


            const repositories =
                await response.json();


            /*
             * Remove unwanted repositories.
             */

            const filteredRepositories =
                repositories.filter(
                    repo => !shouldHide(repo)
                );


            /*
             * Convert GitHub repositories
             * into portfolio projects.
             */

            const projects = [];


            filteredRepositories.forEach(repo => {

                const config =
                    getConfig(repo);


                if (!config) {
                    return;
                }


                projects.push({
                    repo: repo,
                    config: config,
                    key: normalize(repo.name)
                });

            });


            /*
             * Remove duplicate projects.
             */

            const uniqueProjects = [];
            const usedTitles = new Set();


            projects.forEach(project => {

                const title =
                    project.config.title;


                if (usedTitles.has(title)) {
                    return;
                }


                usedTitles.add(title);

                uniqueProjects.push(project);

            });


            /*
             * Sort projects.
             */

            uniqueProjects.sort(
                (a, b) => {

                    const aName =
                        normalize(a.repo.name);

                    const bName =
                        normalize(b.repo.name);


                    const aIndex =
                        PROJECT_ORDER.indexOf(aName);

                    const bIndex =
                        PROJECT_ORDER.indexOf(bName);


                    return (
                        (aIndex === -1 ? 999 : aIndex) -
                        (bIndex === -1 ? 999 : bIndex)
                    );

                }
            );


            /*
             * Save repositories globally.
             */

            githubRepositories =
                uniqueProjects.map(
                    project => project.repo
                );


            window.githubRepositories =
                githubRepositories;


            /*
             * Clear container.
             */

            projectsContainer.innerHTML = "";


            /*
             * Create cards.
             */

            uniqueProjects.forEach(
                (project, index) => {

                    const card =
                        createCard(
                            project.repo,
                            project.config,
                            index
                        );


                    projectsContainer.appendChild(
                        card
                    );

                }
            );


            /*
             * No projects.
             */

            if (
                uniqueProjects.length === 0
            ) {

                projectsContainer.innerHTML = `

                    <div class="github-error">

                        <h3>
                            No projects found
                        </h3>

                        <p>
                            No configured GitHub projects were found.
                        </p>

                        <a
                            href="https://github.com/jalex00565-rgb?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer">

                            OPEN GITHUB ↗

                        </a>

                    </div>

                `;

            }

        }
        catch (error) {

            console.error(
                "GitHub connection error:",
                error
            );


            projectsContainer.innerHTML = `

                <div class="github-error">

                    <h3>
                        GitHub connection failed
                    </h3>

                    <p>
                        Please refresh the page and try again.
                    </p>

                    <a
                        href="https://github.com/jalex00565-rgb?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer">

                        OPEN GITHUB ↗

                    </a>

                </div>

            `;

        }

    }


    /* =====================================================
       OPEN PROJECT MODAL
    ===================================================== */

    function openModal(repo) {

        if (!repo || !modal) {
            return;
        }


        const config =
            getConfig(repo);


        if (!config) {
            return;
        }


        if (modalKicker) {

            modalKicker.textContent =
                config.category;

        }


        if (modalTitle) {

            modalTitle.textContent =
                config.title;

        }


        if (modalText) {

            modalText.textContent =
                config.description;

        }


        if (modalStack) {

            modalStack.innerHTML = "";


            config.technologies.forEach(
                technology => {

                    const tag =
                        document.createElement("span");

                    tag.className =
                        "modal-tag";

                    tag.textContent =
                        technology;

                    modalStack.appendChild(tag);

                }
            );


            const github =
                document.createElement("a");


            github.className =
                "repo-link";


            github.href =
                repo.html_url;


            github.target =
                "_blank";


            github.rel =
                "noopener noreferrer";


            github.textContent =
                "OPEN GITHUB REPOSITORY ↗";


            modalStack.appendChild(
                github
            );

        }


        modal.classList.add("open");

        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       VIEW PROJECT BUTTON
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".view-project"
                );


            if (!button) {
                return;
            }


            const repoName =
                button.dataset.repo;


            const repo =
                githubRepositories.find(
                    item =>
                        item.name === repoName
                );


            if (repo) {

                openModal(repo);

            }

        }
    );


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeModal() {

        if (!modal) {
            return;
        }


        modal.classList.remove(
            "open"
        );


        document.body.style.overflow =
            "";

    }


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


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


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


    /* =====================================================
       LOADER
    ===================================================== */

    function hideLoader() {

        if (!loader) {
            return;
        }


        loader.style.opacity =
            "0";


        loader.style.pointerEvents =
            "none";


        setTimeout(
            () => {

                loader.style.display =
                    "none";

            },
            500
        );

    }


    /* =====================================================
       START
    ===================================================== */

    loadProjects()
        .finally(() => {

            hideLoader();

        });


    /*
     * Safety fallback.
     */

    setTimeout(
        hideLoader,
        4000
    );

});
