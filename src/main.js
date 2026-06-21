import './style.css'

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations (fade-in)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Google Form Submission Handler
const form = document.getElementById('bodysynx-form');
const statusDiv = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // The Google Form POST action URL
        const formAction = 'https://docs.google.com/forms/d/e/1FAIpQLSfiVeB-M76LTIKLL-Z5HZnzphV0JZLkr3N2YibrhQ_omGJLXQ/formResponse';
        
        // Gather form data
        const formData = new FormData(form);
        
        // Create a URLSearchParams object to format data properly
        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        try {
            // Use mode: 'no-cors' since Google Forms doesn't support CORS for direct submissions
            await fetch(formAction, {
                method: 'POST',
                mode: 'no-cors',
                body: data
            });
            
            // Since we are using no-cors, we can't read the response properly to check if it actually succeeded
            // but it usually does if the fields are correct.
            statusDiv.textContent = "Thank you! Your consultation request has been submitted successfully.";
            statusDiv.className = "status-success";
            form.reset();
            
        } catch (error) {
            console.error("Form submission error:", error);
            statusDiv.textContent = "Oops! Something went wrong. Please try again later or contact us directly.";
            statusDiv.className = "status-error";
        }
    });
}
