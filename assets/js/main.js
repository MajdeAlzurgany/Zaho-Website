// Main Application Entry Point
// Initialize all modules when DOM is ready

(function() {
    console.log('Zaho Website - Starting initialization...');
    
    // Initialize Language Manager immediately (it will wait for DOM)
    window.languageManager = new LanguageManager();
    
    // Wait for DOM to be ready for other modules
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeModules);
    } else {
        initializeModules();
    }
    
    function initializeModules() {
        console.log('DOM ready, initializing modules...');
        
        // Initialize Theme Manager
        try {
            window.themeManager = new ThemeManager();
            console.log('ThemeManager initialized');
        } catch (error) {
            console.error('Error initializing ThemeManager:', error);
        }
        
        // Initialize Navigation Manager
        try {
            window.navigationManager = new NavigationManager();
            console.log('NavigationManager initialized');
        } catch (error) {
            console.error('Error initializing NavigationManager:', error);
        }
        
        // Initialize Contact Form Manager
        try {
            window.contactFormManager = new ContactFormManager();
            console.log('ContactFormManager initialized');
        } catch (error) {
            console.error('Error initializing ContactFormManager:', error);
        }
        
        // Initialize scroll effects
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header?.classList.add('shadow-lg');
            } else {
                header?.classList.remove('shadow-lg');
            }
        });
        
        // Initialize back to top button
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.remove('opacity-0', 'invisible');
                    backToTopBtn.classList.add('opacity-100', 'visible');
                } else {
                    backToTopBtn.classList.remove('opacity-100', 'visible');
                    backToTopBtn.classList.add('opacity-0', 'invisible');
                }
            });
            
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        // Stats counter animation (only animate when in view)
        const statsElements = document.querySelectorAll('.stats-counter');
        if (statsElements.length > 0) {
            const animateCounter = (element) => {
                const target = parseInt(element.textContent.replace('+', ''));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        element.textContent = `+${target}`;
                        clearInterval(timer);
                    } else {
                        element.textContent = `+${Math.floor(current)}`;
                    }
                }, 16);
            };
            
            // Use Intersection Observer to animate when visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.stats-counter').forEach(counter => {
                            if (!counter.classList.contains('animated')) {
                                counter.classList.add('animated');
                                animateCounter(counter);
                            }
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            // Observe hero section
            const heroSection = document.getElementById('home');
            if (heroSection) {
                observer.observe(heroSection);
            }
        }
        
        // 🔧 CHECK FORMSPREE CONNECTION FUNCTION 🔧
        function checkFormspree() {
            console.log(' التحقق من اتصال Formspree...');
            console.log(' معلومات Formspree:');
            console.log('   - Form ID: xzdrlqby');
            console.log('   - Endpoint: https://formspree.io/f/xzdrlqby');
            console.log('   - Method: POST');
            console.log('   - Status: جاري التحقق...');
            
            // اختبار اتصال بسيط
            fetch(`https://formspree.io/f/xzdrlqby`, {
                method: 'HEAD',
                mode: 'no-cors' // لتجنب مشاكل CORS
            })
            .then(() => {
                console.log(' Formspree متاح وجاهز للإرسال');
                console.log(' الإيميلات سترسل إلى: الإيميل المسجل في Formspree');
                
                // عرض رسالة ترحيب في Console
                console.log('%c🎉 نموذج الاتصال جاهز للاستخدام!', 
                    'color: #0ea5e9; font-size: 14px; font-weight: bold;');
                console.log('%cملاحظة: يمكنك رؤية الرسائل المحفوظة عبر:', 
                    'color: #22c55e; font-size: 12px;');
                console.log('%cJSON.parse(localStorage.getItem("zaho_submissions"))', 
                    'background: #1f2937; color: #fbbf24; padding: 4px; border-radius: 4px;');
            })
            .catch(error => {
                console.warn(' لا يمكن الاتصال بـ Formspree:', error);
                console.log(' ستعمل النسخة المحلية (Local Storage) فقط');
                console.log(' سيتم حفظ جميع الرسائل في localStorage');
            });
        }
        
        // استدعاء فحص Formspree بعد تأخير بسيط
        setTimeout(checkFormspree, 3000);
        
        // 🎯 EXTRA: LOG FORM SUBMISSIONS ON PAGE LOAD
        const savedSubmissions = localStorage.getItem('zaho_submissions');
        if (savedSubmissions) {
            const submissions = JSON.parse(savedSubmissions);
            console.log(`إحصائيات الرسائل المحفوظة:`);
            console.log(`   - الإجمالي: ${submissions.length} رسالة`);
            
            const successful = submissions.filter(s => s.status === 'success' || s.status === 'sent').length;
            const failed = submissions.filter(s => s.status === 'failed').length;
            
            console.log(`   - الناجحة: ${successful}`);
            console.log(`   - الفاشلة: ${failed}`);
            
            if (submissions.length > 0) {
                const latest = submissions[submissions.length - 1];
                console.log(`   - آخر رسالة: ${latest.date}`);
            }
        } else {
            console.log(' لا توجد رسائل محفوظة حتى الآن');
        }
        
        console.log(' All modules initialized successfully');
    }
})();