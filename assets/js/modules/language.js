// Language Management Module
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLang') || 'ar';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        // Wait a bit for DOM to be fully ready
        setTimeout(() => {
            this.applyLanguage(this.currentLang);
            this.setupEventListeners();
        }, 100);
    }

    async loadTranslations() {
        try {
            const [arResponse, enResponse] = await Promise.all([
                fetch('assets/lang/ar.json'),
                fetch('assets/lang/en.json')
            ]);
            
            if (!arResponse.ok || !enResponse.ok) {
                throw new Error('Failed to load translation files');
            }
            
            const [ar, en] = await Promise.all([
                arResponse.json(),
                enResponse.json()
            ]);
            
            this.translations = { ar, en };
            console.log('Translations loaded successfully');
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback: try to load from relative path
            try {
                const [ar, en] = await Promise.all([
                    fetch('./assets/lang/ar.json').then(r => r.json()),
                    fetch('./assets/lang/en.json').then(r => r.json())
                ]);
                this.translations = { ar, en };
                console.log('Translations loaded from relative path');
            } catch (fallbackError) {
                console.error('Failed to load translations from fallback path:', fallbackError);
            }
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
        if (!this.translations[lang]) {
            console.warn(`Translations for ${lang} not loaded yet. Retrying...`);
            // Retry after a short delay
            setTimeout(() => {
                if (this.translations[lang]) {
                    this.applyLanguage(lang);
                }
            }, 200);
            return;
        }
        
        console.log(`Applying language: ${lang}`);
        this.currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        console.log(`Found ${elements.length} elements with data-i18n attribute`);
        
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (!key) return;
            
            const text = this.getText(key);
            
            if (!text || text === key) {
                // Don't log warnings for every missing translation to avoid console spam
                return;
            }
            
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else if (el.tagName === 'LABEL') {
                el.textContent = text;
            } else {
                el.textContent = text;
            }
        });

        // Update language visibility
        document.querySelectorAll('.lang-ar').forEach(el => {
            el.classList.toggle('lang-hidden', lang !== 'ar');
        });
        document.querySelectorAll('.lang-en').forEach(el => {
            el.classList.toggle('lang-hidden', lang !== 'en');
        });

        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
                btn.classList.add('bg-indigo-600', 'text-white');
            } else {
                btn.classList.remove('bg-indigo-600', 'text-white');
                btn.classList.add('bg-gray-100', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
            }
        });

        // Update navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            const key = link.getAttribute('data-i18n');
            if (key) {
                const text = this.getText(key);
                if (text && text !== key) {
                    link.textContent = text;
                }
            }
        });

        // Save preference
        localStorage.setItem('preferredLang', lang);
    }

    setupEventListeners() {
        const langArBtn = document.getElementById('lang-ar');
        const langEnBtn = document.getElementById('lang-en');
        
        if (langArBtn) {
            langArBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.applyLanguage('ar');
            });
        }
        
        if (langEnBtn) {
            langEnBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.applyLanguage('en');
            });
        }
    }

    switchLanguage(lang) {
        this.applyLanguage(lang);
    }
}

// Export for use in other modules
window.LanguageManager = LanguageManager;

