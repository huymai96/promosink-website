// =========================================
// PROMOS INK - Interactive Scripts
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // Navbar Scroll Effect
    // =========================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // =========================================
    // Mobile Menu Toggle
    // =========================================
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // =========================================
    // Smooth Scrolling for Anchor Links
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });

    // =========================================
    // Animated Counter
    // =========================================
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const counterSpeed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / counterSpeed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // =========================================
    // Scroll Reveal Animation
    // =========================================
    const revealElements = document.querySelectorAll('.service-card, .process-step, .capability-item, .gallery-item, .testimonial-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach((el, index) => {
        el.classList.add('reveal-element');
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        revealObserver.observe(el);
    });
    
    // Add reveal styles
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .reveal-element {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reveal-element.revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(revealStyle);

    // =========================================
    // Gallery Filter
    // =========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // =========================================
    // Form Submission Handler
    // =========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Here you would typically send to server
            console.log('Form submitted:', data);
            
            // Show success message (in production, show after successful submission)
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = `
                <span>Request Sent!</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
            
            // Reset form
            this.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    }

    // =========================================
    // Parallax Effect for Hero
    // =========================================
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
            heroContent.style.opacity = 1 - (scrolled * 0.002);
        }
    });

    // =========================================
    // Service Card Hover Effects
    // =========================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // =========================================
    // Typing Effect for Hero Title (Optional)
    // =========================================
    // Uncomment if you want typing effect
    /*
    const typingText = document.querySelector('.title-line.highlight');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
    */

    // =========================================
    // Intersection Observer for Section Headers
    // =========================================
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        header.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        headerObserver.observe(header);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .section-header.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // =========================================
    // Mouse Follower for Hero (Optional Enhancement)
    // =========================================
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const heroGradient = document.querySelector('.hero-gradient');
            if (heroGradient) {
                heroGradient.style.background = `
                    radial-gradient(ellipse 80% 60% at ${20 + mouseX * 20}% ${20 + mouseY * 20}%, rgba(255, 51, 102, 0.15) 0%, transparent 50%),
                    radial-gradient(ellipse 60% 80% at ${80 - mouseX * 20}% ${80 - mouseY * 20}%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                    radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255, 107, 53, 0.08) 0%, transparent 50%)
                `;
            }
        });
    }

    // =========================================
    // Preloader (Optional)
    // =========================================
    // window.addEventListener('load', function() {
    //     const preloader = document.querySelector('.preloader');
    //     if (preloader) {
    //         preloader.style.opacity = '0';
    //         setTimeout(() => {
    //             preloader.style.display = 'none';
    //         }, 500);
    //     }
    // });

    console.log('Promos Ink website loaded successfully! 🎨');
});

