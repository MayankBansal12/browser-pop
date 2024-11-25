async function checkExtensionStatus() {
    const data = await chrome.storage.sync.get({ isActive: true });
    return data.isActive;
}

async function handleBlockedUrls() {
    const isActive = await checkExtensionStatus();
    console.log("data . isactive: " + isActive)
    if (!isActive) {
        return;
    }

    const { blockedUrls } = await chrome.storage.sync.get({ blockedUrls: [] });
    if (!blockedUrls.length) {
        return;
    }

    const currentUrl = window.location.href;
    const currentDomain = window.location.hostname;
    blockedUrls.forEach(entry => {
        if (entry.url === currentDomain && entry.open === true) {
            const blockedUrl = chrome.runtime.getURL(`blocked.html?url=${decodeURIComponent(currentUrl)}`);
            window.location.href = blockedUrl;
        }
    });
}

handleBlockedUrls();