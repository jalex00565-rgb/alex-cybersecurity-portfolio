document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LOADER
    ========================== */

    const loader = document.getElementById("loader");

    setTimeout(() => {
        if (loader) {
            loader.classList.add("hidden");

            setTimeout(() => {
                loader.style.display = "none";
            }, 700);
        }
    }, 1200);


    /* =========================
       PROJECT DATA
    ========================== */

    const projects = [
        {
            number: "01",
            category: "AI / PYTHON",
            title: "JARVIS AI",
            description:
                "Personal AI assistant built with Python, Streamlit and Gemini. Foundation for voice interaction, file analysis, memory and SOC assistance.",
            tags: [
                "Python",
                "Streamlit",
                "Gemini AI",
                "AI Assistant"
            ],
            github:
                "https://github.com/jalex00565-rgb/JarvisAI"
        },

        {
            number: "02",
            category: "CYBERSECURITY",
            title: "RAVEN SOC",
            description:
                "A cybersecurity-focused SOC project for security monitoring, log analysis, detection and incident investigation.",
            tags: [
                "Python",
                "SOC",
                "Log Analysis",
                "Detection"
            ],
            github:
                "https://github.com/jalex00565-rgb/RAVEN-SOC"
        },

        {
            number: "03",
            category: "AI / PYTHON",
            title: "JARVIS AI DESKTOP",
            description:
                "AI-powered Windows desktop assistant with voice interaction, memory, system monitoring and automation.",
            tags: [
                "Python",
                "Windows",
                "Voice AI",
                "Automation"
            ],
            github:
                "https://github.com/jalex00565-rgb/JARVIS-AI-Desktop"
        },

        {
            number: "04",
            category: "CYBERSECURITY",
            title: "SOC INCIDENT ANALYZER",
            description:
                "SOC Incident Analyzer for log analysis, incident detection, risk scoring and AI-assisted security analysis.",
            tags: [
                "Python",
                "AI",
                "Cybersecurity",
                "Log Analysis"
            ],
            github:
                "https://github.com/jalex00565-rgb/SOC-Incident-Analyzer"
        },

        {
            number: "05",
            category: "AI / SECURITY",
            title: "LOCAL AI SECURITY ASSISTANT",
            description:
                "A local AI security assistant using Ollama for private document analysis, cybersecurity knowledge and AI-assisted security workflows.",
            tags: [
                "Python",
                "Ollama",
                "Local AI",
                "Cybersecurity"
            ],
            github:
                "https://github.com/jalex00565-rgb/JarvisAI"
        },

        {
            number: "06",
            category: "AI / SECURITY",
            title: "MINI SOC INCIDENT ANALYZER",
            description:
                "Security workflow for converting raw logs into detections, risk assessment, investigation context and incident reporting.",
            tags: [
                "Logs",
                "Detection",
                "Risk Analysis",
                "Incident Reporting"
            ],
            github:
                "https://github.com/jalex00565-rgb/SOC-Incident-Analyzer"
        }
    ];


    /* =========================
       PROJECT CARDS
    ========================== */

    const projectContainer = document.querySelector(".projects");

    if (projectContainer) {

        projectContainer.innerHTML = "";

        projects.forEach((project) => {

            const card = document.createElement("article");

            card.className = "project-card";

            card.innerHTML = `
                <div class="project-top">

                    <span class="project-number">
                        ${project.number}
                    </span>

                    <span class="project-category">
                        ${project.category}
                    </span>

                </div>

                <div class="project-icon">
                    ${project.number === "01" || project.number === "05" || project.number === "06"
                        ? "◇"
                        : project.number === "02" || project.number === "04"
                            ? "⌁"
                            : "◎"}
                </div>

                <h3>
                    ${project.title}
                </h3>

                <p>
                    ${project.description}
                </p>

                <div class="project-tags">
                    ${project.tags.map(tag => `
                        <span>${tag}</span>
                    `).join("")}
                </div>

                <div class="project-actions">

                    <a
                        class="project-link"
                        href="${project.github}"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open ${project.title} GitHub repository">

                        VIEW PROJECT ↗

                    </a>

                </div>
            `;

            projectContainer.appendChild(card);
        });
    }


    /* =========================
       MODAL
    ========================== */

    const modal = document.getElementById("modal");
    const closeButton = document.getElementById("close");

    if (modal) {
        modal.style.display = "none";
    }

    if (closeButton) {
        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    if (modal) {
        modal.addEventListener("click", (event) => {

            if (event.target === modal) {
                modal.style.display = "none";
            }

        });
    }


    /* =========================
       SMOOTH SCROLL
    ========================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================
       ACTIVE NAVIGATION
    ========================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('.nav nav a');

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {
                        link.classList.remove("active");
                    });

                    const activeLink = document.querySelector(
                        `.nav nav a[href="#${entry.target.id}"]`
                    );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }

                }

            });

        },
        {
            threshold: 0.35
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });


    /* =========================
       ESC KEY
    ========================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape" && modal) {
            modal.style.display = "none";
        }

    });

});
