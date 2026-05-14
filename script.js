/* Dynamic Background */
const backgrounds = [
    "background_images/BG1.jpg",
    "background_images/BG2.jpg",
    "background_images/BG3.jpg",
    "background_images/BG4.jpg",
    "background_images/BG5.jpg"
];

let current = 0;
let active = 1;

const bg1 = document.getElementById("bg1");
const bg2 = document.getElementById("bg2");

/* preload images */
backgrounds.forEach(src => {
    const img = new Image();
    img.src = src;
});

function changeBackground() {
    const next = backgrounds[current];

    if (active === 1) {
        bg2.style.backgroundImage = `url(${next})`;
        bg2.style.opacity = 1;
        bg1.style.opacity = 0;
        active = 2;
    } else {
        bg1.style.backgroundImage = `url(${next})`;
        bg1.style.opacity = 1;
        bg2.style.opacity = 0;
        active = 1;
    }

    current = (current + 1) % backgrounds.length;
}

setInterval(changeBackground, 4000);
changeBackground();

/* Sections */
function showSection(section) {
    const content = document.getElementById("content");

    if (section === "home") {
        content.innerHTML = `
            <div class="hero">
                <h1>Hi, I'm Issacraja 👋</h1>
                <h3>Senior Software Test Engineer | Manual & Automation Testing | Web & Mobile | Java | JavaScript | TypeScript | Playwright | Selenium</h3>
                <p>
                    I combine sharp manual testing instincts with scalable automation frameworks to deliver high-quality software.  
                </p>

                <div class="hero-buttons">
                    <button onclick="showSection('projects')">View Projects</button>
                    <button onclick="showSection('contact')">Contact Me</button>
                </div>
            </div>
        `;
    }

    if (section === "about") {
        content.innerHTML = `
            <h2>About Me</h2>
            <div class="card">
            I'm a Quality Assurance Engineer with 3+ years of experience in software testing, specializing in test automation using
            Selenium with Java and Playwright with JavaScript/TypeScript. Proven experience in designing, developing and maintaining 
            end-to-end automation frameworks to enhance test coverage and improve regression efficiency. Experienced in Web testing, 
            Mobile testing, API testing, cross browser testing and CI/CD pipeline integration. Proficient in Docker and AWS for 
            building and maintaining scalable and reliable test environments. Strong understanding of Agile methodologies, with a 
            focus on delivering high-quality software through effective defect tracking, test strategy and collaboration with 
            cross-functional teams. 
            </div>
        `;
    }

    if (section === "skills") {
        content.innerHTML = `
            <h2>Skills</h2>
            <div class="skills-container" id="skills"></div>
        `;
        loadSkills();
    }

    if (section === "projects") {
        content.innerHTML = `
            <h2>Projects</h2>

            <div class="card">
                <h3>GitHub</h3>
                <p>Explore my projects and contributions on GitHub.</p>
                <a href="https://github.com/Issac1809" target="_blank">View Profile</a>
            </div>
        `;
    }

    if (section === "contact") {
        content.innerHTML = `
            <h2>Contact</h2>
            <div class="card">
                <p>Email: issacraja1809@gmail.com</p>
            </div>
        `;
    }

    if (section === "profiles") {
        content.innerHTML = `
        <h2>Profile</h2>
        <div class="card">

            <p>Connect with me:</p>

            <div class="links">
                <a href="https://www.linkedin.com/in/issac-c-8aa79617b/" target="_blank">
                    LinkedIn
                </a>

                <a href="https://www.naukri.com/mnjuser/profile" target="_blank">
                    Naukri
                </a>
            </div>

        </div>
    `;
    }
}

/* Skills */
function loadSkills() {
    const skills = [
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Playwright", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg" },
        { name: "Selenium", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" },
        { name: "TestNG", icon: "skills_images//TestNG.svg" },
        { name: "Cucumber", icon: "skills_images//Cucumber.svg" },
        { name: "Maven", icon: "skills_images//Apache Maven.svg" },
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "AWS EC2", icon: "skills_images//AWS.svg" },
        { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
        { name: "Jira", icon: "skills_images//Jira.svg" },
        { name: "IntelliJ IDEA", icon: "skills_images//IntelliJ IDEA.svg" },
        { name: "Visual Studio Code", icon: "skills_images//Visual Studio Code (VS Code).svg" }
    ];

    const container = document.getElementById("skills");

    skills.forEach(skill => {
        const div = document.createElement("div");
        div.classList.add("skill");

        div.innerHTML = `
            <img src="${skill.icon}" />
            <p>${skill.name}</p>
        `;

        container.appendChild(div);
    });
}

/* Default */
showSection("home");