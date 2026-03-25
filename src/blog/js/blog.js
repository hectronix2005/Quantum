/* Quantum Florida Management — Blog Language Engine
   Shares the same 'qfm_lang' key with the main site. */
(function () {
  'use strict';

  var STORAGE_KEY = 'qfm_lang';
  var currentLang = document.documentElement.getAttribute('data-lang') || 'en';

  // Nav link translations
  var navUI = {
    'Services':    'Servicios',
    'Pricing':     'Precios',
    'Blog':        'Blog',
    'Get Started': 'Comenzar',
    'Home':        'Inicio',
    'About Us':    'Nosotros'
  };

  document.addEventListener('DOMContentLoaded', function () {

    // ── Inject language toggle button into nav ──────────────────
    var navLinks = document.querySelector('.nav__links') || document.querySelector('.nav__menu');
    if (navLinks) {
      var btn = document.createElement('button');
      btn.className = 'lang-btn';
      btn.setAttribute('aria-label', 'Switch language / Cambiar idioma');
      btn.innerHTML = buildLabel(currentLang);
      navLinks.appendChild(btn);

      btn.addEventListener('click', function () {
        currentLang = currentLang === 'en' ? 'es' : 'en';
        localStorage.setItem(STORAGE_KEY, currentLang);
        document.documentElement.setAttribute('data-lang', currentLang);
        btn.innerHTML = buildLabel(currentLang);
        translateNav(currentLang);
      });
    }

    translateNav(currentLang);
  });

  function buildLabel(lang) {
    return lang === 'en'
      ? '&#127466;&#127480;&nbsp;ES'
      : '&#127482;&#127480;&nbsp;EN';
  }

  function translateNav(lang) {
    if (lang === 'en') {
      document.querySelectorAll('.nav__link[data-en]').forEach(function (el) {
        el.textContent = el.getAttribute('data-en');
      });
    } else {
      document.querySelectorAll('.nav__link[data-en]').forEach(function (el) {
        var esText = navUI[el.getAttribute('data-en')];
        if (esText) el.textContent = esText;
      });
    }
  }

})();
