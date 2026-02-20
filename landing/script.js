// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 64; // navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Active navigation link on scroll
function updateActiveNavLink() {
    const sections = ['hero', 'tech-stack', 'about-team', 'hiwork-project', 'contacts'];
    const scrollPosition = window.scrollY + 100;

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (section && navLink) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current link
                navLink.classList.add('active');
            }
        }
    });
}

// Update navbar background on scroll
function updateNavbar() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}

// Event listeners
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    updateNavbar();
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
    }
});

// Logo animation - random tech symbols then final letters
function animateLogo() {
    const logoTexts = document.querySelectorAll('#bitbytecode-logo .logo-text');
    if (logoTexts.length === 0) return;

    // Technical symbols for random display
    const techSymbols = ['{', '}', '[', ']', '(', ')', '<', '>', '/', '\\', '|', '&', '%', '#', '@', '!', '?', '*', '+', '-', '=', '~', '`', '^', '0', '1'];
    
    const animationDuration = 500; // 0.5 seconds
    const updateInterval = 30; // Update every 30ms for smoother animation
    const updatesCount = animationDuration / updateInterval; // ~16-17 updates total
    
    let currentUpdate = 0;
    
    const animationInterval = setInterval(() => {
        logoTexts.forEach(textElement => {
            const tspan = textElement.querySelector('tspan');
            if (tspan) {
                // Show random tech symbol
                const randomSymbol = techSymbols[Math.floor(Math.random() * techSymbols.length)];
                tspan.textContent = randomSymbol;
            }
        });
        
        currentUpdate++;
        
        // After 0.5 seconds, set final letters
        if (currentUpdate >= updatesCount) {
            clearInterval(animationInterval);
            logoTexts.forEach(textElement => {
                const tspan = textElement.querySelector('tspan');
                const finalChar = textElement.getAttribute('data-final');
                if (tspan && finalChar) {
                    tspan.textContent = finalChar;
                }
            });
        }
    }, updateInterval);
}

// Initialize
updateActiveNavLink();
updateNavbar();

// Start logo animation when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        animateLogo();
        initMatrix();
    });
} else {
    animateLogo();
    initMatrix();
}

// Matrix animation
function initMatrix() {
    const matrixContainer = document.getElementById('matrixBackground');
    if (!matrixContainer) return;

    // Technical symbols and characters
    const chars = '01{}[]()<>/\\|&%#@!?*+-=~`^0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
    const columns = Math.floor(window.innerWidth / 20); // One column per 20px
    const columnData = [];

    // Create columns
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${(i * 100) / columns}%`;
        column.style.animationDuration = `${5 + Math.random() * 10}s`; // 5-15 seconds
        column.style.animationDelay = `${Math.random() * 5}s`;
        
        // Generate random characters for this column
        const charCount = 30 + Math.floor(Math.random() * 20);
        let text = '';
        for (let j = 0; j < charCount; j++) {
            text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
        }
        column.innerHTML = text;
        
        matrixContainer.appendChild(column);
        columnData.push(column);
    }

    // Continuously update characters
    setInterval(() => {
        columnData.forEach(column => {
            if (Math.random() > 0.7) { // 30% chance to update
                const lines = column.innerHTML.split('<br>');
                const randomLine = Math.floor(Math.random() * lines.length);
                if (lines[randomLine]) {
                    lines[randomLine] = chars[Math.floor(Math.random() * chars.length)];
                    column.innerHTML = lines.join('<br>');
                }
            }
        });
    }, 200);

    // Restart animation when column finishes
    columnData.forEach(column => {
        column.addEventListener('animationiteration', () => {
            // Randomly change characters
            const lines = column.innerHTML.split('<br>');
            const newLines = lines.map(() => chars[Math.floor(Math.random() * chars.length)]);
            column.innerHTML = newLines.join('<br>');
        });
    });
}
