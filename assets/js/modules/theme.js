// Dark/Light Theme Management Module - Updated for FontAwesome
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        
        // Update theme toggle button with FontAwesome icons
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            if (theme === 'dark') {
                // Show sun icon (light mode)
                themeToggle.innerHTML = '<i class="fas fa-sun text-lg"></i>';
                themeToggle.setAttribute('title', 'Switch to light mode');
            } else {
                // Show moon icon (dark mode)
                themeToggle.innerHTML = '<i class="fas fa-moon text-lg"></i>';
                themeToggle.setAttribute('title', 'Switch to dark mode');
            }
        }

        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    setupEventListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.ThemeManager = ThemeManager;
}