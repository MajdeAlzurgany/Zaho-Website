// Main Application Entry Point
// Initialize all modules when DOM is ready

(function() {
    // Initialize Language Manager immediately (it will wait for DOM)
    window.languageManager = new LanguageManager();
    
    // Wait for DOM to be ready for other modules
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeModules);
    } else {
        initializeModules();
    }
    
    function initializeModules() {
        // Initialize Theme Manager
        window.themeManager = new ThemeManager();
        
        // Initialize Navigation Manager
        window.navigationManager = new NavigationManager();
        
        // Initialize Contact Form Manager
        window.contactFormManager = new ContactFormManager();
        
        // Initialize scroll effects
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header?.classList.add('shadow-lg');
            } else {
                header?.classList.remove('shadow-lg');
            }
        });
    }
})();
