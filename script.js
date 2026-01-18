// Menu Toggle pour Mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const headerActions = document.querySelector('.header-actions');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        headerActions.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
}

// Fermer le menu mobile lors du clic sur un lien
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            headerActions.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Réinitialiser l'animation du menu toggle
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.webkitTransform = '';
            spans[0].style.mozTransform = '';
            spans[0].style.msTransform = '';
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.webkitTransform = '';
            spans[2].style.mozTransform = '';
            spans[2].style.msTransform = '';
            spans[2].style.transform = '';
        }
    });
});

// Fonction de scroll fluide vers une section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const sectionPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
        });
    }
}

// Sélectionner un service depuis les cartes
function selectService(serviceType) {
    window.location.href = `commander.html?service=${serviceType}`;
}

// Sélectionner une offre depuis les cartes
function selectOffer(offerType) {
    window.location.href = `commander.html?offer=${offerType}`;
}

// Gestion du formulaire de commande
const orderForm = document.getElementById('orderForm');
const orderFeedback = document.getElementById('orderFeedback');

if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(orderForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Validation basique
        const requiredFields = ['service', 'needs', 'delivery', 'name', 'email', 'phone'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = document.getElementById(field) || document.querySelector(`input[name="${field}"]`);
            if (input && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 3000);
            }
        });
        
        if (!isValid) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Simuler l'envoi (dans un vrai projet, vous feriez un appel API ici)
        console.log('Données du formulaire:', data);
        
        // Sauvegarder dans le système admin
        if (typeof window.saveOrderToAdmin === 'function') {
            window.saveOrderToAdmin(data);
        } else {
            // Fallback: sauvegarder directement
            const orders = JSON.parse(localStorage.getItem('nexoria_orders') || '[]');
            data.date = new Date().toISOString();
            data.status = 'pending';
            orders.push(data);
            localStorage.setItem('nexoria_orders', JSON.stringify(orders));
        }
        
        // Afficher l'état de chargement
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        if (btnText && btnLoader) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;
        }
        
        // Simuler l'envoi (dans un vrai projet, vous feriez un appel API ici)
        setTimeout(() => {
            // Afficher le feedback de succès
            orderForm.style.display = 'none';
            orderFeedback.style.display = 'block';
            
            // Réinitialiser le bouton
            if (btnText && btnLoader) {
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
            
            // Animation d'apparition
            orderFeedback.style.animation = 'fadeIn 0.5s ease';
            
            // Scroll vers le feedback
            setTimeout(() => {
                orderFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }, 1500); // Simule un délai d'envoi
        
        // Optionnel: Envoyer les données à un serveur
        // fetch('/api/order', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(result => {
        //     console.log('Succès:', result);
        // })
        // .catch(error => {
        //     console.error('Erreur:', error);
        // });
    });
}

// Réinitialiser le formulaire
function resetForm() {
    if (orderForm) {
        orderForm.reset();
        orderForm.style.display = 'block';
    }
    if (orderFeedback) {
        orderFeedback.style.display = 'none';
    }
    
    // Scroll vers le formulaire
    scrollToSection('commander');
}

// Barre de recherche
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.search-btn');

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        performSearch();
    });
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        return;
    }
    
    // Recherche dans les sections du site
    const sections = document.querySelectorAll('section');
    let found = false;
    
    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            found = true;
            scrollToSection(section.id);
            // Highlight visuel temporaire
            section.style.outline = '2px solid var(--electric-blue)';
            setTimeout(() => {
                section.style.outline = '';
            }, 2000);
        }
    });
    
    if (!found) {
        alert('Aucun résultat trouvé pour "' + searchTerm + '"');
    }
}

// Animation au scroll (Intersection Observer)
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.webkitTransform = 'translateY(0)';
                entry.target.style.mozTransform = 'translateY(0)';
                entry.target.style.msTransform = 'translateY(0)';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animateElements = document.querySelectorAll('.service-card, .offer-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.webkitTransform = 'translateY(30px)';
        el.style.mozTransform = 'translateY(30px)';
        el.style.msTransform = 'translateY(30px)';
        el.style.transform = 'translateY(30px)';
        el.style.webkitTransition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.mozTransition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.msTransition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
} else {
    // Fallback pour les navigateurs sans IntersectionObserver
    const animateElements = document.querySelectorAll('.service-card, .offer-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '1';
    });
}

// Gestion du scroll pour le header
let lastScroll = 0;
const header = document.querySelector('.header');

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
            header.style.backgroundColor = 'rgba(15, 15, 15, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = '';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

// Smooth scroll pour tous les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const targetId = href.substring(1);
            scrollToSection(targetId);
        }
    });
});

// Validation en temps réel des champs du formulaire
const formInputs = document.querySelectorAll('#orderForm input, #orderForm textarea, #orderForm select');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(255, 68, 68)') {
            validateField(input);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    if (isRequired && !value) {
        field.style.borderColor = '#ff4444';
        return false;
    }
    
    // Validation email
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.style.borderColor = '#ff4444';
            return false;
        }
    }
    
    // Validation téléphone
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 8) {
            field.style.borderColor = '#ff4444';
            return false;
        }
    }
    
    field.style.borderColor = '';
    return true;
}

// Lazy loading pour les images (si ajoutées plus tard)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Gestion du menu toggle animation
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const spans = menuToggle.querySelectorAll('span');
        if (menuToggle.classList.contains('active')) {
            spans[0].style.webkitTransform = 'rotate(45deg) translate(8px, 8px)';
            spans[0].style.mozTransform = 'rotate(45deg) translate(8px, 8px)';
            spans[0].style.msTransform = 'rotate(45deg) translate(8px, 8px)';
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[2].style.webkitTransform = 'rotate(-45deg) translate(7px, -7px)';
            spans[2].style.mozTransform = 'rotate(-45deg) translate(7px, -7px)';
            spans[2].style.msTransform = 'rotate(-45deg) translate(7px, -7px)';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.webkitTransform = '';
            spans[0].style.mozTransform = '';
            spans[0].style.msTransform = '';
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.webkitTransform = '';
            spans[2].style.mozTransform = '';
            spans[2].style.msTransform = '';
            spans[2].style.transform = '';
        }
    });
}

// Fermer le menu mobile lors du redimensionnement de la fenêtre
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            headerActions.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Réinitialiser l'animation du menu toggle
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.webkitTransform = '';
            spans[0].style.mozTransform = '';
            spans[0].style.msTransform = '';
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.webkitTransform = '';
            spans[2].style.mozTransform = '';
            spans[2].style.msTransform = '';
            spans[2].style.transform = '';
        }
    }, 250);
}, { passive: true });

// Ajouter un effet de parallaxe léger au hero (optionnel)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.webkitTransform = `translateY(${scrolled * 0.5}px)`;
        hero.style.mozTransform = `translateY(${scrolled * 0.5}px)`;
        hero.style.msTransform = `translateY(${scrolled * 0.5}px)`;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}, { passive: true });

// Gestion de la navigation active
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Console log pour le développement (à retirer en production)
console.log('%cNEXORIA DIGITAL', 'color: #00ccff; font-size: 24px; font-weight: bold;');
console.log('%cSite web chargé avec succès!', 'color: #3399ff; font-size: 14px;');
