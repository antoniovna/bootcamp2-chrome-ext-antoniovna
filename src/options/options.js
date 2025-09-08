const newSiteInput = document.getElementById('newSite');
const addBtn = document.getElementById('addBtn');
const sitesListUl = document.getElementById('sitesList');
const saveStatus = document.getElementById('saveStatus');

let blockedSites = [];

// Carrega os sites e renderiza a lista
function loadSites() {
    chrome.storage.sync.get('blockedSites', (data) => {
        blockedSites = data.blockedSites || [];
        renderList();
    });
}

// Renderiza a lista na tela
function renderList() {
    sitesListUl.innerHTML = '';
    blockedSites.forEach((site, index) => {
        const li = document.createElement('li');
        li.textContent = site;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Remover';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => removeSite(index));
        li.appendChild(deleteBtn);
        sitesListUl.appendChild(li);
    });
}

// Salva a lista no storage
function saveSites() {
    chrome.storage.sync.set({ blockedSites }, () => {
        saveStatus.textContent = 'Lista salva!';
        setTimeout(() => { saveStatus.textContent = ''; }, 2000);
    });
}

// Adiciona um novo site
function addSite() {
    const newSite = newSiteInput.value.trim();
    if (newSite && !blockedSites.includes(newSite)) {
        blockedSites.push(newSite);
        newSiteInput.value = '';
        renderList();
        saveSites();
    }
}

// Remove um site
function removeSite(index) {
    blockedSites.splice(index, 1);
    renderList();
    saveSites();
}

addBtn.addEventListener('click', addSite);
newSiteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addSite();
    }
});

// Carrega os sites quando a página é aberta
document.addEventListener('DOMContentLoaded', loadSites);