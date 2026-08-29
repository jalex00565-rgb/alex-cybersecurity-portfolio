/* =========================================
   ALEX JACOB — CYBERSECURITY × AI PORTFOLIO
   GITHUB CONNECTED PROJECT SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       GITHUB CONFIGURATION
    ========================================= */

    const GITHUB_USERNAME = "jalex00565-rgb";

    const GITHUB_API =
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;


    /* =========================================
       PROJECT OVERRIDES
       Better titles/descriptions for important repos
    ========================================= */

    const PROJECT_OVERRIDES = {

        "JarvisAI": {
            title: "JARVIS AI",
            description:
                "A personal AI assistant built with Python, Streamlit and Gemini, with support for AI interaction, automation and future security-focused capabilities.",
            technologies: [
                "Python",
                "Streamlit",
                "Gemini AI",
                "AI Assistant"
            ]
        },

        "RAVEN-SOC": {
            title: "RAVEN SOC",
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
            description:
                "AI-powered Windows desktop assistant with voice interaction, memory, system monitoring and automation.",
            technologies: [
                "Python",
                "Windows",
                "Voice AI",
                "Automation"
            ]
        }
    };


    /* =========================================
       ELEMENTS
    ========================================= */

    const loader = document.getElementById("loader");
    const projectsContainer =
        document.querySelector(".projects");

    const modal = document.getElementById("modal");
    const closeButton = document.getElementById("close");

    const modalKicker =
        document.getElementById("modalKicker");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalText =
        document.getElementById("modalText");

    const modalStack =
        document.getElementById("modalStack");


    /* =========================================
       LOADER
    ========================================= */

    function hideLoader() {

        if (!loader) return;

        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        setTimeout(() => {

            if (loader) {
                loader.style.display = "none";
            }

        }, 600);
    }


    /* =========================================
       TECHNOLOGY DETECTION
    ========================================= */

    function detectTechnologies(repo) {

        const text = (
            `${repo.name} ${repo.description || ""}`
        ).toLowerCase();

        const technologies = [];

        if (
            text.includes("python") ||
            repo.language === "Python"
        ) {
            technologies.push("Python");
        }

        if (
            text.includes("javascript") ||
            repo.language === "JavaScript"
        ) {
            technologies.push("JavaScript");
        }

        if (
            text.includes("html") ||
            repo.language === "HTML"
        ) {
            technologies.push("HTML");
        }

        if (
            text.includes("css") ||
            repo.language === "CSS"
        ) {
            technologies.push("CSS");
        }

        if (
            text.includes("streamlit")
        ) {
            technologies.push("Streamlit");
        }

        if (
            text.includes("ai") ||
            text.includes("llm") ||
            text.includes("gemini")
        ) {
            technologies.push("AI");
        }

        if (
            text.includes("soc") ||
            text.includes("security")
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

        return technologies.slice(0, 4);
    }


    /* =========================================
       CATEGORY
    ========================================= */

    function determineCategory(repo) {

        const text = (
            `${repo.name} ${repo.description || ""}`
        ).toLowerCase();

        if (
            text.includes("jarvis") ||
            text.includes("ai") ||
            text.includes("llm")
        ) {
            return "AI / PYTHON";
        }

        if (
            text.includes("soc") ||
            text.includes("security") ||
            text.includes("cyber")
        ) {
            return "CYBERSECURITY";
        }

        if (
            text.includes("web") ||
            text.includes("portfolio")
        ) {
            return "WEB";
        }

        return repo.language
            ? repo.language.toUpperCase()
            : "PROJECT";
    }


    /* =========================================
       PROJECT TITLE
    ========================================= */

    function getProjectTitle(repo) {

        if (PROJECT_OVERRIDES[repo.name]) {
            return PROJECT_OVERRIDES[repo.name].title;
        }

        return repo.name
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, char => char.toUpperCase());
    }


    /* =========================================
       PROJECT DESCRIPTION
    ========================================= */

    function getProjectDescription(repo) {

        if (PROJECT_OVERRIDES[repo.name]) {
            return PROJECT_OVERRIDES[repo.name].description;
        }

        if (repo.description) {
            return repo.description;
        }

        return "A practical project developed as part of my cybersecurity, AI and software development work.";
    }


    /* =========================================
       PROJECT TECHNOLOGIES
    ========================================= */

    function getProjectTechnologies(repo) {

        if (PROJECT_OVERRIDES[repo.name]) {
            return PROJECT_OVERRIDES[repo.name].technologies;
        }

        return detectTechnologies(repo);
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

        const technologies =
            getProjectTechnologies(repo);

        const title =
            getProjectTitle(repo);

        const description =
            getProjectDescription(repo);

        const category =
            determineCategory(repo);


        article.innerHTML = `

            <div class="project-top">

                <span class="project-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <span class="project-category">
                    ${category}
                </span>

            </div>


            <div class="project-icon">

                ${
                    category.includes("AI")
                        ? "◇"
                        : category.includes("CYBER")
                            ? "⌁"
                            : "◎"
                }

            </div>


            <h3>
                ${escapeHTML(title)}
            </h3>


            <p>
                ${escapeHTML(description)}
            </p>


            <div class="project-tags">

                ${
                    technologies.map(
                        tech =>
                            `<span>${escapeHTML(tech)}</span>`
                    ).join("")
                }

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
                    href="${repo.html_url}"
                    target="_blank"
                    rel="noopener noreferrer">

                    GITHUB ↗

                </a>

            </div>

        `;

        return article;
    }


    /* =========================================
       HTML ESCAPE
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


            /* Only public non-fork repositories */

            const publicRepos =
                repos.filter(repo =>
                    !repo.fork &&
                    !repo.archived
                );


            if (publicRepos.length === 0) {

                projectsContainer.innerHTML = `
                    <p class="github-error">
                        No public GitHub projects found.
                    </p>
                `;

                return;
            }


            /* GitHub already returns updated repos,
               but sort again for safety */

            publicRepos.sort(
                (a, b) =>
                    new Date(b.updated_at) -
                    new Date(a.updated_at)
            );


            projectsContainer.innerHTML = "";


            publicRepos.forEach(
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


    /* =========================================
       MODAL
    ========================================= */

    function openProjectModal(repo) {

        if (!modal) return;

        const title =
            getProjectTitle(repo);

        const description =
            getProjectDescription(repo);

        const technologies =
            getProjectTechnologies(repo);


        if (modalKicker) {
            modalKicker.textContent =
                determineCategory(repo);
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
       VIEW PROJECT
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
                window.githubRepositories
                    ?.find(
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


    /* =========================================
       NAVIGATION
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
        .then(() => {

            hideLoader();

        })
        .catch(() => {

            hideLoader();

        });


    /* Safety fallback */

    setTimeout(
        hideLoader,
        3000
    );

});
