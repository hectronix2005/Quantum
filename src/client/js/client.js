// ═══════════════════════════════════════════════════════════
// Quantum Florida Management — Client Portal
// ═══════════════════════════════════════════════════════════
(function () {
    'use strict';

    // ─── SEED DATA ────────────────────────────────────────────
    var DEFAULT_DATA = {
        admin: { email: 'admin@quantumfloridamgmt.com', password: 'quantum2026' },
        clients: [
            { id: 'c1', name: 'Maria Rodriguez', email: 'maria@example.com', password: 'client123', phone: '(305) 555-0001', status: 'active' },
            { id: 'c2', name: 'James Thompson', email: 'james@example.com', password: 'client123', phone: '(407) 555-0002', status: 'active' },
            { id: 'c3', name: 'Carlos Perez', email: 'carlos@example.com', password: 'client123', phone: '(813) 555-0003', status: 'active' }
        ],
        properties: [
            { id: 'p1', name: 'Sunset Condo #402', address: '1234 Ocean Dr, Miami Beach, FL 33139', type: 'Condo', clientId: 'c1', plan: 'Professional', status: 'active', monthlyRent: 2800 },
            { id: 'p2', name: 'Lake View Apt 12B', address: '567 Lake Rd, Orlando, FL 32801', type: 'Apartment', clientId: 'c2', plan: 'Premium', status: 'active', monthlyRent: 2200 },
            { id: 'p3', name: 'Bayshore Townhome', address: '890 Bay St, Tampa, FL 33602', type: 'Townhouse', clientId: 'c2', plan: 'Premium', status: 'active', monthlyRent: 3100 },
            { id: 'p4', name: 'Palm Garden Unit 7', address: '345 Palm Ave, Fort Lauderdale, FL 33301', type: 'Condo', clientId: 'c3', plan: 'Professional', status: 'active', monthlyRent: 2500 }
        ],
        financials: [
            { id: 'f1', propertyId: 'p1', month: '2026-01', rent: 2800, expenses: 180, description: 'Monthly rent collection' },
            { id: 'f2', propertyId: 'p1', month: '2026-02', rent: 2800, expenses: 420, description: 'Rent + AC repair' },
            { id: 'f3', propertyId: 'p2', month: '2026-01', rent: 2200, expenses: 95, description: 'Monthly rent collection' },
            { id: 'f4', propertyId: 'p2', month: '2026-02', rent: 2200, expenses: 150, description: 'Rent + plumbing' },
            { id: 'f5', propertyId: 'p3', month: '2026-01', rent: 3100, expenses: 200, description: 'Monthly rent collection' },
            { id: 'f6', propertyId: 'p3', month: '2026-02', rent: 3100, expenses: 0, description: 'Monthly rent collection' },
            { id: 'f7', propertyId: 'p4', month: '2026-01', rent: 2500, expenses: 110, description: 'Monthly rent collection' },
            { id: 'f8', propertyId: 'p4', month: '2026-02', rent: 2500, expenses: 850, description: 'Rent + kitchen remodel' }
        ],
        updates: [
            { id: 'u1', propertyId: 'p1', date: '2026-02-20', title: 'AC Maintenance Completed', description: 'Annual AC inspection and filter replacement performed by CoolAir Services. System running optimally.', type: 'maintenance' },
            { id: 'u2', propertyId: 'p2', date: '2026-02-18', title: 'HOA Meeting Summary', description: 'Attended Feb board meeting. New parking rules effective March 1. Pool renovation approved for Q3.', type: 'hoa' },
            { id: 'u3', propertyId: 'p3', date: '2026-02-15', title: 'Lease Renewed', description: 'Tenant lease renewed for 12 months. Rent increased 3% per market analysis.', type: 'financial' },
            { id: 'u4', propertyId: 'p4', date: '2026-02-10', title: 'Kitchen Remodel Complete', description: 'Minor kitchen update finished: new faucet, garbage disposal, and cabinet hardware.', type: 'maintenance' },
            { id: 'u5', propertyId: 'p1', date: '2026-02-05', title: 'February Rent Collected', description: 'Rent of $2,800 collected on time. Funds disbursed to owner account.', type: 'financial' }
        ],
        siteContent: {
            hero_tagline_en: 'Licensed Property Management in Florida',
            hero_tagline_es: 'Administracion de Propiedades Licenciada en Florida',
            hero_title_en: 'Your Property. Our Priority.',
            hero_title_es: 'Tu Propiedad. Nuestra Prioridad.',
            hero_desc_en: 'Full-service property management with a simple, transparent flat monthly fee.',
            hero_desc_es: 'Administracion integral de propiedades con una tarifa mensual fija, simple y transparente.',
            stat_properties: 500,
            stat_satisfaction: 98,
            stat_years: 15,
            price1: 149,
            price2: 249,
            price3: 399,
            plan1_desc_en: 'Perfect for single-unit condos and apartments',
            plan1_desc_es: 'Perfecto para condominios y apartamentos de una unidad',
            plan2_desc_en: 'Full-service management for rental properties',
            plan2_desc_es: 'Administracion completa para propiedades en alquiler',
            plan3_desc_en: 'Multi-unit portfolios & investment properties',
            plan3_desc_es: 'Portafolios multi-unidad y propiedades de inversion',
            about1_en: 'Quantum Florida Management was founded on a simple principle: property owners deserve transparent, reliable management at a fair price.',
            about1_es: 'Quantum Florida Management fue fundada bajo un principio simple: los propietarios merecen una administracion transparente, confiable y a un precio justo.',
            about2_en: 'Our team brings together licensed property managers, experienced maintenance coordinators, and strong partnerships with authorized Florida realtors.',
            about2_es: 'Nuestro equipo reune administradores de propiedades licenciados, coordinadores de mantenimiento con experiencia y solidas alianzas con agentes inmobiliarios autorizados en Florida.'
        },
        images: {}
    };

    // ─── DATA ────────────────────────────────────────────────
    function mergeDefaults(existing, defaults) {
        var keys = Object.keys(defaults);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (existing[k] === undefined) {
                existing[k] = defaults[k];
            }
        }
        return existing;
    }

    function getData() {
        var raw = localStorage.getItem('qfm_data');
        if (!raw) {
            localStorage.setItem('qfm_data', JSON.stringify(DEFAULT_DATA));
            return JSON.parse(JSON.stringify(DEFAULT_DATA));
        }
        var data = JSON.parse(raw);
        // Fill in any missing top-level keys without overwriting existing data
        var changed = false;
        var keys = Object.keys(DEFAULT_DATA);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (data[k] === undefined) {
                data[k] = DEFAULT_DATA[k];
                changed = true;
            }
        }
        if (changed) localStorage.setItem('qfm_data', JSON.stringify(data));
        return data;
    }

    var currentClient = null;

    // ─── AUTH ────────────────────────────────────────────────
    var loginScreen = document.getElementById('loginScreen');
    var dashboard   = document.getElementById('dashboard');

    function checkAuth() {
        var savedId = sessionStorage.getItem('qfm_client_id');
        if (savedId) {
            var data = getData();
            if (data) {
                currentClient = data.clients.find(function (c) { return c.id === savedId; });
                if (currentClient) {
                    showDashboard();
                    return;
                }
            }
        }
    }

    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var data  = getData();
        var email = document.getElementById('loginEmail').value.toLowerCase();
        var pass  = document.getElementById('loginPass').value;

        if (!data) {
            document.getElementById('loginError').textContent = 'System not initialized. Please visit the admin panel first.';
            return;
        }

        currentClient = data.clients.find(function (c) {
            return c.email.toLowerCase() === email && c.password === pass;
        });

        if (currentClient) {
            sessionStorage.setItem('qfm_client_id', currentClient.id);
            showDashboard();
        } else {
            document.getElementById('loginError').textContent = 'Invalid email or password';
        }
    });

    function showDashboard() {
        loginScreen.style.display = 'none';
        dashboard.style.display   = 'flex';
        // Set user info
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
        sessionStorage.removeItem('qfm_client_id');
        window.location.href = '../login/index.html';
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
