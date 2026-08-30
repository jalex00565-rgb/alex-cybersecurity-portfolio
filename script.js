/* =========================================================
   ALEX JACOB — PORTFOLIO SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       PROJECT DATA
    ========================= */

    const projects = [
        {
            number: "01",
            category: "AI / PYTHON",
            title: "JARVIS AI",
            description:
                "Personal AI assistant built with Python, Streamlit and Gemini. Foundation for voice interaction, file analysis, memory and SOC assistance.",
            tags: ["Python", "Streamlit", "Gemini AI", "AI Assistant"],
          github: "https://github.com/jalex00565-rgb/JarvisAI"
        },

        {
            number: "02",
            category: "CYBERSECURITY",
            title: "RAVEN SOC",
            description:
                "A cybersecurity-focused SOC project for security monitoring, log analysis, detection and incident investigation.",
            tags: ["Python", "SOC", "Log Analysis", "Detection"],
            github: "https://github.com/jalex00565-rgb/RAVEN-SOC"
        },

        {
            number: "03",
            category: "AI / PYTHON",
            title: "JARVIS AI DESKTOP",
            description:
                "AI-powered Windows desktop assistant with voice interaction, memory, system monitoring and automation.",
            tags: ["Python", "Windows", "Voice AI", "Automation"],
            github: "https://github.com/jalex00565-rgb/JARVIS-AI-Desktop"
        },

        {
            number: "04",
            category: "CYBERSECURITY",
            title: "SOC INCIDENT ANALYZER",
            description:
                "SOC Incident Analyzer for log analysis, incident detection, risk scoring and AI-assisted security analysis.",
            tags: ["Python", "AI", "Cybersecurity", "Log Analysis"],
            github: "https://github.com/jalex00565-rgb/SOC-Incident-Analyzer"
        },

        {
            number: "05",
            category: "AI / SECURITY",
            title: "LOCAL AI SECURITY ASSISTANT",
            description:
                "A local AI security assistant using Ollama for private document analysis, cybersecurity knowledge and AI-assisted security workflows.",
            tags: ["Python", "Ollama", "Local AI", "Cybersecurity"],
            github: "https://github.com/jalex00565-rgb/JarvisAI"
        },

        {
            number: "06",
            category: "AI / SECURITY",
            title: "MINI SOC INCIDENT ANALYZER",
            description:
                "Security workflow for converting raw logs into detections, risk assessment, investigation context and incident reporting.",
            tags: ["Logs", "Detection", "Risk Analysis", "Incident Reporting"],
            github: "https://github.com/jalex00565-rgb/SOC-Incident-Analyzer"
        }
    ];


    /* =========================
       LOADER
       ========================= */

    const loader = document.getElementById("loader");

    function hideLoader() {
        if (!loader) return;

        loader.classList.add("hidden");

        setTimeout(() => {
            loader.style.display = "none";
        }, 700);
    }

    window.addEventListener("load", () => {
        setTimeout(hideLoader, 500);
    });

    /* Safety fallback — loader can never stay forever */
    setTimeout(hideLoader, 2500);


    /* =========================
       PROJECTS
       ========================= */

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
                    ${project.number === "01" || project.number === "06"
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
                        rel="noopener noreferrer">
                        VIEW PROJECT ↗
                    </a>

                </div>
            `;

            projectContainer.appendChild(card);
        });
    }


    /* =========================
       MODAL
       ========================= */

    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");
    const modalKicker = document.getElementById("modalKicker");
    const modalStack = document.getElementById("modalStack");
    const closeButton = document.getElementById("close");


    function openModal(project) {

        if (!modal) return;

        if (modalKicker) {
            modalKicker.textContent =
                `${project.number} / ${project.category}`;
        }

        if (modalTitle) {
            modalTitle.textContent = project.title;
        }

        if (modalText) {
            modalText.textContent = project.description;
        }

        if (modalStack) {

            modalStack.innerHTML = `
                ${project.tags.map(tag => `
                    <span>${tag}</span>
                `).join("")}

                <a
                    class="modal-github"
                    href="${project.github}"
                    target="_blank"
                    rel="noopener noreferrer">
                    GITHUB REPOSITORY ↗
                </a>
            `;
        }

        modal.classList.add("active");
        document.body.classList.add("modal-open");
    }


    function closeModal() {

        if (!modal) return;

        modal.classList.remove("active");
        document.body.classList.remove("modal-open");
    }


    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }


    if (modal) {

        modal.addEventListener("click", (event) => {

            if (event.target === modal) {
                closeModal();
            }

        });
    }


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeModal();
        }

    });


    /* =========================
       SMOOTH NAVIGATION
       ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

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
       ========================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(
        '.nav nav a[href^="#"]'
    );

    if (sections.length && navLinks.length) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        navLinks.forEach(link => {
                            link.classList.remove("active");
                        });

                        const activeLink =
                            document.querySelector(
                                `.nav nav a[href="#${entry.target.id}"]`
                            );

                        if (activeLink) {
                            activeLink.classList.add("active");
                        }

                    }

                });

            },
            {
                threshold: 0.25
            }
        );

        sections.forEach(section => {
            observer.observe(section);
        });
    }


    /* =========================
       TERMINAL CURSOR
       ========================= */

    const cursors = document.querySelectorAll(".cursor");

    cursors.forEach(cursor => {

        let visible = true;

        setInterval(() => {

            visible = !visible;

            cursor.style.opacity =
                visible ? "1" : "0";

        }, 500);

    });


    /* =========================
       SCROLL REVEAL
       ========================= */

    const revealElements = document.querySelectorAll(
        ".section, .skill, .time-item, .profile-terminal"
    );

    if (revealElements.length) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.08
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }


    /* =========================
       PROJECT CARD CLICK
       ========================= */

    document.querySelectorAll(".project-card").forEach(
        (card, index) => {

            const viewButton =
                card.querySelector(".project-link");

            /*
             * VIEW PROJECT directly opens GitHub.
             * It does NOT open the modal.
             */

            if (viewButton) {

                viewButton.addEventListener("click", (event) => {
                    event.stopPropagation();
                });

            }

            /*
             * Clicking the card itself opens project details.
             */

            card.addEventListener("click", (event) => {

                if (
                    event.target.closest("a") ||
                    event.target.closest("button")
                ) {
                    return;
                }

                if (projects[index]) {
                    openModal(projects[index]);
                }

            });

        }
    );


    /* =========================
       CONSOLE
       ========================= */

    console.log(
        "%c ALEX JACOB — CYBERSECURITY × AI ",
        "color:#69f0ae;font-weight:bold;"
    );

    console.log(
        "Portfolio initialized successfully."
    );

});
