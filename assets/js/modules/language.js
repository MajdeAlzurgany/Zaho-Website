// Language Management Module
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLang') || 'ar';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.applyLanguage(this.currentLang);
        this.setupEventListeners();
    }

    async loadTranslations() {
        try {
            const [ar, en] = await Promise.all([
                fetch('assets/lang/ar.json').then(r => r.json()),
                fetch('assets/lang/en.json').then(r => r.json())
            ]);
            this.translations = { ar, en };
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    getText(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            value = value?.[k];
        }
        
        return value || key;
    }

    applyLanguage(lang) {
        this.currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = this.getText(key);
            
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        });

        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.remove('bg-gray-100', 'text-gray-700');
                btn.classList.add('bg-indigo-600', 'text-white');
            } else {
                btn.classList.remove('bg-indigo-600', 'text-white');
                btn.classList.add('bg-gray-100', 'text-gray-700');
            }
        });

        // Save preference
        localStorage.setItem('preferredLang', lang);
    }

    setupEventListeners() {
        document.getElementById('lang-ar')?.addEventListener('click', () => {
            this.applyLanguage('ar');
        });
        
        document.getElementById('lang-en')?.addEventListener('click', () => {
            this.applyLanguage('en');
        });
    }

    switchLanguage(lang) {
        this.applyLanguage(lang);
    }
}

// Export for use in other modules
window.LanguageManager = LanguageManager;

