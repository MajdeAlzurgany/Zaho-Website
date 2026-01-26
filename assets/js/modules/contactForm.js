// Contact Form Management Module
class ContactFormManager {
    constructor() {
        this.formId = 'contact-form';
        this.messageId = 'form-message';
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
        
        const form = e.target;
        const formData = new FormData(form);
        const data = {
            name: formData.get('user_name'),
            email: formData.get('user_email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="lang-ar">جاري الإرسال...</span><span class="lang-en lang-hidden">Sending...</span>';

        try {
            // Try Formspree first (replace with your form ID)
            const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                    _replyto: data.email
                })
            });

            if (response.ok) {
                this.showMessage('success', this.getSuccessMessage());
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Fallback: Show instructions
            this.showMessage('info', this.getInfoMessage());
            console.log('Form data:', data);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    showMessage(type, message) {
        const messageEl = document.getElementById(this.messageId);
        if (!messageEl) return;

        messageEl.className = `mt-4 p-4 rounded-lg ${
            type === 'success' ? 'bg-green-600 dark:bg-green-700' : 
            type === 'error' ? 'bg-red-600 dark:bg-red-700' : 
            'bg-blue-600 dark:bg-blue-700'
        } text-white`;
        messageEl.textContent = message;
        messageEl.classList.remove('hidden');
        
        setTimeout(() => {
            messageEl.classList.add('hidden');
        }, 5000);
    }

    getSuccessMessage() {
        const lang = document.documentElement.lang;
        return lang === 'ar' ? 'تم إرسال الرسالة بنجاح!' : 'Message sent successfully!';
    }

    getInfoMessage() {
        const lang = document.documentElement.lang;
        return lang === 'ar' 
            ? 'يرجى إعداد Formspree أو EmailJS لإرسال النماذج. راجع ملف README.md للتعليمات.'
            : 'Please set up Formspree or EmailJS for form submission. See README.md for instructions.';
    }
}

// Export for use in other modules
window.ContactFormManager = ContactFormManager;

