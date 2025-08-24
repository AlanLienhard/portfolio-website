// Dark mode toggle mit localStorage
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}

// Beim Laden: Dark Mode prüfen
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Navigation aktiv halten
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
});



// Dummy-Submit-Handler
function handleSubmit(event) {
    event.preventDefault();
    alert("Vielen Dank für deine Nachricht!");
}
function animateSkills() {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(el => {
        const width = el.style.width;
        el.style.width = '0';
        setTimeout(() => {
            el.style.width = width;
        }, 100);
    });
}

// Beim Scrollen sichtbar, Skills animieren
document.addEventListener("DOMContentLoaded", () => {
    const skillsSection = document.querySelector("#skills");
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            animateSkills();
            observer.unobserve(skillsSection);
        }
    }, { threshold: 0.4 });
    observer.observe(skillsSection);
});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});


// Projekt-Filterung
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Aktiven Button markieren
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Projekte filtern
            const filterValue = button.dataset.filter;
            
            timelineItems.forEach(item => {
                const tags = item.dataset.tags.split(' ');
                const shouldShow = filterValue === 'all' || tags.includes(filterValue);
                item.style.display = shouldShow ? 'block' : 'none';
            });
        });
    });
});

// Chart.js einbinden für Skillchart
function initSkillsChart() {
    const ctx = document.getElementById('skills-chart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['HTML', 'CSS', 'JavaScript','SQL', 'MongoDB', 'Cassandra', 'C#', 'Docker', 'Linux'],
            datasets: [{
                label: 'Meine Fähigkeiten',
                data: [90, 85, 75,75, 85, 80, 85, 90, 85],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                pointBackgroundColor: 'rgba(52, 152, 219, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: 'rgba(200, 200, 200, 0.3)' },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
}

// Beim Laden aufrufen
document.addEventListener("DOMContentLoaded", initSkillsChart);