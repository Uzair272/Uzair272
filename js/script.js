/**
 * STRUCTURED — RENAISSANCE GALLERY ON PUTTY PAPER
 * Vanilla JavaScript Architecture for Muhammad Uzair Ajmal's Portfolio
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. PROJECT FILTERING SYSTEM
     ========================================================================== */
  const GalleryFilter = {
    buttons: document.querySelectorAll('.gallery-filter-btn'),
    cards: document.querySelectorAll('.vignette-card'),

    init() {
      if (!this.buttons.length || !this.cards.length) return;

      this.buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const filter = btn.getAttribute('data-filter');
          this.buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.applyFilter(filter);
        });
      });
    },

    applyFilter(filter) {
      this.cards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.classList.add('is-revealed');
          card.style.opacity = '0';
          card.style.transform = 'translate3d(0, 0, 0) scale(1)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
          });
        } else {
          card.style.display = 'none';
        }
      });
    }
  };

  /* ==========================================================================
     2. GITHUB ARCHIVE REGISTRY & TELEMETRY
     ========================================================================== */
  const GitHubArchive = {
    USERNAME: 'Uzair272',
    reposTarget: document.getElementById('github-repo-list'),
    statReposElem: document.getElementById('stat-repos'),
    statFollowersElem: document.getElementById('stat-followers'),

    fallbackRepos: [
      {
        name: 'MedXanalysis',
        description: 'Multi-tenant medical telemetry & AI report analysis portal with clinician verification.',
        language: 'TypeScript',
        stars: 0,
        url: 'https://github.com/Uzair272/MedXanalysis'
      },
      {
        name: 'edusense',
        description: 'Facial recognition attendance engine with multi-role portals for educators and students.',
        language: 'Python',
        stars: 0,
        url: 'https://github.com/Uzair272/edusense'
      },
      {
        name: 'OrbitStay',
        description: "Editorial luxury web experience for the world's first commercial space hotel in Low Earth Orbit.",
        language: 'JavaScript',
        stars: 0,
        url: 'https://github.com/Uzair272/OrbitStay'
      },
      {
        name: 'DualCityEnvDashboard',
        description: 'Dual-city comparative environmental telemetry dashboard tracking real-time air quality & weather.',
        language: 'JavaScript',
        stars: 0,
        url: 'https://github.com/Uzair272/DualCityEnvDashboard'
      },
      {
        name: 'Student-Activity-Portal-2',
        description: 'Campus engagement and extracurricular activity registry tracking university student credentials.',
        language: 'HTML5',
        stars: 0,
        url: 'https://github.com/Uzair272/Student-Activity-Portal-2'
      },
      {
        name: 'NASM-File-Reader',
        description: 'Low-level x86 assembly instruction parser and disassembly inspector examining ELF binary structures.',
        language: 'Assembly',
        stars: 0,
        url: 'https://github.com/Uzair272/NASM-File-Reader'
      }
    ],

    async init() {
      if (!this.reposTarget) return;
      await this.fetchData();
    },

    async fetchData() {
      let repos = this.fallbackRepos;

      try {
        const userRes = await fetch(`https://api.github.com/users/${this.USERNAME}`);
        if (userRes.ok) {
          const user = await userRes.json();
          if (this.statReposElem && user.public_repos !== undefined) {
            this.statReposElem.textContent = user.public_repos;
          }
          if (this.statFollowersElem && user.followers !== undefined) {
            this.statFollowersElem.textContent = user.followers;
          }
        }

        const reposRes = await fetch(`https://api.github.com/users/${this.USERNAME}/repos?sort=updated&per_page=12`);
        if (reposRes.ok) {
          const fetched = await reposRes.json();
          if (Array.isArray(fetched) && fetched.length > 0) {
            repos = fetched
              .filter(r => r.name !== 'Uzair272')
              .slice(0, 7)
              .map(r => ({
                name: r.name,
                description: r.description || this.getFallbackDesc(r.name),
                language: r.language || 'Code',
                stars: r.stargazers_count || 0,
                url: r.html_url
              }));
          }
        }
      } catch (e) {
        // Safe fallback maintains perfect presentation
      }

      this.renderRepos(repos);
    },

    getFallbackDesc(name) {
      const match = this.fallbackRepos.find(r => r.name.toLowerCase() === name.toLowerCase());
      return match ? match.description : 'Open source engineering repository.';
    },

    renderRepos(repos) {
      this.reposTarget.innerHTML = `
        <div class="github-repo-table">
          ${repos.map(r => `
            <div class="github-repo-row">
              <div>
                <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="repo-entry-title">
                  ${r.name}
                </a>
                <p style="font-size: 13px; color: var(--color-graphite); margin-top: 4px; max-width: 600px;">
                  ${r.description}
                </p>
              </div>
              <div style="display: flex; align-items: center; gap: 20px;">
                <span class="repo-entry-meta">${r.language}</span>
                <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="btn-pill" style="padding: 6px 14px; font-size: 11px;">
                  Examine Source ↗
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  };

  /* ==========================================================================
     3. EDITORIAL CONTACT FORM
     ========================================================================== */
  const EditorialContact = {
    form: document.getElementById('contact-form'),
    feedback: document.getElementById('form-feedback'),

    init() {
      if (!this.form) return;
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    handleSubmit(e) {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || name.length < 2) {
        this.showMsg('Please provide your name or title.', false);
        return;
      }
      if (!emailPattern.test(email)) {
        this.showMsg('Please provide a valid return email address.', false);
        return;
      }
      if (!subject || subject.length < 3) {
        this.showMsg('Please specify an inquiry subject.', false);
        return;
      }
      if (!message || message.length < 10) {
        this.showMsg('Please provide a detailed inquiry message.', false);
        return;
      }

      // Draft correspondence in default mail application
      const encSubject = encodeURIComponent(`[Inquiry: ${subject}]`);
      const encBody = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}\n\nTransmitted via uzair272.github.io/uzair272`);
      const mailtoUri = `mailto:uzairfts272@gmail.com?subject=${encSubject}&body=${encBody}`;

      window.location.href = mailtoUri;
      this.showMsg('Inquiry prepared. Opening your mail transmission client.', true);
      this.form.reset();
    },

    showMsg(text, isSuccess) {
      if (!this.feedback) return;
      this.feedback.textContent = text;
      this.feedback.style.color = isSuccess ? '#166534' : '#991b1b';
      this.feedback.className = 'form-feedback-msg active';
      setTimeout(() => {
        if (this.feedback) this.feedback.className = 'form-feedback-msg';
      }, 6000);
    }
  };

  /* ==========================================================================
     4. SMOOTH SCROLLING FOR GHOST LINKS
     ========================================================================== */
  const SmoothScroll = {
    init() {
      const header = document.querySelector('.gallery-header');
      document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          if (href === '#' || href === '') return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const headerOffset = header ? header.offsetHeight + 14 : 60;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  };

  /* DOM Ready Initializer */
  document.addEventListener('DOMContentLoaded', () => {
    GalleryFilter.init();
    GitHubArchive.init();
    EditorialContact.init();
    SmoothScroll.init();
  });

})();
