// 1. Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const icon = hamburger.querySelector('i');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// 2. Sticky Navbar
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 3. Scroll Animations (Intersection Observer)
const fadeUpElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .clip-reveal');
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeUpElements.forEach(el => observer.observe(el));

// 4. Count-up Animation
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            
            // Specific handling for rating (float)
            if (target % 1 !== 0) {
                let currentCount = 0;
                const inc = target / 100;
                const updateFloatCount = () => {
                    currentCount += inc;
                    if (currentCount < target) {
                        counter.innerText = currentCount.toFixed(1);
                        setTimeout(updateFloatCount, 10);
                    } else {
                        counter.innerText = target.toFixed(1);
                    }
                };
                updateFloatCount();
            } else {
                updateCount();
            }
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// 5. Dynamic "Open Now" Status (IST)
function updateStatus() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const ist = new Date(utc + (3600000 * 5.5));
    
    const hours = ist.getHours();
    
    const badge = document.getElementById('status-badge');
    const text = document.getElementById('status-text');
    
    if (badge && text) {
        // Open 5:00 AM (5) to 10:00 PM (22)
        if (hours >= 5 && hours < 22) {
            badge.className = 'status-badge open';
            text.innerText = 'Open Now';
        } else {
            badge.className = 'status-badge closed';
            text.innerText = 'Currently Closed';
        }
    }
}

updateStatus();
setInterval(updateStatus, 60000);
