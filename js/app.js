document.addEventListener('DOMContentLoaded', () => {
    renderStakeholders();
    renderDeliverables();
});

function handleLogin(e) {
    e.preventDefault();
    const name = document.getElementById('login-name').value;
    if (name) {
        document.getElementById('user-display-name').innerText = name;
        document.getElementById('user-avatar').innerText = name.substring(0, 2).toUpperCase();
        document.getElementById('login-overlay').classList.add('hidden');
    }
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(`tab-${tabName}`);
    if (target) {
        target.classList.remove('hidden');
    }
}

function switchConfigSubTab(subTabName) {
    document.querySelectorAll('.config-subtab').forEach(el => el.classList.add('hidden'));
    
    document.getElementById('subtab-btn-deliverables').className = "font-bold text-xs px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100";
    document.getElementById('subtab-btn-stakeholders').className = "font-bold text-xs px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100";

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
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

function populateStakeholderDropdown() {
    const select = document.getElementById('del-stakeholder');
    if (!select) return;
    const list = getStakeholders();
    select.innerHTML = list.map(s => `<option value="${s.id}">${s.naam} (${s.rol})</option>`).join('');
}

function renderStakeholders() {
    const container = document.getElementById('stakeholders-container');
    if (!container) return;
    const list = getStakeholders();
    container.innerHTML = list.map(s => `
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="font-bold text-slate-900 text-sm">${s.naam}</h4>
                    <span class="text-xs text-slate-500 block">${s.rol}</span>
                </div>
                <span class="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-lg">${s.disc}</span>
            </div>
            <p class="text-xs text-slate-600 bg-slate-50 p-2 rounded-xl"><b>NLP:</b> ${s.nlp}</p>
            <p class="text-xs text-slate-500 italic">" ${s.weetjes} "</p>
        </div>
    `).join('');
}

function renderDeliverables() {
    const container = document.getElementById('deliverables-container');
    if (!container) return;
    const list = getDeliverables();
    const stakeholders = getStakeholders();

    container.innerHTML = list.map(d => {
        const stk = stakeholders.find(s => s.id === d.stakeholderId) || { naam: "Onbekend" };
        return `
            <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-bold text-slate-900 text-sm">${d.titel}</h4>
                        <span class="text-xs text-indigo-600 font-bold block">${d.frequentie} • ${d.format}</span>
                    </div>
                    <span class="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-lg">${d.status}</span>
                </div>
                <div class="text-xs text-slate-600 pt-2 border-t border-slate-100 flex justify-between">
                    <span><b>Stakeholder:</b> ${stk.naam}</span>
                    <span><b>Deadline:</b> ${d.deadline}</span>
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
        weetjes: document.getElementById('stk-weetjes').value
    };
    addStakeholder(newStk);
    renderStakeholders();
    closeModal('modal-stakeholder');
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
    addDeliverable(newDel);
    renderDeliverables();
    closeModal('modal-deliverable');
}