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
       CONSOLE MESSAGE
       ======================================== */
    console.log('%c Studio3D ', 'background: linear-gradient(135deg, #6366f1, #ec4899); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%c Trasformiamo le tue idee in realtà! ', 'font-size: 14px; color: #6366f1;');
});
