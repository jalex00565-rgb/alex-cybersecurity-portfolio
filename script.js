document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       PROJECT DATA
    ========================== */

    const projects = [
        {
            category: "AI / PYTHON",
            title: "JARVIS AI",
            description:
                "Personal AI assistant built with Python, Streamlit and Gemini. Foundation for voice interaction, file analysis, memory and SOC assistance.",
            stack: ["Python", "Streamlit", "Gemini AI", "AI Assistant"],
            github: "https://github.com/jalex00565-rgb/JarvisAI",
            project: "https://github.com/jalex00565-rgb/JarvisAI"
        },

        {
            category: "CYBERSECURITY",
            title: "RAVEN SOC",
            description:
                "A cybersecurity-focused SOC project for security monitoring, log analysis, detection and incident investigation.",
            stack: ["Python", "SOC", "Log Analysis", "Detection"],
            github: "https://github.com/jalex00565-rgb/RAVEN-SOC",
            project: "https://github.com/jalex00565-rgb/RAVEN-SOC"
        },

        {
            category: "AI / PYTHON",
            title: "JARVIS AI DESKTOP",
            description:
                "AI-powered Windows desktop assistant with voice interaction, memory, system monitoring and automation.",
            stack: ["Python", "Windows", "Voice AI", "Automation"],
            github: "https://github.com/jalex00565-rgb/JARVIS-AI-Desktop",
            project: "https://github.com/jalex00565-rgb/JARVIS-AI-Desktop"
        },

        {
            category: "CYBERSECURITY",
            title: "SOC INCIDENT ANALYZER",
            description:
                "SOC Incident Analyzer for log analysis, incident detection, risk scoring and AI-assisted security analysis.",
            stack: ["Python", "AI", "Cybersecurity", "Log Analysis"],
            github: "https://github.com/jalex00565-rgb/SOC-Incident-Analyzer",
            project: "https://github.com/jalex00565-rgb/SOC-Incident-Analyzer"
        },

        {
            category: "AI / SECURITY",
            title: "LOCAL AI SECURITY ASSISTANT",
            description:
                "A local AI security assistant using Ollama for private document analysis, cybersecurity knowledge and AI-assisted security workflows.",
            stack: ["Python", "Ollama", "Local AI", "Cybersecurity"],
            github: "https://github.com/jalex00565-rgb/LOCAL-AI-SECURITY-ASSISTANT",
            project: "https://github.com/jalex00565-rgb/LOCAL-AI-SECURITY-ASSISTANT",
            ollama: true
        }
    ];


    /* =========================
       PROJECT CONTAINER
    ========================== */

    const container = document.querySelector(".projects");

    if (!container) {
        console.error("Projects container not found.");
        return;
    }


    /* =========================
       CREATE PROJECT CARDS
    ========================== */

    function renderProjects() {

        container.innerHTML = "";

        projects.forEach((project, index) => {

            const card = document.createElement("article");

            card.className = "project-card";

            card.innerHTML = `
                <div class="project-top">

                    <span class="project-number">
                        ${String(index + 1).padStart(2, "0")}
                    </span>

                    <span class="project-category">
                        ${project.category}
                    </span>

                </div>

                <div class="project-icon">
                    ${index === 0 ? "◇" :
                      index === 1 ? "⌁" :
                      index === 2 ? "◎" :
                      index === 3 ? "⌁" : "◎"}
                </div>

                <h3>
                    ${project.title}
                </h3>

                <p>
                    ${project.description}
                </p>

                <div class="project-stack">

                    ${project.stack.map(item =>
                        `<span>${item}</span>`
                    ).join("")}

                </div>

                ${
                    project.ollama
                    ? `
                        <div class="ollama-version"
                             id="ollama-version">
                            OLLAMA LATEST: CHECKING...
                        </div>
                    `
                    : ""
                }

                <div class="project-links">

                    <a
                        class="project-view"
                        href="${project.project}"
                        target="_blank"
                        rel="noopener noreferrer">
                        VIEW PROJECT ↗
                    </a>

                    <a
                        class="project-github"
                        href="${project.github}"
                        target="_blank"
                        rel="noopener noreferrer">
                        GITHUB REPOSITORY ↗
                    </a>

                    ${
                        project.ollama
                        ? `
                            <a
                                class="project-github"
                                href="https://github.com/ollama/ollama/releases/latest"
                                target="_blank"
                                rel="noopener noreferrer">
                                OLLAMA LATEST ↗
                            </a>
                        `
                        : ""
                    }

                </div>
            `;

            container.appendChild(card);

        });

    }


    renderProjects();


    /* =========================
       OLLAMA LATEST VERSION
       Automatically reads GitHub
    ========================== */

    async function getOllamaVersion() {

        const versionElement =
            document.getElementById("ollama-version");

        if (!versionElement) return;

        try {

            const response = await fetch(
                "https://api.github.com/repos/ollama/ollama/releases/latest"
            );

            if (!response.ok) {
                throw new Error("GitHub API error");
            }

            const release = await response.json();

            const version =
                release.tag_name || release.name || "Unknown";

            versionElement.textContent =
                `OLLAMA LATEST: ${version}`;

        } catch (error) {

            console.error(
                "Unable to fetch Ollama version:",
                error
            );

            versionElement.textContent =
                "OLLAMA LATEST: CHECK GITHUB";

        }

    }


    getOllamaVersion();


    /* =========================
       MODAL
    ========================== */

    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");
    const modalStack = document.getElementById("modalStack");
    const modalKicker = document.getElementById("modalKicker");
    const closeButton = document.getElementById("close");


    function openModal(project) {

        if (!modal) return;

        modalKicker.textContent = project.category;

        modalTitle.textContent = project.title;

        modalText.textContent = project.description;

        modalStack.innerHTML =
            project.stack
                .map(item => `<span>${item}</span>`)
                .join("");

        modal.classList.add("active");

        document.body.classList.add("modal-open");

    }


    function closeModal() {

        if (!modal) return;

        modal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


    /* =========================
       PROJECT VIEW BUTTONS
    ========================== */

    document.addEventListener("click", (event) => {

        const button =
            event.target.closest(".project-view");

        if (!button) return;

        /*
         * VIEW PROJECT is intentionally
         * a GitHub/project link.
         *
         * Do not open modal here.
         */

    });


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            (event) => {

                if (event.target === modal) {
                    closeModal();
                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeModal();
            }

        }
    );


    /* =========================
       LOADER
    ========================== */

    const loader =
        document.getElementById("loader");

    if (loader) {

        window.addEventListener(
            "load",
            () => {

                setTimeout(() => {

                    loader.classList.add("hidden");

                }, 700);

            }
        );

    }


    /* =========================
       SMOOTH SCROLL
    ========================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (event) {

                const target =
                    document.querySelector(
                        this.getAttribute("href")
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

});
