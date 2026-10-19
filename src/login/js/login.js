// ═══════════════════════════════════════════════════════════
// Quantum Florida Management — Login
// La autenticación la hace el servidor (Auth.js); aquí solo se
// rellenan el token CSRF y el captcha y se muestran los errores.
// ═══════════════════════════════════════════════════════════
(function () {
    'use strict';

    var passEl    = document.getElementById('loginPass');
    var errorEl   = document.getElementById('loginError');
    var toggleBtn = document.getElementById('togglePassBtn');

    var ERRORS = {
        CredentialsSignin: 'Invalid email or password. Please try again.',
        AccessDenied: 'This Google account is not authorized for the admin portal.',
        TooManyAttempts: 'Too many attempts. Please wait 15 minutes and try again.'
    };

    // ─── TOGGLE PASSWORD VISIBILITY ───────────────────────────
    toggleBtn.addEventListener('click', function () {
        var type = passEl.type === 'password' ? 'text' : 'password';
        passEl.type = type;
        toggleBtn.style.color = type === 'text' ? '#2563eb' : '';
    });

    // ─── ERROR FROM REDIRECT ──────────────────────────────────
    var error = new URLSearchParams(window.location.search).get('error');
    if (error) {
        errorEl.textContent = ERRORS[error] || 'Sign in failed. Please try again.';
    }

    // ─── ALREADY LOGGED IN ────────────────────────────────────
    fetch('/auth/session', { credentials: 'same-origin' })
        .then(function (r) { return r.json(); })
        .then(function (s) {
            var role = s && s.user && s.user.role;
            if (role === 'admin')  window.location.href = '/admin/';
            if (role === 'client') window.location.href = '/client/';
        })
        .catch(function () {});

    // ─── CSRF TOKEN ───────────────────────────────────────────
    fetch('/auth/csrf', { credentials: 'same-origin' })
        .then(function (r) { return r.json(); })
        .then(function (j) {
            document.querySelectorAll('.js-csrf').forEach(function (el) {
                el.value = j.csrfToken;
            });
        })
        .catch(function () {
            errorEl.textContent = 'Could not reach the server. Please reload the page.';
        });

    // ─── CAPTCHA (Cloudflare Turnstile) ───────────────────────
    fetch('/api/config')
        .then(function (r) { return r.json(); })
        .then(function (cfg) {
            if (!cfg.turnstileSiteKey) return;
            var box = document.getElementById('turnstile');
            box.className += ' cf-turnstile';
            box.setAttribute('data-sitekey', cfg.turnstileSiteKey);
            var s = document.createElement('script');
            s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
            s.async = true;
            document.head.appendChild(s);
        })
        .catch(function () {});

})();
