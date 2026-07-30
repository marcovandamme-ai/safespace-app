let totalPoints = 50;

function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag]));
}

document.addEventListener('DOMContentLoaded', () => {
    switchTab('configuratie');
    renderStakeholders();
    renderDeliverables();
});

function handleLogin(e) {
    e.preventDefault();
    const nameInput = document.getElementById('login-name');
    if (nameInput && nameInput.value) {
        const name = nameInput.value;
        const displayName = document.getElementById('user-display-name');
        const userAvatar = document.getElementById('user-avatar');
        
        if (displayName) displayName.innerText = name;
        if (userAvatar) userAvatar.innerText = name.substring(0, 2).toUpperCase();
        
        const overlay = document.getElementById('login-overlay');
        if (overlay) overlay.classList.add('hidden');
        switchTab('configuratie');
    }
}

function adjustPoints(amount) {
    totalPoints += amount;
    if (totalPoints < 0) totalPoints = 0;
    const ptsDisplay = document.getElementById('dash-points-display');
    if (ptsDisplay) ptsDisplay.innerText = totalPoints;
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    
    const btnDash = document.getElementById('nav-btn-dashboard');
    const btnConfig = document.getElementById('nav-btn-configuratie');
    
    if (btnDash) btnDash.className = "px-4 py-2 rounded-xl bg-slate-100 font-bold text-xs hover:bg-slate-200 text-slate-800";
    if (btnConfig) btnConfig.className = "px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 flex items-center gap-1.5 ml-2";

    const target = document.getElementById(`tab-${tabName}`);
    if (target) {
        target.classList.remove('hidden');
    }

    const activeBtn = document.getElementById(`nav-btn-${tabName}`);
    if (activeBtn) {
        if (tabName === 'dashboard') {
            activeBtn.className = "px-4 py-2 rounded-xl bg-blue-600 text-white shadow-md flex items-center gap-2 font-bold text-xs";
        } else {
            activeBtn.className = "px-3 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-md flex items-center gap-1.5 ml-2";
        }
    }
}

function switchConfigSubTab(subTabName) {
    document.querySelectorAll('.config-subtab').forEach(el => el.classList.add('hidden'));
    
    const tabs = ['deliverables', 'stakeholders', 'spaarprogramma'];
    tabs.forEach(tab => {
        const btn = document.getElementById(`subtab-btn-${tab}`);
        if (btn) {
            btn.className = "font-bold text-xs px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100";
        }
    });

    const activeBtn = document.getElementById(`subtab-btn-${subTabName}`);
    if (activeBtn) {
        activeBtn.className = "font-bold text-xs px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700";
    }

    const target = document.getElementById(`config-subtab-${subTabName}`);
    if (target) {
        target.classList.remove('hidden');
    }
}

function openModal(id) {
    if (id === 'modal-deliverable') {
        populateStakeholderDropdown();
    }
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('hidden');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('hidden');
}

function populateStakeholderDropdown() {
    const select = document.getElementById('del-stakeholder');
    if (!select) return;
    const list = typeof getStakeholders === 'function' ? getStakeholders() : [];
    
    if (list.length === 0) {
        select.innerHTML = `<option value="">Geen stakeholders beschikbaar - maak er eerst een aan</option>`;
        return;
    }
    
    select.innerHTML = list.map(s => `<option value="${s.id}">${escapeHTML(s.naam)} (${escapeHTML(s.rol)})</option>`).join('');
}

function renderStakeholders() {
    const container = document.getElementById('stakeholders-container');
    if (!container) return;
    const list = typeof getStakeholders === 'function' ? getStakeholders() : [];

    if (list.length === 0) {
        container.innerHTML = `<div class="col-span-2 text-center p-6 text-slate-400 text-xs">Nog geen stakeholders ingevoerd.</div>`;
        return;
    }

    container.innerHTML = list.map(s => `
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="font-bold text-slate-900 text-sm">${escapeHTML(s.naam)}</h4>
                    <span class="text-xs text-slate-500 block">${escapeHTML(s.rol)}</span>
                </div>
                <span class="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-lg">${escapeHTML(s.disc)}</span>
            </div>
            <div class="bg-slate-50 p-2.5 rounded-xl space-y-1">
                <p class="text-xs text-slate-600"><b>NLP Kanaal:</b> ${escapeHTML(s.nlp)}</p>
                ${s.stijl ? `<p class="text-xs text-slate-600"><b>Stijl:</b> ${escapeHTML(s.stijl)}</p>` : ''}
            </div>
            ${s.weetjes ? `<p class="text-xs text-slate-500 italic bg-amber-50/50 p-2 rounded-xl">☕ "${escapeHTML(s.weetjes)}"</p>` : ''}
        </div>
    `).join('');
}

function renderDeliverables() {
    const container = document.getElementById('deliverables-container');
    if (!container) return;
    const list = typeof getDeliverables === 'function' ? getDeliverables() : [];
    const stakeholders = typeof getStakeholders === 'function' ? getStakeholders() : [];

    if (list.length === 0) {
        container.innerHTML = `<div class="col-span-2 text-center p-6 text-slate-400 text-xs">Nog geen deliverables ingevoerd.</div>`;
        return;
    }

    container.innerHTML = list.map(d => {
        const stk = stakeholders.find(s => s.id == d.stakeholderId) || { naam: "Onbekend" };
        return `
            <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-bold text-slate-900 text-sm">${escapeHTML(d.titel)}</h4>
                        <span class="text-xs text-indigo-600 font-bold block">${escapeHTML(d.frequentie)} • ${escapeHTML(d.format)}</span>
                    </div>
                    <span class="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-lg">${escapeHTML(d.status)}</span>
                </div>
                <div class="text-xs text-slate-600 pt-2 border-t border-slate-100 flex justify-between">
                    <span><b>Stakeholder:</b> ${escapeHTML(stk.naam)}</span>
                    <span><b>Deadline:</b> ${escapeHTML(d.deadline)}</span>
                </div>
            </div>
        `;
    }).join('');
}

function saveStakeholder(e) {
    e.preventDefault();
    const newStk = {
        naam: document.getElementById('stk-naam').value,
        rol: document.getElementById('stk-rol').value,
        disc: document.getElementById('stk-disc').value,
        nlp: document.getElementById('stk-nlp').value,
        stijl: document.getElementById('stk-stijl').value,
        weetjes: document.getElementById('stk-weetjes').value
    };
    
    if (typeof addStakeholder === 'function') {
        addStakeholder(newStk);
    }
    
    renderStakeholders();
    adjustPoints(15);
    closeModal('modal-stakeholder');
    e.target.reset();
}

function saveDeliverable(e) {
    e.preventDefault();
    const newDel = {
        titel: document.getElementById('del-titel').value,
        frequentie: document.getElementById('del-frequentie').value,
        format: document.getElementById('del-format').value,
        stakeholderId: document.getElementById('del-stakeholder').value,
        preCheckDatum: document.getElementById('del-precheck').value,
        deadline: document.getElementById('del-deadline').value,
        status: 'In behandeling'
    };

    if (typeof addDeliverable === 'function') {
        addDeliverable(newDel);
    }

    renderDeliverables();
    adjustPoints(10);
    closeModal('modal-deliverable');
    e.target.reset();
}

function saveSpaarprogramma(e) {
    e.preventDefault();
    const progNaam = document.getElementById('prog-naam').value;
    const progIcon = document.getElementById('prog-icon').value;
    const targetTitle = document.getElementById('target-title').value;
    const targetPts = document.getElementById('target-pts').value;

    const titleEl = document.getElementById('dash-program-title');
    const iconEl = document.getElementById('dash-program-icon');
    const targetNameEl = document.getElementById('dash-target-name');
    const targetPtsEl = document.getElementById('dash-target-points');

    if (titleEl) titleEl.innerText = progNaam.toUpperCase();
    if (iconEl) iconEl.innerText = progIcon;
    if (targetNameEl) targetNameEl.innerText = targetTitle;
    if (targetPtsEl) targetPtsEl.innerText = `Doel: ${targetPts} ptn`;

    alert("✨ Spaarprogramma en Gamification spelregels succesvol bijgewerkt!");
    switchTab('dashboard');
}
