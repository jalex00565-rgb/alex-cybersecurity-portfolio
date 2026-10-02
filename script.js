document.addEventListener("DOMContentLoaded", () => {

    const USERNAME = "jalex00565-rgb";

    const API =
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`;

    const grid = document.getElementById("projectsGrid");
    const count = document.getElementById("projectCount");
    const loader = document.getElementById("loader");

    /*
     * These are the 8 portfolio projects.
     * The GitHub links are kept explicit so the website
     * does not lose projects if a repository description changes.
     */

    const PROJECTS = [
        {
            name: "JARVIS AI",
            repo: "JarvisAI",
            category: "AI / PYTHON",
            icon: "◇",
            description:
                "Personal AI assistant built with Python, Streamlit and AI technologies.",
            tags: ["Python", "Streamlit", "AI Assistant"],
            url: "https://github.com/jalex00565-rgb/JarvisAI"
        },

        {
            name: "RAVEN SOC",
            repo: "RAVEN-SOC",
            category: "CYBERSECURITY",
            icon: "⌁",
            description:
                "Cybersecurity SOC project focused on monitoring, log analysis, detection and incident investigation.",
            tags: ["Python", "SOC", "Log Analysis", "Detection"],
            url: "https://github.com/jalex00565-rgb/RAVEN-SOC"
        },

        {
            name: "JARVIS AI DESKTOP",
            repo: "JARVIS-AI-Desktop",
            category: "AI / PYTHON",
            icon: "◇",
            description:
                "AI-powered Windows desktop assistant with automation and intelligent assistance.",
            tags: ["Python", "Windows", "AI", "Automation"],
            url: "https://github.com/jalex00565-rgb/JARVIS-AI-Desktop"
        },

        {
            name: "SOC INCIDENT ANALYZER",
            repo: "SOC-Incident-Analyzer",
            category: "CYBERSECURITY",
            icon: "⌁",
            description:
                "SOC incident analysis project for log analysis, detection, risk scoring and security investigation.",
            tags: ["Python", "SOC", "Detection", "Log Analysis"],
            url: "https://github.com/jalex00565-rgb/SOC-Incident-Analyzer"
        },

        {
            name: "LOCAL AI SECURITY ASSISTANT",
            repo: "JarvisAI",
            category: "AI / SECURITY",
            icon: "◇",
            description:
                "Local AI security assistant for private document analysis, cybersecurity knowledge and AI-assisted security workflows.",
            tags: ["Python", "Ollama", "Local AI", "Cybersecurity"],
            url: "https://github.com/jalex00565-rgb/JarvisAI"
        },

        {
            name: "MINI SOC INCIDENT ANALYZER",
            repo: "SOC-Incident-Analyzer",
            category: "CYBERSECURITY",
            icon: "⌁",
            description:
                "Mini SOC incident analyzer for log parsing, detection, risk scoring and AI-assisted security analysis.",
            tags: ["Python", "SOC", "AI", "Log Analysis"],
            url: "https://github.com/jalex00565-rgb/SOC-Incident-Analyzer"
        },

        {
            name: "FRIDAY AI ASSISTANT",
            repo: "friday_assistant",
            category: "AI / PYTHON",
            icon: "◇",
            description:
                "Local AI desktop assistant built with Python for intelligent assistance and automation.",
            tags: ["Python", "AI", "Automation", "Assistant"],
            url: "https://github.com/jalex00565-rgb/friday_assistant"
        },

        {
            name: "ASTRA LOCAL AI",
            repo: "Astra-local-AI",
            category: "AI / PYTHON",
            icon: "◇",
            description:
                "Local AI project focused on private and locally controlled intelligent AI workflows.",
            tags: ["Python", "Local AI", "AI Assistant", "Automation"],
            url: "https://github.com/jalex00565-rgb/Astra-local-AI"
        }
    ];

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function createCard(project, index) {

        const tags = project.tags
            .map(tag => `<span>${escapeHTML(tag)}</span>`)
            .join("");

        return `
            <article class="project-card">

                <div class="project-top">
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <span>${escapeHTML(project.category)}</span>
                </div>

                <div class="project-icon">
                    ${project.icon}
                </div>

                <h3>
                    ${escapeHTML(project.name)}
                </h3>

                <p>
                    ${escapeHTML(project.description)}
                </p>

                <div class="project-tags">
                    ${tags}
                </div>

                <div class="project-actions">
                    <a
                        class="project-link"
                        href="${escapeHTML(project.url)}"
                        target="_blank"
                        rel="noopener noreferrer">
                        VIEW PROJECT ↗
                    </a>
                </div>

            </article>
        `;
    }

    function renderProjects() {

        grid.innerHTML =
            PROJECTS
                .map(createCard)
                .join("");

        count.textContent =
            `${PROJECTS.length} ACTIVE`;

        console.log(
            `Portfolio projects loaded: ${PROJECTS.length}`
        );
    }

    /*
     * GitHub check:
     * This does NOT control the cards.
     * It only verifies that the repositories still exist.
     * Therefore the 8 portfolio projects never disappear
     * because of a GitHub API/cache problem.
     */

    async function verifyGitHub() {

        try {

            const response =
                await fetch(API, {
                    cache: "no-store",
                    headers: {
                        "Accept":
                            "application/vnd.github+json"
                    }
                });

            if (!response.ok) {
                throw new Error(
                    `GitHub API ${response.status}`
                );
            }

            const repos =
                await response.json();

            const names =
                new Set(
                    repos.map(repo => repo.name)
                );

            const found =
                PROJECTS.filter(
                    project =>
                        names.has(project.repo)
                ).length;

            console.log(
                `GitHub verification: ${found}/${PROJECTS.length} mapped repositories found.`
            );

            console.log(
                "Astra Local AI:",
                names.has("Astra-local-AI")
                    ? "FOUND"
                    : "NOT FOUND"
            );

        } catch (error) {

            console.warn(
                "GitHub verification skipped:",
                error.message
            );

        }
    }

    function hideLoader() {

        if (!loader) {
            return;
        }

        loader.classList.add("hidden");

        setTimeout(() => {
            loader.style.display = "none";
        }, 600);
    }

    /* Start */

    renderProjects();
    verifyGitHub();

    setInterval(
        verifyGitHub,
        5 * 60 * 1000
    );

    setTimeout(
        hideLoader,
        700
    );

    setTimeout(
        hideLoader,
        4000
    );

    /* Smooth navigation */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetID =
                    link.getAttribute("href");

                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetID
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
    });

    console.log(
        "%c ALEX JACOB — CYBERSECURITY × AI ",
        "color:#69f0ae;font-weight:bold;"
    );

});
