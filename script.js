document.addEventListener("DOMContentLoaded", () => {

    const projects = [
        {
            name: "JARVIS AI",
            category: "AI / PYTHON",
            icon: "◈",
            description: "Personal AI assistant built with Python, Streamlit and Gemini. Foundation for voice interaction, file analysis, memory and SOC assistance.",
            tags: ["Python", "Streamlit", "Gemini AI"],
            url: "https://github.com/jalex00565-rgb/JarvisAI"
        },
        {
            name: "RAVEN SOC",
            category: "CYBERSECURITY",
            icon: "⌁",
            description: "Cybersecurity SOC project focused on security monitoring, log analysis, detection and incident investigation.",
            tags: ["Python", "SOC", "Log Analysis", "Detection"],
            url: "https://github.com/jalex00565-rgb/RAVEN-SOC"
        },
        {
            name: "JARVIS AI DESKTOP",
            category: "AI / PYTHON",
            icon: "◉",
            description: "AI-powered Windows desktop assistant with voice interaction, memory, system monitoring and automation.",
            tags: ["Python", "Windows", "Voice AI", "Automation"],
            url: "https://github.com/jalex00565-rgb/JARVIS-AI-Desktop"
        },
        {
            name: "SOC INCIDENT ANALYZER",
            category: "CYBERSECURITY",
            icon: "⌁",
            description: "Security workflow for converting raw logs into detections, risk assessment, investigation context and incident reporting.",
            tags: ["Logs", "Detection", "Risk Analysis", "Incident Reporting"],
            url: "https://github.com/jalex00565-rgb/SOC-Incident-Analyzer"
        },
        {
            name: "LOCAL AI SECURITY ASSISTANT",
            category: "AI / SECURITY",
            icon: "◇",
            description: "Local AI security assistant for private document analysis, cybersecurity knowledge and AI-assisted security workflows.",
            tags: ["Python", "Ollama", "Local AI", "Cybersecurity"],
            url: "https://github.com/jalex00565-rgb/JarvisAI"
        },
        {
            name: "MINI SOC INCIDENT ANALYZER",
            category: "CYBERSECURITY",
            icon: "⌁",
            description: "Mini SOC incident analyzer for log parsing, detection, risk scoring and AI-assisted security analysis.",
            tags: ["Python", "SOC", "AI", "Log Analysis"],
            url: "https://github.com/jalex00565-rgb/SOC-Incident-Analyzer"
        },
        {
            name: "FRIDAY AI ASSISTANT",
            category: "AI / PYTHON",
            icon: "◇",
            description: "Local AI desktop assistant built with Python for intelligent assistance and automation.",
            tags: ["Python", "AI", "Automation", "Assistant"],
            url: "https://github.com/jalex00565-rgb/friday_assistant"
        },
        {
            name: "ASTRA LOCAL AI",
            category: "AI / PYTHON",
            icon: "◇",
            description: "Local AI project focused on private and locally controlled intelligent AI workflows.",
            tags: ["Python", "Local AI", "AI Assistant", "Automation"],
            url: "https://github.com/jalex00565-rgb/Astra-local-AI"
        }
    ];

    const grid = document.getElementById("projectsGrid");

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    if (grid) {
        grid.innerHTML = projects.map((project, index) => `
            <article class="card project-card">
                <div class="card-top project-top">
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <span>${escapeHTML(project.category)}</span>
                </div>

                <div class="icon card-icon project-icon">
                    ${project.icon}
                </div>

                <h3>${escapeHTML(project.name)}</h3>

                <p>${escapeHTML(project.description)}</p>

                <div class="tags project-tags">
                    ${project.tags.map(tag =>
                        `<b>${escapeHTML(tag)}</b>`
                    ).join("")}
                </div>

                <a
                    class="project-link"
                    href="${escapeHTML(project.url)}"
                    target="_blank"
                    rel="noopener noreferrer">
                    VIEW PROJECT ↗
                </a>
            </article>
        `).join("");
    }

    /* Update project count in the original terminal if present. */
    document.querySelectorAll(".terminal-body p").forEach(row => {
        if (row.textContent.toLowerCase().includes("projects")) {
            const nodes = row.childNodes;
            for (const node of nodes) {
                if (node.nodeType === Node.TEXT_NODE &&
                    node.textContent.includes("active")) {
                    node.textContent = node.textContent.replace(/\d+\s*active/i, `${projects.length} active`);
                }
            }
        }
    });

    /* Original loader support */
    const loader = document.getElementById("loader");

    function hideLoader() {
        if (!loader) return;
        loader.classList.add("hidden");
        loader.classList.add("hide");
        setTimeout(() => {
            loader.style.display = "none";
        }, 700);
    }

    setTimeout(hideLoader, 700);
    setTimeout(hideLoader, 4000);

    /* Terminal cursor */
    document.querySelectorAll(".cursor").forEach(cursor => {
        let visible = true;
        setInterval(() => {
            visible = !visible;
            cursor.style.opacity = visible ? "1" : "0";
        }, 500);
    });

    console.log("%c ALEX JACOB — CYBERSECURITY × AI ", "color:#75f5b4;font-weight:bold;");
    console.log(`Portfolio loaded with ${projects.length} projects.`);
});
