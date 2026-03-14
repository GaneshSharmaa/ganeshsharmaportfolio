const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

function closeNavigation() {
    if (!navToggle || !siteNav) {
        return;
    }

    navToggle.setAttribute('aria-expanded', 'false');
    siteNav.dataset.open = 'false';
    document.body.classList.remove('nav-open');
}

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isExpanded));
        siteNav.dataset.open = String(!isExpanded);
        document.body.classList.toggle('nav-open', !isExpanded);
    });

    siteNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeNavigation);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 720) {
            closeNavigation();
        }
    });
}

const sectionLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
const observedSections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

if (sectionLinks.length > 0 && observedSections.length > 0 && 'IntersectionObserver' in window) {
    const linkBySectionId = new Map(
        sectionLinks.map((link) => [link.getAttribute('href'), link])
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const activeLink = linkBySectionId.get(`#${entry.target.id}`);

                if (!activeLink) {
                    return;
                }

                sectionLinks.forEach((link) => link.classList.remove('is-active'));
                activeLink.classList.add('is-active');
            });
        },
        {
            rootMargin: '-45% 0px -45% 0px',
            threshold: 0
        }
    );

    observedSections.forEach((section) => observer.observe(section));
}