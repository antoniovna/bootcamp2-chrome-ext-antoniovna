const minutesInput = document.getElementById('minutes');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const statusEl = document.getElementById('status');
const optionsLink = document.getElementById('optionsLink');

// Atualiza a interface com o estado atual do alarme de foco
function updateUI(isFocusing) {
    startBtn.classList.toggle('hidden', isFocusing);
    stopBtn.classList.toggle('hidden', !isFocusing);
    minutesInput.disabled = isFocusing;

    if (isFocusing) {
        chrome.alarms.get('focusAlarm', alarm => {
            const remaining = Math.ceil((alarm.scheduledTime - Date.now()) / 60000);
            statusEl.textContent = `Foco ativo! Restam ${remaining} min.`;
        });
    } else {
        statusEl.textContent = 'Pronto para começar?';
    }
}

// Inicia o foco
startBtn.addEventListener('click', () => {
    const minutes = parseInt(minutesInput.value, 10);
    if (minutes > 0) {
        chrome.runtime.sendMessage({ command: 'start', minutes });
        updateUI(true);
    }
});

// Para o foco
stopBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ command: 'stop' });
    updateUI(false);
});

// Abre a página de opções
optionsLink.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
});

// Verifica o estado inicial ao abrir o popup
chrome.alarms.get('focusAlarm', alarm => {
    updateUI(!!alarm);
});