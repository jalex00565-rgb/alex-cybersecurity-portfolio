/* =========================================
   ALEX JACOB — CYBERSECURITY × AI PORTFOLIO
   GITHUB CONNECTED PROJECT SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const GITHUB_USERNAME = "jalex00565-rgb";

    const GITHUB_API =
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

    /* =========================================
       PROJECT CONFIGURATION
    ========================================= */

    const PROJECT_OVERRIDES = {

        "JarvisAI": {
            title: "JARVIS AI",
            category: "AI / PYTHON",
            description:
                "A personal AI assistant built with Python, Streamlit and Gemini, with support for AI interaction, automation and security-focused capabilities.",
            technologies: [
                "Python",
                "Streamlit",
                "Gemini AI",
                "AI Assistant"
            ]
        },

        "RAVEN-SOC": {
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

        "JARVIS-AI-Desktop": {
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

        "SOC-Incident-Analyzer": {
            title: "SOC INCIDENT ANALYZER",
            category: "CYBERSECURITY",
            description:
                "SOC incident analysis workflow for log analysis, incident detection, risk scoring and AI-assisted investigation.",
            technologies: [
                "Python",
                "AI",
                "Cybersecurity",
                "Log Analysis"
            ]
        },

        "LOCAL-AI-SECURITY-ASSISTANT": {
            title: "LOCAL AI SECURITY ASSISTANT",
            category: "AI / SECURITY",
            description:
                "An offline AI security assistant using Ollama for local document analysis, cybersecurity knowledge and AI-assisted security workflows.",
            technologies: [
                "Python",
                "Ollama",
                "Local AI",
                "Cybersecurity"
            ]
        },

        "Local-AI-Security-Assistant": {
            title: "LOCAL AI SECURITY ASSISTANT",
            category: "AI / SECURITY",
            description:
                "An offline AI security assistant using Ollama for local document analysis, cybersecurity knowledge and AI-assisted security workflows.",
            technologies: [
                "Python",
                "Ollama",
                "Local AI",
                "Cybersecurity"
            ]
        }
    };


    /* =========================================
       PROJECT ORDER
    ========================================= */

    const PROJECT_ORDER = [
        "JarvisAI",
        "RAVEN-SOC",
        "JARVIS-AI-Desktop",
        "LOCAL-AI-SECURITY-ASSISTANT",
        "Local-AI-Security-Assistant",
        "SOC-Incident-Analyzer"
    ];


    /* =========================================
       ELEMENTS
    ========================================= */

    const loader = document.getElementById("loader");

    const projectsContainer =
        document.querySelector(".projects");

    const modal =
        document.getElementById("modal");

    const closeButton =
        document.getElementById("close");

    const modalKicker =
        document.getElementById("modalKicker");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalText =
        document.getElementById("modalText");

    const modalStack =
        document.getElementById("modalStack");


    /* =========================================
       GLOBAL REPOSITORY STORAGE
    ========================================= */

    window.githubRepositories = [];


    /* =========================================
       LOADER
    ========================================= */

    function hideLoader() {

        if (!loader) return;

        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        setTimeout(() => {

            loader.style.display = "none";

        }, 600);
    }


    /* =========================================
       ESCAPE HTML
    ========================================= */

    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =========================================
       GET OVERRIDE
    ========================================= */

    function getOverride(repo) {

        return PROJECT_OVERRIDES[repo.name] || null;
    }


    /* =========================================
       TECHNOLOGY DETECTION
    ========================================= */

    function detectTechnologies(repo) {

        const text =
            `${repo.name} ${repo.description || ""}`.toLowerCase();

        const technologies = [];

        if (
            text.includes("python") ||
            repo.language === "Python"
        ) {
            technologies.push("Python");
        }

        if (
            text.includes("ollama")
        ) {
            technologies.push("Ollama");
        }

        if (
            text.includes("streamlit")
        ) {
            technologies.push("Streamlit");
        }

        if (
            text.includes("gemini") ||
            text.includes("llm") ||
            text.includes(" ai")
        ) {
            technologies.push("AI");
        }

        if (
            text.includes("security") ||
            text.includes("cyber") ||
            text.includes("soc")
        ) {
            technologies.push("Cybersecurity");
        }

        if (
            text.includes("log")
        ) {
            technologies.push("Log Analysis");
        }

        if (
            text.includes("automation")
        ) {
            technologies.push("Automation");
        }

        if (technologies.length === 0 && repo.language) {
            technologies.push(repo.language);
        }

        return [...new Set(technologies)].slice(0, 4);
    }


    /* =========================================
       PROJECT TITLE
    ========================================= */

    function getProjectTitle(repo) {

        const override = getOverride(repo);

        if (override) {
            return override.title;
        }

        return repo.name
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, char => char.toUpperCase());
    }


    /* =========================================
       PROJECT DESCRIPTION
    ========================================= */

    function getProjectDescription(repo) {

        const override = getOverride(repo);

        if (override) {
            return override.description;
        }

        if (repo.description) {
            return repo.description;
        }

        return "A practical project developed as part of my cybersecurity, AI and software development work.";
    }


    /* =========================================
       PROJECT CATEGORY
    ========================================= */

    function getProjectCategory(repo) {

        const override = getOverride(repo);

        if (override) {
            return override.category;
        }

        const text =
            `${repo.name} ${repo.description || ""}`.toLowerCase();

        if (
            text.includes("security") ||
            text.includes("cyber") ||
            text.includes("soc")
        ) {
            return "CYBERSECURITY";
        }

        if (
            text.includes("ai") ||
            text.includes("ollama") ||
            text.includes("llm")
        ) {
            return "AI / PYTHON";
        }

        return repo.language
            ? repo.language.toUpperCase()
            : "PROJECT";
    }


    /* =========================================
       PROJECT TECHNOLOGIES
    ========================================= */

    function getProjectTechnologies(repo) {

        const override = getOverride(repo);

        if (override) {
            return override.technologies;
        }

        return detectTechnologies(repo);
    }


    /* =========================================
       PROJECT ICON
    ========================================= */

    function getProjectIcon(category) {

        if (category.includes("AI")) {
            return "◇";
        }

        if (category.includes("CYBER")) {
            return "⌁";
        }

        return "◎";
    }


    /* =========================================
       CREATE PROJECT CARD
    ========================================= */

    function createProjectCard(repo, index) {

        const article =
            document.createElement("article");

        article.className = "project-card";

        article.dataset.project =
            repo.name;

        const title =
            getProjectTitle(repo);

        const description =
            getProjectDescription(repo);

        const category =
            getProjectCategory(repo);

        const technologies =
            getProjectTechnologies(repo);

        article.innerHTML = `

            <div class="project-top">

                <span class="project-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <span class="project-category">
                    ${escapeHTML(category)}
                </span>

            </div>


            <div class="project-icon">

                ${getProjectIcon(category)}

            </div>


            <h3>
                ${escapeHTML(title)}
            </h3>


            <p>
                ${escapeHTML(description)}
            </p>


            <div class="project-tags">

                ${technologies.map(tech => `
                    <span>
                        ${escapeHTML(tech)}
                    </span>
                `).join("")}

            </div>


            <div class="project-actions">

                <button
                    class="view-project"
                    type="button"
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

        return article;
    }


    /* =========================================
       LOAD GITHUB PROJECTS
    ========================================= */

    async function loadGitHubProjects() {

        if (!projectsContainer) return;

        projectsContainer.innerHTML = `

            <div class="github-loading">

                <span></span>

                CONNECTING TO GITHUB...

            </div>

        `;


        try {

            const response =
                await fetch(GITHUB_API, {
                    method: "GET",
                    cache: "no-store",
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


            const repos =
                await response.json();


            /* =========================================
               ONLY PUBLIC ACTIVE REPOSITORIES
            ========================================= */

            const publicRepos =
                repos.filter(repo => {

                    if (repo.fork) return false;
                    if (repo.archived) return false;

                    const name =
                        repo.name.toLowerCase();

                    /* Remove portfolio repo */

                    if (
                        name ===
                        "alex-cybersecurity-portfolio"
                    ) {
                        return false;
                    }

                    /* Remove Music App Backend */

                    if (
                        name ===
                        "music-app-backend"
                    ) {
                        return false;
                    }

                    return true;

                });


            /* =========================================
               ONLY SELECTED PROJECTS
            ========================================= */

            const selectedRepos =
                publicRepos.filter(repo => {

                    return PROJECT_ORDER.includes(
                        repo.name
                    );

                });


            /* =========================================
               SORT USING PROJECT ORDER
            ========================================= */

            selectedRepos.sort(
                (a, b) => {

                    const aIndex =
                        PROJECT_ORDER.indexOf(a.name);

                    const bIndex =
                        PROJECT_ORDER.indexOf(b.name);

                    return aIndex - bIndex;

                }
            );


            /* Save for modal */

            window.githubRepositories =
                selectedRepos;


            projectsContainer.innerHTML = "";


            if (selectedRepos.length === 0) {

                projectsContainer.innerHTML = `

                    <div class="github-error">

                        <strong>
                            No selected projects found.
                        </strong>

                        <p>
                            Check your GitHub repository names.
                        </p>

                        <a
                            href="https://github.com/jalex00565-rgb?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer">

                            OPEN GITHUB ↗

                        </a>

                    </div>

                `;

                return;
            }


            selectedRepos.forEach(
                (repo, index) => {

                    projectsContainer.appendChild(
                        createProjectCard(
                            repo,
                            index
                        )
                    );

                }
            );


        } catch (error) {

            console.error(
                "GitHub connection failed:",
                error
            );


            projectsContainer.innerHTML = `

                <div class="github-error">

                    <strong>
                        GitHub projects could not be loaded.
                    </strong>

                    <p>
                        Please refresh the page.
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


    /* =========================================
       OPEN PROJECT MODAL
    ========================================= */

    function openProjectModal(repo) {

        if (!modal || !repo) return;


        const title =
            getProjectTitle(repo);

        const description =
            getProjectDescription(repo);

        const technologies =
            getProjectTechnologies(repo);

        const category =
            getProjectCategory(repo);


        if (modalKicker) {

            modalKicker.textContent =
                category;

        }


        if (modalTitle) {

            modalTitle.textContent =
                title;

        }


        if (modalText) {

            modalText.textContent =
                description;

        }


        if (modalStack) {

            modalStack.innerHTML = "";


            technologies.forEach(
                technology => {

                    const tag =
                        document.createElement("span");

                    tag.textContent =
                        technology;

                    modalStack.appendChild(tag);

                }
            );


            const githubLink =
                document.createElement("a");

            githubLink.href =
                repo.html_url;

            githubLink.target =
                "_blank";

            githubLink.rel =
                "noopener noreferrer";

            githubLink.className =
                "repo-link";

            githubLink.textContent =
                "OPEN GITHUB REPOSITORY ↗";

            modalStack.appendChild(
                githubLink
            );

        }


        modal.classList.add("open");

        document.body.style.overflow =
            "hidden";
    }


    /* =========================================
       VIEW PROJECT BUTTON
    ========================================= */

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".view-project"
                );

            if (!button) return;


            const repoName =
                button.dataset.repo;


            const repo =
                window.githubRepositories.find(
                    item =>
                        item.name === repoName
                );


            if (repo) {

                openProjectModal(repo);

            }

        }
    );


    /* =========================================
       CLOSE MODAL
    ========================================= */

    function closeModal() {

        if (!modal) return;

        modal.classList.remove("open");

        document.body.style.overflow = "";

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


    /* =========================================
       SMOOTH NAVIGATION
    ========================================= */

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


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =========================================
       START
    ========================================= */

    loadGitHubProjects()
        .finally(() => {

            hideLoader();

        });


    /* Safety fallback */

    setTimeout(
        hideLoader,
        3000
    );

});
