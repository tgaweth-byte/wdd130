/**
 * PlugPeople - Landing Page JavaScript
 * Gère le scroll, la modale, et les interactions utilisateur
 */

(function () {
  'use strict';

  // ============================================
  // FADE-IN ON SCROLL
  // ============================================
  const fadeElements = document.querySelectorAll('.fade-in');

  function handleScroll() {
    fadeElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // L'élément devient visible quand il est à 85% de la hauteur de la fenêtre
      if (rect.top < windowHeight * 0.85) {
        element.classList.add('visible');
      }
    });
  }

  // ============================================
  // MODAL MANAGEMENT
  // ============================================
  const modal = document.getElementById('pro-modal');

  function showProModal() {
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Empêche le scroll
    }
  }

  function hideProModal() {
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = ''; // Restaure le scroll
    }
  }

  function submitProRequest() {
    hideProModal();

    // Simulation d'envoi
    setTimeout(() => {
      alert("✅ Merci ! Votre candidature a bien été envoyée.\nNotre équipe vous contactera dans les 24h.");
    }, 100);

    // Log de confirmation
    console.log('%c[PlugPeople] Candidature professionnel reçue', 'color: #10b981; font-weight: 600;');
  }

  // ============================================
  // CLOSE MODAL ON ESCAPE
  // ============================================
  function handleEscape(e) {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
      hideProModal();
    }
  }

  // ============================================
  // CLOSE MODAL ON OVERLAY CLICK
  // ============================================
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideProModal();
      }
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Ignorer les liens "#" ou javascript:
        if (href === '#' || href.startsWith('javascript:')) return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Mise à jour de l'URL sans sauter
          history.pushState(null, null, href);
        }
      });
    });
  }

  // ============================================
  // EXPOSE FUNCTIONS TO GLOBAL SCOPE
  // ============================================
  window.showProModal = showProModal;
  window.hideProModal = hideProModal;
  window.submitProRequest = submitProRequest;

  // ============================================
  // INITIALIZATION
  // ============================================
  function init() {
    // Premier check du scroll
    handleScroll();

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('keydown', handleEscape);

    // Smooth scroll
    initSmoothScroll();

    // Animation au survol des cartes service (mobile: désactivé)
    if (window.innerWidth > 768) {
      console.log('%c✨ PlugPeople — Landing page chargée', 'color: #10b981; font-weight: 700; font-size: 14px;');
    }

    // Réactive le scroll si la modale était ouverte lors d'un rechargement
    if (modal && modal.style.display === 'flex') {
      document.body.style.overflow = 'hidden';
    }
  }

  // Démarrage
  init();

})();