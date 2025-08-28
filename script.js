// DOM elements
const starsContainer = document.getElementById('starsContainer');
const balloonsContainer = document.getElementById('balloonsContainer');
const confettiContainer = document.getElementById('confettiContainer');
const interactiveEffects = document.getElementById('interactiveEffects');
const surpriseBtn = document.getElementById('surpriseBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const heroTitle = document.getElementById('heroTitle');
const heroDate = document.getElementById('heroDate');
const loadingScreen = document.getElementById('loadingScreen');
const catImage = document.getElementById('catImage');
const countdownTimer = document.getElementById('countdownTimer');
const fireworksContainer = document.getElementById('fireworksContainer');
const birthdayMusic = document.getElementById('birthdayMusic');

function playBirthdayMusic() {
    if (birthdayMusic) {
        birthdayMusic.volume = 0.5; // Optional: set volume
        birthdayMusic.play().catch(() => {});
    }
}

// Animation state and performance tracking
let animationId;
let isInitialized = false;
let lastInteractionTime = 0;
let activeEffectsCount = 0;
let balloonInterval;
let confettiInterval;

/**
 * Creates animated twinkling stars in the background
 */
function createStars() {
    // Clear existing stars
    starsContainer.innerHTML = '';
    
    // Optimized star count based on device capabilities
    const numberOfStars = window.innerWidth < 480 ? 30 : window.innerWidth < 768 ? 40 : 70;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random positioning
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 4 + 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random animation delay
        star.style.animationDelay = Math.random() * 2 + 's';
        
        starsContainer.appendChild(star);
    }
}

/**
 * Creates floating balloons that rise from bottom
 */
function createBalloons() {
    const balloons = ['🎈', '🎀', '🌸', '✨', '💫', '🦋'];
    
    function addBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.textContent = balloons[Math.floor(Math.random() * balloons.length)];
        
        // Random horizontal position
        balloon.style.left = Math.random() * 90 + '%';
        
        // Random animation duration
        balloon.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        balloonsContainer.appendChild(balloon);
        
        // Remove balloon after animation
        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.parentNode.removeChild(balloon);
            }
        }, 8000);
    }
    
    // Create initial balloons
    for (let i = 0; i < 3; i++) {
        setTimeout(addBalloon, i * 2000);
    }
    
    // Continue creating balloons periodically with performance optimization
    balloonInterval = setInterval(addBalloon, window.innerWidth < 768 ? 4000 : 3000);
}

/**
 * Creates falling confetti animation
 */
function createConfetti() {
    function addConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random horizontal position
        confetti.style.left = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 4000);
    }
    
    // Create confetti with optimized frequency
    confettiInterval = setInterval(addConfetti, window.innerWidth < 768 ? 300 : 250);
}

/**
 * Creates interactive hearts/stars when user clicks/taps (optimized)
 */
function createInteractiveEffect(x, y) {
    // Limit concurrent effects for performance
    if (activeEffectsCount > 15) return;
    
    const effects = ['💖', '💕', '⭐', '✨', '💜', '🌟'];
    const effect = document.createElement('div');
    
    // Randomly choose between heart and star
    const isHeart = Math.random() > 0.5;
    effect.className = isHeart ? 'heart' : 'interactive-star';
    effect.textContent = effects[Math.floor(Math.random() * effects.length)];
    
    // Position at click/tap location
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    
    interactiveEffects.appendChild(effect);
    activeEffectsCount++;
    
    // Remove effect after animation
    setTimeout(() => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
            activeEffectsCount--;
        }
    }, 2000);
}

/**
 * Handles click/tap events for interactive effects (optimized)
 */
function handleInteraction(event) {
    // Ignore clicks on buttons, modal elements, or interactive elements
    if (event.target.tagName === 'BUTTON' || 
        event.target.closest('.modal-overlay') ||
        event.target.closest('.surprise-btn') ||
        event.target.classList.contains('modal-close')) {
        return;
    }
    
    // Throttle interactions for performance
    const now = Date.now();
    if (now - lastInteractionTime < 100) return;
    lastInteractionTime = now;
    
    // Prevent default behavior
    event.preventDefault();
    
    // Get coordinates relative to viewport
    let x, y;
    if (event.type === 'touchstart' || event.type === 'touchend') {
        const touch = event.touches[0] || event.changedTouches[0];
        x = touch.clientX;
        y = touch.clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }
    
    // Create effect at interaction point
    createInteractiveEffect(x, y);
    
    // Reduced multiple effects for better performance
    if (Math.random() > 0.5) {
        setTimeout(() => createInteractiveEffect(x + Math.random() * 40 - 20, y + Math.random() * 40 - 20), 150);
    }
}

/**
 * Shows the surprise modal with birthday message
 */
function showSurpriseModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Create extra confetti burst
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = '0s';
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 50);
    }
}

/**
 * Hides the surprise modal
 */
function hideSurpriseModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Handles window resize to maintain responsive design
 */
function handleResize() {
    // Recreate stars with appropriate count for screen size
    createStars();
}

/**
 * Sets the date to 7th September 2025 in the hero section
 */
function updateDates() {
    if (heroDate) heroDate.textContent = "7th September 2025";
}

/**
 * Optimizes performance by limiting animation updates
 */
function optimizePerformance() {
    // Reduce animations on smaller devices for better performance
    if (window.innerWidth < 480) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index > 25) star.style.display = 'none';
        });
    }
    
    // Reduce confetti on mobile
    if (window.innerWidth < 768) {
        const confetti = document.querySelectorAll('.confetti');
        if (confetti.length > 10) {
            confetti.forEach((piece, index) => {
                if (index > 10) piece.remove();
            });
        }
    }
}

/**
 * Controls the loading screen sequence with 10-second countdown
 */
function handleLoadingScreen() {
    if (loadingScreen && countdownTimer) {
        loadingScreen.style.display = 'flex';

        // Your 5 sentences
        const sentences = [
            "صحيح انك رخمة بس ماشي 😒😜",
            "بس قولت عادي عشان ملك وضحكتها 😎😁",
            "هدية بسيطه ان شاء الله تعجبك 🎂",
            "بس برضوا هفضل قارفك ف حياتك 😂😂",
            "يا بتاعتة الأوبراتيف 😜😂"
        ];

        let step = 0;

        // Show sentences one by one, then start countdown
        function showNextSentence() {
            if (step < sentences.length) {
                countdownTimer.innerHTML = `<span class="loading-sentence">${sentences[step]}</span>`;
                step++;
                setTimeout(showNextSentence, 4000); // 4s per sentence
            } else {
                playBirthdayMusic(); // Start music here
                startCountdown();
            }
        }

        function startCountdown() {
            let countdown = 5;
            countdownTimer.textContent = countdown;
            const countdownInterval = setInterval(() => {
                countdown--;
                countdownTimer.textContent = countdown >= 0 ? countdown : '';
                // Fade cat image at 3
                if (countdown === 3) {
                    if (catImage) {
                        catImage.style.animation += ', fade-subtle 3s ease-out forwards';
                    }
                }
                // Fireworks and main content at 0
                if (countdown === 0) {
                    clearInterval(countdownInterval);
                    showFireworksExplosion();
                    setTimeout(() => {
                        loadingScreen.classList.add('fade-out');
                        document.body.classList.add('content-visible');
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                        }, 1000);
                    }, 1200);
                }
            }, 1000);
        }

        showNextSentence();
    }
}

/**
 * Initializes all animations and event listeners
 */
function initializeWebsite() {
    if (isInitialized) return;
    
    // Handle loading screen
    handleLoadingScreen();
    
    // Update dates in header and footer
    updateDates();
    
    // Create background animations after loading screen (10.5 seconds)
    setTimeout(() => {
        createStars();
        createBalloons();
        createConfetti();
    }, 10500); // Start animations just after loading screen fades
    
    // Add event listeners for interactive effects with passive listeners for better performance
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction, { passive: false });
    
    // Surprise button event listeners
    surpriseBtn.addEventListener('click', showSurpriseModal);
    surpriseBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        showSurpriseModal();
    });
    
    // Modal close event listeners
    modalClose.addEventListener('click', (e) => {
        e.stopPropagation();
        hideSurpriseModal();
    });
    modalClose.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        hideSurpriseModal();
    });
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            hideSurpriseModal();
        }
    });
    
    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            hideSurpriseModal();
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Optimize performance after initial load
    setTimeout(optimizePerformance, 1000);
    
    isInitialized = true;
}

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Preloader to ensure smooth experience
 */
function showPreloader() {
    // Simple fade-in effect for hero title
    setTimeout(() => {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        heroTitle.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100);
    }, 500);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeWebsite();
    showPreloader();
});

// Fallback for older browsers
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    initializeWebsite();
}

// Handle visibility change to pause/resume animations for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations and clear intervals when tab is hidden
        document.body.style.animationPlayState = 'paused';
        if (balloonInterval) clearInterval(balloonInterval);
        if (confettiInterval) clearInterval(confettiInterval);
    } else {
        // Resume animations when tab is visible
        document.body.style.animationPlayState = 'running';
        // Restart intervals
        if (!balloonInterval) {
            balloonInterval = setInterval(() => {
                const balloon = document.createElement('div');
                balloon.className = 'balloon';
                const balloons = ['🎈', '🎀', '🌸', '✨', '💫', '🦋'];
                balloon.textContent = balloons[Math.floor(Math.random() * balloons.length)];
                balloon.style.left = Math.random() * 90 + '%';
                balloon.style.animationDuration = (Math.random() * 4 + 4) + 's';
                balloonsContainer.appendChild(balloon);
                setTimeout(() => {
                    if (balloon.parentNode) balloon.parentNode.removeChild(balloon);
                }, 8000);
            }, window.innerWidth < 768 ? 4000 : 3000);
        }
        if (!confettiInterval) {
            confettiInterval = setInterval(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDelay = Math.random() * 2 + 's';
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                confettiContainer.appendChild(confetti);
                setTimeout(() => {
                    if (confetti.parentNode) confetti.parentNode.removeChild(confetti);
                }, 4000);
            }, window.innerWidth < 768 ? 300 : 250);
        }
    }
});

const flyingLettersContainer = document.getElementById("flyingLetters");
const letters = "I Love You".split("");

function createFlyingLetter() {
    const letter = document.createElement("span");
    letter.className = "letter";
    letter.textContent = letters[Math.floor(Math.random() * letters.length)];

    // random start position
    letter.style.left = Math.random() * window.innerWidth + "px";
    letter.style.top = Math.random() * window.innerHeight + "px";

    // random fly distance
    const xMove = (Math.random() - 0.5) * 500 + "px";
    const yMove = (Math.random() - 0.5) * 500 + "px";
    letter.style.setProperty("--x-move", xMove);
    letter.style.setProperty("--y-move", yMove);

    flyingLettersContainer.appendChild(letter);

    // remove after animation
    setTimeout(() => {
        if (letter.parentNode) letter.remove();
    }, 6000);
}

// spawn letters repeatedly
setInterval(createFlyingLetter, 800);

// Service worker registration for offline support (optional enhancement)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        // This is optional and would require a separate service worker file
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Analytics and performance monitoring (placeholder for future enhancement)
function trackInteraction(type) {
    // Placeholder for analytics tracking
    console.log(`User interaction: ${type}`);
}

// Add interaction tracking to key elements
surpriseBtn.addEventListener('click', () => trackInteraction('surprise_button_click'));

// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill would be implemented here if needed
}

// Console message for developers
console.log('🎉 Happy Birthday Malak! 🎉\nOptimized website loaded successfully with enhanced performance.');

// Memory cleanup function
function cleanup() {
    if (balloonInterval) clearInterval(balloonInterval);
    if (confettiInterval) clearInterval(confettiInterval);
    
    // Clean up old effects
    const oldEffects = interactiveEffects.querySelectorAll('.heart, .interactive-star');
    oldEffects.forEach(effect => {
        if (effect.parentNode) effect.parentNode.removeChild(effect);
    });
    activeEffectsCount = 0;
}

// Cleanup on page unload
window.addEventListener('beforeunload', cleanup);

/**
 * Shows multiple fireworks explosions with effects
 */
function showFireworksExplosion() {
    const container = document.getElementById('fireworksContainer');
    if (!container) return;
    container.innerHTML = '';

    const colors = ['#FFD700', '#FF69B4', '#9b59b6', '#F9E576', '#00eaff', '#ff6f00', '#fff', '#00ff99', '#ff1493', '#8a2be2'];
    const explosionCount = 8 + Math.floor(Math.random() * 6); // 8-14 explosions

    for (let e = 0; e < explosionCount; e++) {
        // Random explosion center
        const centerX = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
        const centerY = Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2;
        const particles = 8 + Math.floor(Math.random() * 6); // 8-14 particles

        for (let i = 0; i < particles; i++) {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.background = colors[Math.floor(Math.random() * colors.length)];
            firework.style.left = centerX + 'px';
            firework.style.top = centerY + 'px';

            // Random angle and distance
            const angle = (Math.PI * 2 * i) / particles;
            const distance = 80 + Math.random() * 80;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            firework.style.transform = `translate(${x}px, ${y}px) scale(${0.7 + Math.random() * 0.6})`;
            firework.style.animationDelay = (Math.random() * 0.4) + 's';

            container.appendChild(firework);

            // Sparkle effect: add a glowing shadow
            firework.style.boxShadow = `0 0 18px 4px ${firework.style.background}, 0 0 6px 2px #fff`;

            // Remove after animation
            setTimeout(() => {
                if (firework.parentNode) firework.parentNode.removeChild(firework);
            }, 1400 + Math.random() * 400);
        }
    }

    // Hide fireworks container after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 2000);
}
