/* =========================================================
   ALEX JACOB — CYBERSECURITY × AI PORTFOLIO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const GITHUB_USERNAME = "jalex00565-rgb";

    const GITHUB_API =
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

    const OLLAMA_API =
        "https://api.github.com/repos/ollama/ollama/releases/latest";

    const projectsContainer =
        document.querySelector(".projects");

    const loader =
        document.getElementById("loader");

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


    /* =========================================================
       PROJECT CONFIGURATION
    ========================================================= */

    const PROJECT_CONFIG = {

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

        "RAVEN-SOC": {
            k: "CYBERSECURITY",
            t: "RAVEN SOC",
            d: "A cybersecurity-focused SOC project for security monitoring, log analysis, detection and incident investigation.",
            s: [
                "Python",
                "SOC",
                "Log Analysis",
                "Detection"
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
        },

        "SOC-Incident-Analyzer": {
            k: "CYBERSECURITY",
            t: "SOC INCIDENT ANALYZER",
            d: "SOC Incident Analyzer for log analysis, incident detection, risk scoring and AI-assisted security analysis.",
            s: [
                "Python",
                "AI",
                "Cybersecurity",
                "Log Analysis"
            ],
            icon: "⌁"
        }

    };


    /* =========================================================
       LOCAL AI / OLLAMA PROJECT
    ========================================================= */

    const LOCAL_AI_PROJECT = {

        k: "AI / SECURITY",

        t: "LOCAL AI SECURITY ASSISTANT",

        d: "A local AI security assistant using Ollama for private document analysis, cybersecurity knowledge and AI-assisted security workflows.",

        s: [
            "Python",
            "Ollama",
            "Local AI",
            "Cybersecurity"
        ],

        icon: "◎",

        repo: null,

        ollamaVersion: "Checking latest version..."

    };


    const PROJECT_ORDER = [
        "JarvisAI",
        "RAVEN-SOC",
        "JARVIS-AI-Desktop",
        "SOC-Incident-Analyzer"
    ];


    let githubRepositories = [];

    const projects = {};


    /* =========================================================
       NORMALIZE
    ========================================================= */

    function normalize(value) {

        return String(value || "")
            .toLowerCase()
            .replace(/[\s_]+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .trim();

    }


    /* =========================================================
       FIND PROJECT CONFIG
    ========================================================= */

    function getProjectConfig(repo) {

        if (!repo) {
            return null;
        }

        const exact =
            PROJECT_CONFIG[repo.name];

        if (exact) {
            return exact;
        }

        const name =
            normalize(repo.name);

        for (
            const key of Object.keys(PROJECT_CONFIG)
        ) {

            if (
                normalize(key) === name
            ) {

                return PROJECT_CONFIG[key];

            }

        }

        return null;

    }


    /* =========================================================
       HIDE UNWANTED REPOSITORIES
    ========================================================= */

    function shouldHide(repo) {

        const name =
            normalize(repo.name);

        if (
            name === "alex-cybersecurity-portfolio"
        ) {
            return true;
        }

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

        if (repo.fork) {
            return true;
        }

        if (repo.archived) {
            return true;
        }

        return false;

    }


    /* =========================================================
       LOAD LATEST OLLAMA VERSION
    ========================================================= */

    async function loadOllamaVersion() {

        try {

            const response =
                await fetch(
                    OLLAMA_API,
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
                    `Ollama API Error: ${response.status}`
                );

            }


            const release =
                await response.json();


            let version =
                release.tag_name ||
                release.name ||
                "Unknown";


            /*
             * Make sure it displays as vX.X.X
             */

            if (
                !version.startsWith("v")
            ) {

                version =
                    "v" + version;

            }


            LOCAL_AI_PROJECT.ollamaVersion =
                version;


            console.log(
                "Latest Ollama version:",
                version
            );

        }
        catch (error) {

            console.error(
                "Ollama version loading failed:",
                error
            );


            LOCAL_AI_PROJECT.ollamaVersion =
                "Latest version unavailable";

        }

    }


    /* =========================================================
       REGISTER GITHUB PROJECT
    ========================================================= */

    function registerGitHubProject(repo) {

        const config =
            getProjectConfig(repo);

        if (!config) {
            return;
        }

        projects[repo.name] = {

            k: config.k,

            t: config.t,

            d: config.d,

            s: config.s,

            icon: config.icon,

            repo: repo.html_url,

            githubData: repo

        };

    }


    /* =========================================================
       CREATE PROJECT CARD
       Uses original CSS classes.
    ========================================================= */

    function createProjectCard(
        project,
        projectId,
        index
    ) {

        const card =
            document.createElement("article");

        card.className =
            "card";


        if (index === 0) {

            card.classList.add(
                "featured"
            );

        }


        /* TOP */

        const top =
            document.createElement("div");

        top.className =
            "card-top";


        const number =
            document.createElement("span");

        number.textContent =
            String(index + 1).padStart(2, "0");


        const category =
            document.createElement("span");

        category.textContent =
            project.k;


        top.appendChild(number);
        top.appendChild(category);


        /* ICON */

        const icon =
            document.createElement("div");

        icon.className =
            "icon";

        icon.textContent =
            project.icon || "◇";


        /* TITLE */

        const title =
            document.createElement("h3");

        title.textContent =
            project.t;


        /* DESCRIPTION */

        const description =
            document.createElement("p");

        description.textContent =
            project.d;


        /* TAGS */

        const tags =
            document.createElement("div");

        tags.className =
            "tags";


        project.s.forEach(tag => {

            const tagElement =
                document.createElement("b");

            tagElement.textContent =
                tag;

            tags.appendChild(
                tagElement
            );

        });


        /* OLLAMA VERSION */

        if (
            projectId === "localai"
        ) {

            const version =
                document.createElement("p");

            version.className =
                "ollama-version";

            version.textContent =
                `OLLAMA LATEST: ${project.ollamaVersion}`;

            card.appendChild(
                top
            );

            card.appendChild(
                icon
            );

            card.appendChild(
                title
            );

            card.appendChild(
                description
            );

            card.appendChild(
                tags
            );

            card.appendChild(
                version
            );

        }
        else {

            card.appendChild(top);
            card.appendChild(icon);
            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(tags);

        }


        /* VIEW PROJECT */

        const viewButton =
            document.createElement("button");

        viewButton.type =
            "button";

        viewButton.className =
            "details";

        viewButton.dataset.project =
            projectId;

        viewButton.textContent =
            "VIEW PROJECT ↗";


        card.appendChild(
            viewButton
        );


        /* GITHUB */

        if (project.repo) {

            const githubLink =
                document.createElement("a");

            githubLink.className =
                "details";

            githubLink.href =
                project.repo;

            githubLink.target =
                "_blank";

            githubLink.rel =
                "noopener noreferrer";

            githubLink.textContent =
                "GITHUB REPOSITORY ↗";

            card.appendChild(
                githubLink
            );

        }


        return card;

    }


    /* =========================================================
       RENDER PROJECTS
    ========================================================= */

    function renderProjects() {

        if (!projectsContainer) {
            return;
        }


        projectsContainer.innerHTML =
            "";


        let index = 0;


        /* GitHub projects */

        PROJECT_ORDER.forEach(
            repoName => {

                const project =
                    projects[repoName];


                if (!project) {
                    return;
                }


                const card =
                    createProjectCard(
                        project,
                        repoName,
                        index
                    );


                projectsContainer.appendChild(
                    card
                );


                index++;

            }
        );


        /* Ollama project */

        const ollamaCard =
            createProjectCard(
                LOCAL_AI_PROJECT,
                "localai",
                index
            );


        projectsContainer.appendChild(
            ollamaCard
        );

    }


    /* =========================================================
       LOAD GITHUB PROJECTS
    ========================================================= */

    async function loadGitHubProjects() {

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


            githubRepositories =
                repositories.filter(
                    repo =>
                        !shouldHide(repo)
                );


            githubRepositories.forEach(
                repo => {

                    registerGitHubProject(
                        repo
                    );

                }
            );


        }
        catch (error) {

            console.error(
                "GitHub loading failed:",
                error
            );

        }

    }


    /* =========================================================
       MODAL
    ========================================================= */

    function openModal(projectId) {

        let project;


        if (
            projectId === "localai"
        ) {

            project =
                LOCAL_AI_PROJECT;

        }
        else {

            project =
                projects[projectId];

        }


        if (!project || !modal) {
            return;
        }


        modalKicker.textContent =
            project.k;


        modalTitle.textContent =
            project.t;


        modalText.textContent =
            project.d;


        modalStack.innerHTML =
            "";


        project.s.forEach(tag => {

            const span =
                document.createElement(
                    "span"
                );

            span.textContent =
                tag;

            modalStack.appendChild(
                span
            );

        });


        if (
            projectId === "localai"
        ) {

            const version =
                document.createElement(
                    "span"
                );

            version.textContent =
                `Ollama ${project.ollamaVersion}`;

            modalStack.appendChild(
                version
            );

        }


        if (project.repo) {

            const link =
                document.createElement(
                    "a"
                );

            link.className =
                "repo-link";

            link.href =
                project.repo;

            link.target =
                "_blank";

            link.rel =
                "noopener noreferrer";

            link.textContent =
                "VIEW GITHUB REPOSITORY ↗";

            modalStack.appendChild(
                link
            );

        }


        modal.classList.add(
            "open"
        );


        document.body.style.overflow =
            "hidden";

    }


    /* =========================================================
       VIEW PROJECT
    ========================================================= */

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".details[data-project]"
                );


            if (!button) {
                return;
            }


            openModal(
                button.dataset.project
            );

        }
    );


    /* =========================================================
       CLOSE MODAL
    ========================================================= */

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


    /* =========================================================
       SMOOTH NAVIGATION
    ========================================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

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


    /* =========================================================
       LOADER
    ========================================================= */

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
            600
        );

    }


    /* =========================================================
       START
    ========================================================= */

    async function start() {

        await Promise.all([
            loadGitHubProjects(),
            loadOllamaVersion()
        ]);


        renderProjects();

        hideLoader();

    }


    start();


    /* Safety fallback */

    setTimeout(
        hideLoader,
        5000
    );

});
