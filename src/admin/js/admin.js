// ═══════════════════════════════════════════════════════════
// Quantum Florida Management — Admin Panel
// ═══════════════════════════════════════════════════════════
(function () {
    'use strict';

    // ─── SEED DATA ───────────────────────────────────────────
    var DATA_VERSION = '2026-03-24-v2';

    var DEFAULT_DATA = {
        admin: { email: 'admin@quantumfloridamgmt.com', password: 'quantum2026' },
        clients: [
            { id: 'c1', name: 'Realtron LLC',     email: 'realtronllc@gmail.com',    password: 'client123', phone: '(510) 640-6439', status: 'active' },
            { id: 'c2', name: 'Changel LLC',       email: 'da.rodriguez35@gmail.com', password: 'client123', phone: '(925) 623-6822', status: 'active' },
            { id: 'c3', name: 'Atomy Florida LLC', email: 'atomyllc@gmail.com',       password: 'client123', phone: '(510) 640-6439', status: 'active' }
        ],
        properties: [
            // Realtron LLC — 4 properties
            { id: 'p1',  name: '895 Blue Creek Dr',     address: '895 Blue Creek Dr, Haines City, FL 33844',                        type: 'House',     clientId: 'c1', plan: 'Professional', status: 'active', monthlyRent: 100 },
            { id: 'p2',  name: '3206 W Fox Squirrel Dr', address: '3206 W Fox Squirrel Dr, Kissimmee, FL 34741',                    type: 'House',     clientId: 'c1', plan: 'Professional', status: 'active', monthlyRent: 100 },
            { id: 'p3',  name: '1830 N Lauderdale Ave', address: '1830 N Lauderdale Ave, North Lauderdale, FL 33068',               type: 'Apartment', clientId: 'c1', plan: 'Professional', status: 'active', monthlyRent: 100 },
            { id: 'p4',  name: '1015 Park Ridge Cir',   address: '1015 Park Ridge Cir, Kissimmee, FL 34748',                       type: 'House',     clientId: 'c1', plan: 'Professional', status: 'active', monthlyRent: 200 },
            // Changel LLC — 3 properties
            { id: 'p5',  name: '1019 Park Ridge Cir',   address: '1019 Park Ridge Cir, Kissimmee, FL 34746',                       type: 'House',     clientId: 'c2', plan: 'Professional', status: 'active', monthlyRent: 200 },
            { id: 'p6',  name: 'Mosaic Unit 536',        address: 'Mosaic At Millenia, 8282 Resort Village Dr, Unit 536, Orlando, FL 32821', type: 'Condo', clientId: 'c2', plan: 'Professional', status: 'active', monthlyRent: 100 },
            { id: 'p7',  name: 'Mosaic Unit 538',        address: 'Mosaic At Millenia, 8282 Resort Village Dr, Unit 538, Orlando, FL 32821', type: 'Condo', clientId: 'c2', plan: 'Professional', status: 'active', monthlyRent: 100 },
            // Atomy Florida LLC — 3 properties
            { id: 'p8',  name: '3982 Versailles Dr',    address: '3982 Versailles Dr, Unit 3982C, Orlando, FL 32808',              type: 'Condo',     clientId: 'c3', plan: 'Professional', status: 'active', monthlyRent: 100 },
            { id: 'p9',  name: '4011 Versailles Dr',    address: '4011 Versailles Dr, Unit 4011F, Orlando, FL 32808',              type: 'Condo',     clientId: 'c3', plan: 'Professional', status: 'active', monthlyRent: 100 },
            { id: 'p10', name: '4081 Dijon Dr',         address: '4081 Dijon Dr, Unit 4081J, Orlando, FL 32808',                   type: 'Condo',     clientId: 'c3', plan: 'Professional', status: 'active', monthlyRent: 100 }
        ],
        financials: [],
        updates: [
            { id: 'u1', propertyId: 'p1', date: '2026-03-24', title: 'Data imported from Google Sheets', description: '10 properties synced across 3 clients — Realtron LLC: 895 Blue Creek Dr, 3206 W Fox Squirrel Dr, 1830 N Lauderdale Ave, 1015 Park Ridge Cir. Changel LLC: 1019 Park Ridge Cir, Mosaic Unit 536, Mosaic Unit 538. Atomy Florida LLC: 3982, 4011 & 4081 Versailles/Dijon Dr.', type: 'general' }
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

    // ─── DATA STORE ──────────────────────────────────────────
    // Server is the source of truth. localStorage is a fast cache.
    // DEFAULT_DATA is only used when BOTH server and localStorage are empty.

    function getData() {
        var raw = localStorage.getItem('qfm_data');
        if (!raw) {
            // Nothing cached yet — return defaults (server sync will overwrite on login)
            return JSON.parse(JSON.stringify(DEFAULT_DATA));
        }
        var data = JSON.parse(raw);
        // Fill in any missing top-level keys without wiping existing data
        var keys = Object.keys(DEFAULT_DATA);
        var changed = false;
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

    function saveData(data) {
        // 1. Write to localStorage immediately (synchronous, keeps UI fast)
        localStorage.setItem('qfm_data', JSON.stringify(data));
        // 2. Persist to server in the background (fire-and-forget)
        fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(function () {
            // Server unreachable — localStorage copy is the fallback
            console.warn('QFM: server sync failed, data safe in localStorage');
        });
    }

    // Load authoritative data from server and update localStorage cache.
    // callback() is invoked after sync (or immediately on failure).
    function syncFromServer(callback) {
        fetch('/api/data')
            .then(function (r) { return r.json(); })
            .then(function (serverData) {
                if (serverData && serverData.clients) {
                    // Server has real data — use it as the authoritative source
                    localStorage.setItem('qfm_data', JSON.stringify(serverData));
                } else {
                    // Server is empty — push localStorage data up to server
                    var local = localStorage.getItem('qfm_data');
                    if (local) {
                        fetch('/api/data', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: local
                        }).catch(function () {});
                    }
                }
                callback();
            })
            .catch(function () {
                // Server unreachable — proceed with localStorage data
                callback();
            });
    }

    function genId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // ─── AUTH ────────────────────────────────────────────────
    var loginScreen = document.getElementById('loginScreen');
    var dashboard   = document.getElementById('dashboard');

    function checkAuth() {
        if (sessionStorage.getItem('qfm_admin') === 'true') {
            syncFromServer(function () {
                loginScreen.style.display = 'none';
                dashboard.style.display   = 'flex';
                var initSec = window.location.hash.replace('#', '') || 'overview';
                applySection(initSec);
            });
        }
    }

    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var user = document.getElementById('loginUser').value;
        var pass = document.getElementById('loginPass').value;
        // Sync from server first so credentials are up to date
        syncFromServer(function () {
            var data = getData();
            if (user.toLowerCase() === data.admin.email.toLowerCase() && pass === data.admin.password) {
                sessionStorage.setItem('qfm_admin', 'true');
                loginScreen.style.display = 'none';
                dashboard.style.display   = 'flex';
                if (!window.location.hash || window.location.hash === '#') {
                    window.location.hash = 'overview';
                }
                applySection(window.location.hash.replace('#', '') || 'overview');
            } else {
                document.getElementById('loginError').textContent = 'Invalid username or password';
            }
        });
    });

    document.getElementById('btnLogout').addEventListener('click', logout);
    document.getElementById('btnLogoutMobile').addEventListener('click', logout);
    function logout() {
        sessionStorage.removeItem('qfm_admin');
        window.location.href = '../login/index.html';
    }

    // ─── NAVIGATION ──────────────────────────────────────────
    var VALID_SECTIONS = ['overview', 'content', 'properties', 'clients', 'financials', 'updates'];

    function navigateTo(sec) {
        if (VALID_SECTIONS.indexOf(sec) === -1) sec = 'overview';
        window.location.hash = sec;
    }

    function applySection(sec) {
        if (VALID_SECTIONS.indexOf(sec) === -1) sec = 'overview';
        document.querySelectorAll('.sidebar__link').forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('data-section') === sec);
        });
        document.querySelectorAll('.section').forEach(function (s) { s.style.display = 'none'; });
        document.getElementById('sec-' + sec).style.display = 'block';
        sidebar.classList.remove('open');
        loadSection(sec);
    }

    function loadSection(sec) {
        if (sec === 'overview')    loadOverview();
        if (sec === 'content')     loadContent();
        if (sec === 'properties')  loadProperties();
        if (sec === 'clients')     loadClients();
        if (sec === 'financials')  loadFinancials();
        if (sec === 'updates')     loadUpdates();
    }

    document.querySelectorAll('.sidebar__link').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            navigateTo(this.getAttribute('data-section'));
        });
    });

    window.addEventListener('hashchange', function () {
        var sec = window.location.hash.replace('#', '') || 'overview';
        applySection(sec);
    });

    // Mobile sidebar
    var sidebar = document.getElementById('sidebar');
    document.getElementById('btnHamburger').addEventListener('click', function () {
        sidebar.classList.toggle('open');
    });

    // ─── OVERVIEW ────────────────────────────────────────────
    function loadOverview() {
        var data = getData();
        document.getElementById('statProperties').textContent = data.properties.length;
        document.getElementById('statClients').textContent    = data.clients.length;
        document.getElementById('statUpdates').textContent     = data.updates.length;
        var totalRev = data.properties.reduce(function (s, p) { return s + (p.status === 'active' ? p.monthlyRent : 0); }, 0);
        document.getElementById('statRevenue').textContent = '$' + totalRev.toLocaleString();
        document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        var html = '';
        var activities = data.updates.slice(0, 5);
        activities.forEach(function (u) {
            var prop = data.properties.find(function (p) { return p.id === u.propertyId; });
            var dotClass = u.type === 'maintenance' ? 'blue' : u.type === 'financial' ? 'green' : u.type === 'hoa' ? 'gold' : 'blue';
            html += '<div class="activity-item"><div class="activity__dot activity__dot--' + dotClass + '"></div><div><div class="activity__text"><strong>' + u.title + '</strong> — ' + (prop ? prop.name : 'N/A') + '</div><div class="activity__time">' + u.date + '</div></div></div>';
        });
        document.getElementById('recentActivity').innerHTML = html || '<p style="color:#94a3b8;font-size:0.85rem;">No recent activity</p>';
    }

    // ─── CONTENT EDITOR ──────────────────────────────────────
    function loadContent() {
        var data = getData();
        var c = data.siteContent;
        document.getElementById('edit_hero_tagline_en').value = c.hero_tagline_en || '';
        document.getElementById('edit_hero_tagline_es').value = c.hero_tagline_es || '';
        document.getElementById('edit_hero_title_en').value   = c.hero_title_en || '';
        document.getElementById('edit_hero_title_es').value   = c.hero_title_es || '';
        document.getElementById('edit_hero_desc_en').value    = c.hero_desc_en || '';
        document.getElementById('edit_hero_desc_es').value    = c.hero_desc_es || '';
        document.getElementById('edit_stat_properties').value = c.stat_properties || 0;
        document.getElementById('edit_stat_satisfaction').value = c.stat_satisfaction || 0;
        document.getElementById('edit_stat_years').value      = c.stat_years || 0;
        document.getElementById('edit_price1').value          = c.price1 || 0;
        document.getElementById('edit_price2').value          = c.price2 || 0;
        document.getElementById('edit_price3').value          = c.price3 || 0;
        document.getElementById('edit_plan1_desc_en').value   = c.plan1_desc_en || '';
        document.getElementById('edit_plan1_desc_es').value   = c.plan1_desc_es || '';
        document.getElementById('edit_plan2_desc_en').value   = c.plan2_desc_en || '';
        document.getElementById('edit_plan2_desc_es').value   = c.plan2_desc_es || '';
        document.getElementById('edit_plan3_desc_en').value   = c.plan3_desc_en || '';
        document.getElementById('edit_plan3_desc_es').value   = c.plan3_desc_es || '';
        document.getElementById('edit_about1_en').value       = c.about1_en || '';
        document.getElementById('edit_about1_es').value       = c.about1_es || '';
        document.getElementById('edit_about2_en').value       = c.about2_en || '';
        document.getElementById('edit_about2_es').value       = c.about2_es || '';
        // Load images
        var imgs = data.images || {};
        Object.keys(imgs).forEach(function (key) {
            var el = document.getElementById('preview_' + key.replace('img_', ''));
            if (el && imgs[key]) {
                el.style.backgroundImage = 'url(' + imgs[key] + ')';
                el.textContent = '';
            }
        });
    }

    document.getElementById('btnSaveContent').addEventListener('click', function () {
        var data = getData();
        data.siteContent = {
            hero_tagline_en: document.getElementById('edit_hero_tagline_en').value,
            hero_tagline_es: document.getElementById('edit_hero_tagline_es').value,
            hero_title_en:   document.getElementById('edit_hero_title_en').value,
            hero_title_es:   document.getElementById('edit_hero_title_es').value,
            hero_desc_en:    document.getElementById('edit_hero_desc_en').value,
            hero_desc_es:    document.getElementById('edit_hero_desc_es').value,
            stat_properties: parseInt(document.getElementById('edit_stat_properties').value) || 0,
            stat_satisfaction: parseInt(document.getElementById('edit_stat_satisfaction').value) || 0,
            stat_years:      parseInt(document.getElementById('edit_stat_years').value) || 0,
            price1: parseInt(document.getElementById('edit_price1').value) || 0,
            price2: parseInt(document.getElementById('edit_price2').value) || 0,
            price3: parseInt(document.getElementById('edit_price3').value) || 0,
            plan1_desc_en: document.getElementById('edit_plan1_desc_en').value,
            plan1_desc_es: document.getElementById('edit_plan1_desc_es').value,
            plan2_desc_en: document.getElementById('edit_plan2_desc_en').value,
            plan2_desc_es: document.getElementById('edit_plan2_desc_es').value,
            plan3_desc_en: document.getElementById('edit_plan3_desc_en').value,
            plan3_desc_es: document.getElementById('edit_plan3_desc_es').value,
            about1_en: document.getElementById('edit_about1_en').value,
            about1_es: document.getElementById('edit_about1_es').value,
            about2_en: document.getElementById('edit_about2_en').value,
            about2_es: document.getElementById('edit_about2_es').value
        };
        saveData(data);
        toast('Website content saved successfully!', 'success');
    });

    // Tabs
    document.querySelectorAll('.tab').forEach(function (t) {
        t.addEventListener('click', function () {
            document.querySelectorAll('.tab').forEach(function (x) { x.classList.remove('active'); });
            document.querySelectorAll('.tab-content').forEach(function (x) { x.classList.remove('active'); });
            t.classList.add('active');
            document.getElementById(t.getAttribute('data-tab')).classList.add('active');
        });
    });

    // Image uploads
    document.querySelectorAll('.image-upload').forEach(function (inp) {
        inp.addEventListener('change', function () {
            var file = this.files[0];
            if (!file) return;
            var reader = new FileReader();
            var targetId = this.getAttribute('data-target');
            var key = this.getAttribute('data-key');
            reader.onload = function (e) {
                var preview = document.getElementById(targetId);
                preview.style.backgroundImage = 'url(' + e.target.result + ')';
                preview.textContent = '';
                var data = getData();
                data.images = data.images || {};
                data.images[key] = e.target.result;
                saveData(data);
                toast('Image uploaded!', 'success');
            };
            reader.readAsDataURL(file);
        });
    });

    // ─── PROPERTIES ──────────────────────────────────────────
    function loadProperties() {
        var data = getData();
        var html = '';
        data.properties.forEach(function (p) {
            var client = data.clients.find(function (c) { return c.id === p.clientId; });
            html += '<tr>' +
                '<td><strong>' + p.name + '</strong><br><small style="color:#94a3b8">' + p.type + '</small></td>' +
                '<td>' + p.address + '</td>' +
                '<td>' + (client ? client.name : 'Unassigned') + '</td>' +
                '<td>' + p.plan + '</td>' +
                '<td>$' + p.monthlyRent.toLocaleString() + '</td>' +
                '<td><span class="badge badge--' + p.status + '">' + p.status + '</span></td>' +
                '<td><div class="table__actions">' +
                    '<button class="btn--icon" onclick="QFM.editProperty(\'' + p.id + '\')" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>' +
                    '<button class="btn--icon btn--icon--danger" onclick="QFM.deleteProperty(\'' + p.id + '\')" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>' +
                '</div></td></tr>';
        });
        document.getElementById('propertiesTable').innerHTML = html || '<tr><td colspan="7" style="text-align:center;color:#94a3b8;padding:2rem">No properties yet</td></tr>';
    }

    document.getElementById('btnAddProperty').addEventListener('click', function () {
        showPropertyModal();
    });

    function showPropertyModal(propId) {
        var data = getData();
        var prop = propId ? data.properties.find(function (p) { return p.id === propId; }) : null;
        var clientOpts = data.clients.map(function (c) {
            var sel = prop && prop.clientId === c.id ? ' selected' : '';
            return '<option value="' + c.id + '"' + sel + '>' + c.name + '</option>';
        }).join('');
        var html =
            '<div class="form__group"><label>Property Name</label><input type="text" id="m_prop_name" class="form__input" value="' + (prop ? prop.name : '') + '"></div>' +
            '<div class="form__group"><label>Address</label><input type="text" id="m_prop_addr" class="form__input" value="' + (prop ? prop.address : '') + '"></div>' +
            '<div class="form__group"><label>Type</label><select id="m_prop_type" class="form__input"><option' + (prop && prop.type === 'Condo' ? ' selected' : '') + '>Condo</option><option' + (prop && prop.type === 'Apartment' ? ' selected' : '') + '>Apartment</option><option' + (prop && prop.type === 'Townhouse' ? ' selected' : '') + '>Townhouse</option><option' + (prop && prop.type === 'House' ? ' selected' : '') + '>House</option></select></div>' +
            '<div class="form__group"><label>Client</label><select id="m_prop_client" class="form__input"><option value="">Select client...</option>' + clientOpts + '</select></div>' +
            '<div class="form__group"><label>Plan</label><select id="m_prop_plan" class="form__input"><option' + (prop && prop.plan === 'Essential' ? ' selected' : '') + '>Essential</option><option' + (prop && prop.plan === 'Professional' ? ' selected' : '') + '>Professional</option><option' + (prop && prop.plan === 'Premium' ? ' selected' : '') + '>Premium</option></select></div>' +
            '<div class="form__group"><label>Monthly Fee ($)</label><input type="number" id="m_prop_rent" class="form__input" value="' + (prop ? prop.monthlyRent : '') + '"></div>' +
            '<div class="form__group"><label>Status</label><select id="m_prop_status" class="form__input"><option value="active"' + (prop && prop.status === 'active' ? ' selected' : '') + '>Active</option><option value="inactive"' + (prop && prop.status === 'inactive' ? ' selected' : '') + '>Inactive</option></select></div>';
        openModal(propId ? 'Edit Property' : 'Add Property', html, function () {
            var d = getData();
            var obj = {
                id: propId || genId(),
                name: document.getElementById('m_prop_name').value,
                address: document.getElementById('m_prop_addr').value,
                type: document.getElementById('m_prop_type').value,
                clientId: document.getElementById('m_prop_client').value,
                plan: document.getElementById('m_prop_plan').value,
                monthlyRent: parseInt(document.getElementById('m_prop_rent').value) || 0,
                status: document.getElementById('m_prop_status').value
            };
            if (propId) {
                var idx = d.properties.findIndex(function (p) { return p.id === propId; });
                if (idx !== -1) d.properties[idx] = obj;
            } else {
                d.properties.push(obj);
            }
            saveData(d);
            loadProperties();
            toast('Property saved!', 'success');
        });
    }

    // ─── CLIENTS ─────────────────────────────────────────────
    function loadClients() {
        var data = getData();
        var html = '';
        data.clients.forEach(function (c) {
            var propCount = data.properties.filter(function (p) { return p.clientId === c.id; }).length;
            html += '<tr>' +
                '<td><strong>' + c.name + '</strong></td>' +
                '<td>' + c.email + '</td>' +
                '<td>' + c.phone + '</td>' +
                '<td>' + propCount + '</td>' +
                '<td><span class="badge badge--' + c.status + '">' + c.status + '</span></td>' +
                '<td><div class="table__actions">' +
                    '<button class="btn--icon" onclick="QFM.editClient(\'' + c.id + '\')" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>' +
                    '<button class="btn--icon btn--icon--danger" onclick="QFM.deleteClient(\'' + c.id + '\')" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>' +
                '</div></td></tr>';
        });
        document.getElementById('clientsTable').innerHTML = html || '<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:2rem">No clients yet</td></tr>';
    }

    document.getElementById('btnAddClient').addEventListener('click', function () {
        showClientModal();
    });

    function showClientModal(clientId) {
        var data = getData();
        var cl = clientId ? data.clients.find(function (c) { return c.id === clientId; }) : null;
        var html =
            '<div class="form__group"><label>Full Name</label><input type="text" id="m_cl_name" class="form__input" value="' + (cl ? cl.name : '') + '"></div>' +
            '<div class="form__group"><label>Email (used for login)</label><input type="email" id="m_cl_email" class="form__input" value="' + (cl ? cl.email : '') + '"></div>' +
            '<div class="form__group"><label>Password</label><input type="text" id="m_cl_pass" class="form__input" value="' + (cl ? cl.password : 'client123') + '"></div>' +
            '<div class="form__group"><label>Phone</label><input type="tel" id="m_cl_phone" class="form__input" value="' + (cl ? cl.phone : '') + '"></div>' +
            '<div class="form__group"><label>Status</label><select id="m_cl_status" class="form__input"><option value="active"' + (cl && cl.status === 'active' ? ' selected' : '') + '>Active</option><option value="inactive"' + (cl && cl.status === 'inactive' ? ' selected' : '') + '>Inactive</option></select></div>';
        openModal(clientId ? 'Edit Client' : 'Add Client', html, function () {
            var d = getData();
            var obj = {
                id: clientId || genId(),
                name: document.getElementById('m_cl_name').value,
                email: document.getElementById('m_cl_email').value,
                password: document.getElementById('m_cl_pass').value,
                phone: document.getElementById('m_cl_phone').value,
                status: document.getElementById('m_cl_status').value
            };
            if (clientId) {
                var idx = d.clients.findIndex(function (c) { return c.id === clientId; });
                if (idx !== -1) d.clients[idx] = obj;
            } else {
                d.clients.push(obj);
            }
            saveData(d);
            loadClients();
            toast('Client saved!', 'success');
        });
    }

    // ─── FINANCIALS ──────────────────────────────────────────
    function loadFinancials() {
        var data = getData();
        var totalInc = 0, totalExp = 0;
        var html = '';
        data.financials.forEach(function (f) {
            var prop = data.properties.find(function (p) { return p.id === f.propertyId; });
            var net = f.rent - f.expenses;
            totalInc += f.rent;
            totalExp += f.expenses;
            html += '<tr>' +
                '<td>' + f.month + '</td>' +
                '<td>' + (prop ? prop.name : 'N/A') + '</td>' +
                '<td style="color:#065f46">$' + f.rent.toLocaleString() + '</td>' +
                '<td style="color:#dc2626">$' + f.expenses.toLocaleString() + '</td>' +
                '<td style="font-weight:600">$' + net.toLocaleString() + '</td>' +
                '<td><button class="btn--icon btn--icon--danger" onclick="QFM.deleteFinancial(\'' + f.id + '\')" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button></td></tr>';
        });
        document.getElementById('financialsTable').innerHTML = html || '<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:2rem">No records</td></tr>';
        document.getElementById('finTotalIncome').textContent   = '$' + totalInc.toLocaleString();
        document.getElementById('finTotalExpenses').textContent  = '$' + totalExp.toLocaleString();
        document.getElementById('finNetIncome').textContent      = '$' + (totalInc - totalExp).toLocaleString();
    }

    document.getElementById('btnAddFinancial').addEventListener('click', function () {
        var data = getData();
        var propOpts = data.properties.map(function (p) { return '<option value="' + p.id + '">' + p.name + '</option>'; }).join('');
        var html =
            '<div class="form__group"><label>Month</label><input type="month" id="m_fin_month" class="form__input" value="2026-02"></div>' +
            '<div class="form__group"><label>Property</label><select id="m_fin_prop" class="form__input">' + propOpts + '</select></div>' +
            '<div class="form__group"><label>Rent Collected ($)</label><input type="number" id="m_fin_rent" class="form__input"></div>' +
            '<div class="form__group"><label>Expenses ($)</label><input type="number" id="m_fin_exp" class="form__input" value="0"></div>' +
            '<div class="form__group"><label>Description</label><input type="text" id="m_fin_desc" class="form__input" placeholder="Monthly rent collection"></div>';
        openModal('Add Financial Record', html, function () {
            var d = getData();
            d.financials.push({
                id: genId(),
                propertyId: document.getElementById('m_fin_prop').value,
                month: document.getElementById('m_fin_month').value,
                rent: parseInt(document.getElementById('m_fin_rent').value) || 0,
                expenses: parseInt(document.getElementById('m_fin_exp').value) || 0,
                description: document.getElementById('m_fin_desc').value
            });
            saveData(d);
            loadFinancials();
            toast('Record added!', 'success');
        });
    });

    // ─── UPDATES ─────────────────────────────────────────────
    function loadUpdates() {
        var data = getData();
        var html = '';
        data.updates.forEach(function (u) {
            var prop = data.properties.find(function (p) { return p.id === u.propertyId; });
            var typeIcon = u.type === 'maintenance' ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0"/></svg>' :
                             u.type === 'financial' ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 8v1"/></svg>' :
                             u.type === 'hoa' ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7"/></svg>' :
                             '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';
            html += '<div class="update-card">' +
                '<div class="update-card__type update-card__type--' + u.type + '">' + typeIcon + '</div>' +
                '<div class="update-card__content">' +
                    '<div class="update-card__header"><span class="update-card__title">' + u.title + '</span><span class="update-card__date">' + u.date + '</span></div>' +
                    '<p class="update-card__property">' + (prop ? prop.name : 'N/A') + '</p>' +
                    '<p class="update-card__desc">' + u.description + '</p>' +
                    '<div class="update-card__actions"><button class="btn--icon btn--icon--danger" onclick="QFM.deleteUpdate(\'' + u.id + '\')" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button></div>' +
                '</div></div>';
        });
        document.getElementById('updatesList').innerHTML = html || '<p style="color:#94a3b8;text-align:center;padding:2rem">No updates yet</p>';
    }

    document.getElementById('btnAddUpdate').addEventListener('click', function () {
        var data = getData();
        var propOpts = data.properties.map(function (p) { return '<option value="' + p.id + '">' + p.name + '</option>'; }).join('');
        var html =
            '<div class="form__group"><label>Property</label><select id="m_upd_prop" class="form__input">' + propOpts + '</select></div>' +
            '<div class="form__group"><label>Title</label><input type="text" id="m_upd_title" class="form__input" placeholder="AC maintenance completed"></div>' +
            '<div class="form__group"><label>Type</label><select id="m_upd_type" class="form__input"><option value="maintenance">Maintenance</option><option value="financial">Financial</option><option value="hoa">HOA</option><option value="general">General</option></select></div>' +
            '<div class="form__group"><label>Date</label><input type="date" id="m_upd_date" class="form__input" value="' + new Date().toISOString().split('T')[0] + '"></div>' +
            '<div class="form__group"><label>Description</label><textarea id="m_upd_desc" class="form__input" rows="3" placeholder="Describe the update..."></textarea></div>';
        openModal('New Property Update', html, function () {
            var d = getData();
            d.updates.unshift({
                id: genId(),
                propertyId: document.getElementById('m_upd_prop').value,
                title: document.getElementById('m_upd_title').value,
                type: document.getElementById('m_upd_type').value,
                date: document.getElementById('m_upd_date').value,
                description: document.getElementById('m_upd_desc').value
            });
            saveData(d);
            loadUpdates();
            toast('Update published!', 'success');
        });
    });

    // ─── MODAL ───────────────────────────────────────────────
    var modalOverlay = document.getElementById('modalOverlay');
    var onModalSave  = null;

    function openModal(title, bodyHTML, onSave) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML    = bodyHTML;
        onModalSave = onSave;
        modalOverlay.style.display = 'flex';
    }

    function closeModal() {
        modalOverlay.style.display = 'none';
        onModalSave = null;
    }

    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalCancel').addEventListener('click', closeModal);
    document.getElementById('modalSave').addEventListener('click', function () {
        if (onModalSave) onModalSave();
        closeModal();
    });
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) closeModal();
    });

    // ─── TOAST ───────────────────────────────────────────────
    function toast(msg, type) {
        var el = document.getElementById('toast');
        el.textContent = msg;
        el.className = 'toast' + (type ? ' toast--' + type : '');
        el.classList.add('show');
        setTimeout(function () { el.classList.remove('show'); }, 3000);
    }

    // ─── GLOBAL API ──────────────────────────────────────────
    window.QFM = {
        editProperty: function (id) { showPropertyModal(id); },
        deleteProperty: function (id) {
            if (!confirm('Delete this property?')) return;
            var d = getData();
            d.properties = d.properties.filter(function (p) { return p.id !== id; });
            saveData(d);
            loadProperties();
            toast('Property deleted', 'error');
        },
        editClient: function (id) { showClientModal(id); },
        deleteClient: function (id) {
            if (!confirm('Delete this client? Their login will be removed.')) return;
            var d = getData();
            d.clients = d.clients.filter(function (c) { return c.id !== id; });
            saveData(d);
            loadClients();
            toast('Client deleted', 'error');
        },
        deleteFinancial: function (id) {
            if (!confirm('Delete this record?')) return;
            var d = getData();
            d.financials = d.financials.filter(function (f) { return f.id !== id; });
            saveData(d);
            loadFinancials();
            toast('Record deleted', 'error');
        },
        deleteUpdate: function (id) {
            if (!confirm('Delete this update?')) return;
            var d = getData();
            d.updates = d.updates.filter(function (u) { return u.id !== id; });
            saveData(d);
            loadUpdates();
            toast('Update deleted', 'error');
        }
    };

    window.togglePassword = function (inputId, btn) {
        var input = document.getElementById(inputId);
        input.type = input.type === 'password' ? 'text' : 'password';
    };

    // ─── INIT ────────────────────────────────────────────────
    checkAuth();
})();
