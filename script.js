// Color Palette Data
const palettes = {
    ocean: {
        name: 'Ocean',
        colors: {
            primary: '#006bb3',
            secondary: '#0099ff',
            accent: '#e0f4ff'
        },
        description: 'Cool ocean blues - calming and professional'
    },
    sunset: {
        name: 'Sunset',
        colors: {
            primary: '#ff6b35',
            secondary: '#f7931e',
            accent: '#ffd700'
        },
        description: 'Warm sunset tones - energetic and vibrant'
    },
    forest: {
        name: 'Forest',
        colors: {
            primary: '#2d5016',
            secondary: '#6fa876',
            accent: '#c5e1a5'
        },
        description: 'Natural green tones - growth and balance'
    },
    berry: {
        name: 'Berry',
        colors: {
            primary: '#8e44ad',
            secondary: '#e74c3c',
            accent: '#ecf0f1'
        },
        description: 'Purple and red - creative and bold'
    },
    mint: {
        name: 'Mint',
        colors: {
            primary: '#1abc9c',
            secondary: '#16a085',
            accent: '#ecf0f1'
        },
        description: 'Fresh mint tones - modern and clean'
    }
};

// Default palette
let currentPalette = 'ocean';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializePaletteButtons();
    applyPalette('ocean');
});

// Initialize palette buttons
function initializePaletteButtons() {
    const buttons = document.querySelectorAll('.palette-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const paletteName = e.target.getAttribute('data-palette');
            applyPalette(paletteName);
            
            // Update active button
            buttons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
    
    // Set initial active button
    document.querySelector('[data-palette="ocean"]').classList.add('active');
}

// Apply selected palette to the UI
function applyPalette(paletteName) {
    const palette = palettes[paletteName];
    if (!palette) return;

    currentPalette = paletteName;

    // Set CSS variables
    document.documentElement.style.setProperty('--primary-color', palette.colors.primary);
    document.documentElement.style.setProperty('--secondary-color', palette.colors.secondary);
    document.documentElement.style.setProperty('--accent-color', palette.colors.accent);

    // Update color display boxes
    updateColorDisplay(palette);

    // Animate the transition
    animateColorTransition();
}

// Update color display boxes
function updateColorDisplay(palette) {
    const color1Box = document.getElementById('color1');
    const color2Box = document.getElementById('color2');
    const color3Box = document.getElementById('color3');

    // Update primary color
    color1Box.querySelector('.color-code').textContent = palette.colors.primary;
    color1Box.querySelector('.color-sample').style.backgroundColor = palette.colors.primary;

    // Update secondary color
    color2Box.querySelector('.color-code').textContent = palette.colors.secondary;
    color2Box.querySelector('.color-sample').style.backgroundColor = palette.colors.secondary;

    // Update accent color
    color3Box.querySelector('.color-code').textContent = palette.colors.accent;
    color3Box.querySelector('.color-sample').style.backgroundColor = palette.colors.accent;
}

// Animate color transition
function animateColorTransition() {
    const colorBoxes = document.querySelectorAll('.color-box');
    colorBoxes.forEach(box => {
        box.style.opacity = '0.5';
        setTimeout(() => {
            box.style.opacity = '1';
        }, 50);
    });
}

// Copy color code to clipboard
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('color-code')) {
        const colorCode = e.target.textContent;
        navigator.clipboard.writeText(colorCode).then(() => {
            // Show feedback
            const originalText = e.target.textContent;
            e.target.textContent = 'Copied!';
            setTimeout(() => {
                e.target.textContent = originalText;
            }, 1500);
        });
    }
});

// Smooth scroll for buttons
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

// Add hover effects to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Contrast ratio calculation (WCAG guidelines)
function calculateContrastRatio(rgb1, rgb2) {
    // Convert hex to RGB and calculate luminance
    function getLuminance(hex) {
        const rgb = parseInt(hex.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;

        // Calculate relative luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? 'light' : 'dark';
    }

    return getLuminance(rgb1) !== getLuminance(rgb2);
}

// Export current palette
function exportPalette() {
    const palette = palettes[currentPalette];
    const paletteData = {
        name: palette.name,
        colors: palette.colors,
        exportedAt: new Date().toLocaleString()
    };

    const json = JSON.stringify(paletteData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${palette.name.toLowerCase()}-palette.json`;
    a.click();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'P' to open palette selector
    if (e.key === 'p' || e.key === 'P') {
        const selector = document.querySelector('.palette-selector');
        selector.scrollIntoView({ behavior: 'smooth' });
    }

    // Press 'C' to open contrast checker
    if (e.key === 'c' || e.key === 'C') {
        const checker = document.querySelector('.contrast-checker');
        checker.scrollIntoView({ behavior: 'smooth' });
    }
});

// Add transitions to all elements
const style = document.createElement('style');
style.textContent = `
    * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }
`;
document.head.appendChild(style);

console.log('Color Palette Explorer initialized!');
console.log('Tips:');
console.log('- Click on color codes to copy them');
console.log('- Press "P" to jump to palette selector');
console.log('- Press "C" to jump to contrast checker');
