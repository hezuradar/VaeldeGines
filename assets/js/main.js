/* =========================================================
   VAEL DE GINÉS — Interacciones
   ========================================================= */
(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header al hacer scroll ---------- */
  const header = $('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Barra de progreso de lectura ---------- */
  const progress = $('#scrollProgress');
  if (progress) {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
  }

  /* ---------- Menú móvil ---------- */
  const nav = $('.nav');
  const toggle = $('.menu-toggle');

  const closeNav = () => {
    if (!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
    $$('.nav__item.is-open').forEach((item) => item.classList.remove('is-open'));
  };

  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Acordeones del menú (solo móvil)
    $$('.nav__item.has-menu > .nav__link').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (window.matchMedia('(max-width: 1024px)').matches) {
          e.preventDefault();
          const item = btn.parentElement;
          const isOpen = item.classList.contains('is-open');
          $$('.nav__item.is-open').forEach((i) => i.classList.remove('is-open'));
          item.classList.toggle('is-open', !isOpen);
        }
      });
    });

    // Cerrar al pulsar un enlace real
    $$('.nav a').forEach((a) => {
      a.addEventListener('click', () => {
        // El enlace padre de un submenú solo despliega; no cierra el panel.
        if (a.classList.contains('nav__link') && a.parentElement.classList.contains('has-menu')) return;
        if (window.matchMedia('(max-width: 1024px)').matches) closeNav();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) closeNav();
    });
  }

  /* ---------- Animaciones de entrada ---------- */
  const revealEls = $$('.reveal');
  if (revealEls.length) {
    if (!('IntersectionObserver' in window) || prefersReduced) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
      revealEls.forEach((el) => io.observe(el));
    }
  }

  /* ---------- Testimonios ---------- */
  const testimonialTrack = $('.testimonial-track');
  if (testimonialTrack) {
    const slides = $$('.testimonial-slide', testimonialTrack);
    const dotsWrap = $('.testimonial-dots');
    let index = 0;
    let timer;

    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Testimonio ${i + 1}`);
        if (i === 0) dot.classList.add('is-active');
        dot.addEventListener('click', () => go(i));
        dotsWrap.appendChild(dot);
      });
    }

    function go(i) {
      index = (i + slides.length) % slides.length;
      testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
      $$('.testimonial-dots button').forEach((d, j) => d.classList.toggle('is-active', j === index));
      restart();
    }
    function restart() {
      clearInterval(timer);
      if (!prefersReduced) timer = setInterval(() => go(index + 1), 7000);
    }

    const prev = $('[data-testimonial="prev"]');
    const next = $('[data-testimonial="next"]');
    if (prev) prev.addEventListener('click', () => go(index - 1));
    if (next) next.addEventListener('click', () => go(index + 1));
    restart();
  }

  /* ---------- Tabs ---------- */
  $$('[data-tabs]').forEach((group) => {
    const buttons = $$('[data-tab]', group);
    const panels = $$('.tabs__panel', group);
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-selected', String(b === btn));
        });
        panels.forEach((p) => p.classList.toggle('is-active', p.id === btn.dataset.tab));
      });
    });
  });

  /* ---------- Galería de producto ---------- */
  const gallery = $('[data-gallery]');
  if (gallery) {
    const main = $('.gallery__main img', gallery);
    const thumbs = $$('.gallery__thumb', gallery);
    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const img = $('img', thumb);
        if (!img || !main) return;
        main.src = img.dataset.full || img.src;
        main.alt = img.alt;
        thumbs.forEach((t) => t.classList.toggle('is-active', t === thumb));
      });
    });
  }

  /* ---------- Tienda: filtros y orden ---------- */
  const shop = $('[data-shop]');
  if (shop) {
    const cards = $$('.product-card', shop);
    const filters = $$('[data-filter]', shop);
    const count = $('[data-count]', shop);
    const sort = $('[data-sort]', shop);
    const grid = $('.product-grid', shop);

    const applyFilter = (value) => {
      let visible = 0;
      cards.forEach((card) => {
        const match = value === 'all' || card.dataset.category === value;
        card.classList.toggle('is-hidden', !match);
        if (match) visible++;
      });
      if (count) count.textContent = visible;
    };

    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        filters.forEach((b) => b.classList.toggle('is-active', b === btn));
        applyFilter(btn.dataset.filter);
      });
    });

    if (sort && grid) {
      sort.addEventListener('change', () => {
        const mode = sort.value;
        const sorted = [...cards].sort((a, b) => {
          if (mode === 'price-asc') return Number(a.dataset.price) - Number(b.dataset.price);
          if (mode === 'price-desc') return Number(b.dataset.price) - Number(a.dataset.price);
          return a.dataset.name.localeCompare(b.dataset.name, 'es');
        });
        sorted.forEach((card) => grid.appendChild(card));
      });
    }

    applyFilter('all');
  }

  /* ---------- Blog: filtros ---------- */
  const blogFilter = $('[data-blog-filters]');
  if (blogFilter) {
    const chips = $$('.chip', blogFilter);
    const posts = $$('[data-post]');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.toggle('is-active', c === chip));
        const value = chip.dataset.blogFilter;
        posts.forEach((post) => {
          post.style.display = (value === 'all' || post.dataset.post === value) ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Formularios (demostración) ---------- */
  $$('form[data-demo]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.classList.add('is-sent');
      const success = $('.form__success', form);
      if (success) {
        success.textContent = 'Gracias por escribir. Te responderé personalmente en un plazo de 24–48 h laborables.';
        success.focus?.();
      }
      form.reset();
    });
  });

  /* ---------- Cambio entre versión móvil y escritorio ---------- */
  $$('[data-view]').forEach((btn) => {
    btn.addEventListener('click', () => {
      try { localStorage.setItem('vdg-view', btn.dataset.view); } catch (e) {}
      const page = location.pathname.split('/').pop() || 'index.html';
      const inMobile = /(^|\/)m\//.test(location.pathname);
      let target = page;
      if (btn.dataset.view === 'mobile' && !inMobile) target = `m/${page}`;
      if (btn.dataset.view === 'desktop' && inMobile) target = `../${page}`;
      location.href = target;
    });
  });

  /* ---------- Año actual ---------- */
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---------- Subnavegación activa ---------- */
  const subnav = $('[data-subnav]');
  if (subnav && 'IntersectionObserver' in window) {
    const links = $$('a[href^="#"]', subnav);
    const sections = links
      .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
      .filter(Boolean);
    if (sections.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id));
          }
        });
      }, { rootMargin: '-30% 0px -60% 0px' });
      sections.forEach((s) => observer.observe(s));
    }
  }

  /* ---------- Newsletter ---------- */
  $$('.newsletter').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = $('input[type="email"]', form);
      if (input && input.checkValidity()) {
        const small = $('small', form);
        if (small) small.textContent = 'Suscripción registrada. Gracias por seguir el taller.';
        form.reset();
      } else if (input) {
        input.reportValidity();
      }
    });
  });
})();
