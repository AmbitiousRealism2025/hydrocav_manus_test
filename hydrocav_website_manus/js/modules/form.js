// Form submission handling
export function initFormHandling() {
    const contactForm = document.getElementById('contactForm'); // Assuming form has ID 'contactForm'
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.submit-btn'); // Assumes submit button has class 'submit-btn'
        if (!submitBtn) return;

        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Simulate API call with timeout
        setTimeout(() => {
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message'; // For styling if needed
            // Basic styling, can be enhanced with CSS
            successMessage.innerHTML = '<i class="fas fa-check-circle" style="color: green; margin-right: 8px;"></i> Thank you for your message! We will get back to you soon.';
            successMessage.style.color = '#28a745'; // Bootstrap success green
            successMessage.style.padding = '20px';
            successMessage.style.textAlign = 'center';
            successMessage.style.fontSize = '1.1rem'; // Slightly larger
            successMessage.style.border = '1px solid #c3e6cb'; // Light green border
            successMessage.style.backgroundColor = '#d4edda'; // Light green background
            successMessage.style.borderRadius = '5px';

            // Clear form and show success message
            // It's better to hide the form fields and show the message
            // instead of replacing the entire form's innerHTML.

            // Hide form fields
            Array.from(this.elements).forEach(el => {
                if (el.tagName !== 'FIELDSET' && el.type !== 'hidden') { // Keep fieldsets, hidden inputs if any
                    el.style.display = 'none';
                }
            });

            // Remove existing success message if any
            const existingSuccessMessage = this.querySelector('.success-message');
            if (existingSuccessMessage) {
                existingSuccessMessage.remove();
            }

            this.appendChild(successMessage);

            // Optionally, reset the form fields if they are just hidden and might be shown again later
            // this.reset();
            // submitBtn.disabled = false; // Re-enable if form is to be used again without page reload
            // submitBtn.textContent = originalText;
        }, 2000);
    });
}
