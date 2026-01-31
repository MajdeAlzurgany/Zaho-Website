// Contact Form Management Module with Formspree - FINAL
class ContactFormManager {
    constructor() {
        this.formId = 'contact-form';
        this.messageId = 'form-message';
        this.isSubmitting = false;
        
        //  Formspree ID الخاص بك
        this.formspreeId = 'xzdrlqby'; // ← هذا هو ID الخاص بك!
        
        this.init();
    }

    init() {
        const form = document.getElementById(this.formId);
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // بدء الإرسال
        this.isSubmitting = true;
        submitBtn.disabled = true;
        
        // تحديث نص الزر
        let sendingText = 'جاري الإرسال...';
        let sendText = 'إرسال الرسالة';
        
        if (window.languageManager) {
            const lang = window.languageManager.currentLang;
            sendingText = lang === 'ar' ? 'جاري الإرسال...' : 'Sending...';
            sendText = lang === 'ar' ? 'إرسال الرسالة' : 'Send Message';
        }
        
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin ml-2"></i><span>${sendingText}</span>`;
        
        try {
            // جمع البيانات
            const formData = new FormData(form);
            const data = {
                name: formData.get('user_name'),
                email: formData.get('user_email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                _replyto: formData.get('user_email') // للإرسال إلى المرسل
            };

            console.log('📤 إرسال إلى Formspree:', data);
            
            // إرسال إلى Formspree
            const response = await fetch(`https://formspree.io/f/${this.formspreeId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            console.log('✅ استجابة Formspree:', response);

            if (response.ok) {
                this.showMessage('success', data.email);
                form.reset();
                
                // تسجيل في localStorage للرجوع
                this.saveToLocalStorage(data, 'success');
                
            } else {
                const errorText = await response.text();
                console.error('❌ خطأ Formspree:', errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
            
        } catch (error) {
            console.error('❌ خطأ في الإرسال:', error);
            this.showMessage('error');
            
            // حفظ محلي للبيانات
            const formData = new FormData(form);
            this.saveToLocalStorage({
                name: formData.get('user_name'),
                email: formData.get('user_email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            }, 'failed');
            
        } finally {
            // إعادة الزر
            this.isSubmitting = false;
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fas fa-paper-plane ml-2"></i><span>${sendText}</span>`;
        }
    }

    showMessage(type, email = '') {
        const messageEl = document.getElementById(this.messageId);
        if (!messageEl) return;
        
        let message = '';
        let bgClass = '';
        let icon = '';
        
        if (type === 'success') {
            icon = 'fa-check-circle';
            if (window.languageManager?.currentLang === 'en') {
                message = ` <strong>Message sent successfully!</strong><br>
                We'll respond to: <strong>${email}</strong><br>
                <small>You should receive a confirmation email shortly.</small>`;
            } else {
                message = ` <strong>تم إرسال رسالتك بنجاح!</strong><br>
                سنرد عليك على: <strong>${email}</strong><br>
                <small>سيصلك إيميل تأكيد قريباً.</small>`;
            }
            bgClass = 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800';
        } else {
            icon = 'fa-exclamation-triangle';
            if (window.languageManager?.currentLang === 'en') {
                message = ` <strong>Sending failed!</strong><br>
                Please email us directly at: <strong>info@zaho.ly</strong><br>
                <small>Your message was saved locally (check console).</small>`;
            } else {
                message = ` <strong>فشل إرسال الرسالة!</strong><br>
                راسلنا مباشرة على: <strong>info@zaho.ly</strong><br>
                <small>تم حفظ رسالتك محلياً (افتح الـ Console).</small>`;
            }
            bgClass = 'bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800';
        }
        
        messageEl.innerHTML = `
            <div class="p-5 rounded-2xl ${bgClass} animate-fade-in">
                <div class="flex items-start">
                    <i class="fas ${icon} ml-3 text-xl mt-1"></i>
                    <div class="text-right rtl:text-right">${message}</div>
                </div>
            </div>
        `;
        
        messageEl.classList.remove('hidden');
        
        setTimeout(() => {
            messageEl.classList.add('hidden');
        }, 8000);
    }

    saveToLocalStorage(data, status = 'sent') {
        const submission = {
            ...data,
            status: status,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleString('ar-LY'),
            formspreeId: this.formspreeId
        };
        
        let submissions = JSON.parse(localStorage.getItem('zaho_submissions') || '[]');
        submissions.push(submission);
        localStorage.setItem('zaho_submissions', JSON.stringify(submissions));
        
        console.log(` ${status === 'success' ? ' تم الإرسال بنجاح' : ' فشل الإرسال'}`);
        console.log(` إجمالي الرسائل المحفوظة: ${submissions.length}`);
        console.log(' لعرض جميع الرسائل، افتح Console وأكتب:');
        console.log('JSON.parse(localStorage.getItem("zaho_submissions"))');
    }
}

// تصدير الكلاس
if (typeof window !== 'undefined') {
    window.ContactFormManager = ContactFormManager;
}