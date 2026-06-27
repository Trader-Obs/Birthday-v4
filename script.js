document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const startButton = document.getElementById('startButton');
    const envelopeContainer = document.getElementById('envelopeContainer');
    const photoNextButton = document.getElementById('photoNextButton');
    const letterPrev = document.getElementById('letterPrev');
    const letterNext = document.getElementById('letterNext');
    const finalGreetingElement = document.getElementById('finalGreeting');
    const cakeFrame = document.querySelector('.cake-container iframe');

    const steps = {
        step1: document.getElementById('step1'),
        step2: document.getElementById('step2'),
        step3: document.getElementById('step3'),
        step4: document.getElementById('step4'),
        step5: document.getElementById('step5'),
    };

    const messageGreeting = "Happy Birthday,";
    const totalSlides = 5; // slides 0–4
    let currentSlide = 0;

    // --- Utility: Transition Steps ---
    function transitionToStep(targetStepId) {
        const currentActive = document.querySelector('.step.active');
        if (currentActive) currentActive.classList.remove('active');
        steps[targetStepId].classList.add('active');
    }

    // --- Step 1: Start ---
    startButton.addEventListener('click', () => {
        transitionToStep('step2');
        backgroundMusic.play().catch(() => {});
    });

    // --- Step 2: Envelope ---
    envelopeContainer.addEventListener('click', () => {
        envelopeContainer.classList.add('open');
        envelopeContainer.querySelector('.click-instruction').style.opacity = '0';
        setTimeout(() => {
            transitionToStep('step3');
        }, 700);
    });

    // --- Step 3: Photos → Letter ---
    photoNextButton.addEventListener('click', () => {
        transitionToStep('step4');
        setTimeout(() => {
            document.getElementById('letterContainer').classList.add('show');
        }, 100);
    });

    // --- Step 4: Animated Letter Navigation ---
    function showSlide(index) {
        // Update slide visibility
        document.querySelectorAll('.letter-slide').forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
        // Update dots
        document.querySelectorAll('.progress-dot').forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
        // Update button visibility
        letterPrev.style.display = index === 0 ? 'none' : 'inline-block';

        const isLast = index === totalSlides - 1;
        letterNext.textContent = isLast ? 'See Birthday Surprise 🎉' : 'Next →';
        letterNext.classList.toggle('primary', true);
    }

    letterNext.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            showSlide(currentSlide);
        } else {
            // Last slide → go to celebration
            transitionToStep('step5');
            startCelebrationAnimations();
        }
    });

    letterPrev.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    });

    // Initialize first slide state
    showSlide(0);

    // --- Step 5: Grand Celebration Animations ---
    function startCelebrationAnimations() {
        if (cakeFrame && cakeFrame.contentWindow) {
            cakeFrame.contentWindow.postMessage('startCake', '*');
        }

        // Typewriter effect
        let i = 0;
        finalGreetingElement.textContent = '';
        finalGreetingElement.style.borderRight = '3px solid var(--accent-yellow)';

        const typingInterval = setInterval(() => {
            if (i < messageGreeting.length) {
                finalGreetingElement.textContent += messageGreeting.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                finalGreetingElement.classList.add('typed');
            }
        }, 100);

        // Confetti bursts
        createConfettiCannon(100, 0.5);
        setTimeout(() => createConfettiCannon(80, 0.3), 500);
        setTimeout(() => createConfettiCannon(60, 0.2), 1000);

        // Balloons & fireworks
        createBalloons(15);
        createFireworks(5);
    }

    // --- Confetti ---
    function createConfettiCannon(count, delayMultiplier) {
        const container = document.querySelector('.confetti-cannon-container');
        const colors = ['var(--primary-red)', 'var(--accent-yellow)', 'var(--text-light)', '#00d8d6', '#8e44ad'];

        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            el.classList.add('confetti');
            el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            el.style.left = `${Math.random() * 100}vw`;
            el.style.top = `${Math.random() * 20 - 10}vh`;
            const duration = Math.random() * 2 + 3;
            const delay = Math.random() * delayMultiplier;
            el.style.animationDuration = `${duration}s`;
            el.style.animationDelay = `${delay}s`;
            const size = Math.random() * 8 + 4;
            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            if (Math.random() > 0.5) el.style.borderRadius = '50%';
            el.style.transform = `rotate(${Math.random() * 360}deg)`;
            container.appendChild(el);
            el.addEventListener('animationend', () => el.remove());
        }
    }

    // --- Balloons ---
    function createBalloons(count) {
        const container = document.querySelector('.balloons-container');
        const colors = ['var(--primary-red)', 'var(--accent-yellow)', '#00d8d6', '#8e44ad', '#3498db'];

        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            el.classList.add('balloon');
            el.style.left = `${Math.random() * 80 + 10}vw`;
            el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            el.style.animationDuration = `${Math.random() * 6 + 10}s`;
            el.style.animationDelay = `${Math.random() * 5}s`;
            container.appendChild(el);
            el.addEventListener('animationend', () => el.remove());
        }
    }

    // --- Fireworks ---
    function createFireworks(count) {
        const container = document.querySelector('.fireworks-container');
        const colors = ['var(--primary-red)', 'var(--accent-yellow)', 'var(--text-light)', '#00d8d6'];

        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            el.classList.add('firework');
            el.style.left = `${Math.random() * 80 + 10}vw`;
            el.style.bottom = `${Math.random() * 20}vh`;
            el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            el.style.boxShadow = `0 0 5px ${el.style.backgroundColor}`;
            const delay = Math.random() * 3;
            el.style.animationDelay = `${delay}s, ${delay + 3}s`;
            container.appendChild(el);
            el.addEventListener('animationend', () => el.remove());
        }
    }
});
