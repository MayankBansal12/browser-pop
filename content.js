async function checkExtensionStatus() {
    const data = await chrome.storage.sync.get({ isActive: true });
    return data.isActive;
}

async function handleBlockedUrls() {
    const isActive = await checkExtensionStatus();
    if (!isActive) {
        return;
    }

    const { blockedUrls } = await chrome.storage.sync.get({ blockedUrls: [] });
    if (!blockedUrls.length) {
        return;
    }

    const isWithinActiveRange = await checkActiveRange()
    if (!isWithinActiveRange) {
        return;
    }

    const currentUrl = window.location.href;
    const currentDomain = window.location.hostname.replace("www.", "");
    blockedUrls.forEach(entry => {
        if (entry.url === currentDomain && entry.open === true) {
            const blockedUrl = chrome.runtime.getURL(`blocked.html?url=${decodeURIComponent(currentUrl)}`);
            window.location.href = blockedUrl;
        }
    });
}

export async function checkActiveRange() {
    const data = await chrome.storage.sync.get({ startTime: null, endTime: null })
    const startTime = data.startTime
    const endTime = data.endTime
    if (!startTime || !endTime) {
        return false;
    }
    const date = new Date()
    const currentTime = date.getHours() + ":" + date.getMinutes()

    const now = parseTime(currentTime);
    let start = parseTime(startTime);
    let end = parseTime(endTime);
    if (end < start) {
        start.setDate(start.getDate() - 1);
    }
    const isWithinRange = now >= start && now <= end;
    return isWithinRange;
}

function parseTime(time, baseDate = new Date()) {
    const [hours, minutes] = time.split(":").map(Number);
    const parsed = new Date(baseDate);
    parsed.setHours(hours, minutes, 0, 0);
    return parsed;
}

handleBlockedUrls();