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


    /* =====================================================
       IMPORTANT PROJECT DETAILS
    ===================================================== */

    const PROJECT_CONFIG = {

        "JarvisAI": {
            title: "JARVIS AI",
            category: "AI / PYTHON",
            description:
                "Personal AI assistant built with Python, Streamlit and AI technologies.",
            tags: [
                "Python",
                "Streamlit",
                "AI Assistant"
            ]
        },

        "RAVEN-SOC": {
            title: "RAVEN SOC",
            category: "CYBERSECURITY",
            description:
                "Cybersecurity SOC project focused on security monitoring, log analysis and incident investigation.",
            tags: [
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
                "AI-powered Windows desktop assistant with automation and intelligent assistance.",
            tags: [
                "Python",
                "Windows",
                "AI",
                "Automation"
            ]
        },

        "SOC-Incident-Analyzer": {
            title: "SOC INCIDENT ANALYZER",
            category: "CYBERSECURITY",
            description:
                "SOC incident analysis project for log analysis, detection and security investigation.",
            tags: [
                "Python",
                "SOC",
                "Detection",
                "Log Analysis"
            ]
        },

        "friday_assistant": {
            title: "FRIDAY AI ASSISTANT",
            category: "AI / PYTHON",
            description:
                "Local AI desktop assistant built with Python for intelligent assistance and automation.",
            tags: [
                "Python",
                "AI",
                "Automation",
                "Assistant"
            ]
        },

        "Astra-local-AI": {
            title: "ASTRA LOCAL AI",
            category: "AI / PYTHON",
            description:
                "Local AI project focused on private and locally controlled intelligent AI workflows.",
            tags: [
                "Python",
                "Local AI",
                "AI Assistant",
                "Automation"
            ]
        }

    };


    /* =====================================================
       HIDE UNWANTED REPOSITORIES
    ===================================================== */

    function shouldHide(repo) {

        const name =
            repo.name.toLowerCase();

        /* Hide portfolio itself */

        if (
            name ===
            "alex-cybersecurity-portfolio"
        ) {
            return true;
        }

        /* Hide forks */

        if (repo.fork) {
            return true;
        }

        /* Hide archived repositories */

        if (repo.archived) {
            return true;
        }

        /* Hide music backend */

        if (
            name.includes("music-backend") ||
            name.includes("music-app-backend")
        ) {
            return true;
        }

        return false;
    }


    /* =====================================================
       FORMAT TITLE
    ===================================================== */

    function formatTitle(name) {

        return name
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
            .replace(/\b\w/g, c =>
                c.toUpperCase()
            );
    }


    /* =====================================================
       DETECT CATEGORY
    ===================================================== */

    function detectCategory(repo) {

        const text =
            `${repo.name} ${repo.description || ""} ${repo.language || ""}`
                .toLowerCase();

        if (
            text.includes("security") ||
            text.includes("cyber") ||
            text.includes("soc") ||
            text.includes("malware") ||
            text.includes("threat") ||
            text.includes("incident")
        ) {
            return "CYBERSECURITY";
        }

        if (
            text.includes("ai") ||
            text.includes("assistant") ||
            text.includes("ollama") ||
            text.includes("llm")
        ) {
            return "AI / PYTHON";
        }

        return "PROJECT";
    }


    /* =====================================================
       DETECT TAGS
    ===================================================== */

    function detectTags(repo) {

        const text =
            `${repo.name} ${repo.description || ""} ${repo.language || ""}`
                .toLowerCase();

        const tags = [];


        if (repo.language) {

            tags.push(repo.language);

        }


        if (text.includes("python")) {

            tags.push("Python");

        }


        if (text.includes("javascript")) {

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
            text.includes("assistant") ||
            text.includes("llm")
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
       GET PROJECT INFORMATION
    ===================================================== */

    function getProjectInfo(repo) {

        if (
            PROJECT_CONFIG[repo.name]
        ) {

            return PROJECT_CONFIG[
                repo.name
            ];

        }


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
        info,
        index
    ) {

        const card =
            document.createElement("article");

        card.className =
            "project-card";

        card.dataset.repo =
            repo.name;


        const tags =
            info.tags
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
                    ${escapeHTML(info.category)}
                </span>

            </div>


            <div class="project-icon">

                ${getIcon(info.category)}

            </div>


            <h3>

                ${escapeHTML(info.title)}

            </h3>


            <p>

                ${escapeHTML(info.description)}

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
       LOAD GITHUB PROJECTS
    ===================================================== */

    async function loadProjects() {

        if (!projectContainer) {

            console.error(
                "Projects container not found."
            );

            return;

        }


        try {

            console.log(
                "Connecting to GitHub..."
            );


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


            console.log(
                "GitHub repositories:",
                repositories
            );


            const projects =
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


            /* Clear existing static cards */

            projectContainer.innerHTML =
                "";


            /* Add GitHub projects */

            projects.forEach(
                (repo, index) => {

                    const info =
                        getProjectInfo(repo);


                    const card =
                        createProjectCard(
                            repo,
                            info,
                            index
                        );


                    projectContainer.appendChild(
                        card
                    );

                }
            );


            console.log(
                `GitHub projects synced: ${projects.length}`
            );


            /* Check Astra */

            const astra =
                projects.find(
                    repo =>
                        repo.name ===
                        "Astra-local-AI"
                );


            if (astra) {

                console.log(
                    "✅ ASTRA LOCAL AI FOUND"
                );

            } else {

                console.warn(
                    "⚠️ ASTRA LOCAL AI NOT FOUND"
                );

            }

        }
        catch (error) {

            console.error(
                "❌ GitHub sync failed:",
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
        .finally(() => {

            hideLoader();

        });


    /* =====================================================
       AUTO SYNC EVERY 5 MINUTES
    ===================================================== */

    setInterval(
        loadProjects,
        5 * 60 * 1000
    );


    /* =====================================================
       SAFETY LOADER
    ===================================================== */

    setTimeout(
        hideLoader,
        4000
    );


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%c ALEX JACOB — GITHUB PROJECT SYSTEM ",
        "color:#69f0ae;font-weight:bold;"
    );

    console.log(
        "Automatic GitHub project sync enabled."
    );

});
