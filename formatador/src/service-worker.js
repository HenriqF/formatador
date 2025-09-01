//usado para salvar e carregar o texto.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'save') {
    chrome.storage.local.set({ [message.key]: message.value }, () => {
        sendResponse({ success: true });
    });
    return true;
    }

    else if (message.type === 'load') {
        chrome.storage.local.get(message.key, (result) => {
            sendResponse({ value: result[message.key] });
        });
        return true;
    }
});