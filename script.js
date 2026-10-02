/* =========================================================
   ALEX JACOB — CYBERSECURITY × AI PORTFOLIO
   LIVE GITHUB PROJECT SYNC
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const GITHUB_USERNAME = "jalex00565-rgb";

    const GITHUB_API =
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

    const projectContainer =
        document.querySelector(".projects");

    const loader =
        document.getElementById("loader");

    const modal =
        document.getElementById("modal");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalText =
        document.getElementById("modalText");

    const modalKicker =
        document.getElementById("modalKicker");

    const modalStack =
        document.getElementById("modalStack");

    const closeButton =
        document.getElementById("close");


    /* =====================================================
       IMPORTANT PROJECT CONFIG
    ===================================================== */

    const PROJECT_CONFIG = {

        "jarvisai": {
            title: "JARVIS AI",
            category: "AI / PYTHON",
            description:
                "Personal AI assistant built with Python, Streamlit and Gemini. Foundation for voice interaction, file analysis, memory and SOC assistance.",
            tags: [
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
            tags: [
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
            tags: [
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
            tags: [
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
                "A local AI security assistant using Ollama for private document analysis, cybersecurity knowledge and AI-assisted security workflows.",
            tags: [
                "Python",
                "Ollama",
                "Local AI",
                "Cybersecurity"
            ]
        },

        "friday-assistant": {
            title: "FRIDAY AI ASSISTANT",
            category: "AI / PYTHON",
            description:
                "Local desktop AI assistant built with Python, featuring voice interaction, AI capabilities, system automation and intelligent assistance.",
            tags: [
                "Python",
                "AI",
                "Voice Assistant",
                "Automation"
            ]
        },

        "astra-local-ai": {
            title: "ASTRA LOCAL AI",
            category: "AI / PYTHON",
            description:
                "A local AI project focused on private, intelligent and locally controlled AI workflows.",
            tags: [
                "Python",
                "Local AI",
                "AI Assistant",
                "Automation"
            ]
        }

    };


    /* =====================================================
       GITHUB REPOSITORIES
    ===================================================== */

    let githubRepositories = [];


    /* =====================================================
       NORMALIZE REPOSITORY NAME
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
       FORMAT NEW PROJECT TITLE
    ===================================================== */

    function formatTitle(name) {

        return String(name || "")
            .replace(/[-_]+/g, " ")
            .replace(/\bai\b/gi, "AI")
            .replace(/\bsoc\b/gi, "SOC")
            .replace(/\bapi\b/gi, "API")
            .replace(/\bllm\b/gi, "LLM")
            .replace(/\bpython\b/gi, "Python")
            .replace(/\bwindows\b/gi, "Windows")
            .replace(/\bdesktop\b/gi, "Desktop")
            .replace(/\bsecurity\b/gi, "Security")
            .replace(/\bcybersecurity\b/gi, "Cybersecurity")
            .replace(/\b\w/g, char =>
                char.toUpperCase()
            );

    }


    /* =====================================================
       AUTO CATEGORY
    ===================================================== */

    function detectCategory(repo) {

        const text =
            `${repo.name} ${repo.description || ""} ${repo.language || ""}`
                .toLowerCase();

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
            text.includes("ollama") ||
            text.includes("gemini")
        ) {

            return "AI / PYTHON";

        }

        return "PROJECT";

    }


    /* =====================================================
       AUTO TECHNOLOGY TAGS
    ===================================================== */

    function detectTags(repo) {

        const text =
            `${repo.name} ${repo.description || ""} ${repo.language || ""}`
                .toLowerCase();

        const tags = [];


        if (repo.language) {

            tags.push(repo.language);

        }


        if (
            text.includes("python") &&
            !tags.includes("Python")
        ) {

            tags.push("Python");

        }


        if (
            text.includes("javascript") &&
            !tags.includes("JavaScript")
        ) {

            tags.push("JavaScript");

        }


        if (text.includes("streamlit")) {

            tags.push("Streamlit");

        }


        if (text.includes("ollama")) {

            tags.push("Ollama");

        }


        if (
            text.includes("ai") ||
            text.includes("llm") ||
            text.includes("assistant")
        ) {

            tags.push("AI");

        }


        if (
            text.includes("security") ||
            text.includes("cyber") ||
            text.includes("soc")
        ) {

            tags.push("Cybersecurity");

        }


        if (text.includes("automation")) {

            tags.push("Automation");

        }


        if (tags.length === 0) {

            tags.push("GitHub Project");

        }


        return [
            ...new Set(tags)
        ].slice(0, 4);

    }


    /* =====================================================
       GET PROJECT CONFIG
    ===================================================== */

    function getProjectConfig(repo) {

        const name =
            normalize(repo.name);


        /* Known project */

        if (
            PROJECT_CONFIG[name]
        ) {

            return PROJECT_CONFIG[name];

        }


        /* New GitHub project */

        return {

            title:
                formatTitle(repo.name),

            category:
                detectCategory(repo),

            description:
                repo.description ||
                "A project developed by Alex Jacob.",

            tags:
                detectTags(repo)

        };

    }


    /* =====================================================
       HIDE UNWANTED REPOSITORIES
    ===================================================== */

    function shouldHide(repo) {

        const name =
            normalize(repo.name);


        /* Hide portfolio itself */

        if (
            name ===
            "alex-cybersecurity-portfolio"
        ) {

            return true;

        }


        /* Hide music backend */

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


        /* Hide forks */

        if (repo.fork) {

            return true;

        }


        /* Hide archived projects */

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

    function createProjectCard(
        repo,
        config,
        index
    ) {

        const card =
            document.createElement("article");

        card.className =
            "project-card";


        card.dataset.repo =
            repo.name;


        const tags =
            config.tags
                .map(tag => `
                    <span>
                        ${escapeHTML(tag)}
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

                <a
                    class="project-link"
                    href="${escapeHTML(repo.html_url)}"
                    target="_blank"
                    rel="noopener noreferrer">

                    VIEW PROJECT ↗

                </a>

            </div>

        `;


        return card;

    }


    /* =====================================================
       LOAD PROJECTS FROM GITHUB
    ===================================================== */

    async function loadProjects() {

        if (!projectContainer) {

            return;

        }


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


            /* Filter */

            const filteredRepositories =
                repositories
                    .filter(
                        repo =>
                            !shouldHide(repo)
                    )
                    .sort(
                        (a, b) =>
                            new Date(
                                b.updated_at
                            ) -
                            new Date(
                                a.updated_at
                            )
                    );


            githubRepositories =
                filteredRepositories;


            window.githubRepositories =
                githubRepositories;


            /* Clear old projects */

            projectContainer.innerHTML =
                "";


            /* Create project cards */

            filteredRepositories.forEach(
                (repo, index) => {

                    const config =
                        getProjectConfig(repo);


                    const card =
                        createProjectCard(
                            repo,
                            config,
                            index
                        );


                    projectContainer.appendChild(
                        card
                    );

                }
            );


            console.log(
                "GitHub projects synced:",
                filteredRepositories.length
            );

        }
        catch (error) {

            console.error(
                "GitHub sync failed:",
                error
            );


            projectContainer.innerHTML = `

                <div class="github-error">

                    <h3>
                        GitHub connection failed
                    </h3>

                    <p>
                        Please refresh the website.
                    </p>

                </div>

            `;

        }

    }


    /* =====================================================
       OPEN PROJECT MODAL
    ===================================================== */

    function openModal(repo) {

        if (
            !repo ||
            !modal
        ) {

            return;

        }


        const config =
            getProjectConfig(repo);


        if (modalKicker) {

            modalKicker.textContent =
                `${config.category}`;

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


            config.tags.forEach(
                tag => {

                    const element =
                        document.createElement("span");

                    element.textContent =
                        tag;

                    modalStack.appendChild(
                        element
                    );

                }
            );


            const githubLink =
                document.createElement("a");


            githubLink.className =
                "modal-github";


            githubLink.href =
                repo.html_url;


            githubLink.target =
                "_blank";


            githubLink.rel =
                "noopener noreferrer";


            githubLink.textContent =
                "GITHUB REPOSITORY ↗";


            modalStack.appendChild(
                githubLink
            );

        }


        modal.classList.add(
            "active"
        );


        document.body.classList.add(
            "modal-open"
        );

    }


    /* =====================================================
       PROJECT CARD CLICK
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            const card =
                event.target.closest(
                    ".project-card"
                );


            if (!card) {

                return;

            }


            /* Don't intercept GitHub button */

            if (
                event.target.closest("a") ||
                event.target.closest("button")
            ) {

                return;

            }


            const repoName =
                card.dataset.repo;


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
            "active"
        );


        document.body.classList.remove(
            "modal-open"
        );

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
       SMOOTH NAVIGATION
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


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


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            '.nav nav a[href^="#"]'
        );


    if (
        sections.length &&
        navLinks.length
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                navLinks.forEach(
                                    link =>
                                        link.classList.remove(
                                            "active"
                                        )
                                );


                                const activeLink =
                                    document.querySelector(
                                        `.nav nav a[href="#${entry.target.id}"]`
                                    );


                                if (activeLink) {

                                    activeLink.classList.add(
                                        "active"
                                    );

                                }

                            }

                        }
                    );

                },
                {
                    threshold: 0.25
                }
            );


        sections.forEach(
            section =>
                observer.observe(section)
        );

    }


    /* =====================================================
       TERMINAL CURSOR
    ===================================================== */

    const cursors =
        document.querySelectorAll(
            ".cursor"
        );


    cursors.forEach(
        cursor => {

            let visible = true;


            setInterval(
                () => {

                    visible =
                        !visible;


                    cursor.style.opacity =
                        visible
                            ? "1"
                            : "0";

                },
                500
            );

        }
    );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section, .skill, .time-item, .profile-terminal"
        );


    if (
        revealElements.length
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.08
                }
            );


        revealElements.forEach(
            element =>
                revealObserver.observe(
                    element
                )
        );

    }


    /* =====================================================
       LOADER
    ===================================================== */

    function hideLoader() {

        if (!loader) {

            return;

        }


        loader.classList.add(
            "hidden"
        );


        setTimeout(
            () => {

                loader.style.display =
                    "none";

            },
            700
        );

    }


    /* =====================================================
       START
    ===================================================== */

    loadProjects()
        .finally(
            () => {

                hideLoader();

            }
        );


    /* =====================================================
       AUTO SYNC
       Every 5 minutes while website is open.
    ===================================================== */

    setInterval(
        loadProjects,
        5 * 60 * 1000
    );


    /* Safety fallback */

    setTimeout(
        hideLoader,
        4000
    );


    /* Console */

    console.log(
        "%c ALEX JACOB — GITHUB PROJECT SYSTEM ",
        "color:#69f0ae;font-weight:bold;"
    );

    console.log(
        "Automatic GitHub project sync enabled."
    );

});
