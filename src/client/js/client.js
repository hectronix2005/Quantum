// ═══════════════════════════════════════════════════════════
// Quantum Florida Management — Client Portal
// ═══════════════════════════════════════════════════════════
(function () {
    'use strict';

    // ─── DATA ────────────────────────────────────────────────
    // El servidor solo devuelve los datos del cliente con sesión.
    var clientData = null;

    function getData() {
        return clientData;
    }

    var currentClient = null;

    // ─── AUTH (servidor) ─────────────────────────────────────
    var dashboard = document.getElementById('dashboard');

    function goToLogin() {
        window.location.href = '/login/';
    }

    function checkAuth() {
        fetch('/api/client/data', { credentials: 'same-origin' })
            .then(function (r) {
                if (r.status === 401) { goToLogin(); return null; }
                if (!r.ok) throw new Error('load failed');
                return r.json();
            })
            .then(function (d) {
                if (!d) return;
                clientData = {
                    clients: [d.client],
                    properties: d.properties,
                    financials: d.financials,
                    updates: d.updates
                };
                currentClient = d.client;
                showDashboard();
            })
            .catch(function () {
                dashboard.style.display = 'flex';
                document.getElementById('userName').textContent = 'Could not load your data. Please reload.';
            });
    }

    function showDashboard() {
        dashboard.style.display = 'flex';
        var initials = currentClient.name.split(' ').map(function (n) { return n[0]; }).join('').toUpperCase();
        document.getElementById('userAvatar').textContent = initials;
        document.getElementById('userName').textContent    = currentClient.name;
        document.getElementById('userEmail').textContent   = currentClient.email;
        loadOverview();
    }

    // Logout
    document.getElementById('btnLogout').addEventListener('click', logout);
    document.getElementById('btnLogoutMobile').addEventListener('click', logout);
    function logout() {
        fetch('/auth/csrf', { credentials: 'same-origin' })
            .then(function (r) { return r.json(); })
            .then(function (j) {
                return fetch('/auth/signout', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: 'csrfToken=' + encodeURIComponent(j.csrfToken)
                });
            })
            .finally(goToLogin);
    }

    // ─── NAVIGATION ──────────────────────────────────────────
    document.querySelectorAll('.sidebar__link').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var sec = this.getAttribute('data-section');
            document.querySelectorAll('.sidebar__link').forEach(function (l) { l.classList.remove('active'); });
            this.classList.add('active');
            document.querySelectorAll('.section').forEach(function (s) { s.style.display = 'none'; });
            document.getElementById('sec-' + sec).style.display = 'block';
            sidebar.classList.remove('open');
            loadSection(sec);
        });
    });

    function loadSection(sec) {
        if (sec === 'overview')    loadOverview();
        if (sec === 'properties')  loadProperties();
        if (sec === 'financials')  loadFinancials();
        if (sec === 'updates')     loadUpdates();
    }

    // Mobile sidebar
    var sidebar = document.getElementById('sidebar');
    document.getElementById('btnHamburger').addEventListener('click', function () {
        sidebar.classList.toggle('open');
    });

    // ─── HELPERS ─────────────────────────────────────────────
    function getMyProperties() {
        var data = getData();
        if (!data || !currentClient) return [];
        return data.properties.filter(function (p) { return p.clientId === currentClient.id; });
    }

    function getMyFinancials() {
        var data = getData();
        if (!data) return [];
        var myPropIds = getMyProperties().map(function (p) { return p.id; });
        return data.financials.filter(function (f) { return myPropIds.indexOf(f.propertyId) !== -1; });
    }

    function getMyUpdates() {
        var data = getData();
        if (!data) return [];
        var myPropIds = getMyProperties().map(function (p) { return p.id; });
        return data.updates.filter(function (u) { return myPropIds.indexOf(u.propertyId) !== -1; });
    }

    function getPropertyName(propId) {
        var data = getData();
        if (!data) return 'N/A';
        var p = data.properties.find(function (pr) { return pr.id === propId; });
        return p ? p.name : 'N/A';
    }

    // ─── OVERVIEW ────────────────────────────────────────────
    function loadOverview() {
        if (!currentClient) return;
        var props   = getMyProperties();
        var fins    = getMyFinancials();
        var updates = getMyUpdates();

        document.getElementById('welcomeMsg').textContent = 'Welcome back, ' + currentClient.name.split(' ')[0] + '!';
        document.getElementById('overviewDate').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        document.getElementById('myPropCount').textContent    = props.length;
        document.getElementById('myUpdatesCount').textContent  = updates.length;

        var totalIncome = fins.reduce(function (s, f) { return s + f.rent - f.expenses; }, 0);
        document.getElementById('myTotalIncome').textContent = '$' + totalIncome.toLocaleString();

        // Updates badge
        var badge = document.getElementById('updatesBadge');
        if (updates.length > 0) {
            badge.textContent   = updates.length;
            badge.style.display = 'inline';
        }

        // Recent updates (up to 3)
        var recentHtml = '';
        updates.slice(0, 3).forEach(function (u) {
            recentHtml += '<div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.75rem 0;border-bottom:1px solid #f1f5f9;">' +
                '<div style="width:8px;height:8px;border-radius:50%;margin-top:0.4rem;flex-shrink:0;background:' + (u.type === 'maintenance' ? '#2563eb' : u.type === 'financial' ? '#10b981' : u.type === 'hoa' ? '#d4a843' : '#94a3b8') + '"></div>' +
                '<div><div style="font-size:0.8125rem;color:#475569"><strong>' + u.title + '</strong> — ' + getPropertyName(u.propertyId) + '</div>' +
                '<div style="font-size:0.6875rem;color:#94a3b8;margin-top:0.125rem">' + u.date + '</div></div></div>';
        });
        document.getElementById('overviewUpdates').innerHTML = recentHtml || '<p style="color:#94a3b8;font-size:0.85rem">No updates yet</p>';
    }

    // ─── PROPERTIES ──────────────────────────────────────────
    function loadProperties() {
        var props = getMyProperties();
        var fins  = getMyFinancials();
        var html  = '';

        props.forEach(function (p) {
            var propFins = fins.filter(function (f) { return f.propertyId === p.id; });
            var totalNet = propFins.reduce(function (s, f) { return s + f.rent - f.expenses; }, 0);
            var lastMonth = propFins.length > 0 ? propFins[propFins.length - 1] : null;

            html += '<div class="property-card">' +
                '<div class="property-card__header">' +
                    '<p class="property-card__type">' + p.type + '</p>' +
                    '<h3 class="property-card__name">' + p.name + '</h3>' +
                    '<p class="property-card__address">' + p.address + '</p>' +
                    '<span class="property-card__status">' + p.status + '</span>' +
                '</div>' +
                '<div class="property-card__body">' +
                    '<div class="property-card__details">' +
                        '<div class="property-detail"><p class="property-detail__label">Plan</p><p class="property-detail__value">' + p.plan + '</p></div>' +
                        '<div class="property-detail"><p class="property-detail__label">Monthly Rent</p><p class="property-detail__value">$' + p.monthlyRent.toLocaleString() + '</p></div>' +
                        '<div class="property-detail"><p class="property-detail__label">Total Net Income</p><p class="property-detail__value" style="color:#10b981">$' + totalNet.toLocaleString() + '</p></div>' +
                        '<div class="property-detail"><p class="property-detail__label">Last Expenses</p><p class="property-detail__value" style="color:' + (lastMonth && lastMonth.expenses > 0 ? '#ef4444' : '#10b981') + '">$' + (lastMonth ? lastMonth.expenses.toLocaleString() : '0') + '</p></div>' +
                    '</div>' +
                '</div></div>';
        });

        document.getElementById('propertiesList').innerHTML = html || '<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"/></svg><p>No properties assigned yet.<br>Contact your manager for assistance.</p></div>';
    }

    // ─── FINANCIALS ──────────────────────────────────────────
    function loadFinancials() {
        var fins = getMyFinancials();
        var totalInc = 0, totalExp = 0;
        var html = '';

        fins.forEach(function (f) {
            var net = f.rent - f.expenses;
            totalInc += f.rent;
            totalExp += f.expenses;
            html += '<tr>' +
                '<td>' + f.month + '</td>' +
                '<td>' + getPropertyName(f.propertyId) + '</td>' +
                '<td style="color:#065f46;font-weight:500">$' + f.rent.toLocaleString() + '</td>' +
                '<td style="color:#dc2626;font-weight:500">$' + f.expenses.toLocaleString() + '</td>' +
                '<td style="font-weight:600">$' + net.toLocaleString() + '</td>' +
                '<td style="color:#94a3b8;font-size:0.8125rem">' + (f.description || '-') + '</td></tr>';
        });

        document.getElementById('finTable').innerHTML = html || '<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:2rem">No financial records yet</td></tr>';
        document.getElementById('finIncome').textContent   = '$' + totalInc.toLocaleString();
        document.getElementById('finExpenses').textContent  = '$' + totalExp.toLocaleString();
        document.getElementById('finNet').textContent       = '$' + (totalInc - totalExp).toLocaleString();
    }

    // ─── UPDATES ─────────────────────────────────────────────
    function loadUpdates() {
        var updates = getMyUpdates();
        var html = '';

        updates.forEach(function (u) {
            html += '<div class="timeline-item">' +
                '<div class="timeline__marker">' +
                    '<div class="timeline__dot timeline__dot--' + u.type + '"></div>' +
                    '<div class="timeline__line"></div>' +
                '</div>' +
                '<div class="timeline__content">' +
                    '<div class="timeline__header"><span class="timeline__title">' + u.title + '</span><span class="timeline__date">' + u.date + '</span></div>' +
                    '<p class="timeline__property">' + getPropertyName(u.propertyId) + '</p>' +
                    '<p class="timeline__desc">' + u.description + '</p>' +
                    '<span class="timeline__badge timeline__badge--' + u.type + '">' + u.type + '</span>' +
                '</div></div>';
        });

        document.getElementById('updatesTimeline').innerHTML = html || '<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg><p>No updates for your properties yet.</p></div>';
    }

    // ─── INIT ────────────────────────────────────────────────
    checkAuth();
})();
