/**
 * MOTION ENGINE — CINEMATIC SCROLL & INTERACTION SYSTEM
 * Crafted for Muhammad Uzair Ajmal's Portfolio
 * Pure native JavaScript • GPU-accelerated • 60 FPS • Accessible
 */

(function () {
  'use strict';

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. HERO INITIAL LOAD CHOREOGRAPHY
     ========================================================================== */
  const HeroEntrance = {
    init() {
      const hero = document.getElementById('hero');
      if (!hero) return;

      if (prefersReducedMotion) {
        document.querySelectorAll('.hero-entrance').forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
        return;
      }

      // Choreographed sequence on DOM load
      const sequence = [
        { selector: '.gallery-header', delay: 80, y: -12 },
        { selector: '.hero-status-pill', delay: 200, y: 10 },
        { selector: '.hero-curator-tag', delay: 320, y: 15 },
        { selector: '.hero-headline', delay: 450, y: 28 },
        { selector: '.stat-pair-row', delay: 580, y: 20 },
        { selector: '.hero-sub-text', delay: 700, y: 20 },
        { selector: '.hero-cta-row', delay: 820, y: 15 },
        { selector: '.hero-wordmark-container', delay: 960, y: 35, scale: 0.96 }
      ];

      sequence.forEach(item => {
        const el = document.querySelector(item.selector);
        if (!el) return;

        el.style.opacity = '0';
        el.style.willChange = 'transform, opacity';
        el.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
        
        let initialTransform = '';
        if (item.y !== undefined) initialTransform += `translate3d(0, ${item.y}px, 0) `;
        if (item.scale !== undefined) initialTransform += `scale(${item.scale})`;
        el.style.transform = initialTransform.trim();

        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translate3d(0, 0, 0) scale(1)';
          setTimeout(() => {
            el.style.willChange = 'auto';
          }, 1000);
        }, item.delay);
      });
    }
  };

  /* ==========================================================================
     2. DYNAMIC NAVBAR SCROLL STATE
     ========================================================================== */
  const NavbarController = {
    header: document.querySelector('.gallery-header'),
    threshold: 40,
    ticking: false,

    init() {
      if (!this.header) return;

      window.addEventListener('scroll', () => {
        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.handleScroll();
            this.ticking = false;
          });
          this.ticking = true;
        }
      }, { passive: true });

      this.handleScroll();
    },

    handleScroll() {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > this.threshold) {
        this.header.classList.add('is-scrolled');
      } else {
        this.header.classList.remove('is-scrolled');
      }
    }
  };

  /* ==========================================================================
     3. SCROLL REVEAL OBSERVER
     ========================================================================== */
  const ScrollReveal = {
    observer: null,

    init() {
      const revealElements = document.querySelectorAll('[data-reveal]');
      if (!revealElements.length) return;

      if (prefersReducedMotion) {
        revealElements.forEach(el => {
          el.classList.add('is-revealed');
        });
        return;
      }

      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.15
      };

      this.observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);

            if (delay > 0) {
              setTimeout(() => {
                el.classList.add('is-revealed');
              }, delay);
            } else {
              el.classList.add('is-revealed');
            }

            // Once revealed, keep revealed for natural scrolling experience
            obs.unobserve(el);
          }
        });
      }, observerOptions);

      revealElements.forEach(el => {
        el.classList.add('reveal-init');
        this.observer.observe(el);
      });

      // Handle Stagger Container Children
      const staggerContainers = document.querySelectorAll('[data-stagger-container]');
      staggerContainers.forEach(container => {
        const children = container.querySelectorAll('[data-stagger-item]');
        const baseDelay = parseInt(container.getAttribute('data-stagger-delay') || '80', 10);
        
        children.forEach((child, index) => {
          if (!child.hasAttribute('data-reveal')) {
            child.setAttribute('data-reveal', 'fade-up');
            child.setAttribute('data-reveal-delay', (index * baseDelay).toString());
            child.classList.add('reveal-init');
            this.observer.observe(child);
          }
        });
      });
    }
  };

  /* ==========================================================================
     4. STICKY PROJECT STORYTELLING CONTROLLER
     ========================================================================== */
  const StickyStorytelling = {
    container: document.querySelector('.sticky-story-section'),
    steps: document.querySelectorAll('.sticky-step-block'),
    visualCard: document.querySelector('.sticky-visual-display'),
    indicators: document.querySelectorAll('.sticky-telemetry-indicator'),

    init() {
      if (!this.container || !this.steps.length) return;

      if (prefersReducedMotion) return;

      const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const stepIndex = entry.target.getAttribute('data-step-index');
            this.activateStep(stepIndex);
          }
        });
      }, {
        root: null,
        rootMargin: '-30% 0px -35% 0px',
        threshold: 0.15
      });

      this.steps.forEach(step => stepObserver.observe(step));
    },

    activateStep(index) {
      if (!index) return;

      // Update step text cards active state
      this.steps.forEach(step => {
        if (step.getAttribute('data-step-index') === index) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });

      // Update telemetry indicators
      this.indicators.forEach(ind => {
        if (ind.getAttribute('data-indicator-index') === index) {
          ind.classList.add('active');
        } else {
          ind.classList.remove('active');
        }
      });

      // Transform visual preview card state
      if (this.visualCard) {
        this.visualCard.setAttribute('data-active-view', index);
      }
    }
  };

  /* ==========================================================================
     5. BACKGROUND SUBTLE PARALLAX CONTROLLER
     ========================================================================== */
  const ParallaxController = {
    bgElements: document.querySelectorAll('[data-parallax]'),
    ticking: false,

    init() {
      if (!this.bgElements.length || prefersReducedMotion) return;

      // Disable parallax on mobile viewports for performance
      if (window.innerWidth < 768) return;

      window.addEventListener('scroll', () => {
        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.updateParallax();
            this.ticking = false;
          });
          this.ticking = true;
        }
      }, { passive: true });
    },

    updateParallax() {
      const windowHeight = window.innerHeight;

      this.bgElements.forEach(el => {
        const rect = el.parentElement.getBoundingClientRect();
        // Only update if parent is roughly in or near viewport
        if (rect.bottom >= 0 && rect.top <= windowHeight) {
          const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0.08');
          const offset = (rect.top) * speed;
          el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
        }
      });
    }
  };

  /* ==========================================================================
     6. CARD & BUTTON MICRO-INTERACTIONS
     ========================================================================== */
  const MicroInteractions = {
    init() {
      if (prefersReducedMotion) return;

      // Add gentle magnetic movement to featured action buttons
      const pills = document.querySelectorAll('.btn-pill');
      pills.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          if (window.innerWidth < 768) return;
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12 - 2}px, 0)`;
        });

        btn.addEventListener('mouseleave', () => {
          btn.style.transform = '';
        });
      });
    }
  };

  /* ==========================================================================
     INITIALIZATION ORCHESTRATOR
     ========================================================================== */
  function initMotionSystem() {
    HeroEntrance.init();
    NavbarController.init();
    ScrollReveal.init();
    StickyStorytelling.init();
    ParallaxController.init();
    MicroInteractions.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMotionSystem);
  } else {
    initMotionSystem();
  }

  // Export for external hooks if needed
  window.MotionEngine = {
    HeroEntrance,
    NavbarController,
    ScrollReveal,
    StickyStorytelling,
    ParallaxController
  };
})();
