// Listener de instalação: define valores iniciais no storage
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        blockedSites: ['facebook.com', 'twitter.com', 'youtube.com'],
        isFocusing: false
    });
    console.log('Modo Foco instalado e configurado com sites padrão.');
});

// Listener de mensagens do popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'start') {
        chrome.storage.sync.set({ isFocusing: true });
        // Cria um alarme para desligar o foco automaticamente
        chrome.alarms.create('focusAlarm', { delayInMinutes: request.minutes });
        console.log(`Alarme de foco iniciado por ${request.minutes} minutos.`);
    } else if (request.command === 'stop') {
        chrome.storage.sync.set({ isFocusing: false });
        chrome.alarms.clear('focusAlarm');
        console.log('Alarme de foco parado.');
    }
});

// Listener para quando o alarme dispara (tempo de foco acabou)
chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === 'focusAlarm') {
        chrome.storage.sync.set({ isFocusing: false });
        console.log('Tempo de foco encerrado!');
    }
});

// Listener de atualização de abas: Onde verificamos se o user tem algum site bloqueado e esta com foco ligado
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        chrome.storage.sync.get(['isFocusing', 'blockedSites'], (data) => {
            if (data.isFocusing && data.blockedSites) {
                const isBlocked = data.blockedSites.some(site => changeInfo.url.includes(site));
                if (isBlocked) {
                    // Redireciona a aba para a nossa página de bloqueio
                    chrome.tabs.update(tabId, { url: chrome.runtime.getURL('src/assets/blocked.html') });
                }
            }
        });
    }
});