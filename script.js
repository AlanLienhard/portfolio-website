const body = document.body;
const toggleButton = document.querySelector('.toggle-btn');
const themeReveal = document.querySelector('.theme-reveal');

function setRevealOrigin() {
    if (!toggleButton || !themeReveal) return;
    const rect = toggleButton.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    document.documentElement.style.setProperty('--reveal-x', `${x}px`);
    document.documentElement.style.setProperty('--reveal-y', `${y}px`);
}

function updateToggleState() {
    if (!toggleButton) return;
    const isDark = body.classList.contains('dark-mode');
    toggleButton.setAttribute('aria-pressed', String(isDark));
    toggleButton.setAttribute('title', isDark ? 'Light mode' : 'Dark mode');
}

function toggleDarkMode() {
    setRevealOrigin();
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    updateToggleState();
}

window.toggleDarkMode = toggleDarkMode;

function initSectionReveal() {
    const sections = document.querySelectorAll('.section');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.15 }
    );

    sections.forEach(section => observer.observe(section));
}

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (!filterButtons.length || !timelineItems.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            timelineItems.forEach(item => {
                const tags = item.dataset.tags || '';
                const show = filter === 'all' || tags.includes(filter);
                item.style.display = show ? '' : 'none';
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    setRevealOrigin();
    updateToggleState();
    initSectionReveal();
    initProjectFilters();

    if (toggleButton) {
        toggleButton.addEventListener('click', toggleDarkMode);
    }
});

window.addEventListener('resize', setRevealOrigin);
window.addEventListener('load', setRevealOrigin);
