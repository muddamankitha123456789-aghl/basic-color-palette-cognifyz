// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show example tab
function showExample(exampleName) {
    // Hide all examples
    const allExamples = document.querySelectorAll('.example-content');
    allExamples.forEach(example => {
        example.classList.remove('active');
    });

    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.tab-btn');
    allButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected example
    const selectedExample = document.getElementById(exampleName);
    if (selectedExample) {
        selectedExample.classList.add('active');
    }

    // Add active class to clicked button
    event.target.classList.add('active');
}

// Update preview
function updatePreview() {
    const productName = document.getElementById('product').value || 'Your Product Name';
    const headline = document.getElementById('headline').value || 'Your Compelling Headline Here';
    const description = document.getElementById('description').value || 'Your concise, engaging description will appear here.';
    const cta = document.getElementById('cta').value || 'Your CTA Text';
    const color = document.getElementById('color').value || 'blue';

    // Update preview content
    document.getElementById('previewHeadline').textContent = headline;
    document.getElementById('previewDescription').textContent = description;
    document.getElementById('previewCTA').textContent = cta;

    // Update preview frame color
    const previewFrame = document.getElementById('previewFrame');
    const colorMap = {
        'blue': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'green': 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        'orange': 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
        'purple': 'linear-gradient(135deg, #8e44ad 0%, #c0392b 100%)'
    };

    previewFrame.style.background = colorMap[color];
}

// Handle contact form submission
function handleSubmit(event) {
    event.preventDefault();

    // Get form values
    const name = event.target.querySelector('input[type="text"]').value;
    const email = event.target.querySelector('input[type="email"]').value;
    const message = event.target.querySelector('textarea').value;

    // Simple validation
    if (name && email && message) {
        // Show success message
        alert(`Thank you, ${name}! We received your message and will get back to you soon at ${email}`);
        
        // Reset form
        event.target.reset();
    } else {
        alert('Please fill in all fields');
    }
}

// Smooth scroll on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Landing Page Design Project loaded!');

    // Initialize with default values
    updatePreview();

    // Add animation to cards on scroll
    observeCards();

    // Initialize first tab
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        firstTab.classList.add('active');
    }
});

// Observe cards for animation on scroll
function observeCards() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const cards = document.querySelectorAll(
        '.step-card, .component-card, .hierarchy-card, .principle-card, .mistake-card'
    );
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to hero section
    if (e.key === 'h' || e.key === 'H') {
        scrollToSection('hero');
    }

    // Press 'C' to go to components
    if (e.key === 'c' || e.key === 'C') {
        scrollToSection('components');
    }

    // Press 'E' to go to examples
    if (e.key === 'e' || e.key === 'E') {
        scrollToSection('examples');
    }
});

// Add interactive feedback to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'rippleAnimation 0.6s ease-out';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

// Track scroll position
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        if (navbar) navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        if (navbar) navbar.style.transform = 'translateY(0)';
    }

    if (navbar) navbar.style.transition = 'transform 0.3s ease';
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    }
}

// Log tips to console
console.log('%cLanding Page Design Project - Level 2: Intermediate', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cKeyboard Shortcuts:', 'color: #00cc99; font-weight: bold;');
console.log('Press H - Go to Hero Section');
console.log('Press C - Go to Components');
console.log('Press E - Go to Examples');
console.log('%cDesign Tips:', 'color: #ff6b6b; font-weight: bold;');
console.log('1. Keep your headline under 10 words');
console.log('2. Use action verbs in your CTA');
console.log('3. Test your landing page on mobile');
console.log('4. Focus on benefits, not features');
console.log('5. Always include social proof');
console.log('6. Ensure good color contrast');
console.log('7. Follow visual hierarchy principles');
