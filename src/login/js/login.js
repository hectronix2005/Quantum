// ═══════════════════════════════════════════════════════════
// Quantum Florida Management — Unified Login
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

    // ─── DATA ─────────────────────────────────────────────────
    function getData() {
        var raw = localStorage.getItem('qfm_data');
        if (!raw) {
            localStorage.setItem('qfm_data', JSON.stringify(DEFAULT_DATA));
            return JSON.parse(JSON.stringify(DEFAULT_DATA));
        }
        var data = JSON.parse(raw);
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

    // ─── DOM ELEMENTS ─────────────────────────────────────────
    var form      = document.getElementById('loginForm');
    var emailEl   = document.getElementById('loginEmail');
    var passEl    = document.getElementById('loginPass');
    var errorEl   = document.getElementById('loginError');
    var toggleBtn = document.getElementById('togglePassBtn');
    var demos     = document.querySelectorAll('.login__demo');

    // ─── TOGGLE PASSWORD VISIBILITY ───────────────────────────
    toggleBtn.addEventListener('click', function () {
        var type = passEl.type === 'password' ? 'text' : 'password';
        passEl.type = type;
        toggleBtn.style.color = type === 'text' ? '#2563eb' : '';
    });

    // ─── DEMO ACCOUNT QUICK-FILL ──────────────────────────────
    demos.forEach(function (demo) {
        demo.addEventListener('click', function () {
            emailEl.value = demo.getAttribute('data-email');
            passEl.value  = demo.getAttribute('data-pass');
            errorEl.textContent = '';
            emailEl.focus();
        });
    });

    // ─── LOGIN HANDLER ────────────────────────────────────────
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        errorEl.textContent = '';

        var data  = getData();
        var email = emailEl.value.trim().toLowerCase();
        var pass  = passEl.value;

        // Check admin credentials
        if (data.admin && data.admin.email.toLowerCase() === email && data.admin.password === pass) {
            sessionStorage.setItem('qfm_admin', 'true');
            window.location.href = '../admin/index.html';
            return;
        }

        // Check client credentials
        var client = data.clients.find(function (c) {
            return c.email.toLowerCase() === email && c.password === pass;
        });

        if (client) {
            sessionStorage.setItem('qfm_client_id', client.id);
            window.location.href = '../client/index.html';
            return;
        }

        // Invalid credentials
        errorEl.textContent = 'Invalid email or password. Please try again.';
        passEl.value = '';
        passEl.focus();
    });

    // ─── CHECK IF ALREADY LOGGED IN ───────────────────────────
    if (sessionStorage.getItem('qfm_admin') === 'true') {
        window.location.href = '../admin/index.html';
    } else if (sessionStorage.getItem('qfm_client_id')) {
        window.location.href = '../client/index.html';
    }

})();
