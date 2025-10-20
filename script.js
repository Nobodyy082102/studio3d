/* ========================================
   STUDIO3D - JAVASCRIPT
   ======================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

    /* ========================================
       MOBILE MENU TOGGLE
       ======================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ========================================
       NAVBAR SCROLL EFFECT
       ======================================== */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ========================================
       ACTIVE NAV LINK ON SCROLL
       ======================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    /* ========================================
       SMOOTH SCROLL
       ======================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ========================================
       GALLERY FILTERS
       ======================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filter items with fade animation
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'tutti' || category === filter) {
                    item.style.animation = 'fadeInUp 0.6s ease';
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    /* ========================================
       SCROLL ANIMATIONS (Fade In Up)
       ======================================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('.servizio-card, .gallery-item, .processo-step, .prezzo-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    /* ========================================
       FORM HANDLER (EmailJS)
       ======================================== */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get submit button to show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Invio in corso...';
            submitBtn.disabled = true;

            // Get tipo label for the email
            const tipoSelect = document.getElementById('tipo');
            const tipoLabel = tipoSelect.options[tipoSelect.selectedIndex].text;

            // Prepare template parameters
            const templateParams = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value || 'Non fornito',
                tipo_progetto: tipoLabel,
                messaggio: document.getElementById('messaggio').value,
                current_date: new Date().toLocaleDateString('it-IT')
            };

            // Send email via EmailJS
            emailjs.send('service_h75uzai', 'template_2jzj15j', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);

                    // Show success message
                    alert('✅ Messaggio inviato con successo! Ti risponderemo entro 24 ore.');

                    // Reset form
                    contactForm.reset();

                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, function(error) {
                    console.log('FAILED...', error);

                    // Show error message
                    alert('❌ Errore durante l\'invio. Riprova o contattaci direttamente a info@studio3d.it');

                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    /* ========================================
       PARALLAX EFFECT ON HERO
       ======================================== */
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${parallax}px)`;
        });
    }

    /* ========================================
       ADD CSS FOR HIDDEN CLASS
       ======================================== */
    const style = document.createElement('style');
    style.textContent = `
        .gallery-item.hidden {
            display: none;
        }
    `;
    document.head.appendChild(style);

    /* ========================================
       SCROLL TO TOP BUTTON
       ======================================== */
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        // Show/hide button on scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ========================================
       FAQ ACCORDION
       ======================================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            // Close other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });

    /* ========================================
       ANIMATED COUNTERS
       ======================================== */
    const counters = document.querySelectorAll('.counter-number');
    let countersAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    };

    // Trigger counter animation when section is visible
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const chiSiamoSection = document.querySelector('.chi-siamo');
    if (chiSiamoSection) {
        counterObserver.observe(chiSiamoSection);
    }

    /* ========================================
       GALLERY LIGHTBOX
       ======================================== */
    // Create lightbox element
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-image">
                <img src="" alt="">
            </div>
            <div class="lightbox-info">
                <h3 class="lightbox-title"></h3>
                <p class="lightbox-description"></p>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-image img');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDescription = lightbox.querySelector('.lightbox-description');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // Open lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imagePlaceholder = this.querySelector('.placeholder-emoji svg use');
            const title = this.querySelector('.gallery-title').textContent;
            const description = this.querySelector('.gallery-description').textContent;
            const gradientBg = this.querySelector('.gallery-image').className.split(' ')[1];

            // For now, since we don't have real images, we'll just show the gradient background
            // In production, you would set: lightboxImg.src = this.querySelector('img').src;

            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;

            // Show placeholder in lightbox (since we don't have real images yet)
            const placeholderDiv = document.createElement('div');
            placeholderDiv.className = `gallery-image ${gradientBg}`;
            placeholderDiv.style.width = '600px';
            placeholderDiv.style.height = '400px';
            placeholderDiv.style.borderRadius = '12px';
            placeholderDiv.innerHTML = `<span class="placeholder-emoji">${imagePlaceholder.outerHTML}</span>`;

            lightboxImg.replaceWith(placeholderDiv);

            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close lightbox on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    /* ========================================
       COOKIE BANNER
       ======================================== */
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');

    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');

    if (!cookieConsent) {
        // Show banner after 1 second
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    // Accept cookies
    cookieAccept.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.remove('show');

        // Here you would enable your analytics/tracking scripts
        console.log('Cookies accepted - Enable analytics');
    });

    // Reject cookies
    cookieReject.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieBanner.classList.remove('show');

        // Here you would disable analytics/tracking
        console.log('Cookies rejected - Disable analytics');
    });

    /* ========================================
       CONSOLE MESSAGE
       ======================================== */
    console.log('%c Studio3D ', 'background: linear-gradient(135deg, #6366f1, #ec4899); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%c Trasformiamo le tue idee in realtà! ', 'font-size: 14px; color: #6366f1;');
});
